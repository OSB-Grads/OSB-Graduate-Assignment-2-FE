import React, { useEffect, type JSX } from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";

import "./AccountPage.css";
import TableComponent from "../../components/TableComponent/TableComponent";
import axiosInstance from "../../utils/httpClientUtil";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Error404 from "../ErrorPages/Error404";

interface AccountData {
  accountNumber: string;
  accountType: string;
  balance: number;
  accountUpdated: string;
}
const defaultAccounts: AccountData[] = [
  {
    accountNumber: "1234567890",
    accountType: "Savings",
    balance: 2500.75,
    accountUpdated: "2025-09-09T12:30:00",
  },
];

const tableheader = [
  "AccountNumber",
  "Account",
  "Balance",
  "LastUpdated",
  "Action",
];

const AccountPage = () => {
  const [accounts, setAccounts] =
    React.useState<AccountData[]>(defaultAccounts);
  const [accountsLoading, setAccountsLoading] = React.useState<boolean>(true);
  const [accountsError, setAccountsError] = React.useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/accounts")
      .then((res) => {
        const accountsdetails = res.data.map((account: AccountData) => ({
          accountNumber: account.accountNumber,
          accountType: account.accountType,
          balance: account.balance,
          accountUpdated: account.accountUpdated,
        }));
        setAccounts(accountsdetails);
        setAccountsLoading(false);
      })
      .catch((err) => {
        setAccountsError("Failed to fetch the accounts");
        setAccountsLoading(false);
      });
  }, []);

  const table = accounts.map((item) => ({
    AccountNumber: item.accountNumber,
    Account: item.accountType,
    Balance: item.balance,
    LastUpdated: new Date(item.accountUpdated).toLocaleDateString(),
    Action: (
      <Link to={`/account-details/${item.accountNumber}`} className="table-link">View Details</Link>
    ),
  }));

  return (
    <div className="accountpage-container">
      <div className="accountpage-heading">
        <div className="accountpage-heading-name">
          <span>Accounts</span>
        </div>
        <ButtonComponent
          label="Create Account"
          type="button"
          variant="secondary"
        />
      </div>
      {!accountsLoading && !accountsError ? (
        <div className="accounts-dispaly-page">
          <TableComponent tableheader={tableheader} tabledata={table} />
        </div>
      ) : (
        <Error404></Error404>
      )}
    </div>
  );
};

export default AccountPage;
