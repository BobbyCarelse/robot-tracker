import { type CardinalDirection, directions } from "../constants/app";

export const isStepValid = (step: string) => {
  let matches = false;

  directions.forEach((direction) => {
    if (matches === true) return;
    if (direction === step) matches = true;
  });

  return matches;
};

const clockwiseDirections: CardinalDirection[] = ["N", "E", "S", "W"];

const turn = (
  current: CardinalDirection,
  instruction: "L" | "R",
): CardinalDirection => {
  const index = clockwiseDirections.indexOf(current);
  const offset = instruction === "R" ? 1 : 3;
  return clockwiseDirections[(index + offset) % 4];
};

export const calculateCoordinates = (
  x: number,
  y: number,
  direction: CardinalDirection,
  instruction: string,
  gridWidth: number,
  gridHeight: number,
  scentPoints: { x: number; y: number }[] = [],
) => {
  let currentStep = direction;
  let currentX = x;
  let currentY = y;

  let robotFellOff = false;

  for (const character of instruction) {
    if (!isStepValid(character))
      throw new Error("Invalid instructions provided");

    if (character === "L" || character === "R") {
      currentStep = turn(currentStep, character);
      continue;
    }

    let nextX = currentX;
    let nextY = currentY;

    if (currentStep === "N") nextY += 1;
    else if (currentStep === "S") nextY -= 1;
    else if (currentStep === "E") nextX += 1;
    else if (currentStep === "W") nextX -= 1;

    const isOffGrid =
      nextX < 0 || nextX > gridWidth || nextY < 0 || nextY > gridHeight;

    if (isOffGrid) {
      const hasScent = scentPoints.some(
        (point) => point.x === currentX && point.y === currentY,
      );

      if (hasScent) continue;

      robotFellOff = true;
      break;
    }

    currentX = nextX;
    currentY = nextY;
  }

  return { robotFellOff, x: currentX, y: currentY, currentStep };
};
