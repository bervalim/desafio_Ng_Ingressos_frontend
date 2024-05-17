import { Injectable, signal } from '@angular/core';
import { PostRequest } from '../api/post.request';
import {
  IPostResponse,
  TCreatePostRequest,
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
}
