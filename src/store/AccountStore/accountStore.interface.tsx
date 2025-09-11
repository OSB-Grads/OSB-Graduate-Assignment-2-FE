export interface AccountDto {
  accountNumber: string;
  accountType: "SAVINGS" | "FIXED_DEPOSIT";
  balance: number;
  accountCreated: string;
  accountUpdated: string;
}

export interface TransactionDTO {
  fromAccount: string;
  toAccount: string;
  description: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  createdAt: string;
}

export interface AccountState {
  account: AccountDto | null;
  transactions: TransactionDTO[];
  loading: boolean;
  error: string | null;
  fetchAccount: (accountNumber: string) => Promise<void>;
  fetchTransactions: (accountNumber: string) => Promise<void>;
}