import { Injectable, inject } from '@angular/core';
import { Toast } from '../../shared/toast/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toast!: Toast;

  register(toast: Toast) {
    this.toast = toast;
  }

  show(message: string) {
    this.toast?.show(message);
  }
}
