import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,

  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: string = 'primary';
  @Input() label: string = '';
  @Input() url: string = '';
}
