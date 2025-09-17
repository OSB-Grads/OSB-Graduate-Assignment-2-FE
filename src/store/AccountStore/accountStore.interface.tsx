export interface AccountDto {
  accountNumber: string;
  accountType: AcccountType;
  balance: number;
  accountCreated: string;
  accountUpdated: string;
}
export type AcccountType="SAVINGS"|"FIXED_DEPOSIT";

export interface AccountState {
  account: AccountDto | null;
  accounts:AccountDto[]
  accountLoading: boolean;
  accountError: string | null;
  fetchAccount: (accountNumber: string) => Promise<void>;
  fetchAllAccounts:()=>Promise<void>
  CreateAccount:(balance:string,accountType:string ,productType:string)=>Promise<void>
}