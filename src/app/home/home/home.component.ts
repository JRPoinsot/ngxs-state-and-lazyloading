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

  users: any;

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  getUsers(): void {
    this.ngOnInit();
  }

  getUser(userId: string): void {
    this.userService.getUser(userId).subscribe(user => {
      this.users = user;
    })
  }

}
