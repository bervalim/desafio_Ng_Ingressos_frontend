import { Injectable, signal } from '@angular/core';
import { PostRequest } from '../api/post.request';
import {
  IPostResponse,
  TCreatePostFormData,
  TCreatePostRequest,
  TUpdatePostRequest,
} from '../interfaces/post.interface';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly postListSignal = signal<IPostResponse[]>([]);
  readonly createPostModalSignal = signal(false);

  constructor(
    private postRequest: PostRequest,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.postRequest.readPostsRequest()?.subscribe((data) => {
      this.postListSignal.set(data);
    });
  }

  getPosts() {
    return this.postListSignal();
  }

  getCreatePostModalSignal() {
    return this.createPostModalSignal();
  }

  setCreatePostModal() {
    return this.createPostModalSignal.set(true);
  }

  closeCreatePostModal() {
    return this.createPostModalSignal.set(false);
  }

  createPostService(formData: TCreatePostFormData) {
    const user = this.userService.getUser();
    if (user) {
      const createPostRequest = { ...formData, author: user.name };
      this.postRequest
        .createPostRequest(createPostRequest)
        ?.subscribe((data) => {
          this.postListSignal.update((postList) => [...postList, data]);
          this.toastr.success('O seu post foi criado com sucesso');
          this.closeCreatePostModal();
        });
    }
  }

  updatePostService(postId: string, formData: TUpdatePostRequest) {
    this.postRequest.updatePostRequest(postId, formData)?.subscribe({
      next: (data) => {
        this.postListSignal.update((postList) =>
          postList.map((post) => {
            if (post.id === postId) {
              return data;
            } else {
              return post;
            }
          })
        );
        this.toastr.success('Post atualizado com sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao atualizar o seu post');
      },
    });
  }

  deletePostService(postId: string) {
    this.postRequest.deletePostRequest(postId)?.subscribe({
      next: () => {
        this.postListSignal.update((postList) =>
          postList.filter((post) => post.id !== postId)
        );
        this.toastr.success('Post deletado com sucesso');
      },
      error: () => {
        this.toastr.error('Não foi possível deletar o seu post');
      },
    });
  }
}
