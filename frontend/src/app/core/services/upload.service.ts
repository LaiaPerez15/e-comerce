import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const res = await firstValueFrom(
      this.http.post<{ url: string }>(`${this.api}/upload`, formData, {
        headers: { 'x-user-role': 'admin' }
      })
    );

    return res.url;
  }
}
