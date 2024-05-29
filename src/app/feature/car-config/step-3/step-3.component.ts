import { Component } from '@angular/core';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { ModelAndColor } from '../shared/model-and-color.type';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [],
  templateUrl: './step-3.component.html'
})
export class Step3Component {

  constructor(private formStateTransferService: FormStateTransferService) {}

  get modelAndColor(): ModelAndColor {
    return this.formStateTransferService.modelAndColor!;
  }

}
