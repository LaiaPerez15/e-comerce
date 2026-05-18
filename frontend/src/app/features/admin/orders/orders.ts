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

  // Lista completa de pedidos
  orders = signal<any[]>([]);

  // Estado de carga
  loading = signal(true);

  // Filtro actual
  filter = signal<string>('all');

  // Pedido seleccionado para el modal
  selectedOrder = signal<any | null>(null);

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    await this.loadOrders();
  }

  // Cargar todos los pedidos desde Supabase
  async loadOrders() {
    this.loading.set(true);
    const data = await this.ordersService.getAll();
    const user = (await supabase.auth.getUser()).data.user;
    console.log("ADMIN JWT:", user);

    console.log("ORDERS LOADED:", data);
    // this.orders.set(data || []);
    this.loading.set(false);
  }

  // Cambiar filtro
  setFilter(status: string) {
    this.filter.set(status);
  }

  // Lista filtrada según el estado
  filteredOrders = computed(() => {
    if (this.filter() === 'all') return this.orders();
    return this.orders().filter(o => o.status === this.filter());
  });

  // Abrir modal de detalles
  viewOrder(order: any) {
    this.selectedOrder.set(order);
  }

  // Cambiar estado del pedido
  async changeStatus(order: any, newStatus: string) {
    await this.ordersService.updateStatus(order.id, newStatus);
    await this.loadOrders();
  }
}
