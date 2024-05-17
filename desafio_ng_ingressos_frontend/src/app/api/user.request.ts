import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginUserResponse,
  TLoginData,
  TRegisterUserResponse,
  TUserData,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRequest {
  private BASE_URL = 'https://desafio-ng-ingressos-backend.onrender.com';

  constructor(private http: HttpClient) {}

  registerUsersRequest(formData: TUserData) {
    return this.http.post<TRegisterUserResponse>(
      `${this.BASE_URL}/users`,
      formData
    );
  }

  loginUserRequest(formData: TLoginData) {
    return this.http.post<ILoginUserResponse>(
      `${this.BASE_URL}/login`,
      formData
    );
  }

  userAutoLoginRequest() {
    const token = localStorage.getItem('@TokenNG');
    const userId = localStorage.getItem('@UserIdNG');

    if (token && userId) {
      const parsedToken = JSON.parse(token);
      const parsedUserId = JSON.parse(userId);
      return this.http.get<TRegisterUserResponse>(
        `${this.BASE_URL}/users/${parsedUserId}`,
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
