import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.type';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Color } from '../shared/color.type';
import { ModelAndColor } from '../shared/model-and-color.type';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';
import { ObjAsFormControls } from '../shared/obj-as-form-controls.type';
import { FormStateTransferService } from '../shared/form-state-transfer.service';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component extends AutoUnsubAdapter implements OnInit {
    protected vehicles$!: Observable<VehicleModel[]>;
    protected step1FormGroup!: FormGroup<ObjAsFormControls<ModelAndColor>>;
    protected step1FormControls!: ObjAsFormControls<ModelAndColor>;
    private readonly baseImageUrl: string = 'https://interstate21.com/tesla-app/images/';

    constructor(
      private teslaService: TeslaService,
      private formStateTransferService: FormStateTransferService
    ) {
      super();
    }

    ngOnInit(): void {
      this.vehicles$ = this.teslaService.fetchModels();
      let persistedModelAndColor = this.formStateTransferService.getModelAndColor();
      this.step1FormGroup = new FormGroup({
        modelSelect: new FormControl<VehicleModel | null>(persistedModelAndColor?.model || null, [Validators.required]),
        colorSelect: new FormControl<Color | null>(persistedModelAndColor?.color || null, [Validators.required])
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

    protected updateState(): void {
      if (this.modelSelect == null || this.colorSelect == null) {
        this.formStateTransferService.setModelAndColor(null);
        return;
      }
      this.formStateTransferService.setModelAndColor({model: this.modelSelect!, color: this.colorSelect!});
    }

    protected compareFn(selected: VehicleModel | Color | null, option: VehicleModel | Color): boolean {
      return (selected && option) ? (selected!.code === option.code) : (selected === option);
    }

    protected fetchVehicleImageUrl(): string {
      return this.baseImageUrl + this.modelSelect!.code + '/' + this.colorSelect!.code + '.jpg';
    }

    protected get modelSelect(): VehicleModel | null {
      return this.step1FormGroup.controls.modelSelect!.value || null;
    }

    protected get colorSelect(): Color | null {
      return this.step1FormGroup.controls.colorSelect!.value || null;
    }
}
