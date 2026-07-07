import * as yup from "yup";
import { cardinalDirections } from "../../constants/app";

export const validationSchema = yup.object().shape({
  x: yup
    .number()
    .max(50, "The maximum x coordinate value is 50")
    .required("Please provide the starting X Coordinate"),
  y: yup
    .number()
    .max(50, "The maximum y coordinate value is 50")
    .required("Please provide the starting Y Coordinate"),
  startingOrientation: yup.string().oneOf(cardinalDirections).notRequired(),
  instructions: yup
    .string()
    .max(100, "You have exceeded the limit for instructions")
    .required("Please enter a step of instructions"),
  gridWidth: yup.number().required("Please provide a grid Width"),
  gridHeight: yup.number().required("Please provide a grid Height"),
});
