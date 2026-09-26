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

interface Pillar {
  title: string;
  desc: string;
  badge: string;
  icon: "ai" | "stack" | "sustainable" | "security";
}

interface Metric {
  value: string;
  label: string;
  sub: string;
}

interface RoadmapStep {
  step: string;
  title: string;
  desc: string;
  deliverables: string[];
}

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./about-us.html",
  styleUrl: "./about-us.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUs implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private ctx: gsap.Context | null = null;

  protected readonly credentials = [
    { title: "ISO & Cloud Compliance", desc: "SOC2 & ISO 27001 aligned architecture protocols." },
    { title: "Multi-Model AI Integrations", desc: "Deterministic agentic graphs & fine-tuned LLMs." },
    { title: "Carbon-Conscious Computing", desc: "Algorithmic efficiency slashing excess CPU/GPU cycles." },
  ];

  protected readonly industries = [
    "Banking & FinTech",
    "Retail & E-Commerce",
    "Hospitality & Travel",
    "Logistics & Freight",
    "Food & Catering",
    "Media & Streaming",
    "Industrial Manufacturing",
  ];

  protected readonly pillars: Pillar[] = [
    {
      title: "Autonomous & Agentic AI",
      desc: "Building goal-oriented autonomous agents that automate complex workflows with deterministic guardrails and multi-agent coordination.",
      badge: "INTELLIGENCE",
      icon: "ai",
    },
    {
      title: "Full-Stack Engineering",
      desc: "Custom web, mobile, and distributed backend software built for resilient horizontal scaling, sub-second latency, and clean code hygiene.",
      badge: "ARCHITECTURE",
      icon: "stack",
    },
    {
      title: "Sustainable Computing",
      desc: "Optimizing algorithms, microservices, and multi-cloud infrastructure to minimize resource consumption and compute costs.",
      badge: "EFFICIENCY",
      icon: "sustainable",
    },
    {
      title: "Enterprise Security & Impartial Advice",
      desc: "Transparent pricing, robust API protocols, zero vendor lock-in, and architecture engineered strictly around client requirements.",
      badge: "INTEGRITY",
      icon: "security",
    },
  ];

  protected readonly metrics: Metric[] = [
    { value: "99.9%", label: "Enterprise System Uptime & Resilience", sub: "High-availability infrastructure" },
    { value: "42%", label: "Average Cloud Compute & Footprint Optimization", sub: "Energy & resource reduction" },
    { value: "10x", label: "Faster Operational Cycle Times", sub: "Via agentic workflow automation" },
    { value: "8+", label: "Targeted Global Industry Sectors Served", sub: "Proven cross-sector expertise" },
  ];

  protected readonly roadmap: RoadmapStep[] = [
    {
      step: "01",
      title: "Strategic Discovery & Needs Assessment",
      desc: "Comprehensive audit of legacy architecture, data bottlenecks, and high-leverage opportunities for automation.",
      deliverables: ["Systems Audit", "Feasibility Blueprint", "ROI Matrix"],
    },
    {
      step: "02",
      title: "Agentic & Cloud Architecture Design",
      desc: "Architecting deterministic workflows, resilient microservices, and eco-optimized cloud resource topologies.",
      deliverables: ["Topology Design", "Agentic Logic Graphs", "Security Protocols"],
    },
    {
      step: "03",
      title: "Agile Development & Continuous Integration",
      desc: "Iterative sprint execution with automated integration tests, clean typing, and real-time client collaboration.",
      deliverables: ["Weekly Releases", "Code Reviews", "Automated QA"],
    },
    {
      step: "04",
      title: "Sustainable Deployment & 24/7 Monitoring",
      desc: "Zero-downtime rollouts, automated carbon & cost telemetry, and continuous autonomous self-healing monitors.",
      deliverables: ["Telemetry Setup", "SLA Guarantee", "Continuous Tuning"],
    },
  ];

  protected readonly cultureHighlights = [
    {
      title: "We Listen Before We Build",
      desc: "No cookie-cutter templates or forced tech stacks. We start by deeply understanding your team\u2019s bottlenecks, commercial goals, and operational constraints.",
    },
    {
      title: "Radical Engineering Transparency",
      desc: "Open sprint reviews, live commit activity, zero hidden fees, and complete intellectual property ownership transferred cleanly to your team.",
    },
    {
      title: "Embedded Co-Innovation",
      desc: "We operate as an extension of your leadership and tech teams, mentoring in-house developers and transferring know-how at every release.",
    },
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initScrollAnimations(), 200);
  }

  private initScrollAnimations(): void {
    const wrapper = document.querySelector(".about-content-wrapper") ?? document.body;

    this.ctx = gsap.context(() => {
      // Hero title
      const heroTitle = document.querySelector(".page-hero__title");
      if (heroTitle) {
        gsap.from(heroTitle, { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      }

      // Pillars
      const pillarsSection = document.querySelector(".pillars-section");
      const pillarCards = pillarsSection?.querySelectorAll(".pillar-card");
      if (pillarCards?.length && pillarsSection) {
        gsap.fromTo(
          Array.from(pillarCards),
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: pillarsSection, start: "top 88%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // Metrics
      const metricsSection = document.querySelector(".metrics-banner-section") ?? document.querySelector(".metrics-section");
      const metricCards = metricsSection?.querySelectorAll(".metric-card") ?? metricsSection?.querySelectorAll(".metric-stat");
      if (metricCards?.length && metricsSection) {
        gsap.fromTo(
          Array.from(metricCards),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: metricsSection, start: "top 88%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // Roadmap steps - slide in alternating
      const roadmapSection = document.querySelector(".roadmap-section");
      const roadmapSteps = roadmapSection?.querySelectorAll(".roadmap-step");
      if (roadmapSteps?.length && roadmapSection) {
        roadmapSteps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: step, start: "top 88%", toggleActions: "play none none none", once: true },
              clearProps: "all",
            }
          );
        });
      }

      // Culture cards
      const cultureSection = document.querySelector(".culture-section");
      const cultureCards = cultureSection?.querySelectorAll(".culture-card");
      if (cultureCards?.length && cultureSection) {
        gsap.fromTo(
          Array.from(cultureCards),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: cultureSection, start: "top 88%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, wrapper);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
