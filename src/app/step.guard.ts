import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FormStateTransferService } from './feature/car-config/shared/form-state-transfer.service';

export namespace StepGuard {

  export const modelAndColorStep1Valid: CanActivateFn = (route, state) => {
    if (inject(FormStateTransferService).modelAndColorState.valid) {
      return true;
    }
    inject(Router).navigate(['/step1']);
    return false;
  };

  export const configAndExtrasStep2Valid: CanActivateFn = (route, state) => {
    if (inject(FormStateTransferService).configAndExtrasState.valid) {
      return true;
    }
    inject(Router).navigate(['/step2']);
    return false;
  };
}
