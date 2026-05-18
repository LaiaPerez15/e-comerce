import { Injectable, signal } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    if (error) throw error;

    const refreshed = await supabase.auth.getUser();
    this.user.set(refreshed.data.user);

    return refreshed.data.user;
  }

  isLogged() {
    return !!this.user();
  }

  isAdmin() {
    return this.user()?.app_metadata?.role === 'admin';
  }

  isUser() {
    return this.user()?.app_metadata?.role === 'user';
  }

  async register(email: string, password: string, fullName?: string) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
      options: {
        data: {
          full_name: fullName ?? '',
          role: 'user'
        }
      }
    });

    if (error) throw error;

    return data.user;
  }

  async logout() {
    await supabase.auth.signOut();
    this.user.set(null);
  }
}
