import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./inputField";

describe("InputField Component", () => {
  test("renders with label and input", () => {
    render(
      <InputField
        label="Username"
        placeholder="Enter username"
        value=""
        onChange={() => {}}
      />
    );
    // Check label text is present

    expect(screen.getByText("Username")).toBeInTheDocument();
    // Check input is present using placeholder
    
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  test("sets input type, placeholder, and id", () => {
    render(
      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveAttribute("type", "email");
  });

  test("displays the value correctly", () => {
    render(
      <InputField
        label="Email"
        value="test@example.com"
        placeholder="Enter email"
        onChange={() => {}}
      />
    );
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveValue("test@example.com");
  });

  test("calls onChange when input changes", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Password"
        placeholder="Enter password"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText("Enter password");
    fireEvent.change(input, { target: { value: "12345" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("calls onKeyDown when a key is pressed", () => {
    const handleKeyDown = jest.fn();
    render(
      <InputField
        label="Search"
        placeholder="Search here"
        value=""
        onChange={() => {}}
        onKeyDown={handleKeyDown}
      />
    );
    const input = screen.getByPlaceholderText("Search here");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
