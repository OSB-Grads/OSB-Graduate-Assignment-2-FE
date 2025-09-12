import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import Toast from "./ToastComponent";
describe("toast", () => {
    const mockhandle = jest.fn();

    it('displays success message', () => {
        render(
            <Toast
                type="SUCCESS"
                message="this is a success message"
                handleClose={mockhandle}
            />
        );
        expect(screen.getByText("this is a success message")).toBeInTheDocument();
    });
    it("calls the handle close button", () => {
        render(
            <Toast
                type="SUCCESS"
                message="this is a success message"
                handleClose={mockhandle}
            />
        );
        const Button = screen.getByText(String.fromCharCode(10006));
        fireEvent.click(Button);
        expect(mockhandle).toHaveBeenCalled();
    })
});
