import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
})
export class CreateProductComponent implements OnChanges {

  @Input() open = false;
  @Input() categories: any[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  form!: FormGroup;
  imageFile: File | null = null;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category_id: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      this.form.reset();
      this.imageFile = null;
    }
  }

  close() {
    this.closed.emit();
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('brand', this.form.value.brand);
    formData.append('category_id', this.form.value.category_id);
    formData.append('price', this.form.value.price);
    formData.append('stock', this.form.value.stock);

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    await this.productsService.createProduct(formData);

    this.created.emit();
    this.close();
  }
}
