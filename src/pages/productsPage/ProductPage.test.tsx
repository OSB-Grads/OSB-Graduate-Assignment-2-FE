import { render, screen, waitFor } from "@testing-library/react";
import ProductPage from "./ProductPage";
import { useNavigate, MemoryRouter } from "react-router-dom";
import useProductStore from "../../store/ProductStore/ProductStore";

// Define mocks
const mockFetchProductDetails = jest.fn();
const mockUseProductStore = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../store/ProductStore/ProductStore", () => ({
  __esModule: true,
  default:()=> mockUseProductStore(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProductPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    mockUseProductStore.mockReturnValue({
      products: [
        { productId: "FD001", description: "Fixed Deposit", interestRate: 7.2 },
        { productId: "SAV123", description: "Savings Account", interestRate: 4.5 },
        { productId: "INV789", description: "Investment Plan", interestRate: 6.1 },
      ],
      loading: false,
      error: false,
      fetchProductDetails: mockFetchProductDetails,
    });
  });

  test("should call fetchProductDetails on mount", () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );
    expect(mockFetchProductDetails).toHaveBeenCalledTimes(1);
  });

  test("should render 'Products' header", () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("should navigate to /genericError if error occurs", async () => {
    (mockUseProductStore).mockReturnValue({
      products: [],
      loading: false,
      error: true,
      fetchProductDetails: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/genericError");
    });
  });

  test("should render products correctly", () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    );

    expect(screen.getByText("FIXED DEPOSIT-FD001")).toBeInTheDocument();
    expect(screen.getByText("SAVINGS-SAV123")).toBeInTheDocument();
    expect(screen.getByText("Investment Plan")).toBeInTheDocument();
    expect(screen.getByText("7.2")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("6.1")).toBeInTheDocument();
  });
});
