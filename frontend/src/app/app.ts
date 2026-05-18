import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './shared/toast/toast';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  @ViewChild(Toast) toast!: Toast;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit() {
    this.toastService.register(this.toast);
  }
}
