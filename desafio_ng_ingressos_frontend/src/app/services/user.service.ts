import { Injectable, signal } from '@angular/core';
import {
  TLoginUserRequest,
  TRegisterUserRequest,
  TRegisterUserResponse,
  TUserData,
} from '../interfaces/user.interface';
import { UserRequest } from '../api/user.request';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly userSignal = signal<TRegisterUserResponse | null>(null);

  constructor(private userRequest: UserRequest, private router: Router) {
    this.userRequest.userAutoLoginRequest()?.subscribe({
      next: (data) => {
        this.userSignal.set(data);
      },
      error: (error) => {
        console.log(error);
        this.logoutUsersService();
      },
    });
  }

  getUser() {
    return this.userSignal();
  }

  registerUsersService(formData: TUserData) {
    this.userRequest.registerUsersRequest(formData).subscribe({
      next: (data: TRegisterUserResponse) => {
        console.log(data);
        alert('Cadastro realizado com sucesso');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message === 'User Email Already Exists') {
            alert('Um usuário com este e-mail já foi cadastrado!');
          }
        }
      },
    });
  }

  loginUsersService(formData: TLoginUserRequest) {
    this.userRequest.loginUserRequest(formData).subscribe({
      next: (data) => {
        this.userSignal.set(data.user);
        localStorage.setItem('@TokenNG', JSON.stringify(data.token));
        localStorage.setItem('@UserIdNG', JSON.stringify(data.user.id));
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logoutUsersService() {
    this.userSignal.set(null);
    localStorage.removeItem('@TokenNG');
    localStorage.removeItem('@UserIdNG');
    this.router.navigateByUrl('/');
  }
}
