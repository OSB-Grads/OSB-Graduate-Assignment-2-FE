import React from "react";
import AccountDetails from "./accountDetails/accountDetails";

export default function DummyAccountPage() {
  const dummyAccount = {
    accountNumber: "1234567890",
    accountType: "SAVINGS" as const,
    balance: 2500.75,
    accountCreated: "2024-01-01",
    accountUpdated: "2025-01-01",
  };

  const dummyTransactions = [
    { fromAccount: "1234567890", toAccount: "9876543210", description: "Deposit", amount: 500, transactionStatus: "COMPLETED" as const, transactionType: "DEPOSIT" as const },
    { fromAccount: "1234567890", toAccount: "9876543210", description: "Transfer to John", amount: -200, transactionStatus: "COMPLETED" as const, transactionType: "TRANSFER" as const },
    { fromAccount: "1234567890", toAccount: "9876543210", description: "Bill Payment", amount: -100, transactionStatus: "PENDING" as const, transactionType: "WITHDRAWAL" as const },
  ];

  console.log("Dummy Account", dummyAccount);   // ✅ Check if this prints
  console.log("Dummy Transactions", dummyTransactions); // ✅ Check if this prints

  return <AccountDetails accountNumber={dummyAccount.accountNumber} dummyAccount={dummyAccount} dummyTransactions={dummyTransactions} />;
}
