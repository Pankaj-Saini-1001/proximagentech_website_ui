import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly siteConfig = SITE_CONFIG;
  protected readonly scrollService = inject(ScrollService);
  protected readonly router = inject(Router);

  public readonly navItems = [
    { label: 'Home', route: '/', hash: '#hero', isRoute: true },
    { label: 'Services', route: '/services', hash: '', isRoute: true },
    { label: 'Solutions', route: '/', hash: '#solutions', isRoute: false },
    { label: 'About', route: '/about-us', hash: '', isRoute: true },
  ];

  public readonly isMobileMenuOpen = signal<boolean>(false);

  // Scrolled state: activates 3 floating capsules when window.scrollY > 40
  public readonly isScrolled = computed(() => {
    return this.scrollService.scrollY() > 40;
  });

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  public handleNavClick(
    item: { label: string; route: string; hash: string; isRoute: boolean },
    event: Event
  ): void {
    this.closeMobileMenu();

    if (item.label === 'Home') {
      if (this.router.url === '/' || this.router.url.startsWith('/#')) {
        event.preventDefault();
        this.scrollService.scrollTo('#hero', { offset: -90 });
      }
      return;
    }

    if (item.label === 'Solutions') {
      if (this.router.url === '/' || this.router.url.startsWith('/#')) {
        event.preventDefault();
        this.scrollService.scrollTo('#solutions', { offset: -90 });
      } else {
        this.router.navigate(['/'], { fragment: 'solutions' });
      }
      return;
    }

    // For Services & About: route to page and ensure top scroll
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  public handleLogoClick(event: Event): void {
    this.closeMobileMenu();
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      event.preventDefault();
      this.scrollService.scrollTo('#hero', { offset: -90 });
    }
  }

  public handleGetInTouch(event: Event): void {
    this.closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
