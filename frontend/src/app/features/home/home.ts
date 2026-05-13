import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { supabase } from '../../core/supabase.client';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {

  featuredProducts: any[] = [];
  loadingFeatured = true;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    await this.loadFeaturedProducts();
  }

  async loadFeaturedProducts() {
    this.loadingFeatured = true;

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error cargando productos destacados:', error);
      this.featuredProducts = [];
    } else {
      this.featuredProducts = data || [];
    }

    this.loadingFeatured = false;
  }
}
