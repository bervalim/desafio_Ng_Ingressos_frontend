import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private userService: UserService, private router: Router) {
    if (!this.user) this.router.navigateByUrl('/');
  }

  get user() {
    return this.userService.getUser();
  }

  handleLogout() {
    this.userService.logoutUsersService();
  }
}
