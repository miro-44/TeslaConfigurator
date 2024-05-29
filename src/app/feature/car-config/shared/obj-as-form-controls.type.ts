import { FormControl } from "@angular/forms";

export type ObjAsFormControls<T> = {
    [K in keyof T as `${Extract<K, string>}Select`]: FormControl<T[K] | null>;
};
