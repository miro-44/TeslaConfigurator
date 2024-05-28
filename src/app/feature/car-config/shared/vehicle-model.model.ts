export type ModelCodeSet = 'S' | 'X' | 'C' | '3' | 'Y';

export interface VehicleModel {
    code: ModelCodeSet,
    description: string,
}
