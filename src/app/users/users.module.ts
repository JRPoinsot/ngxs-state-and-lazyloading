import {NgModule} from '@angular/core';
import {UsersRoutingModule} from './users-routing.module';
import {UserHeaderInfoComponent} from './user-header-info/user-header-info.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UiModule} from '../ui/ui.module';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserState} from './state/user.actions';
import {NgxsModule} from '@ngxs/store';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    UsersRoutingModule,
    NgxsModule.forFeature([UserState])
  ],
  declarations: [
    UserHeaderInfoComponent,
    UserFormComponent,
    UserHomeComponent
  ]
})
export class UsersModule {
}
