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

  async getMyOrders() {
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;

    if (!userId) return [];

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Array.isArray(data) ? data : [];
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*), profiles(email)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
