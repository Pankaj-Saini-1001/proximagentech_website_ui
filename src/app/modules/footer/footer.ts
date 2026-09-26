import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../core/config/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private resizeObserver: ResizeObserver | null = null;

  protected readonly siteConfig = SITE_CONFIG;
  protected readonly currentYear = new Date().getFullYear();

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.updateFooterHeight();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateFooterHeight();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  private updateFooterHeight(): void {
    const el = this.elementRef.nativeElement.querySelector('.site-footer') as HTMLElement;
    const height = el ? el.offsetHeight : this.elementRef.nativeElement.offsetHeight;
    if (height > 0) {
      document.documentElement.style.setProperty('--footer-height', `${height}px`);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }
}
