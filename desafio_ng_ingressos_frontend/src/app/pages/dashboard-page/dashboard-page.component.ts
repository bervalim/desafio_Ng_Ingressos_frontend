import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { PrivateRoutesComponent } from '../../components/private-routes/private-routes.component';
import { CreatePostFormComponent } from '../../components/create-post-form/create-post-form.component';
import { PostService } from '../../services/post.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    PrivateRoutesComponent,
    CreatePostFormComponent,
    MatIconModule,
    MatCommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  get user() {
    return this.userService.getUser();
  }

  get createPostModalSignal() {
    return this.postService.getCreatePostModalSignal();
  }

  get postList() {
    return this.postService.getPostList();
  }

  openCreatePostModal() {
    return this.postService.setCreatePostModal();
  }

  handleLogout() {
    this.userService.logoutUsersService();
  }
}
