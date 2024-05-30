import { Injectable } from '@angular/core';
import { ModelAndColor } from './model-and-color.type';
import { ConfigAndExtras } from './config-and-extras.type';
import { StateManager } from './state-manager.class';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  readonly modelAndColor: StateManager<ModelAndColor> = new StateManager();
  readonly configAndExtras: StateManager<ConfigAndExtras> = new StateManager();

  constructor() { }

}
