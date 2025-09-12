import transactioStore from "./transactionStore";
import type { transactionState } from "./transactionStore.interface"


export const getTransactionStore=()=>{
    return transactioStore((state:transactionState)=>state);
}