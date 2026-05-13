import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    CreateProductComponent,
    EditProductComponent
  ],
  templateUrl: './products.html',
})
export class Products implements OnInit {

  products: any[] = [];
  categories: any[] = [];
  loading = true;

  // Estados de slideovers
  isCreateOpen = false;
  isEditOpen = false;

  selectedProduct: any = null;

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadCategories();
    await this.loadProducts();
  }

  // Cargar productos
  async loadProducts() {
    this.loading = true;
    try {
      this.products = await this.productsService.getAll();
    } catch (err: any) {
      alert('Error cargando productos: ' + err.message);
    }
    this.loading = false;
  }

  // Cargar categorías desde backend
  async loadCategories() {
    try {
      this.categories = await this.http
        .get<any[]>('http://localhost:3000/categories')
        .toPromise() ?? [];
    } catch (err: any) {
      this.categories = [];
      alert('Error cargando categorías: ' + err.message);
    }
  }

  // Abrir slideover de crear
  openCreate() {
    this.isCreateOpen = true;
  }

  // Abrir slideover de editar
  openEdit(product: any) {
    this.selectedProduct = product;
    this.isEditOpen = true;
  }

  // Eliminar producto
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
