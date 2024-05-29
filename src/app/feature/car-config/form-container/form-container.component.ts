import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { ModelAndColor } from '../shared/model-and-color.type';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {

  private readonly baseImageUrl: string = 'https://interstate21.com/tesla-app/images/';
  private vehicleImageFullUrl: string | null =  null;

  constructor(private formStateTransferService: FormStateTransferService) {}

  protected fetchVehicleImageUrl(): string | null {
    let modelAndColor: ModelAndColor | null = this.formStateTransferService.getModelAndColor();
    if (!modelAndColor) {
      return null;
    }
    return this.baseImageUrl + modelAndColor!.model.code + '/' + modelAndColor.color.code + '.jpg';
  }
}
