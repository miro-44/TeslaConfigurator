import { BehaviorSubject, Observable } from "rxjs";

export type State<T> = {
  data: T | null,
  valid: boolean
}

export class StateManager<T> {
    private stateSubject$: BehaviorSubject<State<T>>;
  
    constructor() {
      this.stateSubject$ = new BehaviorSubject<State<T>>({data: null, valid: false});
    }
  
    setState(state: State<T>): void {
      this.stateSubject$.next(state);
    }
  
    getState(): State<T> {
      return this.stateSubject$.getValue();
    }
  
    getState$(): Observable<State<T>> {
      return this.stateSubject$;
    }
}
