import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroVideoComponent } from "../hero-video/hero-video.component";
import { Testimonial } from "../testimonial/testimonial";
import { ClientsMarquee } from "../clients-marquee/clients-marquee";

interface IndustryLogo {
  name: string;
  category: string;
  icon: string;
}

interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

interface EngineeringTrack {
  trackNumber: string;
  title: string;
  desc: string;
  capabilities: string[];
  link: string;
  icon: "stack" | "ai" | "cloud";
}

interface ComparisonRow {
  aspect: string;
  traditional: string;
  proxima: string;
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, HeroVideoComponent, Testimonial, ClientsMarquee],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private ctx: gsap.Context | null = null;

  protected readonly industryLogos: IndustryLogo[] = [
    { name: "Finance & Banking", category: "Institutional Fintech", icon: "bank" },
    { name: "Omni Retail", category: "Global Commerce", icon: "cart" },
    { name: "Global Logistics", category: "Freight & Supply", icon: "truck" },
    { name: "Hospitality Cloud", category: "Smart Guest Tech", icon: "hotel" },
    { name: "Smart Manufacturing", category: "Industry 4.0 IoT", icon: "gear" },
  ];

  protected readonly metrics: MetricItem[] = [
    {
      value: "99.98%",
      label: "System Reliability",
      detail: "Cloud uptime with zero-downtime distributed microservices.",
    },
    {
      value: "-42%",
      label: "Cloud Energy Reduction",
      detail: "Lower server compute waste via algorithmic optimization.",
    },
    {
      value: "10x",
      label: "Agentic Workflow Velocity",
      detail: "Faster business cycle execution using autonomous AI agents.",
    },
    {
      value: "100%",
      label: "Tailored Codebases",
      detail: "Zero locked-in boilerplate; custom-engineered to client tech stacks.",
    },
  ];

  protected readonly engineeringTracks: EngineeringTrack[] = [
    {
      trackNumber: "TRACK 01",
      title: "Full-Stack Application Development",
      desc: "High-performance web, iOS, Android, and cross-platform desktop applications engineered with clean abstractions, microservices, and human-centered UX/UI.",
      capabilities: [
        "Reactive Web & Native Mobile Apps",
        "Resilient Distributed Microservices",
        "Scalable Cloud-Native API Contracts",
      ],
      link: "/services",
      icon: "stack",
    },
    {
      trackNumber: "TRACK 02",
      title: "Autonomous AI & Intelligent Agents",
      desc: "Goal-oriented autonomous agents, multi-agent coordination topologies, fine-tuned RAG retrieval pipelines, and deterministic decision execution loops.",
      capabilities: [
        "Goal-Driven Multi-Agent Workflows",
        "Fine-Tuned Domain LLM Pipelines",
        "Deterministic Guardrails & Telemetry",
      ],
      link: "/services",
      icon: "ai",
    },
    {
      trackNumber: "TRACK 03",
      title: "Data Analytics & Cloud Modernization",
      desc: "Predictive machine learning models, real-time BI visualization dashboards, high-throughput automated ETL pipelines, DevSecOps, and green cloud optimization.",
      capabilities: [
        "Real-Time BI & Automated ETL Pipelines",
        "Green Cloud Workload Optimization",
        "Continuous DevSecOps Governance",
      ],
      link: "/services",
      icon: "cloud",
    },
  ];

  protected readonly comparisonRows: ComparisonRow[] = [
    {
      aspect: "Third-Party Integration",
      traditional: "Fragile, custom connections that break easily and require constant manual fixes.",
      proxima: "Reliable, plug-and-play integrations built with modern connections that run smoothly.",
    },
    {
      aspect: "AI in Legacy Systems",
      traditional: "Risky side-projects that struggle to connect with your old, existing business software.",
      proxima: "Seamlessly blends smart AI tools straight into your current systems without breaking them.",
    },
    {
      aspect: "Infrastructure Scalability",
      traditional: "Over-provisioned static servers, idle CPU waste, and ballooning hosting costs.",
      proxima: "Dynamic green auto-scaling, algorithmic optimization, and carbon-conscious workloads.",
    },
    {
      aspect: "Idea-to-Realization",
      traditional: "Slow waterfall processes, prolonged feasibility studies, and delayed execution.",
      proxima: "Rapid prototyping and agile execution to launch your concept into market fast.",
    },
    {
      aspect: "Architecture & Code Ownership",
      traditional: "Vendor lock-in with proprietary setups and hidden, complex codebase ownership.",
      proxima: "100% client code ownership with clean, modular, and future-proof architecture.",
    },
    {
      aspect: "Security & Compliance",
      traditional: "Reactive security checks patched on at the end of development, creating risks and release delays.",
      proxima: "Security-by-design at every single step—proactive compliance, continuous checks, and automated validation built in from day one.",
    },
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initScrollAnimations(), 200);
  }

  private initScrollAnimations(): void {
    const homeRoot = document.querySelector(".home-content-root");
    if (!homeRoot) return;

    this.ctx = gsap.context(() => {
      // Section 1: Proof Strip
      const proofSection = homeRoot.querySelector(".proof-strip-section");
      const proofLabel = proofSection?.querySelector(".proof-strip-label");
      const proofBadges = proofSection?.querySelectorAll(".proof-badge-item");

      if (proofLabel && proofSection) {
        gsap.fromTo(
          proofLabel,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: proofSection, start: "top 90%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }
      if (proofBadges?.length && proofSection) {
        gsap.fromTo(
          Array.from(proofBadges),
          { y: 35, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: proofSection, start: "top 85%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // Section 2: Metrics (Slide from left, bottom, right)
      const metricsSection = homeRoot.querySelector(".metrics-bar-section");
      const metricCards = metricsSection?.querySelectorAll(".metric-card");
      if (metricCards?.length && metricsSection) {
        Array.from(metricCards).forEach((card, index) => {
          let xOffset = 0;
          let yOffset = 40;
          if (index === 0) {
            xOffset = -50;
            yOffset = 0;
          } else if (index === metricCards.length - 1) {
            xOffset = 50;
            yOffset = 0;
          }

          gsap.fromTo(
            card,
            { x: xOffset, y: yOffset, opacity: 0, scale: 0.96 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: metricsSection, start: "top 85%", toggleActions: "play none none none", once: true },
              clearProps: "all",
            }
          );
        });
      }

      // Section 3: Engineering Tracks (Card 1 from left, Card 2 from bottom, Card 3 from right)
      const tracksSection = homeRoot.querySelector(".tracks-section");
      const trackHead = tracksSection?.querySelector(".section-center-head");
      const trackCards = tracksSection?.querySelectorAll(".track-card");

      if (trackHead && tracksSection) {
        gsap.fromTo(
          trackHead,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: tracksSection, start: "top 88%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }
      if (trackCards?.length && tracksSection) {
        const cardsArray = Array.from(trackCards);
        cardsArray.forEach((card, index) => {
          let xVal = 0;
          let yVal = 50;
          if (index === 0) {
            xVal = -60;
            yVal = 0;
          } else if (index === cardsArray.length - 1) {
            xVal = 60;
            yVal = 0;
          }

          gsap.fromTo(
            card,
            { x: xVal, y: yVal, opacity: 0, scale: 0.95 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.12,
              ease: "power2.out",
              scrollTrigger: { trigger: tracksSection, start: "top 82%", toggleActions: "play none none none", once: true },
              clearProps: "all",
            }
          );
        });
      }

      // Section 4: Advantage / Comparison (Card from left, philosophy from right)
      const advantageSection = homeRoot.querySelector(".advantage-section");
      const comparisonCard = advantageSection?.querySelector(".bento-comparison-card");
      const philosophyCard = advantageSection?.querySelector(".bento-philosophy-card");

      if (comparisonCard && advantageSection) {
        gsap.fromTo(
          comparisonCard,
          { x: -70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: advantageSection, start: "top 85%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }
      if (philosophyCard && advantageSection) {
        gsap.fromTo(
          philosophyCard,
          { x: 70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: advantageSection, start: "top 85%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // CTA Banner
      const ctaCard = homeRoot.querySelector(".cta-slate-card");
      if (ctaCard) {
        gsap.fromTo(
          ctaCard,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: ctaCard, start: "top 88%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // Ensure ScrollTrigger measures proper coordinates
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, homeRoot);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
