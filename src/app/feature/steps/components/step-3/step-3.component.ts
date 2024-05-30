import { Component, Signal, computed } from '@angular/core';
import { VehicleStateHolderService } from '../../../../core/services/vehicle-state-holder.service';
import { ModelAndColor } from '../../shared/types/model-and-color.type';
import { ConfigAndOptions } from '../../shared/types/config-and-options.type';
import { UsdPipe } from '../../shared/usd.pipe';
import { CurrencyPipe } from '@angular/common';
import { VehicleSpecsComponent } from '../../shared/components/vehicle-specs/vehicle-specs.component';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [UsdPipe, VehicleSpecsComponent],
  providers: [CurrencyPipe],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {

  protected readonly towHitchPrice: number = 1000;
  protected readonly yokePrice: number = 1000;

  protected totalPrice: Signal<number> = computed(() => {
    return this.modelAndColor.color.price + this.configAndOptions.config.price +
    (this.configAndOptions.towHitch ? this.towHitchPrice : 0) +
      (this.configAndOptions.yoke ? this.yokePrice : 0);
  })

  constructor(private vehicleStateHolderService: VehicleStateHolderService) {}

  get modelAndColor(): ModelAndColor {
    return this.vehicleStateHolderService.modelAndColorState.data!;
  }

  get configAndOptions(): ConfigAndOptions {
    return this.vehicleStateHolderService.configAndOptionsState.data!;
  }

}
