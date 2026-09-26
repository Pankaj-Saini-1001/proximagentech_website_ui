import { Component, input } from '@angular/core';

export type DividerVariant = 'subtle' | 'gradient' | 'dashed';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.html',
  styleUrl: './divider.css',
})
export class DividerComponent {
  public readonly variant = input<DividerVariant>('subtle');
  public readonly orientation = input<DividerOrientation>('horizontal');
  public readonly spacing = input<DividerSpacing>('md');
}
