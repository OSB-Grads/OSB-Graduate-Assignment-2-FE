import { create } from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails, fetchTransactionFromAccountnumber, transferAmountBetweenAccounts } from "./transactionStore.logic";
import { persist } from "zustand/middleware";


const useTransactionStore = create<transactionState>()(
    persist(
    (set,get) => ({
    transactions: [],
    transactionsFromAccountnumber: [],
    loading: false,
    error: false,
    loadingTransactionsByAccount: false,
    errorTransactionsByAccount: false,
    fetchTransactionDetails: () => fetchTransactionDetails(set,get),
    fetchTransactionFromAccountnumber: (accountNumber: string) => fetchTransactionFromAccountnumber(set, accountNumber),
    transferAmountBetweenAccounts: (fromAccountNumber: string, toAccountNumber: string, amount: number) => transferAmountBetweenAccounts(set, fromAccountNumber, toAccountNumber, amount),
    lastSeenTransactionTime:null
    

}),

{
  name: "last-seen-transaction", 
      partialize: (state) => ({
        lastSeenTransactionTime: state.lastSeenTransactionTime,
      }),
}),

);

export default useTransactionStore;