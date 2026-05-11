import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async createProduct(data: any) {
    return await firstValueFrom(
      this.http.post(`${this.api}/products`, data, {
        headers: { 'x-user-role': 'admin' }
      })
    );
  }
}
