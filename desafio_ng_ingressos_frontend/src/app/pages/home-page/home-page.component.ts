import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
