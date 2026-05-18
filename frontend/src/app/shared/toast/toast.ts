import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
})
export class Toast {
  
  message = signal<string | null>(null);

  show(msg: string) {
    this.message.set(msg);

    setTimeout(() => {
      this.message.set(null);
    }, 2500);
  }
}
