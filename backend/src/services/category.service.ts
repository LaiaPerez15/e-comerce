import { supabase } from '../config/supabase';

export class CategoryService {

  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  }

  async create(name: string, slug: string) {
    const { error } = await supabase
      .from('categories')
      .insert({ name, slug });

    if (error) throw error;
  }
}
