import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCreatePostRequest } from '../interfaces/post.interface';

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
      return this.http.post(`${this.BASE_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    } else {
      return null;
    }
  }

  readPostsService() {
    return this.http.get(`${this.BASE_URL}/posts`);
  }
}
