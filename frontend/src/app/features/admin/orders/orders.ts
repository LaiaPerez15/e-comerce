import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';
import { supabase } from '../../../core/supabase.client';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
})
export class Orders implements OnInit {

  orders = signal<any[]>([]);

  loading = signal(true);

  filter = signal<string>('all');

  selectedOrder = signal<any | null>(null);

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    this.loading.set(true);

    const data = await this.ordersService.getAll();
    const user = (await supabase.auth.getUser()).data.user;

    console.log("ADMIN JWT:", user);
    console.log("ORDERS LOADED:", data);

    this.orders.set(data || []);

    this.loading.set(false);
  }

  setFilter(status: string) {
    this.filter.set(status);
  }

  filteredOrders = computed(() => {
    if (this.filter() === 'all') return this.orders();
    return this.orders().filter(o => o.status === this.filter());
  });

  viewOrder(order: any) {
    this.selectedOrder.set(order);
  }

  async changeStatus(order: any, newStatus: string) {
    await this.ordersService.updateStatus(order.id, newStatus);
    await this.loadOrders();
  }
}
