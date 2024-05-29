import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../shared/color.model';
import { Step1Form } from '../shared/step-1-form.model';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component extends AutoUnsubAdapter implements OnInit {
    vehicles$!: Observable<VehicleModel[]>;
    step1Form!: FormGroup<Step1Form>;

    constructor(private teslaService: TeslaService) {
      super();
      this.step1Form = new FormGroup({
        modelSelect: new FormControl<VehicleModel | null>(null),
        colorSelect: new FormControl<Color | null>(null)
      });
    }

    ngOnInit(): void {
      this.vehicles$ = this.teslaService.fetch();
    }

    change(): void {
      this.step1Form.patchValue({colorSelect: this.step1Form.get('modelSelect')?.value?.colors[0] || null});
    }
}
