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
    {
      fromAccount: "1234567890",
      toAccount: "9876543210",
      description: "Deposit",
      amount: 500,
      status: "COMPLETED" as const,
      type: "DEPOSIT" as const,
      createdAt: "2025-09-01",
    },
    {
      fromAccount: "1234567890",
      toAccount: "9876543210",
      description: "Transfer to John",
      amount: -200,
      status: "COMPLETED" as const,
      type: "TRANSFER" as const,
      createdAt: "2025-09-03",
    },
    {
      fromAccount: "1234567890",
      toAccount: "9876543210",
      description: "Bill Payment",
      amount: -100,
      status: "PENDING" as const,
      type: "WITHDRAWAL" as const,
      createdAt: "2025-09-05",
    },
  ];

  return (
    <AccountDetails
      // accountNumber={dummyAccount.accountNumber}
      dummyAccount={dummyAccount}
      dummyTransactions={dummyTransactions}
    />
  );
}
