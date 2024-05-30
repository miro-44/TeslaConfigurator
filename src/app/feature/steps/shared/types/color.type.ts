export type ColorCode = "white" | "black" | "blue" | "grey" | "red";

export interface Color {
    code: ColorCode,
    description: string,
    price: number
}
