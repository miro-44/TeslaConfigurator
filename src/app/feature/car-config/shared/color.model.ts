export type ColorCodeSet = 'white' | 'black' | 'blue' | 'grey' | 'red';

export interface Color {
    code: ColorCodeSet,
    description: string,
    price: number
}
