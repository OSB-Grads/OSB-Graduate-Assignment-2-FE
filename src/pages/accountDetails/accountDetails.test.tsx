import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AccountDetails from "./accountDetails";

import useAccountStore from "../../store/AccountStore/accountStore";
import useTransactionStore from "../../store/transactionStore/transactionStore";
import type { AccountDto } from "../../store/AccountStore/accountStore.interface";
import type { transactionDTO } from "../../store/transactionStore/transactionStore.interface";
import { fetchTransactionFromAccountnumber } from "../../store/transactionStore/transactionStore.logic";

jest.mock("../../store/AccountStore/accountStore");
jest.mock("../../store/transactionStore/transactionStore");

jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));
// Mock useNavigate and useParams
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: () => ({ accountNumber: "1234567890" }),
}));

describe("AccountDetails Component", () => {
  const fetchAccountMock = jest.fn();
  const fetchTransactionMock = jest.fn();

  const baseAccount: AccountDto = {
    accountNumber: "1234567890",
    accountType: "SAVINGS",
    accountCreated: "2025-01-01",
    accountUpdated: "2025-02-01",
    balance: 5000,
  };

  const baseTransactions: transactionDTO[] = [
    {
      fromAccount: "1234567890",
      toAccount: "9876543210",
      description: "Salary",
      amount: 1000,
      type: "DEPOSIT",
      createdAt: "2025-01-10",
    },
    {
      fromAccount: "1234567890",
      toAccount: "5678901234",
      description: "Rent",
      amount: 500,
      type: "WITHDRAW",
      createdAt: "2025-01-15",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Account Store
    (useAccountStore as unknown as jest.Mock).mockReturnValue({
      account: baseAccount,
      loadingFetchAccount: false,
      errorFetchAccount: null,
      fetchAccount: fetchAccountMock,
    });

    // Mock Transaction Store
    (useTransactionStore as unknown as jest.Mock).mockReturnValue({
      transactionsFromAccountnumber: baseTransactions,
      loadingTransactionsByAccount: false,
      errorTransactionsByAccount: null,
      fetchTransactionFromAccountnumber: fetchTransactionMock,
    });
  });

  test("renders account details correctly", () => {
    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("SAVINGS ACCOUNT")).toBeInTheDocument();
    expect(screen.getByText(/Account Number:/)).toBeInTheDocument();
    expect(screen.getByText("Balance: $5000.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Transfer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Initiate Payment/i })).toBeInTheDocument();
  });


  test("shows loading state when fetching data", () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValueOnce({
      account: null,
      loadingFetchAccount: true,
      errorFetchAccount: null,
      fetchAccount: fetchAccountMock,
    });

    (useTransactionStore as unknown as jest.Mock).mockReturnValueOnce({
      transactionsFromAccountnumber: [],
      loadingTransactionsByAccount: true,
      errorTransactionsByAccount: null,
      fetchTransactionFromAccountnumber: fetchTransactionMock,
    });

    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading account...")).toBeInTheDocument();
  });

  test("navigates to GenericError on account fetch error", () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValueOnce({
      account: null,
      loadingFetchAccount: false,
      errorFetchAccount: "Something went wrong",
      fetchAccount: fetchAccountMock,
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

  test("navigates to GenericError when account not found", async () => {
    (useAccountStore as unknown as jest.Mock).mockReturnValueOnce({
      account: null,
      loadingFetchAccount: false,
      errorFetchAccount: null,
      fetchAccount: fetchAccountMock,
    });

    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/GenericError", {
        state: { message: "Account Not Found" },
      });
    });
  });

  test("navigates correctly on Transfer and Initiate Payment click", () => {
    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Transfer/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/payments", {
      state: { accountNumber: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Initiate Payment/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/payments", {
      state: { accountNumber: "1234567890", mode: "makePayment" },
    });
  });

  test("renders transactions correctly in table", () => {
    render(
      <BrowserRouter>
        <AccountDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("+$1000.00")).toBeInTheDocument();
    expect(screen.getByText("-$500.00")).toBeInTheDocument();
  });
});
