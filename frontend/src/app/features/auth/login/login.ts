import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {

  form!: FormGroup;
  errorGeneral = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.errorGeneral = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    try {
      await this.auth.login(email!, password!);
      this.router.navigate(['/']);
    } catch (err: any) {
      const msg = err.message || err.error_description || '';

      if (msg.includes('Invalid login credentials')) {
        this.form.controls['email'].setErrors({ invalidCredentials: true });
        return;
      }

      this.errorGeneral = 'Ha ocurrido un error inesperado';
    }
  }
}
