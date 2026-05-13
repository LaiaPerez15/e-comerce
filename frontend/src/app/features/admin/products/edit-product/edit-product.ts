import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
})
export class EditProductComponent {

  @Input() open = false;
  @Input() product: any = null;
  @Input() categories: any[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  name = '';
  brand = '';
  category = '';
  price: number | null = null;
  stock: number | null = null;

  imageFile: File | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnChanges() {
    if (this.product) {
      this.name = this.product.name;
      this.brand = this.product.brand;
      this.category = this.product.category_id;
      this.price = this.product.price;
      this.stock = this.product.stock;
    }
  }

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

    await this.productsService.updateProduct(this.product.id, form);

    this.updated.emit();
    this.close();
  }
}
