import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener productos desde Supabase (catálogo público)
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Crear producto (usa backend)
  async createProduct(formData: FormData) {
    return await firstValueFrom(
      this.http.post(`${this.api}/products`, formData, {
        headers: { 'x-user-role': 'admin' }
      })
    );
  }

  // Actualizar producto (usa backend)
  async updateProduct(productId: string, formData: FormData) {
    return await firstValueFrom(
      this.http.put(`${this.api}/products/${productId}`, formData, {
        headers: { 'x-user-role': 'admin' }
      })
    );
  }

  // Soft delete (usa backend)
  async softDelete(productId: string) {
    return await firstValueFrom(
      this.http.delete(`${this.api}/products/${productId}`, {
        headers: { 'x-user-role': 'admin' }
      })
    );
  }
}
