import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { TCreatePostFormData } from '../../interfaces/post.interface';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatCommonModule],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss',
})
export class CreatePostFormComponent {
  constructor(private postService: PostService) {}

  postCreateForm = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    content: new FormControl<string | null>(null, [Validators.required]),
  });

  get errors() {
    return {
      title: this.postCreateForm.get('title')?.errors,
      content: this.postCreateForm.get('content')?.errors,
    };
  }

  handleCloseModal() {
    return this.postService.closeCreatePostModal();
  }

  submitCreatePost() {
    const data = this.postCreateForm.value as TCreatePostFormData;
    this.postService.createPostService(data);
    this.postCreateForm.reset();
  }
}
