import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {

  product = signal<any>(null);
  loading = signal(true);
  selectedSize = signal<string | null>(null);
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const data = await this.productService.getById(slug);

    this.product.set(data);
    this.loading.set(false);
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  increase() {
    this.quantity.update(q => q + 1);
  }

  decrease() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart() {
    console.log('Añadir al carrito:', {
      product: this.product(),
      size: this.selectedSize(),
      quantity: this.quantity()
    });
  }
}
