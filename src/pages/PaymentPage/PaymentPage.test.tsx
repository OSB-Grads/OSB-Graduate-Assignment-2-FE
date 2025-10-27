import { render, screen, fireEvent } from "@testing-library/react";
import PaymentPage from "./PaymentPage";
import useTransactionStore from "../../store/transactionStore/transactionStore";
import useAccountStore from "../../store/AccountStore/accountStore";
import { MemoryRouter } from "react-router-dom";

// 🧩 Mock the stores
const mockTransferAmountBetweenAccounts = jest.fn();

const mockAccounts = [
  { accountNumber: "ACC123" },
  { accountNumber: "ACC456" },
];

jest.mock("../../store/transactionStore/transactionStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../store/AccountStore/accountStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWithRouter = (state?: any) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/payments", state }]}>
      <PaymentPage />
    </MemoryRouter>
  );
};

describe("PaymentPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      transferAmountBetweenAccounts: mockTransferAmountBetweenAccounts,
    });

    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      accounts: mockAccounts,
    });
  });

  test("renders all main elements correctly", () => {
    renderWithRouter();

    expect(screen.getByText("Make Payments")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0.0")).toBeInTheDocument();
    expect(screen.getAllByText("From Account Number")[0]).toBeInTheDocument();
    expect(screen.getAllByText("To Account Number")[0]).toBeInTheDocument();
    expect(screen.getByText("Make Payment")).toBeInTheDocument();
  });

  test("renders account numbers in dropdowns", () => {
     renderWithRouter();

    // Find both selects
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);

    // Click to open one of the selects
    fireEvent.mouseDown(selects[0]);

    // Expect accounts to be listed
    expect(screen.getByText("ACC123")).toBeInTheDocument();
    expect(screen.getByText("ACC456")).toBeInTheDocument();
  });

  test("updates amount field when typing", () => {
     renderWithRouter();

    const amountInput = screen.getByPlaceholderText("0.0");
    fireEvent.change(amountInput, { target: { value: "5000" } });

    expect((amountInput as HTMLInputElement).value).toBe("5000");
  });

  test("shows 'To Account Number' input when 'Another Customer' is selected", () => {
    renderWithRouter();

    const selects = screen.getAllByRole("combobox");
    const toSelect = selects[1];

    // Open dropdown
    fireEvent.mouseDown(toSelect);

    // Select "Another Customer"
    fireEvent.click(screen.getByText("Another Customer"));

    // Expect "To Account Number" input to appear
    expect(screen.getAllByText("To Account Number")[1]).toBeInTheDocument();
  });

  test("calls transferAmountBetweenAccounts when Make Payment clicked", async () => {
    renderWithRouter();

    const amountInput = screen.getByPlaceholderText("0.0");
    fireEvent.change(amountInput, { target: { value: "1000" } });

    const selects = screen.getAllByRole("combobox");
    const fromSelect = selects[0];
    const toSelect = selects[1];

    // Select 'From Account'
    fireEvent.mouseDown(fromSelect);
    fireEvent.click(await screen.findByText("ACC123"));

    // Open 'To Account' dropdown
    fireEvent.mouseDown(toSelect);

    // ✅ Wait until the visible ACC456 option actually appears


    const option = await screen.findByText("ACC456", {}, { timeout: 2000 });
    fireEvent.click(option);


    // Click the Make Payment button
    const button = screen.getByText("Make Payment");
    fireEvent.click(button);

    // Assert the mock was called correctly
    expect(mockTransferAmountBetweenAccounts).toHaveBeenCalledWith(
      "ACC123",
      "ACC456",
      1000
    );
  });
  test("clears input fields after successful transaction", async() => {
     renderWithRouter();

    const amountInput = screen.getByPlaceholderText("0.0");
    fireEvent.change(amountInput, { target: { value: "1500" } });
    const selects = screen.getAllByRole("combobox");
    fireEvent.mouseDown(selects[0]);
    fireEvent.click(screen.getByText("ACC123"));
    fireEvent.mouseDown(selects[1]);
    const option = await screen.findByText("ACC456", {}, { timeout: 2000 });
    fireEvent.click(option);
    fireEvent.click(screen.getByText("Make Payment"));
    expect(mockTransferAmountBetweenAccounts).toHaveBeenCalledTimes(1);
    expect((amountInput as HTMLInputElement).value).toBe("");
  });
});
