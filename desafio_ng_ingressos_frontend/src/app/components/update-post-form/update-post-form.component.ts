import { Component, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TUpdatePostRequest } from '../../interfaces/post.interface';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatCommonModule],
  templateUrl: './update-post-form.component.html',
  styleUrl: './update-post-form.component.scss',
})
export class UpdatePostFormComponent {
  constructor(private postService: PostService) {
    effect(() => {
      const editingPost = this.editingPost;
      if (editingPost) {
        this.postUpdateForm.setValue({
          title: editingPost.title,
          content: editingPost.content,
        });
      }
    });
  }

  get editingPost() {
    return this.postService.getEditingPost();
  }

  setEditingPostToNull() {
    return this.postService.setEditingPost(null);
  }

  postUpdateForm = new FormGroup({
    title: new FormControl<string | null>(''),
    content: new FormControl<string | null>(''),
  });

  submitUpdatePost() {
    const data = this.postUpdateForm.value as TUpdatePostRequest;
    this.postService.updatePostsService(data);
    this.postService.setEditingPost(null);
  }
}
