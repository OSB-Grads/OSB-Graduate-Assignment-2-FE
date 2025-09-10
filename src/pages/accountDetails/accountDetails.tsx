import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import useAccountStore from "../../store/AccountStore/accountStore";
import type { AccountDto,TransactionDTO } from "../../store/AccountStore/accountStore.interface";
import "./accountDetails.css";


interface AccountDetailsProps {
  accountNumber: string;
  dummyAccount?: AccountDto;
  dummyTransactions?: TransactionDTO[];
}

export default function AccountDetails({
  accountNumber,
  dummyAccount,
  dummyTransactions,
}: AccountDetailsProps) {
  const{account , transactions,loading,error,fetchAccount,fetchTransactions} =useAccountStore();
  const [activeTab, setActiveTab] = useState<"overview" | "transactions">("overview");
  const navigate = useNavigate();

  useEffect(() => {
    if (dummyAccount && dummyTransactions) return;

    fetchAccount(accountNumber);
    fetchTransactions(accountNumber);

  },[accountNumber,dummyAccount,dummyTransactions]);

  const accountData=dummyAccount || account;
  const transactionData=dummyTransactions || transactions;

  if(loading && !dummyAccount) return <div className="loading-message">Loading account...</div>;
  if(error && !dummyAccount) return <div className="error-message">{error}</div>;
  if (!accountData) return <div className="loading-message"> account Not Found...</div>;

  const maskedAccountNumber = "**** **** **** " + accountData.accountNumber.slice(-4);

  // Prepare table data for TableComponent

  const tableHeaders = ["Date", "Description", "Amount", "Balance"];
  const tableData = transactionData.map(txn => ({
    Date: txn.createdAt,
    Description: txn.description,
    Amount: txn.amount < 0 ? `-$${Math.abs(txn.amount)}` : `+$${txn.amount}`,
    Balance: `$${accountData.balance.toFixed(2)}`,
  }));

  return (
    <div className="account-details-container">
      <div className="account-header">
        <h1 className="account-title">{accountData.accountType} ACCOUNT</h1>
        <p className="masked-account-number">Account Number: {maskedAccountNumber}</p>
        <p className="account-balance">Balance: ${accountData.balance.toFixed(2)}</p>
        <div className="action-buttons">
          <ButtonComponent
            label="Transfer"
            onClick={() =>
              navigate("/transfer", { state: { accountNumber: accountData.accountNumber } })
            }
            variant="primary"
          />
          <ButtonComponent
            label="Initiate Payment"
            onClick={() =>
              navigate("/initiate-payment", { state: { accountNumber: accountData.accountNumber } })
            }
            variant="secondary"
          />
        </div>
      </div>

      <div className="tab-navigation">
  <div
    className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
    onClick={() => setActiveTab("overview")}
  >
    Overview
  </div>
  <div
    className={`tab ${activeTab === "transactions" ? "tab-active" : ""}`}
    onClick={() =>
      navigate("/transactions", { state: { accountNumber: accountData.accountNumber } })
    }
  >
    Transactions
  </div>
</div>

      {activeTab === "overview" && (
        <div className="account-overview">
          <h2 className="account-overview-header">Account details</h2>
          <div className="account-type">
            <p>Account Type</p>
            <strong>{accountData.accountType}</strong>
          </div>
          <div className="masked-account-number">
            <p>Account Number</p>
            <strong>{maskedAccountNumber}</strong>
          </div>
          <div className="account-created-date">
            <p>Created At</p>
            <strong>{accountData.accountCreated}</strong>
          </div>
          <div className="account-updated-date">
            <p>Last Updated</p>
            <strong>{accountData.accountUpdated}</strong>
          </div>
          <div className="account-balance">
            <p>Balance</p>
            <strong>${accountData.balance.toFixed(2)}</strong>
          </div>
        </div>
      )}

      <h2 className="transactions-title">Recent Transactions</h2>
      <div className="recent-transactions">
        <TableComponent tableheader={tableHeaders} tabledata={tableData} />
      </div>
    </div>
  );
}
