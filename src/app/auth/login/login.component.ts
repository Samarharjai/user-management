import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormComponent } from '../shared/form/form.component';
import { IFormValues } from '../auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormComponent],
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  get isLoading() {
    return this.loginService.isLoading;
  }

  get error() {
    return this.loginService.error;
  }

  async onSubmit(formValues: IFormValues) {
    const { email, password } = formValues;
    this.loginService.mutate({ email, password });

    if (!this.isLoading && this.error) {
      console.error('Login failed:', this.error.message || this.error);
      // Display error message to the user
    } else if (!this.isLoading && this.loginService.data) {
      console.log('Login successful!', this.loginService.data);
      // Navigate to the dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
