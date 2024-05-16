import { Injectable, signal } from '@angular/core';
import {
  TLoginUserRequest,
  TRegisterUserRequest,
  TRegisterUserResponse,
} from '../interfaces/user.interface';
import { UserRequest } from '../api/user.request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly userSignal = signal<TRegisterUserResponse | null>(null);

  constructor(private userRequest: UserRequest, private router: Router) {
    this.userRequest.userAutoLoginRequest()?.subscribe((data) => {
      this.userSignal.set(data);
    });
  }

  getUser() {
    return this.userSignal();
  }

  registerUsersService(formData: TRegisterUserRequest) {
    this.userRequest
      .registerUsersRequest(formData)
      .subscribe((data: TRegisterUserResponse) => {
        console.log(data);
        alert('Cadastro realizado com sucesso');
        this.router.navigateByUrl('/');
      });
  }

  loginUsersService(formData: TLoginUserRequest) {
    this.userRequest.loginUserRequest(formData).subscribe((data) => {
      this.userSignal.set(data.user);
      localStorage.setItem('@TokenNG', JSON.stringify(data.token));
      localStorage.setItem('@UserIdNG', JSON.stringify(data.user.id));
      this.router.navigateByUrl('/dashboard');
    });
  }

  logoutUsersService() {
    this.userSignal.set(null);
    localStorage.removeItem('@TokenNG');
    localStorage.removeItem('@UserIdNG');
    this.router.navigateByUrl('/');
  }
}
