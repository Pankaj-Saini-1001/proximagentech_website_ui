import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  private lastScrollY = 0;
  private readonly scrollThreshold = 8;

  public readonly scrollY = signal(0);
  public readonly scrollProgress = signal(0);
  public readonly isScrolled = signal(false);
  public readonly isNavHidden = signal(false);

  constructor() {
    if (this.isBrowser) {
      this.initLenis();
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          this.scrollTo(0, { immediate: true });
          this.showNav();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        });
    }
  }

  private handleScrollUpdate(currentY: number): void {
    const y = Math.max(0, currentY);
    this.scrollY.set(y);
    this.isScrolled.set(y > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      this.scrollProgress.set(Math.min(1, Math.max(0, y / docHeight)));
    }

    const delta = y - this.lastScrollY;

    if (y <= 40) {
      // Near top of page: always reveal navbar
      this.isNavHidden.set(false);
    } else if (Math.abs(delta) >= 12) {
      if (delta > 0) {
        // Clear downward scroll: hide navbar
        this.isNavHidden.set(true);
      } else {
        // Clear upward scroll: reveal navbar
        this.isNavHidden.set(false);
      }
    }

    this.lastScrollY = y;
  }

  private initLenis(): void {
    try {
      gsap.registerPlugin(ScrollTrigger);

      this.lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      // Synchronize Lenis with GSAP ScrollTrigger and Navbar hide/reveal
      this.lenis.on('scroll', (e: any) => {
        const y = e.scroll || window.scrollY || 0;
        this.handleScrollUpdate(y);
        ScrollTrigger.update();
      });

      // Drive Lenis through GSAP ticker for 100% synchronization
      const tickerCallback = (time: number) => {
        this.lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

    } catch (err) {
      console.warn('Lenis smooth scrolling initialization skipped or fallen back:', err);
      // Fallback window scroll listener
      window.addEventListener(
        'scroll',
        () => {
          this.handleScrollUpdate(window.scrollY);
        },
        { passive: true }
      );
    }
  }

  public refresh(): void {
    if (!this.isBrowser) return;
    this.lenis?.resize();
    ScrollTrigger.refresh();
  }

  public showNav(): void {
    this.isNavHidden.set(false);
  }

  public hideNav(): void {
    this.isNavHidden.set(true);
  }

  public scrollTo(
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ): void {
    if (!this.isBrowser) return;

    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
  }

  public scrollToTop(): void {
    this.scrollTo(0, { duration: 1.2 });
  }

  public stop(): void {
    this.lenis?.stop();
  }

  public start(): void {
    this.lenis?.start();
  }

  public destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.lenis?.destroy();
    this.lenis = null;
  }
}
