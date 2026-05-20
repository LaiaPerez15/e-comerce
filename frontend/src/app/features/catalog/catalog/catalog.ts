import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { supabase } from '../../../core/supabase.client';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalog.html',
})
export class CatalogComponent implements OnInit {

  products = signal<any[]>([]);
  categories = signal<any[]>([]);
  loading = signal(true);

  searchQuery = signal('');
  selectedCategory = signal<any>(null);

  filteredProducts = computed(() => {
    let result = [...this.products()];

    const q = this.searchQuery().toLowerCase();

    if (q.trim() !== '') {
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory()) {
      result = result.filter(p => p.category_id === this.selectedCategory());
    }

    return result;
  });

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.loadCategories();

    this.route.queryParamMap.subscribe(params => {
      const categoryParam = params.get('category');
      if (!categoryParam) {
        this.selectedCategory.set(null);
        return;
      }

      const category = this.categories().find(cat => {
        const slug = (cat.slug ?? cat.name ?? '').toString().toLowerCase().replace(/\s+/g, '-');
        return slug === categoryParam.toLowerCase() || cat.id === categoryParam;
      });

      this.selectedCategory.set(category ? category.id : null);
    });

    await this.loadProducts();
  }

  async loadCategories() {
    try {
      const cats = await this.http
        .get<any[]>('http://localhost:3000/categories')
        .toPromise() ?? [];

      this.categories.set(cats);
    } catch (err) {
      console.error('Error cargando categorías', err);
      this.categories.set([]);
    }
  }

  async loadProducts() {
    this.loading.set(true);

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando productos:', error);
      this.products.set([]);
    } else {
      this.products.set(data || []);
    }

    this.loading.set(false);
  }

  selectCategory(catId: string | null) {
    this.selectedCategory.set(catId);
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set(null);
  }
}
