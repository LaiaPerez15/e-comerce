import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.html',
})

export class OrderDetail implements OnInit {

  order = signal<any>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const data = await this.ordersService.getById(id);
    this.order.set(data);
    this.loading.set(false);
  }
}
