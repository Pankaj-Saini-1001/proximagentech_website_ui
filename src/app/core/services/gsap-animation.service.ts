import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Centralized GSAP animation service.
 * Provides reusable, scroll-triggered animation utilities for all page components.
 */
@Injectable({ providedIn: 'root' })
export class GsapAnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  public readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /** Fade + slide up reveal on scroll enter */
  revealOnScroll(
    target: string | HTMLElement | NodeListOf<Element> | Element[],
    options: {
      y?: number;
      duration?: number;
      stagger?: number;
      delay?: number;
      start?: string;
      ease?: string;
      triggerEl?: Element;
    } = {}
  ): void {
    if (!this.isBrowser) return;
    const triggerEl = options.triggerEl ?? (typeof target === 'string' ? document.querySelector(target) : Array.isArray(target) ? (target as Element[])[0] : target as Element);

    gsap.from(target as gsap.TweenTarget, {
      y: options.y ?? 48,
      opacity: 0,
      duration: options.duration ?? 0.85,
      stagger: options.stagger ?? 0,
      delay: options.delay ?? 0,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: triggerEl as Element,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Scale + fade reveal for cards */
  revealScale(
    targets: Element[],
    options: { stagger?: number; start?: string; duration?: number; triggerEl?: Element } = {}
  ): void {
    if (!this.isBrowser || !targets.length) return;
    const triggerEl = options.triggerEl ?? targets[0];

    gsap.from(targets, {
      scale: 0.92,
      opacity: 0,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Animate a numeric counter from 0 to its target value on scroll */
  animateCounter(el: HTMLElement, target: number, suffix: string = '', duration = 1.8): void {
    if (!this.isBrowser) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }

  /** Horizontal slide-in from right */
  slideFromRight(
    targets: Element[],
    options: { stagger?: number; start?: string; x?: number; triggerEl?: Element } = {}
  ): void {
    if (!this.isBrowser || !targets.length) return;
    const triggerEl = options.triggerEl ?? targets[0];

    gsap.from(targets, {
      x: options.x ?? 80,
      opacity: 0,
      duration: 0.9,
      stagger: options.stagger ?? 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Horizontal slide-in from left */
  slideFromLeft(
    target: Element,
    options: { start?: string; x?: number } = {}
  ): void {
    if (!this.isBrowser) return;

    gsap.from(target, {
      x: -(options.x ?? 80),
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Staggered children reveal */
  staggerReveal(
    parent: Element,
    childSelector: string,
    options: { y?: number; stagger?: number; start?: string } = {}
  ): void {
    if (!this.isBrowser) return;
    const children = Array.from(parent.querySelectorAll(childSelector));
    if (!children.length) return;

    gsap.from(children, {
      y: options.y ?? 40,
      opacity: 0,
      duration: 0.75,
      stagger: options.stagger ?? 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Create a GSAP context scoped to a container element */
  createContext(fn: () => void, scope: Element | string): gsap.Context {
    return gsap.context(fn, scope);
  }

  /** Cleanup a GSAP context */
  killContext(ctx: gsap.Context | null): void {
    ctx?.revert();
  }
}
