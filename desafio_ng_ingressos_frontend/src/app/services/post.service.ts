import { Injectable, signal } from '@angular/core';
import { PostRequest } from '../api/post.request';
import {
  IPostResponse,
  TCreatePostFormData,
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
  readonly editingPostSignal = signal<IPostResponse | null>(null);

  constructor(
    private postRequest: PostRequest,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.postRequest.readPostsRequest()?.subscribe((data) => {
      this.postListSignal.set(data);
    });
  }

  getEditingPost() {
    return this.editingPostSignal();
  }

  setEditingPost(post: IPostResponse | null) {
    this.editingPostSignal.set(post);
  }

  getPostList() {
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
      const createPostRequest = {
        ...formData,
        author: user.name,
      };
      this.postRequest
        .createPostRequest(createPostRequest)
        ?.subscribe((data) => {
          this.postListSignal.update((postList) => [...postList, data]);
          this.toastr.success('O seu post foi criado com sucesso');
          this.closeCreatePostModal();
        });
    }
  }

  updatePostsService(formData: TUpdatePostRequest) {
    const editingPost = this.editingPostSignal();
    if (editingPost) {
      const id = editingPost?.id;
      this.postRequest.updatePostRequest(id, formData)?.subscribe((data) => {
        this.postListSignal.update((postList) =>
          postList.map((post) => {
            if (post.id === id) {
              return data;
            } else {
              return post;
            }
          })
        );
      });
      this.toastr.success('Post atualizado com sucesso');
    }
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
