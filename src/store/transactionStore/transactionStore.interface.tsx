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
    transactionsFromAccountnumber:transactionDTO[],
    loading : boolean,
    error : boolean,
    loadingTransactionsByAccount: boolean;
    errorTransactionsByAccount: boolean ;
    fetchTransactionDetails : () => Promise<void>,
    fetchTransactionFromAccountnumber:(accountNumber:string)=>Promise<void>

    transferAmountBetweenAccounts:(fromAccountNumber:string,toAccountNumber:string,amount:number)=>Promise<void>
    
}