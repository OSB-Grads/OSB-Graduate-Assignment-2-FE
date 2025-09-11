import { useState, type ReactEventHandler } from "react";
import type { transactionDTO } from "../../store/transactionStore/transactionStore.interface";

const handleFilterOperation = (
  event: { target: { value: any } },
  setValue : React.Dispatch<React.SetStateAction<string>>,
  transactions: transactionDTO[],
  setFilteredRes: React.Dispatch<React.SetStateAction<transactionDTO[]>>
) => {
  const value: string = event.target.value;
  setValue(value)

  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.description.includes(value);
  });
  

  setFilteredRes(filteredTransactions);

};
export default handleFilterOperation;
