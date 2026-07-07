import { Formik } from "formik";
import { Button, Input } from "../../primitives";
import { validationSchema } from "./validation";
import { CardinalDirection } from "../../constants/app";
import { calculateCoordinates } from "../../utils/DirectionUtil";
import { getEdgePointsStorage, storeEdgePoint } from "../../utils/EdgeUtil";

type InitialValues = {
  x: number;
  y: number;
  startingOrientation?: CardinalDirection;
  instructions: string;
  gridWidth: number;
  gridHeight: number;
};

export const InstructionSection = () => {
  const onSubmit = (values: InitialValues) => {
    const scentPoints = getEdgePointsStorage();

    const response = calculateCoordinates(
      values.x,
      values.y,
      values.startingOrientation || "N",
      values.instructions,
      values.gridWidth,
      values.gridHeight,
      scentPoints,
    );

    if (response?.robotFellOff) {
      storeEdgePoint(response?.x, response?.y);
      alert(`Robot was lost at (${response.x}, ${response.y})`);
    } else {
      alert(
        `Robot's final coordinates are (${response?.x}, ${response?.y}) ${response?.currentStep}`,
      );
    }
  };

  const initialValues: InitialValues = {
    x: 0,
    y: 0,
    startingOrientation: "N",
    instructions: "",
    gridWidth: 5,
    gridHeight: 3,
  };

  return (
    <Formik<InitialValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <div>
          <div style={{ display: "flex", gap: 24 }}>
            <Input name="gridWidth" label="Grid Width" type="number" />
            <Input name="gridHeight" label="Grid Height" type="number" />
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <Input name="x" label="X Coordinates" type="number" max={50} />
            <Input name="y" label="Y Coordinates" type="number" max={50} />
            <Input
              name="startingOrientation"
              label="Starting Orientation"
              maxLength={1}
            />
          </div>
          <Input name="instructions" label="Instructions" maxLength={100} />
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </Formik>
  );
};
