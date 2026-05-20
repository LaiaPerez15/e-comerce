import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  constructor(public auth: AuthService) {}
}
