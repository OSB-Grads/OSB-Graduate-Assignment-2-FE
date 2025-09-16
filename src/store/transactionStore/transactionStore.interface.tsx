export interface transactionDTO{
    fromAccount : string ,
    toAccount : string ,
    description : string,
    amount : number,
    type : TransactionType,
    createdAt : string
}

export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";
// export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface transactionState{
    transactions : transactionDTO[],
    loading : boolean,
    error : boolean,
    fetchTransactionDetails : () => Promise<void>
}