import { Component } from '@angular/core';
import { FormContainerComponent } from './feature/steps/components/form-container/form-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormContainerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
