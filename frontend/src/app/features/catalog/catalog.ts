import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { supabase } from '../../core/supabase.client';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalog.html',
})
export class CatalogComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];

  loading = true;

  searchQuery: string = '';
  selectedCategory: string | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.loadCategories();
    await this.loadProducts();
  }

  // ───────────────────────────────────────────────
  // Cargar categorías desde tu backend
  // ───────────────────────────────────────────────
  async loadCategories() {
    try {
      this.categories = await this.http
        .get<any[]>('http://localhost:3000/categories')
        .toPromise() ?? [];
    } catch (err) {
      console.error('Error cargando categorías', err);
      this.categories = [];
    }
  }

  // ───────────────────────────────────────────────
  // Cargar productos desde Supabase
  // ───────────────────────────────────────────────
  async loadProducts() {
    this.loading = true;

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando productos:', error);
      this.products = [];
    } else {
      this.products = data || [];
    }

    this.applyFilters();
    this.loading = false;
  }

  // ───────────────────────────────────────────────
  // Aplicar filtros (búsqueda + categoría)
  // ───────────────────────────────────────────────
  applyFilters() {
    let result = [...this.products];

    // Filtro por búsqueda
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Filtro por categoría
    if (this.selectedCategory) {
      result = result.filter(p => p.category_id === this.selectedCategory);
    }

    this.filteredProducts = result;
  }

  // ───────────────────────────────────────────────
  // Seleccionar categoría
  // ───────────────────────────────────────────────
  selectCategory(catId: string | null) {
    this.selectedCategory = catId;
    this.applyFilters();
  }

  // ───────────────────────────────────────────────
  // Limpiar filtros
  // ───────────────────────────────────────────────
  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = null;
    this.applyFilters();
  }
}
