import { create } from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails, fetchTransactionFromAccountnumber, transferAmountBetweenAccounts } from "./transactionStore.login";


const useTransactionStore = create<transactionState>((set) => ({
    transactions: [],
    transactionsFromAccountnumber: [],
    loading: false,
    error: false,
    loadingTransactionsByAccount: false,
    errorTransactionsByAccount: false,
    fetchTransactionDetails: () => fetchTransactionDetails(set),
    fetchTransactionFromAccountnumber: (accountNumber: string) => fetchTransactionFromAccountnumber(set, accountNumber),
    transferAmountBetweenAccounts: (fromAccountNumber: string, toAccountNumber: string, amount: number) => transferAmountBetweenAccounts(set, fromAccountNumber, toAccountNumber, amount)

}));

export default useTransactionStore;