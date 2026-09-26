import { Component, input } from '@angular/core';

export type BadgeVariant = 'green' | 'purple' | 'dark' | 'subtle-green' | 'subtle-purple' | 'outline';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class BadgeComponent {
  public readonly variant = input<BadgeVariant>('green');
  public readonly size = input<BadgeSize>('md');
  public readonly hasDot = input<boolean>(false);
}
