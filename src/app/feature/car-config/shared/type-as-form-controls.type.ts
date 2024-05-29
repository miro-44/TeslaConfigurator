import { FormControl } from "@angular/forms";

export type TypeAsFormControls<T> = {
    [K in keyof T as `${Extract<K, string>}Select`]: FormControl<T[K] | null>;
};
