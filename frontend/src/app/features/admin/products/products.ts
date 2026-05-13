import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { HttpClient } from '@angular/common/http';
import { CreateProductComponent } from './create-product/create-product';
import { EditProductComponent } from './edit-product/edit-product';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    CreateProductComponent,
    EditProductComponent
  ],
  templateUrl: './products.html',
})
export class Products implements OnInit {

  products = signal<any[]>([]);
  categories = signal<any[]>([]);
  loading = signal(true);

  isCreateOpen = signal(false);
  isEditOpen = signal(false);

  selectedProduct = signal<any | null>(null);

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadCategories();
    await this.loadProducts();
  }

  async loadProducts() {
    this.loading.set(true);

    try {
      const data = await this.productsService.getAll();
      this.products.set(data);
    } catch (err: any) {
      alert('Error cargando productos: ' + err.message);
    }

    this.loading.set(false);
  }

  async loadCategories() {
    try {
      const cats = await this.http
        .get<any[]>('http://localhost:3000/categories')
        .toPromise() ?? [];

      this.categories.set(cats);
    } catch (err: any) {
      this.categories.set([]);
      alert('Error cargando categorías: ' + err.message);
    }
  }

  openCreate() {
    this.isCreateOpen.set(true);
  }

  openEdit(product: any) {
    this.selectedProduct.set(product);
    this.isEditOpen.set(true);
  }

  async deleteProduct(p: any) {
    if (!confirm(`¿Eliminar ${p.name}?`)) return;

    try {
      await this.productsService.softDelete(p.id);
      await this.loadProducts();
    } catch (err: any) {
      alert('Error eliminando: ' + err.message);
    }
  }
}
