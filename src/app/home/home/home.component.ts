import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  users$: Observable<any>;

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

  getUsers(): void {
    this.ngOnInit();
  }

  getUser(userId: string): void {
    this.users$ = this.userService.getUser(userId);
  }

}
