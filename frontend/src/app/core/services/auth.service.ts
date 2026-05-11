import { Injectable, signal } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<any>(null);

  constructor() {
    this.restoreSession();
  }

  async restoreSession() {
    const { data } = await supabase.auth.getUser();
    this.user.set(data.user);
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.user.set(data.user);
    return data.user;
  }

  async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  }

  async logout() {
    await supabase.auth.signOut();
    this.user.set(null);
  }
}
