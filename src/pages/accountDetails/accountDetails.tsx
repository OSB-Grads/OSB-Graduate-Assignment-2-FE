import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import "./accountDetails.css";

interface AccountDto {
  accountNumber: string;
  accountType: "SAVINGS" | "FIXED_DEPOSIT";
  balance: number;
  accountCreated: string;
  accountUpdated: string;
}

interface TransactionDTO {
  fromAccount: string;
  toAccount: string;
  description: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  createdAt: string;
}

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
  const [account, setAccount] = useState<AccountDto | null>(dummyAccount || null);
  const [transactions, setTransactions] = useState<TransactionDTO[]>(dummyTransactions || []);
  const [activeTab, setActiveTab] = useState<"overview" | "transactions">("overview");
  const navigate = useNavigate();

  useEffect(() => {
    if (dummyAccount && dummyTransactions) return;

    async function fetchData() {
      try {
        const acc = await fetch(`/api/v1/accounts/${accountNumber}`).then(res => res.json());
        setAccount(acc);

        const txns = await fetch(`/api/v1/transactions/${accountNumber}`).then(res => res.json());
        setTransactions(txns.slice(-5).reverse());
      } catch (err) {
        console.error("Error fetching account/transactions:", err);
      }
    }

    fetchData();
  }, [accountNumber, dummyAccount, dummyTransactions]);

  if (!account) return <div className="loading-message">Loading account...</div>;

  const maskedAccountNumber = "**** **** **** " + account.accountNumber.slice(-4);

  // Prepare table data for TableComponent

  const tableHeaders = ["Date", "Description", "Amount", "Balance"];
  const tableData = transactions.map(txn => ({
    Date: txn.createdAt,
    Description: txn.description,
    Amount: txn.amount < 0 ? `-$${Math.abs(txn.amount)}` : `+$${txn.amount}`,
    Balance: `$${account.balance.toFixed(2)}`,
  }));

  return (
    <div className="account-details-container">
      <div className="account-header">
        <h1 className="account-title">{account.accountType} ACCOUNT</h1>
        <p className="masked-account-number">Account Number: {maskedAccountNumber}</p>
        <p className="account-balance">Balance: ${account.balance.toFixed(2)}</p>
        <div className="action-buttons">
          <ButtonComponent
            label="Transfer"
            onClick={() =>
              navigate("/transfer", { state: { accountNumber: account.accountNumber } })
            }
            variant="primary"
          />
          <ButtonComponent
            label="Initiate Payment"
            onClick={() =>
              navigate("/initiate-payment", { state: { accountNumber: account.accountNumber } })
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
      navigate("/transactions", { state: { accountNumber: account.accountNumber } })
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
            <strong>{account.accountType}</strong>
          </div>
          <div className="masked-account-number">
            <p>Account Number</p>
            <strong>{maskedAccountNumber}</strong>
          </div>
          <div className="account-created-date">
            <p>Created At</p>
            <strong>{account.accountCreated}</strong>
          </div>
          <div className="account-updated-date">
            <p>Last Updated</p>
            <strong>{account.accountUpdated}</strong>
          </div>
          <div className="account-balance">
            <p>Balance</p>
            <strong>${account.balance.toFixed(2)}</strong>
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
