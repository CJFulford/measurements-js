export type FormatTypes = "name" | "acronym" | "symbol";

export function floatsEqual(a: number, b: number, precision = 5): boolean {
    const epsilon = 0.1 / Math.pow(10, precision);
    return Math.abs(a - b) < epsilon;
}
