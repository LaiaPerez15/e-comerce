import { supabase } from '../config/supabase';

export class OrderService {

  static async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles(*),
        order_items(
          id,
          quantity,
          unit_price,
          size,
          product:products(name, image_url)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles(*),
        order_items(
          id,
          quantity,
          unit_price,
          size,
          product:products(name, image_url)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
