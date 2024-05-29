import { Component } from '@angular/core';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { ModelAndColor } from '../shared/model-and-color.type';
import { ConfigAndExtras } from '../shared/config-and-extras.type';
import { UsdPipe } from '../shared/usd.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [UsdPipe],
  providers: [CurrencyPipe],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {

  constructor(private formStateTransferService: FormStateTransferService) {}

  get modelAndColor(): ModelAndColor {
    return this.formStateTransferService.modelAndColor!;
  }

  get configAndExtras(): ConfigAndExtras {
    return this.formStateTransferService.configAndExtras!;
  }

}
