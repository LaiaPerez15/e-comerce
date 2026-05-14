import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*), profiles(email)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
