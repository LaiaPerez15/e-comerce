import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
})
export class Cart {

  items: CartItem[] = [];
  subtotal = 0;

  constructor(private cart: CartService) {
    this.cart.items$.subscribe(items => {
      this.items = items;
      this.subtotal = this.cart.getSubtotal();
    });
  }

  increase(item: CartItem) {
    this.cart.updateQuantity(item.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      this.cart.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(id: string) {
    this.cart.removeItem(id);
  }

  clearCart() {
    this.cart.clear();
  }
}
