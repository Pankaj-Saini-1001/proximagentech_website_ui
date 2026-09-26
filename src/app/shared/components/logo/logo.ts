import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type LogoVariant = 'full' | 'compact' | 'icon';
export type LogoTheme = 'light' | 'dark';
export type LogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class LogoComponent {
  public readonly variant = input<LogoVariant>('full');
  public readonly theme = input<LogoTheme>('light');
  public readonly size = input<LogoSize>('md');
  public readonly link = input<string>('/');
  public readonly useImage = input<boolean>(true);
}
