export const cardinalDirections = ["N", "S", "E", "W"] as const;

export const directions = ["R", "L", "F"] as const;

export type Direction = (typeof directions)[number];
export type CardinalDirection = (typeof cardinalDirections)[number];
