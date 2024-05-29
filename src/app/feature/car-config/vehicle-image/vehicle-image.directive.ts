import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { ModelAndColor } from '../shared/model-and-color.type';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';

@Directive({
  selector: '[ccVehicleImage]',
  standalone: true
})
export class VehicleImageDirective extends AutoUnsubAdapter implements OnInit {

  private readonly baseImageUrl: string = 'https://interstate21.com/tesla-app/images/';

  @HostBinding('attr.src')
  private src!: string | null;

  constructor(
    private formStateTransferService: FormStateTransferService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(this.formStateTransferService.modelAndColor$
      .subscribe(modelAndColor => this.src = this.getVehicleImageUrl(modelAndColor)));
  }

  private getVehicleImageUrl(modelAndColor: ModelAndColor | null): string | null {
    if (!modelAndColor) {
      return null;
    }
    return this.baseImageUrl + modelAndColor!.model.code + '/' + modelAndColor.color.code + '.jpg';
  }

}
