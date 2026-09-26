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

@Component({
  selector: "app-service",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./service.html",
  styleUrl: "./service.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Service implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private ctx: gsap.Context | null = null;

  protected readonly services = [
    {
      id: "enterprise-engineering",
      badge: "ARCHITECTURAL RIGOR",
      title: "Enterprise Software Engineering",
      desc: "Architecting distributed, resilient, and fault-tolerant platforms. We build modern microservices, scalable API gateways, and mission-critical applications that maintain performance under peak loads.",
      icon: "code",
      accent: "green",
      tags: ["Distributed Systems", "TypeScript / Go / Java", "Microservices", "Clean Architecture"],
    },
    {
      id: "agentic-ai",
      badge: "INTELLIGENT WORKFLOWS",
      title: "Autonomous Agents & Applied AI",
      desc: "Orchestrating multi-agent systems, autonomous task-execution bots, and proprietary LLM integrations. We turn unstructured data into automated intelligence pipelines with human-in-the-loop validation.",
      icon: "bot",
      accent: "purple",
      tags: ["LLM Orchestration", "Multi-Agent Frameworks", "RAG Pipelines", "Cognitive Automation"],
    },
    {
      id: "cloud-infrastructure",
      badge: "ZERO-DOWNTIME SCALE",
      title: "Sustainable Cloud & DevOps",
      desc: "Designing resource-efficient Kubernetes architectures, automated CI/CD release cycles, and multi-region infrastructure. We minimize compute wastage while maximizing system availability.",
      icon: "cloud",
      accent: "green",
      tags: ["Kubernetes & Docker", "Terraform (IaC)", "AWS / GCP / Azure", "Green Cloud Compute"],
    },
    {
      id: "data-analytics",
      badge: "REAL-TIME TELEMETRY",
      title: "Data Pipelines & Streaming Analytics",
      desc: "Building high-throughput event-streaming pipelines with Kafka and real-time analytical dashboards. Transform complex system events into actionable predictive forecasting.",
      icon: "data",
      accent: "purple",
      tags: ["Event Streaming", "Apache Kafka", "Predictive Modeling", "Real-Time Telemetry"],
    },
    {
      id: "modern-web-mobile",
      badge: "SEAMLESS EXPERIENCES",
      title: "Modern Web & Cross-Platform Mobile",
      desc: "Creating lightning-fast web applications and reactive native-grade mobile applications. Powered by modern frontend frameworks, edge caching, and responsive design systems.",
      icon: "device",
      accent: "green",
      tags: ["Angular / Next.js", "React Native / Flutter", "Edge Caching", "Offline-First PWAs"],
    },
    {
      id: "cybersecurity-compliance",
      badge: "MISSION CRITICAL",
      title: "Zero-Trust Security & Compliance",
      desc: "Hardening modern application surfaces with zero-trust network architectures, end-to-end payload encryption, and automated vulnerability audits ensuring ISO & SOC2 compliance.",
      icon: "shield",
      accent: "purple",
      tags: ["Zero-Trust Security", "SOC2 / ISO 27001", "Automated Auditing", "Data Encryption"],
    },
  ];

  protected readonly processSteps = [
    {
      number: "01",
      title: "Discovery & System Design",
      desc: "Comprehensive domain modeling, technical audits, and system architecture blueprints engineered to eliminate technical debt early.",
    },
    {
      number: "02",
      title: "Agile Sprint Engineering",
      desc: "Two-week iterative release sprints with automated testing, CI integration, and continuous stakeholder review demos.",
    },
    {
      number: "03",
      title: "Quality & Zero-Downtime Deploy",
      desc: "Canary releases, rigorous security scanning, and blue-green deployments ensuring zero downtime for end users.",
    },
    {
      number: "04",
      title: "Continuous Scale & Optimization",
      desc: "Continuous real-time telemetry, automated scaling rules, and green computing efficiency improvements over time.",
    },
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initScrollAnimations(), 200);
  }

  private initScrollAnimations(): void {
    const wrapper = document.querySelector(".services-content-wrapper");
    if (!wrapper) return;

    this.ctx = gsap.context(() => {
      // Hero title
      const heroTitle = document.querySelector(".page-hero__title");
      if (heroTitle) {
        gsap.from(heroTitle, { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      }

      // Services grid cards
      const servicesSection = wrapper.querySelector(".services-overview-section");
      const sectionHeader = servicesSection?.querySelector(".section-header");
      const serviceCards = servicesSection?.querySelectorAll(".service-card");

      if (sectionHeader && servicesSection) {
        gsap.fromTo(
          sectionHeader,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: servicesSection, start: "top 90%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }
      if (serviceCards?.length && servicesSection) {
        gsap.fromTo(
          Array.from(serviceCards),
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: servicesSection, start: "top 85%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // Process steps
      const processSection = wrapper.querySelector(".process-section");
      const processSteps = processSection?.querySelectorAll(".process-card");
      if (processSteps?.length && processSection) {
        gsap.fromTo(
          Array.from(processSteps),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: processSection, start: "top 85%", toggleActions: "play none none none", once: true },
            clearProps: "all",
          }
        );
      }

      // CTA section
      const ctaSection = wrapper.querySelector(".service-cta-section");
      if (ctaSection) {
        gsap.fromTo(
          ctaSection,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: ctaSection, start: "top 88%", toggleActions: "play none none none", once: true },
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
