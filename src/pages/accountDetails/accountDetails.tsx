import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  transactionStatus: "COMPLETED" | "PENDING" | "FAILED";
  transactionType: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
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
        setTransactions(txns.slice(0, 5));
      } catch (err) {
        console.error("Error fetching account/transactions:", err);
      }
    }

    fetchData();
  }, [accountNumber, dummyAccount, dummyTransactions]);

  if (!account) return <div className="loading-message">Loading account...</div>;

  const maskedAccountNumber = "**** **** **** " + account.accountNumber.slice(-4);

  return (
    <div className="account-details-container">
      <div className="account-header">
        <h1 className="account-title">{account.accountType} ACCOUNT</h1>
        <p className="masked-account-number">Account Number: {maskedAccountNumber}</p>
        <p className="account-balance">Balance: ${account.balance.toFixed(2)}</p>
        <div className="action-buttons">
          <button
            className="transfer-button"
            onClick={() => navigate("/transfer", { state: { accountNumber: account.accountNumber } })}
          >
            Transfer
          </button>
          <button
            className="payment-button"
            onClick={() =>
              navigate("/initiate-payment", { state: { accountNumber: account.accountNumber } })
            }
          >
            Initiate Payment
          </button>
        </div>
      </div>

      <div className="tab-navigation">
        <button
          className={activeTab === "overview" ? "tab-button-active" : "tab-button"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className="tab-button"
          onClick={() =>
            navigate("/transactions", { state: { accountNumber: account.accountNumber } })
          }
        >
          Transactions
        </button>
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
        <table className="transactions-table">
          <thead>
            <tr className="table-header">
              <th className="transaction-cell">Type</th>
              <th className="transaction-cell">Description</th>
              <th className="transaction-cell">Amount</th>
              <th className="transaction-cell">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, idx) => (
                <tr key={idx} className="transaction-row">
                  <td className="transaction-cell">{txn.transactionType}</td>
                  <td className="transaction-cell">{txn.description}</td>
                  <td className="transaction-cell">
                    {txn.amount < 0 ? `-$${Math.abs(txn.amount)}` : `+$${txn.amount}`}
                  </td>
                  <td className="transaction-cell">${account.balance.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr className="no-transactions">
                <td className="transaction-cell" colSpan={4}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
