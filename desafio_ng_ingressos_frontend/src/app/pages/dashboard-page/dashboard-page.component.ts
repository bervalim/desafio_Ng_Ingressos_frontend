import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(private userService: UserService) {}

  get user() {
    return this.userService.getUser();
  }

  handleLogout() {
    this.userService.logoutUsersService();
  }
}
