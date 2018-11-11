import { Component, OnInit, OnDestroy } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import {UserState, UserModel, UserRole, DragAndDropUser} from '../state/user.actions';
import { Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user-header-info',
  templateUrl: './user-header-info.component.html',
  styleUrls: ['./user-header-info.component.sass']
})
export class UserHeaderInfoComponent implements OnInit, OnDestroy {

  @Select(UserState.userAdmins) admins$: Observable<Array<UserModel>>;
  @Select(UserState.userUsers) user$: Observable<Array<UserModel>>;

  private adminsSubscription: Subscription;
  private usersSubscription: Subscription;

  selfAdmins = [];
  selfUsers = [];
  constructor(private store: Store) { }

  ngOnInit() {
    this.adminsSubscription = this.admins$.subscribe(admins => this.selfAdmins = admins);
    this.usersSubscription = this.user$.subscribe(users => this.selfUsers = users);
  }

  ngOnDestroy() {
    this.adminsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  drop(event: CdkDragDrop<UserModel[]>) {
    let dragAndDropAction;
    const listToUpdate = event.container.data;
    const listToUpdate2 = event.previousContainer.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (event.container.id === 'ADMIN') {
        dragAndDropAction = new DragAndDropUser( {admins: listToUpdate, users: null });
      } else if (event.container.id === 'USER') {
        dragAndDropAction = new DragAndDropUser( {admins: null, users: listToUpdate });
      }
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (event.container.id === 'ADMIN') {
        dragAndDropAction = new DragAndDropUser( {admins: listToUpdate, users: listToUpdate2 });
      } else if (event.container.id === 'USER') {
        dragAndDropAction = new DragAndDropUser( {admins: listToUpdate2, users: listToUpdate });
      }
    }

    this.store.dispatch(dragAndDropAction);
  }
}
