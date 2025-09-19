import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TableComponent from "../../components/TableComponent/TableComponent";
import useAccountStore from "../../store/AccountStore/accountStore";
import useTransactionStore from "../../store/transactionStore/transactionStore";
import "./AccountDetails.css";



export default function AccountDetails() {
  const { accountNumber: paramAccountNumber } = useParams<{ accountNumber: string }>();
  const navigate = useNavigate();

  const accountNumber = paramAccountNumber;

  // Account store
  const {
    account,
    loadingFetchAccount: loadingAccount,
    errorFetchAccount: accountError,
    fetchAccount,
  } = useAccountStore();

  // Transaction store
  const {
    transactionsFromAccountnumber: transactions,
    loadingTransactionsByAccount: loadingTransactions,
    errorTransactionsByAccount: transactionsError,
    fetchTransactionFromAccountnumber,
  } = useTransactionStore();

  const [activeTab, setActiveTab] = useState<"overview" | "transactions">("overview");

  // Fetch account and transactions when accountNumber changes
  useEffect(() => {
    if (!accountNumber) return;
    fetchAccount(accountNumber);
    fetchTransactionFromAccountnumber(accountNumber);
  }, [accountNumber, fetchAccount, fetchTransactionFromAccountnumber]);

  // Redirect on account fetch error
  useEffect(() => {
    if (accountError) {
      navigate("/GenericError", { state: { message: accountError } });
    }
  }, [accountError, navigate]);

  // Redirect if account not found after loading
  useEffect(() => {
    if (!loadingAccount && !accountError && !account) {
      navigate("/GenericError", { state: { message: "Account Not Found" } });
    }
  }, [loadingAccount, account, accountError, navigate]);

  if (loadingAccount || loadingTransactions) {
    return <div className="loading-message">Loading account...</div>;
  }

  if (!account) {
    return <div>Account details not available</div>;
  }

  // Mask account number: "**** **** **** 1234"
  const maskedAccountNumber = "**** **** **** " + account.accountNumber.slice(-4);

  // Sort transactions by date ascending
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const totalTransactionAmount = sortedTransactions.reduce((sum, txn) => {
    // Define sign for amount
    const isCredit = txn.type === "DEPOSIT";
    const signedAmount = isCredit ? txn.amount : -txn.amount;
    return sum + signedAmount;
  }, 0);

  // Calculate starting balance = current balance - sum of transactions amounts
  const startingBalance = account.balance - totalTransactionAmount;

  // Running balance calculation for table rows
  let runningBalance = startingBalance;

  const tableHeaders = ["Date", "Description", "Amount", "Balance"];

  const tableData = sortedTransactions.map((txn) => {
    const isCredit = txn.type === "DEPOSIT";
    const sign = isCredit ? "+" : "-";
    runningBalance += isCredit ? txn.amount : -txn.amount;

    return {
      Date: new Date(txn.createdAt).toLocaleDateString(),
      Description: txn.description,
      Amount: `${sign}$${txn.amount.toFixed(2)}`,
      Balance: `$${runningBalance.toFixed(2)}`,
    };
  });

  return (
    <div className="account-details-container">
      <div className="account-header">
        <h1 className="account-title">{account.accountType} ACCOUNT</h1>
        <p className="masked-account-number">Account Number: {maskedAccountNumber}</p>
        <p className="account-balance">Balance: ${account.balance.toFixed(2)}</p>
        <div className="action-buttons">
          <ButtonComponent
            label="Transfer"
            onClick={() => navigate("/transfer", { state: { accountNumber: account.accountNumber } })}
            variant="primary"
          />
          <ButtonComponent
            label="Initiate Payment"
            onClick={() => navigate("/initiate-payment", { state: { accountNumber: account.accountNumber } })}
            variant="secondary"
          />
        </div>
      </div>

      <div className="tab-navigation">
        <div className={`tab ${activeTab === "overview" ? "tab-active" : ""}`} onClick={() => setActiveTab("overview")}>
          Overview
        </div>
        <div
          className={`tab ${activeTab === "transactions" ? "tab-active" : ""}`}
          onClick={() => navigate("/transactions", { state: { accountNumber: account.accountNumber } })}
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
            <strong>{new Date(account.accountCreated).toLocaleDateString()}</strong>
          </div>
          <div className="account-updated-date">
            <p>Last Updated</p>
            <strong>{new Date(account.accountUpdated).toLocaleDateString()}</strong>
          </div>
          <div className="account-balance">
            <p>Balance</p>
            <strong>${account.balance.toFixed(2)}</strong>
          </div>
        </div>
      )}
         <h2 className="transactions-title">Recent Transactions</h2>
      {transactions.length > 0 ? (
        <TableComponent tableheader={tableHeaders} tabledata={tableData} />
      ) : (
        <div className="no-transactions">No transactions found.</div>
      )}
    </div>
  );
}