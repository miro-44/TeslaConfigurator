export type ColorSet = 'white' | 'black' | 'blue' | 'grey' | 'red';

export interface Color {
    code: ColorSet,
    description: string,
    price: number
}
