import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
})
export class Checkout {

  form!: FormGroup;
  items: CartItem[] = [];
  subtotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private orders: OrdersService,
    private router: Router
  ) {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      notes: ['']
    });

    this.items = this.cart.getItems();
    this.subtotal = this.cart.getSubtotal();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && control.touched;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const shipping_address = `
          ${this.form.value.full_name}
          ${this.form.value.address}
          ${this.form.value.city} - ${this.form.value.postal_code}
          `.trim();

    const orderId = await this.orders.createOrder({
      total_amount: this.subtotal,
      shipping_address,
      notes: this.form.value.notes || ''
    });

    await this.orders.createOrderItems(orderId, this.items);
    // await this.orders.decreaseStock(this.items);

    this.cart.clear();
    this.router.navigate(['/orders']);
  }
}
