import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
    vehicles!: Observable<VehicleModel[]>;

    constructor(private teslaService: TeslaService) {}

    ngOnInit(): void {
      this.vehicles = this.teslaService.fetch();
    }
}
