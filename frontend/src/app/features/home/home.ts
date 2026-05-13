import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { supabase } from '../../core/supabase.client';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {

  featuredProducts = signal<any[]>([]);
  loadingFeatured = signal(true);

  constructor(
    public auth: AuthService
  ) {}

  async ngOnInit() {
    await this.loadFeaturedProducts();
  }

  async loadFeaturedProducts() {
    this.loadingFeatured.set(true);

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error cargando productos destacados:', error);
      this.featuredProducts.set([]);
    } else {
      this.featuredProducts.set(data || []);
    }

    this.loadingFeatured.set(false);
  }
}
