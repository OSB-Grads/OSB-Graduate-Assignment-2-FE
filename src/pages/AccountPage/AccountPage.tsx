import React, { useEffect, type JSX } from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./AccountPage.css";
import TableComponent from "../../components/TableComponent/TableComponent";
import { Link } from "react-router-dom";
import Error404 from "../ErrorPages/Error404";
import useAccountStore from "../../store/AccountStore/accountStore";

const tableheader = [
  "AccountNumber",
  "Account",
  "Balance",
  "LastUpdated",
  "Action",
];

const AccountPage = () => {
    const {accounts,accountError,accountLoading,fetchAllAccounts}=useAccountStore();

    useEffect(()=>{
      fetchAllAccounts();
    },[])

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
      {!accountError && !accountLoading ? (
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
