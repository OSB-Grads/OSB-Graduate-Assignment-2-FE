import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useUserStore from "../../store/userstore/userstore";
import ViewUserProfile from "./ViewProfilePage";

jest.mock('../../store/userstore/userstore');


jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));

const mockUser = {
    name: "Dummy User",
    email: "Dummy@email.com",
    phone: "1234567890",
    address: "dummy address"
}
const mockGetUser = jest.fn();
const mockUpdateUser = jest.fn();

beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
        user: mockUser,
        getUser: mockGetUser,
        updateUser: mockUpdateUser,
    });
    mockGetUser.mockClear();
    mockUpdateUser.mockClear();
})
describe.only('ViewUserProfile', () => {
    test('Display profile', async () => {
        render(<ViewUserProfile />);
        expect(screen.getByPlaceholderText("Firstname")).toHaveValue("Dummy");
        expect(screen.getByPlaceholderText("Lastname")).toHaveValue("User");
        expect(screen.getByPlaceholderText("Email")).toHaveValue("Dummy@email.com");
        expect(screen.getByPlaceholderText("phone")).toHaveValue("1234567890");
        expect(screen.getByPlaceholderText("Address")).toHaveValue("dummy address");

        expect(screen.getByPlaceholderText("Firstname")).toBeDisabled();
        expect(screen.getByPlaceholderText("Lastname")).toBeDisabled();
        expect(screen.getByPlaceholderText("Email")).toBeDisabled();
        expect(screen.getByPlaceholderText("phone")).toBeDisabled();
        expect(screen.getByPlaceholderText("Address")).toBeDisabled();
    });


    test('check if edit button works', async () => {
        render(<ViewUserProfile />)

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(screen.getByPlaceholderText("Firstname")).not.toBeDisabled();
        expect(screen.getByPlaceholderText("Lastname")).not.toBeDisabled();
        expect(screen.getByPlaceholderText("Email")).not.toBeDisabled();
        expect(screen.getByPlaceholderText("phone")).not.toBeDisabled();
        expect(screen.getByPlaceholderText("Address")).not.toBeDisabled();

    });

    test('update profile', async () => {
        render(<ViewUserProfile />)

        const button = screen.getByRole("button");
        fireEvent.click(button);

        fireEvent.change(screen.getByPlaceholderText("Firstname"), { target: { value: "NewDummy" } });
        fireEvent.change(screen.getByPlaceholderText("Lastname"), { target: { value: "User" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "NewDummy@email.com" } });
        fireEvent.change(screen.getByPlaceholderText("phone"), { target: { value: "0123456789" } });
        fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "NewDummy address" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockUpdateUser).toHaveBeenCalledWith(
                "NewDummy User",
                "NewDummy@email.com",
                "0123456789",
                "NewDummy address"
            );
        });

    });

});