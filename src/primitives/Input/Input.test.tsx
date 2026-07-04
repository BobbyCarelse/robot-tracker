import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  const MockName = "MockName";
  const MockPlaceholder = "Mock Placeholder";

  const asyncEvent = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should render correctly", () => {
    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        <Input name={MockName} placeholder={MockPlaceholder} />
      </Formik>,
    );

    expect(screen.getByPlaceholderText(MockPlaceholder)).toBeInTheDocument();
  });

  it("should be editable", async () => {
    const MockText = "This is the mock data to fill";
    const MockTestID = "MOCK_TEST_ID";

    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        <Input
          name={MockName}
          placeholder={MockPlaceholder}
          testID={MockTestID}
        />
      </Formik>,
    );

    const input = screen.getByPlaceholderText(MockPlaceholder);

    await asyncEvent.type(input, MockText);

    expect(screen.getByDisplayValue(MockText)).toBeInTheDocument();
  });
});
