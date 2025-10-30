import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminPage from "./AdminPage";
import type { JSX } from "react";

const mockFetchProductDetails=jest.fn();
const mockFetchAllAccountDetails=jest.fn();
const mockLogStore=jest.fn();
const mockUserDetailsStore=jest.fn();

// --- Mock dependencies ---
jest.mock("../../store/ProductStore/ProductStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    products: [{ productId: "P1", productName: "Product A" }],
    fetchProductDetails: mockFetchProductDetails,
  })),
}));

jest.mock("../../store/AccountStore/accountStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    allAccountsForAdmin: [{ accountNumber: "A1", accountType: "Savings" }],
    fetchAllAccountsByAdmin: mockFetchAllAccountDetails,
  })),
}));

jest.mock("../../store/userstore/userstore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    userDataForAdmin: [{ name: "User1", email: "user1@example.com" }],
    fetchAllUsersForAdmin: mockUserDetailsStore,
  })),
}));

jest.mock("../../store/LogStore/logStore", () => ({
  __esModule: true,
  useLogStore: jest.fn(() => ({
    logData: [{ id: 1, action: "CREATE", status: "SUCCESS" }],
    fetchAllLogsForAdmin: mockLogStore,
  })),
}));

jest.mock("../../components/Button/ButtonComponent", () => ({
  __esModule: true,
  default: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick}>{label}</button>
  ),
}));

jest.mock("../../components/CollapsibleCard/CollapsibleCard", () => ({
  __esModule: true,
  default: ({ title, answer }: { title: string; answer: JSX.Element }) => (
    <div>
      <h4>{title}</h4>
      <div>{answer}</div>
    </div>
  ),
}));

jest.mock("../../components/ProductModal/CUProductModal", () => ({
  __esModule: true,
  default: ({ open, preSelectedOperation }: any) =>
    open ? <div data-testid="cu-modal">{preSelectedOperation} Modal</div> : null,
}));

jest.mock("../../components/DeleteModalProductModal/DeleteProductModal", () => ({
  __esModule: true,
  default: ({ open }: any) => (open ? <div data-testid="delete-modal">Delete Modal</div> : null),
}));

jest.mock("../../components/TableComponent/TableComponent", () => ({
  __esModule: true,
  default: ({ tableheader, tabledata }: any) => (
    <table data-testid="table">
      <thead>
        <tr>
          {tableheader.map((head: string) => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tabledata.map((row: any, i: number) => (
          <tr key={i}>
            {Object.values(row).map((val: any, j: number) => (
              <td key={j}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe("AdminPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Admin Page header", () => {
    render(<AdminPage />);
    expect(screen.getByText("Admin Page")).toBeInTheDocument();
  });

  it("renders all major sections (Products, Accounts, Users, Logs)", () => {
    render(<AdminPage />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Logs")).toBeInTheDocument();
  });

  it("renders product, account, user, and log tables", () => {
    render(<AdminPage />);
    const tables = screen.getAllByTestId("table");
    expect(tables.length).toBe(4);
  });

  it("calls all fetch functions on mount", async () => {

    render(<AdminPage />);

    await waitFor(() => {
      expect(mockFetchProductDetails).toHaveBeenCalled();
      expect(mockFetchProductDetails).toHaveBeenCalled();
      expect(mockLogStore).toHaveBeenCalled();
      expect(mockUserDetailsStore).toHaveBeenCalled();
    });
  });

  it("opens Create Product modal when button clicked", () => {
    render(<AdminPage />);
    const createBtn = screen.getByText("Create Product");
    fireEvent.click(createBtn);
    expect(screen.getByTestId("cu-modal")).toHaveTextContent("Create Modal");
  });

  it("opens Update Product modal when button clicked", () => {
    render(<AdminPage />);
    const updateBtn = screen.getByText("Update Product");
    fireEvent.click(updateBtn);
    expect(screen.getByTestId("cu-modal")).toHaveTextContent("Update Modal");
  });

  it("opens Delete Product modal when button clicked", () => {
    render(<AdminPage />);
    const deleteBtn = screen.getByText("Delete Product");
    fireEvent.click(deleteBtn);
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
  });
});
