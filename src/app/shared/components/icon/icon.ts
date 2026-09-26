import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class IconComponent {
  public readonly name = input.required<string>();
  public readonly size = input<number | string>(20);
  public readonly color = input<string>('currentColor');
  public readonly strokeWidth = input<number>(2);
  public readonly className = input<string>('');
}
