import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TransactionPage from "./TransactionPage";

jest.mock("../../components/TableComponent/TableComponent", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      console.log("TableComponent received data:", props.tabledata); // 👈 Debug log
      const { tableheader, tabledata } = props;
      return (
        <table data-testid="mock-table">
          <thead>
            <tr>
              {tableheader.map((header: string, idx: number) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabledata.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {tableheader.map((field: string) => (
                  <td key={field}>{row[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  };
});

describe("TransactionPage", () => {
  test("renders header and search input", () => {
    render(<TransactionPage />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("calls fetchTransactionDetails on mount", () => {
    render(<TransactionPage />);
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
  });

  test("renders transactions in table", () => {
    render(<TransactionPage />);
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  test("filters transactions based on search input", async () => {
    render(<TransactionPage />);
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Rent" } });

    // 👇 Confirm the input value updated
    expect(screen.getByDisplayValue("Rent")).toBeInTheDocument();

    // 👇 Wait for filtering to reflect
    await waitFor(() => {
      expect(screen.queryByText("Salary")).not.toBeInTheDocument();
      expect(screen.getByText("Rent")).toBeInTheDocument();
    });
  });
});
