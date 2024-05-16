import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatCommonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(80),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(45),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
    ]),
    birthDate: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /(?:(?:31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[13-9]|1[0-2])\/))(?:1[6-9]\d{2}|[2-9]\d{3})$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)\d{2})00|(?:(?:0[48]|[2468][048]|[13579][26])00)|(?:(?:0[2468]|[13579][26])00)|(?:[2468][048]|[13579][26]00)))$|^(?:0?[1-9]|1\d|2[0-8])\/(?:(?:0?[1-9])|(?:1[0-2]))\/(?:1[6-9]\d{2}|[2-9]\d{3})/
      ),
    ]),
    sex: new FormControl('', [Validators.required]),
    avatar: new FormControl(null, [Validators.required]),
  });

  get errors() {
    return {
      name: this.registerForm.get('name')?.errors,
      email: this.registerForm.get('email')?.errors,
      password: this.registerForm.get('password')?.errors,
      birthDate: this.registerForm.get('birthDate')?.errors,
      sex: this.registerForm.get('sex')?.errors,
      avatar: this.registerForm.get('avatar')?.errors,
    };
  }

  submitRegisterForm() {
    console.log(this.registerForm.value);
    this.registerForm.reset();
  }
}
