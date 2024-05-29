import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {

}
