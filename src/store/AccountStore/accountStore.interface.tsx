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
  accounts:AccountDto[],
  allAccountsForAdmin:AccountDto[],
  accountLoading: boolean;
  accountError: boolean;
  loadingFetchAccount:boolean,
  errorFetchAccount:boolean,
  loadingCreateAccount:boolean,
  errorCreateAccount:string |null,
  loadingAdminFetch:boolean,
  errorAdminFetch:boolean,
  fetchAccount: (accountNumber: string) => Promise<void>;
  fetchAllAccounts:()=>Promise<void>;
  CreateAccount:(balance:string,accountType:string ,productType:string)=>Promise<void>;
  fetchAllAccountsByAdmin:()=>Promise<void>;
}