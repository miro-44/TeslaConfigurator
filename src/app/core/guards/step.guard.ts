import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { VehicleStateHolderService } from '../services/vehicle-state-holder.service';

export namespace StepGuard {

  export const modelAndColorStep1Valid: CanActivateFn = (route, state) => {
    if (inject(VehicleStateHolderService).modelAndColorState.valid) {
      return true;
    }
    inject(Router).navigate(["/step1"]);
    return false;
  };

  export const configAndOptionsStep2Valid: CanActivateFn = (route, state) => {
    if (inject(VehicleStateHolderService).configAndOptionsState.valid) {
      return true;
    }
    inject(Router).navigate(["/step2"]);
    return false;
  };
}
