import {create} from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails, transferAmountBetweenAccounts } from "./transactionStore.login";


const useTransactionStore = create<transactionState>((set)=>({
    transactions :[],
    loading:false,
    error:false,
    fetchTransactionDetails: () => fetchTransactionDetails(set),
    transferAmountBetweenAccounts:(fromAccountNumber:string,toAccountNumber:string,amount:number)=>transferAmountBetweenAccounts(set,fromAccountNumber,toAccountNumber,amount)
}));

export default useTransactionStore;