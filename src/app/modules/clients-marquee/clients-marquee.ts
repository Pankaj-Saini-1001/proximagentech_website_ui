import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

interface ClientLogo {
  name: string;
  abbr: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-clients-marquee',
  standalone: true,
  imports: [],
  templateUrl: './clients-marquee.html',
  styleUrl: './clients-marquee.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsMarquee implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected readonly track1 = viewChild<ElementRef<HTMLElement>>('track1');
  protected readonly track2 = viewChild<ElementRef<HTMLElement>>('track2');

  private tl1: gsap.core.Timeline | null = null;
  private tl2: gsap.core.Timeline | null = null;

  /** First row of client logos - moves right to left */
  protected readonly clientsRow1: ClientLogo[] = [
    { name: 'OmniRetail Global',      abbr: 'OR', color: '#10B981', bg: '#ECFDF5' },
    { name: 'Apex Capital Banking',   abbr: 'AC', color: '#6D28D9', bg: '#F5F3FF' },
    { name: 'FleetLogix Logistics',   abbr: 'FL', color: '#0EA5E9', bg: '#F0F9FF' },
    { name: 'NovaMed Health',         abbr: 'NM', color: '#F59E0B', bg: '#FFFBEB' },
    { name: 'HorizonTech Systems',    abbr: 'HT', color: '#EC4899', bg: '#FDF2F8' },
    { name: 'SkyBridge Finance',      abbr: 'SB', color: '#10B981', bg: '#ECFDF5' },
    { name: 'PulseStream Media',      abbr: 'PS', color: '#6D28D9', bg: '#F5F3FF' },
    { name: 'CrestLine Hospitality',  abbr: 'CL', color: '#0EA5E9', bg: '#F0F9FF' },
  ];

  /** Second row of client logos - moves left to right (reverse) */
  protected readonly clientsRow2: ClientLogo[] = [
    { name: 'DataForge Analytics',    abbr: 'DF', color: '#F59E0B', bg: '#FFFBEB' },
    { name: 'IronGrid Manufacturing', abbr: 'IG', color: '#EC4899', bg: '#FDF2F8' },
    { name: 'ArcCloud DevOps',        abbr: 'AD', color: '#10B981', bg: '#ECFDF5' },
    { name: 'Verdant Agri-Tech',      abbr: 'VA', color: '#6D28D9', bg: '#F5F3FF' },
    { name: 'VantaSecure Cyber',      abbr: 'VS', color: '#0EA5E9', bg: '#F0F9FF' },
    { name: 'LunaSpace Aerospace',    abbr: 'LS', color: '#F59E0B', bg: '#FFFBEB' },
    { name: 'BrightPath EdTech',      abbr: 'BP', color: '#EC4899', bg: '#FDF2F8' },
    { name: 'ZenFlow SaaS',           abbr: 'ZF', color: '#10B981', bg: '#ECFDF5' },
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const track1El = this.track1()?.nativeElement;
    const track2El = this.track2()?.nativeElement;

    if (track1El) {
      this.tl1 = gsap.timeline({ repeat: -1 });
      const width1 = track1El.scrollWidth / 2;
      gsap.set(track1El, { x: 0 });
      this.tl1.to(track1El, {
        x: -width1,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    }

    if (track2El) {
      this.tl2 = gsap.timeline({ repeat: -1 });
      const width2 = track2El.scrollWidth / 2;
      gsap.set(track2El, { x: -width2 });
      this.tl2.to(track2El, {
        x: 0,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });
    }
  }

  ngOnDestroy(): void {
    this.tl1?.kill();
    this.tl2?.kill();
  }
}
