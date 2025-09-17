import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AccountPage from "./AccountPage";

// Mock the CreateAccountModal so it doesn't import product store or anything complex
jest.mock("../CreateAccountModal/CreateAccountModal", () => (props: any) =>
  props.open ? <div>Mock CreateAccountModal Open</div> : null
);

// Mock the account store like in your Home test example
jest.mock("../../store/AccountStore/accountStore.tsx", () => ({
  __esModule: true,
  default: () => ({
    accounts: [
      {
        accountNumber: "12345678",
        accountType: "SAVINGS",
        balance: 1000,
        accountUpdated: new Date("2024-09-17T12:00:00Z").toISOString(),
      },
      {
        accountNumber: "87654321",
        accountType: "CHECKING",
        balance: 500,
        accountUpdated: new Date("2024-09-16T12:00:00Z").toISOString(),
      },
    ],
    accountLoading: false,
    accountError: null,
  }),
}));

// Mock react-router-dom's useNavigate and Link
jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("./AccountPage.css", () => ({}));

describe("AccountPage Component", () => {
  it("renders heading and Create Account button", () => {
    render(
      <Router>
        <AccountPage />
      </Router>
    );

    expect(screen.getByText("Accounts")).toBeInTheDocument();

    const createButton = screen.getByRole("button", { name: /create account/i });
    expect(createButton).toBeInTheDocument();
  });

  it("renders accounts data in the table", () => {
    render(
      <Router>
        <AccountPage />
      </Router>
    );

    // Check for account numbers
    expect(screen.getByText("12345678")).toBeInTheDocument();
    expect(screen.getByText("87654321")).toBeInTheDocument();

    // Check for account types
    expect(screen.getByText("SAVINGS")).toBeInTheDocument();
    expect(screen.getByText("CHECKING")).toBeInTheDocument();

    // Check for balances
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();

    // Check for "View Details" links
    const links = screen.getAllByText("View Details");
    expect(links.length).toBe(2);

    // Check if links href are correct
    expect(links[0].getAttribute("href")).toBe("/account-details/12345678");
    expect(links[1].getAttribute("href")).toBe("/account-details/87654321");
  });

  it("opens CreateAccountModal when Create Account button is clicked", () => {
    render(
      <Router>
        <AccountPage />
      </Router>
    );

    const createButton = screen.getByRole("button", { name: /create account/i });
    fireEvent.click(createButton);

    // Since we mocked CreateAccountModal, check if mock text is shown when open
    expect(screen.getByText("Mock CreateAccountModal Open")).toBeInTheDocument();
  });

  
  
});
