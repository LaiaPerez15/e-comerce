import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {

  form!: FormGroup;
  errorGeneral = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.errorGeneral = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password, passwordConfirm } = this.form.value;

    if (password !== passwordConfirm) {
      this.errorGeneral = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.auth.register(email!, password!, name!);
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorGeneral = err.message;
    }
  }
}
