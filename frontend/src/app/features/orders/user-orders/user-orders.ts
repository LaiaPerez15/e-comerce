import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-orders.html',
})
export class UserOrders implements OnInit {

  orders = signal<any[]>([]);
  loading = signal(true);

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    const data = await this.ordersService.getMyOrders();
    this.orders.set(Array.isArray(data) ? data : []);
    this.loading.set(false);
  }
}
