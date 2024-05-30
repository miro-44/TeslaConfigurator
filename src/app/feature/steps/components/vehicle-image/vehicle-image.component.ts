import { Component, Signal, computed } from '@angular/core';
import { VehicleStateHolderService } from '../../../../core/services/vehicle-state-holder.service';

@Component({
  selector: 'app-vehicle-image',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-image.component.html'
})
export class VehicleImageComponent {

  protected imageUrl: Signal<string | null> = computed(() => {
    let modelCode: string | undefined = this.vehicleStateHolderService.modelAndColorState.data?.model?.code;
    let colorCode: string | undefined = this.vehicleStateHolderService.modelAndColorState.data?.color?.code;

    if (!modelCode || !colorCode) {
      return null;
    }
    
    return `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`
  })

  constructor(private vehicleStateHolderService: VehicleStateHolderService) {}
}
