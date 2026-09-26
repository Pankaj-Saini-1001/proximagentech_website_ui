import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Initialize Lenis smooth scrolling service on root startup
  protected readonly scrollService = inject(ScrollService);
}
