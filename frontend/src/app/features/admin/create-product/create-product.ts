import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../../core/services/upload.service';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.html',
})

export class CreateProductComponent {
  form: any;
  imageFile?: File;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private productsService: ProductsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      brand: ['', Validators.required],
      category_id: ['', Validators.required],
      sizes: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  async submit() {
    if (!this.form.valid || !this.imageFile) return;

    const imageUrl = await this.uploadService.uploadImage(this.imageFile);

    const payload = {
      ...this.form.value,
      sizes: this.form.value.sizes?.split(',').map((s: string) => s.trim()),
      image_url: imageUrl
    };

    await this.productsService.createProduct(payload);

    alert('Producto creado correctamente');
  }
}
