
import type { TransactionDTO } from "./AccountStore.interface";

export const getRecentTransactions = (Transactions:TransactionDTO[]):TransactionDTO[] =>{
             return Transactions.slice(-5).reverse();
}