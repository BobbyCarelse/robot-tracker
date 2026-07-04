import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  const MockText = "Mock Text";

  const asyncEvent = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should render props", () => {
    render(<Button>{MockText}</Button>);

    expect(screen.getByText(MockText)).toBeInTheDocument();
  });

  it("should have a valid onclick", async () => {
    const MockOnClick = jest.fn();

    render(<Button onClick={MockOnClick}>{MockText}</Button>);

    const button = screen.getByText(MockText);

    await asyncEvent.click(button);

    expect(MockOnClick).toHaveBeenCalledTimes(1);
  });
});
