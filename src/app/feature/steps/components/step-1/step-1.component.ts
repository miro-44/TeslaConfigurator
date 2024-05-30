import { Component, OnInit } from '@angular/core';
import { VehicleFetchService } from '../../../../core/services/vehicle-fetch.service';
import { VehicleModel } from '../../shared/types/vehicle-model.type';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Color } from '../../shared/types/color.type';
import { AutoUnsubAdapter } from '../../shared/auto-unsub-adapter.class';
import { VehicleStateHolderService } from '../../../../core/services/vehicle-state-holder.service';
import { ModelAndColor } from '../../shared/types/model-and-color.type';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './step-1.component.html'
})
export class Step1Component extends AutoUnsubAdapter implements OnInit {
    protected vehicles$!: Observable<VehicleModel[]>;
    protected step1FormGroup!: FormGroup<{
      modelSelect: FormControl<VehicleModel | null>,
      colorSelect: FormControl<Color | null>
    }>;

    constructor(
      private vehicleFetchService: VehicleFetchService,
      private vehicleStateHolderService: VehicleStateHolderService
    ) {
      super();
    }

    ngOnInit(): void {
      this.retrieveFormOptions();
      let previousModelAndColor: ModelAndColor | null = this.vehicleStateHolderService.modelAndColorState.data;
      this.step1FormGroup = new FormGroup({
        modelSelect: new FormControl<VehicleModel | null>(previousModelAndColor?.model || null, [Validators.required]),
        colorSelect: new FormControl<Color | null>(previousModelAndColor?.color || null, [Validators.required])
      });
      this.subs.add(this.step1FormGroup.controls.modelSelect.valueChanges
        .subscribe(() => {
          this.step1FormGroup.patchValue({colorSelect: this.modelSelect?.colors[0] || null});
          this.updateState();
        })
      );
      this.subs.add(this.step1FormGroup.controls.colorSelect.valueChanges
        .subscribe(() => {
          this.updateState();
        })
      );
    }

    protected selectCompareFn(selected: VehicleModel | Color | null, option: VehicleModel | Color): boolean {
      return (selected && option) ? (selected!.code === option.code) : (selected === option);
    }

    protected get modelSelect(): VehicleModel | null {
      return this.step1FormGroup.controls.modelSelect!.value || null;
    }

    protected get colorSelect(): Color | null {
      return this.step1FormGroup.controls.colorSelect!.value || null;
    }

    private updateState(): void {
      this.vehicleStateHolderService.modelAndColorState = {
        data: {
          model: this.modelSelect!,
          color: this.colorSelect!
        },
        valid: this.step1FormGroup.valid
      };
    }

    private retrieveFormOptions(): void {
      this.vehicles$ = this.vehicleFetchService.fetchModels();
    }
}
