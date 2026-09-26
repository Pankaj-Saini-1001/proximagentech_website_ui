import { Component, ElementRef, inject, input, output, PLATFORM_ID, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

export type MagneticVariant = 'primary' | 'secondary' | 'dark' | 'outline';

@Component({
  selector: 'app-magnetic-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './magnetic-button.html',
  styleUrl: './magnetic-button.css',
})
export class MagneticButtonComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly variant = input<MagneticVariant>('primary');
  public readonly strength = input<number>(0.35);
  public readonly routerLink = input<string | null>(null);
  public readonly href = input<string | null>(null);
  public readonly target = input<string>('_self');
  public readonly size = input<'sm' | 'md' | 'lg'>('md');

  public readonly clicked = output<MouseEvent>();

  public readonly buttonRef = viewChild<ElementRef<HTMLElement>>('magneticWrap');

  public onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    const btn = this.buttonRef()?.nativeElement;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * this.strength();
    const deltaY = (event.clientY - centerY) * this.strength();

    gsap.to(btn, {
      x: deltaX,
      y: deltaY,
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  public onMouseLeave(): void {
    if (!this.isBrowser) return;
    const btn = this.buttonRef()?.nativeElement;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
    });
  }

  public onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
