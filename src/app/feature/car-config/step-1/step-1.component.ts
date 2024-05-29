import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../shared/color.model';
import { ModelAndColor } from '../shared/model-and-color.model';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';
import { TypeAsFormControls } from '../shared/type-as-form-controls.type';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component extends AutoUnsubAdapter implements OnInit {
    protected readonly baseImageUrl: string = 'https://interstate21.com/tesla-app/images/';
    protected vehicles$!: Observable<VehicleModel[]>;
    protected readonly step1FormGroup: FormGroup<TypeAsFormControls<ModelAndColor>>;
    protected readonly step1FormControls: TypeAsFormControls<ModelAndColor>;

    constructor(private teslaService: TeslaService) {
      super();
      this.step1FormControls = {
        modelSelect: new FormControl<VehicleModel | null>(null),
        colorSelect: new FormControl<Color | null>(null)
      };
      this.step1FormGroup = new FormGroup(this.step1FormControls);
    }

    ngOnInit(): void {
      this.vehicles$ = this.teslaService.fetch();
      this.subs.add(this.step1FormControls.modelSelect.valueChanges
          .subscribe(() =>
            this.step1FormGroup.patchValue({colorSelect: this.modelSelect?.colors[0] || null})
          )
      );
    }

    protected fetchVehicleImageUrl(): string {
      return this.baseImageUrl + this.modelSelect!.code + '/' + this.colorSelect!.code + '.jpg';
    }

    protected get modelSelect(): VehicleModel | null {
      return this.step1FormControls.modelSelect!.value || null;
    }

    protected get colorSelect(): Color | null {
      return this.step1FormControls.colorSelect!.value || null;
    }
}
