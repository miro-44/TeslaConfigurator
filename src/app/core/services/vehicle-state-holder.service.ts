import { Injectable, WritableSignal, signal } from '@angular/core';
import { ModelAndColor } from '../../feature/steps/shared/types/model-and-color.type';
import { ConfigAndOptions } from '../../feature/steps/shared/types/config-and-options.type';

type State<T> = {
  data: T | null,
  valid: boolean
}

@Injectable({
  providedIn: 'root'
})
export class VehicleStateHolderService {

  private readonly modelAndColorSignal: WritableSignal<State<ModelAndColor>> = signal({data: null, valid: false});
  private readonly configAndOptionsSignal: WritableSignal<State<ConfigAndOptions>> = signal({data: null, valid: false});

  get modelAndColorState(): State<ModelAndColor> {
    return this.modelAndColorSignal();
  }

  set modelAndColorState(modelAndColorState: State<ModelAndColor>) {
    if (!modelAndColorState ||
        !modelAndColorState.valid ||
        modelAndColorState.data?.model.code !== this.modelAndColorState.data?.model.code) {
      this.configAndOptionsState = {data: null, valid: false};
    }
    this.modelAndColorSignal.set(modelAndColorState);
  }

  get configAndOptionsState(): State<ConfigAndOptions> {
    return this.configAndOptionsSignal();
  }

  set configAndOptionsState(configAndOptionsState: State<ConfigAndOptions>) {
    this.configAndOptionsSignal.set(configAndOptionsState);
  }

}
