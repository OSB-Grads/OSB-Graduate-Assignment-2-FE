import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavItem from "./NavItem";

describe("NavItem component", () => {
  const mockClick = jest.fn();

  const defaultProps = {
    label: "Test Label",
    icon: "test-icon.png",
    handleClick: mockClick,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders label and icon", () => {
    render(<NavItem {...defaultProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();

    const img = screen.getByRole("img"); 
    expect(img).toHaveAttribute("src", "test-icon.png");
  });


  test("calls handleClick when clicked", () => {
    render(<NavItem {...defaultProps} />);
    const item = screen.getByText("Test Label");
    fireEvent.click(item);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });


  test("applies active styles when active is true", () => {
    render(<NavItem {...defaultProps} active={true} />);

    const wrapper = screen.getByText("Test Label").closest(".navbar-element");

    expect(wrapper).toHaveStyle({
      backgroundColor: "var(--color-secondary)",
      paddingLeft: "12px",
    });
  });
  

  test("applies default styles when active is false", () => {
  render(<NavItem {...defaultProps} active={false} />);

  const wrapper = screen.getByText("Test Label").closest(".navbar-element") as HTMLElement;
  expect(wrapper).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  expect(wrapper.style.backgroundColor).toBe("transparent");
  expect(wrapper).toHaveStyle("cursor: pointer");
  expect(wrapper).toHaveStyle("transition: 0.1s linear all");
});

});
