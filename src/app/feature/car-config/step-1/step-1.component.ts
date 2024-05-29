import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.type';
import { AsyncPipe } from '@angular/common';
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
  imports: [AsyncPipe, ReactiveFormsModule],
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
      private formStateTransferService: FormStateTransferService,
      private changeDetectorRef: ChangeDetectorRef
    ) {
      super();
    }

    ngOnInit(): void {
      let persistedModelAndColor = this.formStateTransferService.getModelandColor();
      this.step1FormGroup = new FormGroup({
        modelSelect: new FormControl<VehicleModel | null>(null, [Validators.required]),
        colorSelect: new FormControl<Color | null>(null, [Validators.required])
      });
      this.vehicles$ = this.teslaService.fetchModels();
      this.subs.add(this.step1FormGroup.controls.modelSelect.valueChanges
          .subscribe(() => {
            this.step1FormGroup.patchValue({colorSelect: this.modelSelect?.colors[0] || null});
            if (this.modelSelect == null || this.colorSelect == null) {
              this.formStateTransferService.setModelAndColor(null);
              return;
            }
            this.formStateTransferService.setModelAndColor({model: this.modelSelect!, color: this.colorSelect});
          })
      );
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
