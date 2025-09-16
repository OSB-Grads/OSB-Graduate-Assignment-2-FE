
import type { TransactionDTO } from "./accountStore.interface";

export const getRecentTransactions = (Transactions:TransactionDTO[]):TransactionDTO[] =>{
             return Transactions.slice(-5).reverse();
}