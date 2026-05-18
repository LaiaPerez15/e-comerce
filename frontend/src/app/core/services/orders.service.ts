import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { CartItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles(*),
        items:order_items(
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

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMyOrders() {
    const user = (await supabase.auth.getUser()).data.user;

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          id,
          quantity,
          unit_price,
          size,
          product:products(name, image_url)
        )
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    return orders;
  }

  async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles(*),
        items:order_items(
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

  async createOrder(data: { total_amount: number; shipping_address: string; notes: string }) {
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        total_amount: data.total_amount,
        shipping_address: data.shipping_address,
        notes: data.notes
      })
      .select()
      .single();

    if (error) throw error;
    return order.id;
  }

  async createOrderItems(orderId: string, items: CartItem[]) {
    const rows = items.map(i => ({
      order_id: orderId,
      product_id: i.id,
      quantity: i.quantity,
      unit_price: i.price,
      size: i.size
    }));

    const { error } = await supabase.from('order_items').insert(rows);
    if (error) throw error;
  }

  // async decreaseStock(items: CartItem[]) {
  //   for (const item of items) {
  //     const productId = item.id.split('-')[0];

  //     await supabase.rpc('decrease_stock', {
  //       p_id: productId,
  //       p_qty: item.quantity
  //     });
  //   }
  // }
}
