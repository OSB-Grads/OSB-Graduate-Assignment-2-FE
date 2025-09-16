import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AccountDetails from "./accountDetails";

import type { AccountDto } from "../../store/AccountStore/accountStore.interface";
import type { TransactionDTO } from "../../store/AccountStore/accountStore.interface";

//  Mock Zustand store
import useAccountStore from "../../store/AccountStore/accountStore";
jest.mock("../../store/AccountStore/accountStore");

//  Mock useNavigate and useParams from react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: () => ({ accountNumber: "1234567890" }),
}));

describe("AccountDetails", () => {
  const fetchAccountMock = jest.fn();
  const fetchTransactionsMock = jest.fn();

  const baseAccount: AccountDto = {
    accountNumber: "1234567890",
    accountType: "SAVINGS", 
    accountCreated: "2025-01-01",
    accountUpdated: "2025-02-01",
    balance: 5000,
  };

  const baseTransactions: TransactionDTO[] = [
    {
      fromAccount: "1234567890",
      toAccount: "9876543210",
      description: "Salary",
      amount: 1000,
      status: "COMPLETED",
      type: "DEPOSIT",
      createdAt: "2025-01-10",
    },
    {
      fromAccount: "1234567890",
      toAccount: "5678901234",
      description: "Rent",
      amount: 500,
      status: "COMPLETED",
      type: "WITHDRAWAL",
      createdAt: "2025-01-15",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      account: baseAccount,
      transactions: baseTransactions,
      loading: false,
      error: null,
      fetchAccount: fetchAccountMock,
      fetchTransactions: fetchTransactionsMock,
    });
  });

  test("renders account details correctly with dummy props", () => {
    render(
      <BrowserRouter>
        <AccountDetails
          dummyAccount={baseAccount}
          dummyTransactions={baseTransactions}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("SAVINGS ACCOUNT")).toBeInTheDocument();
    expect(screen.getByText(/Account Number:/)).toBeInTheDocument();
    expect(screen.getByText("Balance: $5000.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Transfer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Initiate Payment/i })).toBeInTheDocument();
  });

  test("calls fetchAccount and fetchTransactions when no dummy data", () => {
    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(fetchAccountMock).toHaveBeenCalledWith("1234567890");
    expect(fetchTransactionsMock).toHaveBeenCalledWith("1234567890");
  });

  test("shows loading state", () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      account: null,
      transactions: [],
      loading: true,
      error: null,
      fetchAccount: fetchAccountMock,
      fetchTransactions: fetchTransactionsMock,
    });

    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading account...")).toBeInTheDocument();
  });

  test("navigates to GenericError when error occurs", () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      account: null,
      transactions: [],
      loading: false,
      error: "Something went wrong",
      fetchAccount: fetchAccountMock,
      fetchTransactions: fetchTransactionsMock,
    });

    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/GenericError", {
      state: { message: "Something went wrong" },
    });
  });

  test("navigates to GenericError when account not found", () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      account: null,
      transactions: [],
      loading: false,
      error: null,
      fetchAccount: fetchAccountMock,
      fetchTransactions: fetchTransactionsMock,
    });

    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/GenericError", {
      state: { message: "Account Not Found" },
    });
  });

  test("navigates to transfer and initiate payment on button click", () => {
    render(
      <BrowserRouter>
        <AccountDetails
          dummyAccount={baseAccount}
          dummyTransactions={baseTransactions}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Transfer/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/transfer", {
      state: { accountNumber: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Initiate Payment/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/initiate-payment", {
      state: { accountNumber: "1234567890" },
    });
  });

  test("renders transactions in table", () => {
    render(
      <BrowserRouter>
        <AccountDetails
          dummyAccount={baseAccount}
          dummyTransactions={baseTransactions}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("+$1000.00")).toBeInTheDocument();
    expect(screen.getByText("+$500.00")).toBeInTheDocument();
  });
});
