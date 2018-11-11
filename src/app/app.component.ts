import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute,
              private router: Router) {}

  sideNavMode = 'side';
  title = 'ngxs-state';

  toggleSideNav() {
    if ('push' === this.sideNavMode) {
      this.sideNavMode = 'side';
    } else {
      this.sideNavMode = 'push';
    }
  }

  routeToHome() {
    this.router.navigate(['/home']);
    this.toggleSideNav();
  }

  routeToUser() {
    this.router.navigate(['/users']);
    this.toggleSideNav();
  }
}
