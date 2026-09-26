import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../modules/navbar/navbar';
import { Footer } from '../../modules/footer/footer';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ScrollToTopComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {}
