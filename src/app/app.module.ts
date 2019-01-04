import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersModule} from './users/users.module';
import {UiModule} from './ui/ui.module';
import {HomeModule} from './home/home.module';
import {RouterModule, Routes} from '@angular/router';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  entryComponents: [],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
