import { Component, input, computed } from '@angular/core';

export type SectionHeadingAlign = 'left' | 'center' | 'right';
export type SectionHeadingTheme = 'light' | 'dark';
export type HighlightColor = 'purple' | 'green' | 'gradient';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeadingComponent {
  public readonly badge = input<string | null>(null);
  public readonly badgeVariant = input<'green' | 'purple' | 'dark'>('green');
  public readonly title = input.required<string>();
  public readonly highlight = input<string | null>(null);
  public readonly highlightColor = input<HighlightColor>('purple');
  public readonly subtitle = input<string | null>(null);
  public readonly align = input<SectionHeadingAlign>('center');
  public readonly theme = input<SectionHeadingTheme>('light');

  // Compute title split around highlight
  public readonly titleParts = computed(() => {
    const full = this.title();
    const hl = this.highlight();
    if (!hl || !full.includes(hl)) {
      return { before: full, highlight: '', after: '' };
    }
    const idx = full.indexOf(hl);
    return {
      before: full.substring(0, idx),
      highlight: hl,
      after: full.substring(idx + hl.length),
    };
  });
}
