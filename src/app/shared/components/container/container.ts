import { Component, input } from '@angular/core';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class ContainerComponent {
  public readonly maxWidth = input<ContainerMaxWidth>('xl');
  public readonly padded = input<boolean>(true);
  public readonly className = input<string>('');
}
