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

  const halfGridWidth = gridWidth / 2
  const halfGridHeight = gridHeight / 2

  for (const character of instruction) {
    if (!isStepValid(character))
      throw new Error("Invalid instructions provided");
    if (currentY > halfGridHeight || currentY < -halfGridHeight) {
      robotFellOff = true;
    }
    if (currentX > halfGridWidth || currentX < -halfGridWidth) {
      robotFellOff = true;
    }

    if (robotFellOff) {
      return { robotFellOff, x: currentX, y: currentY, currentStep };
    }

    if (currentStep === "E") {
      if (character === "F") {
        currentX = currentX + 1;
      } else if (character === "L") {
        currentStep = "N";
      } else if (character === "R") {
        currentStep = "S";
      }
    } else if (currentStep === "N") {
      if (character === "F") {
        currentY = currentY + 1;
      } else if (character === "R") {
        currentStep = "E";
      } else if (character === "L") {
        currentStep = "W";
      }
    } else if (currentStep === "W") {
      if (character === "F") {
        currentX = currentX - 1;
      } else if (character === "R") {
        currentStep = "N";
      } else if (character === "L") {
        currentStep = "S";
      }
    } else if (currentStep === "S") {
      if (character === "F") {
        currentY = currentY - 1;
      } else if (character === "R") {
        currentStep = "W";
      } else if (character === "L") {
        currentStep = "E";
      }
    }
  }

  return { robotFellOff, x: currentX, y: currentY, currentStep };
};
