import {create} from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails } from "./transactionStore.login";


const transactioStore = create<transactionState>((set)=>({
    transactions :[],
    loading:false,
    error:false,
    fetchTransactionDetails :async()=> await fetchTransactionDetails(set)
}));

export default transactioStore;