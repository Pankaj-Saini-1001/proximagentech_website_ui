import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public trackPageView(url: string): void {
    if (!this.isBrowser) return;
    // Integration point for Google Analytics, Plausible or custom metrics
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-MEASUREMENT_ID', { page_path: url });
    }
  }

  public trackEvent(eventName: string, params: Record<string, any> = {}): void {
    if (!this.isBrowser) return;
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }
  }
}
