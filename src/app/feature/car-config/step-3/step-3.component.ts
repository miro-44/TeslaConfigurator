import { Component } from '@angular/core';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { ModelAndColor } from '../shared/model-and-color.type';
import { ConfigAndExtras } from '../shared/config-and-extras.type';
import { UsdPipe } from '../shared/usd.pipe';
import { CurrencyPipe } from '@angular/common';
import { VehicleSpecsComponent } from '../vehicle-specs/vehicle-specs.component';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [UsdPipe, VehicleSpecsComponent],
  providers: [CurrencyPipe],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {

  readonly towHitchPrice: number = 1000;
  readonly yokePrice: number = 1000;

  constructor(private formStateTransferService: FormStateTransferService) {}

  get modelAndColor(): ModelAndColor {
    return this.formStateTransferService.modelAndColorState.data!;
  }

  get configAndExtras(): ConfigAndExtras {
    return this.formStateTransferService.configAndExtrasState.data!;
  }

  get totalPrice() {
    return this.modelAndColor.color.price + this.configAndExtras.config.price +
      (this.configAndExtras.towHitch ? this.towHitchPrice : 0) +
        (this.configAndExtras.yoke ? this.yokePrice : 0);
  }

}
