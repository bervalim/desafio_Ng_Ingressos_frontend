import { Injectable, signal } from '@angular/core';
import { PostRequest } from '../api/post.request';
import {
  IPostResponse,
  TCreatePostRequest,
  TUpdatePostRequest,
} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly postListSignal = signal<IPostResponse[]>([]);

  constructor(private postRequest: PostRequest) {
    this.postRequest.readPostsRequest()?.subscribe((data) => {
      this.postListSignal.set(data);
    });
  }

  getPosts() {
    return this.postListSignal();
  }

  createPostService(formData: TCreatePostRequest) {
    this.postRequest.createPostRequest(formData)?.subscribe((data) => {
      this.postListSignal.update((postList) => [...postList, data]);
    });
  }

  updatePostService(postId: string, formData: TUpdatePostRequest) {
    this.postRequest.updatePostRequest(postId, formData)?.subscribe((data) => {
      this.postListSignal.update((postList) =>
        postList.map((post) => {
          if (post.id === postId) {
            return data;
          } else {
            return post;
          }
        })
      );
    });
  }

  deletePostService(postId: string) {
    this.postRequest.deletePostRequest(postId)?.subscribe((data) => {
      this.postListSignal.update((postList) =>
        postList.filter((post) => post.id !== postId)
      );
    });
  }
}
