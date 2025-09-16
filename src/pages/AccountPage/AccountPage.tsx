import React, { useEffect, useState, type JSX } from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";

import "./AccountPage.css";
import TableComponent from "../../components/TableComponent/TableComponent";
import axiosInstance from "../../utils/httpClientUtil";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Error404 from "../ErrorPages/Error404";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal";

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
  const navigate = useNavigate();
  const [open,setOpen]=useState(false);
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

  const addAccount = (acc: any) => {
    setAccounts(prev => [...prev, acc]);
  }

  const table = accounts.map((item) => ({
    AccountNumber: item.accountNumber,
    Account: item.accountType,
    Balance: item.balance,
    LastUpdated: new Date(item.accountUpdated).toLocaleDateString(),
    Action: (
      <Link to={`/account-details/${item.accountNumber}`} className="table-link">View Details</Link>
    ),
  }));
    useEffect(()=>{
      if(accountsError!=null){
       navigate('/error404')
      }
    },[])
    
  
  

  return (
    <div className="accountpage-container">
      <div className="accountpage-heading">
        <div className="accountpage-heading-name">
          <span>Accounts</span>
        </div>
        <ButtonComponent
          label="Create Account"
          onClick={()=> setOpen(true)}
          type="button"
          variant="secondary"
        />
        <CreateAccountModal open={open} setOpen={setOpen} addAccount={addAccount}/>
      </div>
      
        <div className="accounts-dispaly-page">
          <TableComponent tableheader={tableheader} tabledata={table} />
        </div>
      
    </div>
  );
};

export default AccountPage;
