import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginUserResponse,
  TLoginUserRequest,
  TRegisterUserRequest,
  TRegisterUserResponse,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRequest {
  private BASE_URL = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  registerUsersRequest(formData: TRegisterUserRequest) {
    return this.http.post<TRegisterUserResponse>(
      `${this.BASE_URL}/users`,
      formData
    );
  }

  loginUserRequest(formData: TLoginUserRequest) {
    return this.http.post<ILoginUserResponse>(
      `${this.BASE_URL}/login`,
      formData
    );
  }

  userAutoLoginRequest() {
    const token = localStorage.getItem('@TokenNG');
    const userId = localStorage.getItem('@UserIdNG');

    if (token && userId) {
      return this.http.get<TRegisterUserResponse>(
        `${this.BASE_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      return null;
    }
  }
}
