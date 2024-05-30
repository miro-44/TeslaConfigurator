import { Color } from "./color.type";

export type ModelCode = "S" | "X" | "C" | "3" | "Y";

export interface VehicleModel {
    code: ModelCode,
    description: string,
    colors: Color[]
}
