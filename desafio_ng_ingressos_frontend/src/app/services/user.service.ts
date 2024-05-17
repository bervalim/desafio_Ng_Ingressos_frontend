import { Injectable, signal } from '@angular/core';
import {
  TLoginData,
  TRegisterUserResponse,
  TUserData,
} from '../interfaces/user.interface';
import { UserRequest } from '../api/user.request';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { publicRoutes } from '../app.routes';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly userSignal = signal<TRegisterUserResponse | null>(null);

  constructor(
    private userRequest: UserRequest,
    private router: Router,
    private toastr: ToastrService
  ) {
    const pathname = window.location.pathname;
    this.userRequest.userAutoLoginRequest()?.subscribe({
      next: (data) => {
        this.userSignal.set(data);
        if (publicRoutes.includes(pathname)) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl(pathname);
        }
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
        this.toastr.success('Cadastro realizado com sucesso');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message === 'User Email Already Exists') {
            this.toastr.error('Um usuário com este e-mail já foi cadastrado!');
          }
        }
      },
    });
  }

  loginUsersService(formData: TLoginData) {
    this.userRequest.loginUserRequest(formData).subscribe({
      next: (data) => {
        this.userSignal.set(data.user);
        localStorage.setItem('@TokenNG', JSON.stringify(data.token));
        localStorage.setItem('@UserIdNG', JSON.stringify(data.user.id));
        this.toastr.success(`Seja bem-vindo,${data.user.name}`);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message === 'Invalid Credentials!') {
            this.toastr.error('Senha ou e-mail inválidos');
          }
        }
      },
    });
  }

  logoutUsersService() {
    this.userSignal.set(null);
    localStorage.removeItem('@TokenNG');
    localStorage.removeItem('@UserIdNG');
    this.toastr.success('Deslogando...');
    this.router.navigateByUrl('/');
  }
}
