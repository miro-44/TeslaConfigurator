import { Injectable, WritableSignal, signal } from '@angular/core';
import { ModelAndColor } from '../../feature/steps/shared/types/model-and-color.type';
import { ConfigAndExtras } from '../../feature/steps/shared/types/config-and-extras.type';

type State<T> = {
  data: T | null,
  valid: boolean
}

@Injectable({
  providedIn: 'root'
})
export class VehicleStateHolderService {

  private readonly modelAndColorSignal: WritableSignal<State<ModelAndColor>> = signal({data: null, valid: false});
  private readonly configAndExtrasSignal: WritableSignal<State<ConfigAndExtras>> = signal({data: null, valid: false});

  get modelAndColorState(): State<ModelAndColor> {
    return this.modelAndColorSignal();
  }

  set modelAndColorState(modelAndColorState: State<ModelAndColor>) {
    if (!modelAndColorState ||
        !modelAndColorState.valid ||
        modelAndColorState.data?.model.code !== this.modelAndColorState.data?.model.code) {
      this.configAndExtrasState = {data: null, valid: false};
    }
    this.modelAndColorSignal.set(modelAndColorState);
  }

  get configAndExtrasState(): State<ConfigAndExtras> {
    return this.configAndExtrasSignal();
  }

  set configAndExtrasState(configAndExtrasState: State<ConfigAndExtras>) {
    this.configAndExtrasSignal.set(configAndExtrasState);
  }

}
