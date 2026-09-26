import { Component, computed, inject, input } from "@angular/core";
import { ScrollService } from "../../../core/services/scroll.service";

@Component({
  selector: "app-scroll-to-top",
  standalone: true,
  imports: [],
  templateUrl: "./scroll-to-top.html",
  styleUrl: "./scroll-to-top.css",
})
export class ScrollToTopComponent {
  private readonly scrollService = inject(ScrollService);

  public readonly threshold = input<number>(250);

  public readonly isVisible = computed(() => {
    return this.scrollService.scrollY() > this.threshold();
  });

  public readonly progress = computed(() => {
    return this.scrollService.scrollProgress();
  });

  public readonly progressPercent = computed(() => {
    return Math.round(this.scrollService.scrollProgress() * 100);
  });

  // Circumference for r=24: 2 * PI * 24 = 150.8
  public readonly strokeDashoffset = computed(() => {
    const c = 150.8;
    return c - this.progress() * c;
  });

  public scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
