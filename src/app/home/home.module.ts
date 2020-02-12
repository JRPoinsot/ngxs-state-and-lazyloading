import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {UiModule} from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
