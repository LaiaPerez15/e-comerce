import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  totalItems = 0;

  constructor(
    public auth: AuthService,
    private cart: CartService,
    private router: Router
  ) {
    this.cart.items$.subscribe(items => {
      this.totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
