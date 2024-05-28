import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {

    constructor(private teslaService: TeslaService) {}

    ngOnInit(): void {
      this.teslaService.fetch().subscribe((data) => console.log(data));
    }
}
