import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  signal,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { gsap } from "gsap";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  highlightTag: string;
  accentColor: string;
  accentBg: string;
}

@Component({
  selector: "app-testimonial",
  standalone: true,
  imports: [],
  templateUrl: "./testimonial.html",
  styleUrl: "./testimonial.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonial implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected readonly carouselEl = viewChild<ElementRef<HTMLElement>>("carousel");

  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  private isAnimating = false;

  protected readonly activeIndex = signal<number>(0);
  protected readonly totalCount: number;

  protected readonly testimonials: TestimonialItem[] = [
    {
      id: "omni-retail",
      quote: "By deploying ProximaGenTech\u2019s autonomous agentic workflows, our inventory dispatch and supply reconciliation cycles plummeted from four hours to under 45 seconds. Their clean compute optimizations simultaneously trimmed our monthly cloud bill by 38%.",
      author: "Marcus Chen",
      role: "VP of Technology",
      company: "OmniRetail Global",
      initials: "MC",
      rating: 5,
      highlightTag: "Agentic Automation",
      accentColor: "#10B981",
      accentBg: "#ECFDF5",
    },
    {
      id: "apex-capital",
      quote: "We required mission-critical compliance, banking-grade encryption, and zero downtime. ProximaGenTech architected our distributed fintech infrastructure ahead of schedule, passing stringent institutional security audits on the very first review.",
      author: "Sarah Reynolds",
      role: "Chief Product Officer",
      company: "Apex Capital Banking",
      initials: "SR",
      rating: 5,
      highlightTag: "FinTech Security",
      accentColor: "#6D28D9",
      accentBg: "#F5F3FF",
    },
    {
      id: "fleet-logix",
      quote: "Unlike agencies that push bloated off-the-shelf templates, ProximaGenTech offered impartial, battle-tested architectural guidance. Their tailored microservice mesh scaled flawlessly during our highest-volume freight quarter.",
      author: "David Lindqvist",
      role: "Director of Digital Operations",
      company: "FleetLogix Logistics",
      initials: "DL",
      rating: 5,
      highlightTag: "Cloud Scalability",
      accentColor: "#0EA5E9",
      accentBg: "#F0F9FF",
    },
    {
      id: "nova-med",
      quote: "ProximaGenTech transformed our patient management platform from a fragile monolith into a distributed, HIPAA-compliant microservice architecture. Time-to-deploy for new features dropped from 3 weeks to a single day.",
      author: "Priya Nambiar",
      role: "Head of Product Engineering",
      company: "NovaMed Health",
      initials: "PN",
      rating: 5,
      highlightTag: "Healthcare Tech",
      accentColor: "#F59E0B",
      accentBg: "#FFFBEB",
    },
  ];

  constructor() {
    this.totalCount = this.testimonials.length;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.renderCards();
      this.startAutoPlay();
    }, 120);
  }

  private renderCards(): void {
    const carousel = this.carouselEl()?.nativeElement;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll(".tcard")) as HTMLElement[];
    const active = this.activeIndex();
    const total = cards.length;

    cards.forEach((card, i) => {
      const offset = (i - active + total) % total;
      let x = 0, scale = 1, opacity = 1, zIndex = 1, rotateY = 0;

      if (offset === 0) {
        x = 0; scale = 1; opacity = 1; zIndex = 4; rotateY = 0;
      } else if (offset === 1) {
        x = 300; scale = 0.88; opacity = 0.6; zIndex = 3; rotateY = -16;
      } else if (offset === total - 1) {
        x = -300; scale = 0.88; opacity = 0.6; zIndex = 3; rotateY = 16;
      } else if (offset === 2) {
        x = 560; scale = 0.76; opacity = 0.25; zIndex = 2; rotateY = -28;
      } else {
        x = -560; scale = 0.76; opacity = 0.25; zIndex = 2; rotateY = 28;
      }

      gsap.to(card, {
        x, scale, opacity, rotateY,
        zIndex,
        duration: 0.75,
        ease: "power3.out",
        transformPerspective: 1200,
      });
    });
  }

  protected goTo(index: number): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.activeIndex.set(index);
    this.renderCards();
    setTimeout(() => { this.isAnimating = false; }, 800);
  }

  protected prev(): void {
    const next = (this.activeIndex() - 1 + this.totalCount) % this.totalCount;
    this.goTo(next);
    this.resetAutoPlay();
  }

  protected next(): void {
    const next = (this.activeIndex() + 1) % this.totalCount;
    this.goTo(next);
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      const next = (this.activeIndex() + 1) % this.totalCount;
      this.goTo(next);
    }, 5000);
  }

  private resetAutoPlay(): void {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }
}
