import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-routes.component.html',
  styleUrl: './private-routes.component.scss',
})
export class PrivateRoutesComponent {
  constructor(private userService: UserService, private router: Router) {
    if (!this.user) this.router.navigateByUrl('/');
  }

  get user() {
    return this.userService.getUser();
  }
}
