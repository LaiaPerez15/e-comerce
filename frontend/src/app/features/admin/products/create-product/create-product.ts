import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.html',
})
export class CreateProductComponent {

  @Input() open = false;
  @Input() categories: any[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  name = '';
  brand = '';
  category = '';
  price: number | null = null;
  stock: number | null = null;
  imageFile: File | null = null;

  constructor(private productsService: ProductsService) {}

  close() {
    this.open = false;
    this.closed.emit();
  }

  onFileSelected(e: any) {
    this.imageFile = e.target.files[0];
  }

  async save(e: Event) {
    e.preventDefault();

    const form = new FormData();
    form.append('name', this.name);
    form.append('brand', this.brand);
    form.append('category_id', this.category);
    form.append('price', String(this.price));
    form.append('stock', String(this.stock));

    if (this.imageFile) {
      form.append('image', this.imageFile);
    }

    await this.productsService.createProduct(form);

    this.created.emit();
    this.close();
  }
}
