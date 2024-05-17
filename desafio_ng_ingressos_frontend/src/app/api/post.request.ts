import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPostResponse,
  TCreatePostRequest,
  TUpdatePostRequest,
} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostRequest {
  private BASE_URL = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  createPostRequest(formData: TCreatePostRequest) {
    const token = localStorage.getItem('@TokenNG');

    if (token) {
      const parsedToken = JSON.parse(token);
      return this.http.post<IPostResponse>(`${this.BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    } else {
      return null;
    }
  }

  readPostsRequest() {
    const token = localStorage.getItem('@TokenNG');

    if (token) {
      const parsedToken = JSON.parse(token);
      return this.http.get<IPostResponse[]>(`${this.BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    } else {
      return null;
    }
  }

  updatePostRequest(postId: string, formData: TUpdatePostRequest) {
    const token = localStorage.getItem('@TokenNG');

    if (token) {
      const parsedToken = JSON.parse(token);
      return this.http.patch<IPostResponse>(
        `${this.BASE_URL}/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
    } else {
      return null;
    }
  }
}