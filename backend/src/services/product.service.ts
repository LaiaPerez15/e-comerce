import { supabase } from '../config/supabase';
import cloudinary from '../config/cloudinary';

export class ProductService {

  static async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(body: any, file?: Express.Multer.File) {

    let image_url = null;

    if (file) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: 'sneakers-store'
      });
      image_url = upload.secure_url;
    }

    const slug = body.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const product = {
      name: body.name,
      brand: body.brand,
      category_id: body.category_id,
      slug,
      description: '',
      price: Number(body.price),
      stock: Number(body.stock),
      image_url,
      sizes: [],
      is_active: true
    };

    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, body: any, file?: Express.Multer.File) {

    let image_url = body.image_url || null;

    if (file) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: 'sneakers-store'
      });
      image_url = upload.secure_url;
    }

    const updateData = {
      name: body.name,
      brand: body.brand,
      category_id: body.category_id,
      price: Number(body.price),
      stock: Number(body.stock),
      image_url
    };

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async softDelete(id: string) {
    const { data, error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
