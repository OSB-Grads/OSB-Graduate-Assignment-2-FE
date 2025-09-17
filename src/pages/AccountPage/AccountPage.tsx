import React, { useEffect, useState, type JSX } from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./AccountPage.css";
import TableComponent from "../../components/TableComponent/TableComponent";
import { Link, useNavigate } from "react-router-dom";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal";
import useAccountStore from "../../store/AccountStore/accountStore";

const tableheader = [
  "AccountNumber",
  "Account",
  "Balance",
  "LastUpdated",
  "Action",
];

const AccountPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { accounts, accountError, accountLoading} = useAccountStore();

  const table = accounts.map((item) => ({
    AccountNumber: item.accountNumber,
    Account: item.accountType,
    Balance: item.balance,
    LastUpdated: new Date(item.accountUpdated).toLocaleDateString(),
    Action: (
      <Link to={`/account-details/${item.accountNumber}`} className="table-link">View Details</Link>
    ),
  }));

  useEffect(() => {
    if (accountError!= null) {
      navigate('/genericError')
    }
  }, [])




  return (
    <div className="accountpage-container">
      <div className="accountpage-heading">
        <div className="accountpage-heading-name">
          <span>Accounts</span>
        </div>
        <ButtonComponent
          label="Create Account"
          onClick={() => setOpen(true)}
          type="button"
          variant="secondary"
        />
        <CreateAccountModal open={open} setOpen={setOpen} />
      </div>
      {!accountError && !accountLoading &&
        <div className="accounts-dispaly-page">
          <TableComponent tableheader={tableheader} tabledata={table} />
        </div>}

    </div>
  );
};

export default AccountPage;
