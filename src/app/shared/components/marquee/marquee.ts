import { Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [],
  templateUrl: './marquee.html',
  styleUrl: './marquee.css',
})
export class MarqueeComponent {
  public readonly speed = input<number>(25);
  public readonly direction = input<'left' | 'right'>('left');
  public readonly pauseOnHover = input<boolean>(true);
  public readonly fadeEdges = input<boolean>(true);
}
