import {State, Action, StateContext, Selector} from '@ngxs/store';

​
/************************************************
 *                                              *
 *              ACTIONS CLASSES                 *
 *                                              *
 * ***********************************************/


export function guid(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export class AddUser {
  static readonly type = '[USER] Add User';

  constructor(public user: UserModel) {
  }
}

export class DragAndDropUser {
  static readonly type = '[USER] Drag And Drop User';

  constructor(public payload: { admins: Array<UserModel>, users: Array<UserModel> }) {
  }
}

/************************************************
 *                                              *
 *                    MODEL                     *
 *                                              *
 * ***********************************************/

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserModel {
  id: string;
  firstName: string;
  email: string;
  role: UserRole;
  index: number;
}

export interface UserList {
  users: Array<UserModel>;
}

/************************************************
 *                                              *
 *                    STATE                     *
 *                                              *
 * ***********************************************/
const DEFAULT_USERS = {
  users: [
    {id: guid(), firstName: 'Jean-Rodolphe', email: 'jr.poinsot@gmail.com', role: UserRole.ADMIN, index: 0},
    {id: guid(), firstName: 'Georges', email: 'jr.poinsot@gmail.com', role: UserRole.ADMIN, index: 1},
    {id: guid(), firstName: 'Christian', email: 'jr.poinsot@gmail.com', role: UserRole.ADMIN, index: 2},
    {id: guid(), firstName: 'Emilie', email: 'jr.poinsot@gmail.com', role: UserRole.USER, index: 0},
    {id: guid(), firstName: 'Sophie', email: 'jr.poinsot@gmail.com', role: UserRole.USER, index: 1},
    {id: guid(), firstName: 'Vivaldi', email: 'jr.poinsot@gmail.com', role: UserRole.USER, index: 2},
    {id: guid(), firstName: 'René', email: 'jr.poinsot@gmail.com', role: UserRole.USER, index: 3},
  ]
};

@State<UserList>({
  name: 'users',
  defaults: DEFAULT_USERS
})
export class UserState {

  /** Custom selector */
  @Selector()
  static userAdmins(users: UserList) {
    return users.users.filter(u => u.role === UserRole.ADMIN).sort((x, y) => x.index - y.index);
  }

  /** Custom selector */
  @Selector()
  static userUsers(users: UserList) {
    return users.users.filter(u => u.role === UserRole.USER).sort((x, y) => x.index - y.index);
  }

  @Action(AddUser)
  addUser(ctx: StateContext<UserList>, action: AddUser) {
    console.log(AddUser.type);
    const userList = [...ctx.getState().users];
    const sortedUserList = userList.sort((x, y) => y.index - x.index);
    const index = sortedUserList.find(user => user.role === action.user.role).index + 1;
    action.user.index = index;
    userList.push(action.user);
    ctx.setState({
      users: userList
    });
    console.log(ctx.getState());
  }

  @Action(DragAndDropUser)
  dragUser(ctx: StateContext<UserList>, action: DragAndDropUser) {
    console.log(DragAndDropUser.type);
    const state = ctx.getState();
    let adminStateList = [...UserState.userAdmins(state)];
    let userStateList = [...UserState.userUsers(state)];
    if (action.payload.admins) {
      adminStateList = [...action.payload.admins];
      adminStateList.forEach((user, index) => {
        user.role = UserRole.ADMIN;
        user.index = index;
      });
    }
    if (action.payload.users) {
      userStateList = [...action.payload.users];
      userStateList.forEach((user, index) => {
        user.role = UserRole.USER;
        user.index = index;
      });
    }

    ctx.setState({
      users: [...adminStateList, ...userStateList]
    });
    console.log('next state', ctx.getState());
  }

}

