import { FormControl } from "@angular/forms";
import { VehicleModel } from "./vehicle-model.model";
import { Color } from "./color.model";

export interface Step1Form {
    modelSelect: FormControl<VehicleModel | null>,
    colorSelect: FormControl<Color | null>
}
