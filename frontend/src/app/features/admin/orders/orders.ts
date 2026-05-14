import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
})
export class Orders implements OnInit {

  orders = signal<any[]>([]);
  loading = signal(true);

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    this.loading.set(true);
    const data = await this.ordersService.getAll();
    this.orders.set(data);
    this.loading.set(false);
  }

  viewOrder(order: any) {
    console.log('Ver detalles', order);
  }

  changeStatus(order: any) {
    console.log('Cambiar estado', order);
  }
}
