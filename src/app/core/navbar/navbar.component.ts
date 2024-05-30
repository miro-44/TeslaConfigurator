import { Component, Signal, computed, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '../../app.routes';
import { FormStateTransferService } from '../../feature/car-config/shared/form-state-transfer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected stepRoutes: Routes = routes;

  constructor(private formStateTransferService: FormStateTransferService) {}

  protected readonly stepRouteValidMap: {path: string, valid: Signal<boolean>}[] = [
    {
      path: 'step1',
      valid: signal(true)
    },
    {
      path: 'step2',
      valid: computed(() => this.formStateTransferService.modelAndColorState.valid)
    },
    {
      path: 'step3',
      valid: computed(() => this.formStateTransferService.configAndExtrasState.valid)
    }
  ]
}
