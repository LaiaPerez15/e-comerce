import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    this.error = '';

    if (this.password !== this.passwordConfirm) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.auth.register(this.email, this.password, this.name);
      this.router.navigateByUrl('/login');
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
