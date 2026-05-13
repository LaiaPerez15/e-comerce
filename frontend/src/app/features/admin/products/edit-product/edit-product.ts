import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../core/services/products.service';
import { FileUrlPipe } from '../../../../shared/pipes/file-url.pipe';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileUrlPipe],
  templateUrl: './edit-product.html',
})
export class EditProductComponent implements OnChanges {

  @Input() open = false;
  @Input() product: any = null;
  @Input() categories: any[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  form!: FormGroup;
  imageFile: File | null = null;
  imageName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category_id: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.form.patchValue({
        name: this.product.name,
        brand: this.product.brand,
        category_id: this.product.category_id,
        price: this.product.price,
        stock: this.product.stock,
      });

      this.imageFile = null;
      this.imageName = null;
    }
  }

  close() {
    this.closed.emit();
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    this.imageName = this.imageFile?.name ?? null;
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

    await this.productsService.updateProduct(this.product.id, formData);

    this.updated.emit();
    this.close();
  }
}
