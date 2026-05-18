import { supabase } from '../config/supabase';

export class AuthService {
  static async assignDefaultRole(userId: string) {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { role: 'user' }
    });

    if (error) throw error;
    return data;
  }
}
