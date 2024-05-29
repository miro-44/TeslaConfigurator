import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormContainerComponent } from './feature/car-config/form-container/form-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormContainerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
