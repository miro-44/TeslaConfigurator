import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { VehicleImageComponent } from '../vehicle-image/vehicle-image.component';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, VehicleImageComponent],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {
}
