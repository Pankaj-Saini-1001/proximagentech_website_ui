import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [],
  templateUrl: './hero-video.component.html',
  styleUrl: './hero-video.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVideoComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly scrollService = inject(ScrollService);

  // Template element references
  protected readonly heroSection = viewChild<ElementRef<HTMLElement>>('heroSection');
  protected readonly heroSticky = viewChild<ElementRef<HTMLElement>>('heroSticky');
  protected readonly mediaWrapper = viewChild<ElementRef<HTMLElement>>('mediaWrapper');
  protected readonly videoPlayer = viewChild<ElementRef<HTMLVideoElement>>('videoPlayer');
  protected readonly heroContent = viewChild<ElementRef<HTMLElement>>('heroContent');
  protected readonly progressNav = viewChild<ElementRef<HTMLElement>>('progressNav');
  protected readonly scrollIndicator = viewChild<ElementRef<HTMLElement>>('scrollIndicator');
  protected readonly nextSection = viewChild<ElementRef<HTMLElement>>('nextSection');

  // Phase 1 Elements
  protected readonly phase1 = viewChild<ElementRef<HTMLElement>>('phase1');
  protected readonly badge1 = viewChild<ElementRef<HTMLElement>>('badge1');
  protected readonly headline1 = viewChild<ElementRef<HTMLElement>>('headline1');
  protected readonly progressBar1 = viewChild<ElementRef<HTMLElement>>('progressBar1');

  // Phase 2 Elements
  protected readonly phase2 = viewChild<ElementRef<HTMLElement>>('phase2');
  protected readonly badge2 = viewChild<ElementRef<HTMLElement>>('badge2');
  protected readonly headline2 = viewChild<ElementRef<HTMLElement>>('headline2');
  protected readonly progressBar2 = viewChild<ElementRef<HTMLElement>>('progressBar2');

  // Phase 3 Elements
  protected readonly phase3 = viewChild<ElementRef<HTMLElement>>('phase3');
  protected readonly badge3 = viewChild<ElementRef<HTMLElement>>('badge3');
  protected readonly headline3 = viewChild<ElementRef<HTMLElement>>('headline3');
  protected readonly subtitle3 = viewChild<ElementRef<HTMLElement>>('subtitle3');
  protected readonly ctaWrapper3 = viewChild<ElementRef<HTMLElement>>('ctaWrapper3');
  protected readonly progressBar3 = viewChild<ElementRef<HTMLElement>>('progressBar3');

  // GSAP animation instances for memory cleanup
  private ctx: gsap.Context | null = null;
  private loopTl: gsap.core.Timeline | null = null;
  private ambientTl: gsap.core.Timeline | null = null;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Ensure hero video playback starts smoothly
    const videoEl = this.videoPlayer()?.nativeElement;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.play().catch(() => {
        // Browser autoplay restriction or low-power mode handling
      });
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Respect user's prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const p1El = this.phase1()?.nativeElement;
      if (p1El) {
        gsap.set(p1El, { autoAlpha: 1, pointerEvents: 'auto' });
      }
      return;
    }

    // Wrap GSAP operations in scoped context for clean lifecycle management
    const heroSectionEl = this.heroSection()?.nativeElement;
    if (heroSectionEl) {
      this.ctx = gsap.context(() => {
        this.initHeroLoopAnimation();
        this.initScrollAnimation();
      }, heroSectionEl);
    }
  }

  /**
   * Master looping sequence across all 3 phases + ambient background zoom
   */
  private initHeroLoopAnimation(): void {
    const p1El = this.phase1()?.nativeElement;
    const b1El = this.badge1()?.nativeElement;
    const h1El = this.headline1()?.nativeElement;
    const bar1El = this.progressBar1()?.nativeElement;

    const p2El = this.phase2()?.nativeElement;
    const b2El = this.badge2()?.nativeElement;
    const h2El = this.headline2()?.nativeElement;
    const bar2El = this.progressBar2()?.nativeElement;

    const p3El = this.phase3()?.nativeElement;
    const b3El = this.badge3()?.nativeElement;
    const h3El = this.headline3()?.nativeElement;
    const sub3El = this.subtitle3()?.nativeElement;
    const cta3El = this.ctaWrapper3()?.nativeElement;
    const bar3El = this.progressBar3()?.nativeElement;

    const videoEl = this.videoPlayer()?.nativeElement;

    if (!p1El || !p2El || !p3El || !h1El || !h2El || !h3El || !bar1El || !bar2El || !bar3El) {
      return;
    }

    // 1. Ambient Background: Continuous subtle slow zoom (scale: 1.05 to 1.12 over 16s, yoyo: true)
    if (videoEl) {
      this.ambientTl = gsap.timeline({ repeat: -1, yoyo: true });
      this.ambientTl.fromTo(
        videoEl,
        { scale: 1.05 },
        {
          scale: 1.12,
          duration: 16,
          ease: 'sine.inOut',
        }
      );
    }

    // Master looping sequence timeline
    const masterTl = gsap.timeline({ repeat: -1 });
    this.loopTl = masterTl;

    // Initial resets
    gsap.set([p1El, p2El, p3El], { autoAlpha: 0, pointerEvents: 'none' });
    gsap.set([bar1El, bar2El, bar3El], { scaleX: 0 });

    // =========================================================================
    // Phase 1 (Zoom-Out Reveal):
    // - Headline scales down from 1.5 to 1.0 with blur(10px) -> blur(0px) and opacity 0 -> 1
    // - Holds for ~2.5s, then exits with scale: 0.94, blur(6px), opacity 0
    // =========================================================================
    masterTl.addLabel('phase0');
    masterTl.set(p1El, { autoAlpha: 1, pointerEvents: 'auto' });
    masterTl.set(p2El, { autoAlpha: 0, pointerEvents: 'none' });
    masterTl.set(p3El, { autoAlpha: 0, pointerEvents: 'none' });
    masterTl.set([bar1El, bar2El, bar3El], { scaleX: 0 });

    // Progress bar 1 fills across Phase 1 (4.3s total)
    masterTl.to(bar1El, { scaleX: 1, duration: 4.3, ease: 'none' }, 'phase0');

    // Badge 1 entrance
    if (b1El) {
      masterTl.fromTo(
        b1El,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        'phase0'
      );
    }

    // Headline 1 zoom-out reveal
    masterTl.fromTo(
      h1El,
      { scale: 1.5, filter: 'blur(10px)', opacity: 0 },
      { scale: 1.0, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: 'power3.out' },
      'phase0'
    );

    // Hold for 2.5s -> exit with scale: 0.94, blur(6px), opacity 0
    masterTl.to(
      h1El,
      { scale: 0.94, filter: 'blur(6px)', opacity: 0, duration: 0.6, ease: 'power2.in' },
      'phase0+=3.7'
    );
    if (b1El) {
      masterTl.to(
        b1El,
        { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' },
        'phase0+=3.9'
      );
    }
    masterTl.set(p1El, { autoAlpha: 0, pointerEvents: 'none' }, 'phase0+=4.3');

    // =========================================================================
    // Phase 2 (Masked Kinetic Word Slide):
    // - Wrap each word in overflow-hidden mask
    // - Stagger words upward (y: 110% -> 0%) with ease: power2.out and stagger: 0.08
    // - Exits smoothly by sliding upward and fading (y: -35px, opacity: 0)
    // =========================================================================
    masterTl.addLabel('phase1');
    masterTl.set(p2El, { autoAlpha: 1, pointerEvents: 'auto' });
    masterTl.set(bar1El, { scaleX: 1 });
    masterTl.set(bar2El, { scaleX: 0 });
    masterTl.set(bar3El, { scaleX: 0 });

    // Progress bar 2 fills across Phase 2 (4.4s)
    masterTl.to(bar2El, { scaleX: 1, duration: 4.4, ease: 'none' }, 'phase1');

    // Badge 2 entrance
    if (b2El) {
      masterTl.fromTo(
        b2El,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        'phase1'
      );
    }

    // Masked words stagger upward
    const words = h2El.querySelectorAll('.word');
    masterTl.fromTo(
      words,
      { y: '110%', opacity: 1 },
      { y: '0%', duration: 0.8, ease: 'power2.out', stagger: 0.08 },
      'phase1+=0.15'
    );

    // Hold ~2.6s -> exits upward (y: -35px, opacity: 0)
    masterTl.to(
      h2El,
      { y: -35, opacity: 0, duration: 0.6, ease: 'power2.in' },
      'phase1+=3.8'
    );
    if (b2El) {
      masterTl.to(
        b2El,
        { y: -16, opacity: 0, duration: 0.4, ease: 'power2.in' },
        'phase1+=3.9'
      );
    }
    masterTl.set(p2El, { autoAlpha: 0, pointerEvents: 'none' }, 'phase1+=4.4');

    // =========================================================================
    // Phase 3 (Focus Expansion & CTA Reveal):
    // - Headline fades and expands with relaxed letter-spacing
    // - Subtitle and CTA button cascade in smoothly with slight vertical offsets
    // - Holds for ~3.5 seconds before smoothly dissolving back to Phase 1
    // =========================================================================
    masterTl.addLabel('phase2');
    masterTl.set(p3El, { autoAlpha: 1, pointerEvents: 'auto' });
    masterTl.set(bar1El, { scaleX: 1 });
    masterTl.set(bar2El, { scaleX: 1 });
    masterTl.set(bar3El, { scaleX: 0 });

    // Progress bar 3 fills across Phase 3 (5.2s)
    masterTl.to(bar3El, { scaleX: 1, duration: 5.2, ease: 'none' }, 'phase2');

    // Badge 3 entrance
    if (b3El) {
      masterTl.fromTo(
        b3El,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        'phase2'
      );
    }

    // Headline 3: Focus Expansion & relaxed letter-spacing
    masterTl.fromTo(
      h3El,
      { opacity: 0, scale: 0.94, letterSpacing: '-0.035em' },
      { opacity: 1, scale: 1.0, letterSpacing: '-0.01em', duration: 1.0, ease: 'power2.out' },
      'phase2'
    );

    // Subtitle cascades in
    if (sub3El) {
      masterTl.fromTo(
        sub3El,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        'phase2+=0.25'
      );
    }

    // CTA button cascades in
    if (cta3El) {
      masterTl.fromTo(
        cta3El,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        'phase2+=0.4'
      );
    }

    // Hold ~3.5s -> dissolves back smoothly to Phase 1
    masterTl.to(
      p3El,
      { opacity: 0, y: -20, duration: 0.7, ease: 'power2.inOut' },
      'phase2+=4.5'
    );
    masterTl.to(
      [bar1El, bar2El, bar3El],
      { scaleX: 0, duration: 0.35, ease: 'power2.inOut' },
      'phase2+=4.85'
    );
    masterTl.set(p3El, { autoAlpha: 0, pointerEvents: 'none' }, 'phase2+=5.2');
  }

  /**
   * Scrubbed scroll-driven curtain pinned transition
   */
  private initScrollAnimation(): void {
    const heroSectionEl = this.heroSection()?.nativeElement;
    const heroStickyEl = this.heroSticky()?.nativeElement;
    const mediaWrapperEl = this.mediaWrapper()?.nativeElement;
    const heroContentEl = this.heroContent()?.nativeElement;
    const progressNavEl = this.progressNav()?.nativeElement;
    const scrollIndicatorEl = this.scrollIndicator()?.nativeElement;
    const nextSectionEl = this.nextSection()?.nativeElement;

    if (!heroSectionEl || !heroStickyEl || !mediaWrapperEl || !heroContentEl || !nextSectionEl) {
      return;
    }

    // Set initial state for curtain next section so it starts slightly below the viewport
    gsap.set(nextSectionEl, {
      y: '22vh',
    });

    // Master scrubbed scroll-driven timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionEl,
        start: 'top top',
        end: '+=140%',
        scrub: 0.8,
        pin: heroStickyEl,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Phase 1: Hero content floats upward and fades out
    tl.to(
      heroContentEl,
      {
        y: -100,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.35,
      },
      0
    );

    // Fade out progress nav and scroll indicator alongside content
    if (progressNavEl) {
      tl.to(
        progressNavEl,
        {
          y: -20,
          opacity: 0,
          ease: 'power2.out',
          duration: 0.25,
        },
        0
      );
    }

    if (scrollIndicatorEl) {
      tl.to(
        scrollIndicatorEl,
        {
          y: -30,
          opacity: 0,
          ease: 'power2.out',
          duration: 0.25,
        },
        0
      );
    }

    // Hero media scales gently down and rounds its corners
    tl.to(
      mediaWrapperEl,
      {
        scale: 0.94,
        borderRadius: '24px',
        ease: 'power1.out',
        duration: 1,
      },
      0
    );

    // Next section rises like a curtain and gradually covers the hero
    tl.to(
      nextSectionEl,
      {
        y: 0,
        ease: 'power1.inOut',
        duration: 0.75,
      },
      0.25
    );

    // Refresh ScrollTrigger after a frame to ensure all bounding boxes are synced
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  /**
   * Jump directly to a given phase on timeline progress bar click
   */
  protected goToPhase(index: number): void {
    if (!this.loopTl) return;
    this.loopTl.seek(`phase${index}`);
  }

  /**
   * Smoothly scroll down to the curtain next section
   */
  protected scrollToNext(event?: Event): void {
    event?.preventDefault();
    const nextEl = this.nextSection()?.nativeElement;
    if (nextEl) {
      this.scrollService.scrollTo(nextEl, { duration: 1.2 });
    }
  }

  ngOnDestroy(): void {
    if (this.ambientTl) {
      this.ambientTl.kill();
      this.ambientTl = null;
    }
    if (this.loopTl) {
      this.loopTl.kill();
      this.loopTl = null;
    }
    if (this.ctx) {
      this.ctx.revert();
      this.ctx = null;
    }
  }
}
