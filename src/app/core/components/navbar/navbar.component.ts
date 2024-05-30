import { Component, Signal, computed, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '../../../app.routes';
import { VehicleStateHolderService } from '../../services/vehicle-state-holder.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected stepRoutes: Routes = routes.filter((route) => route.path?.startsWith("step"));

  constructor(private vehicleStateHolderService: VehicleStateHolderService) {}

  protected readonly stepRouteValidMap: {path: string, valid: Signal<boolean>}[] = [
    {
      path: "step1",
      valid: signal(true),
    },
    {
      path: "step2",
      valid: computed(() => this.vehicleStateHolderService.modelAndColorState.valid)
    },
    {
      path: "step3",
      valid: computed(() => this.vehicleStateHolderService.configAndOptionsState.valid)
    }
  ]
}
