import { create } from "zustand";
import type { AccountState } from "./AccountStore.interface";
import { getAccount,getTransactions } from "./AccountStore.api";
import { getRecentTransactions } from "./AccountStore.logic";
// --- Store ---
const useAccountStore = create<AccountState>((set) => ({
  account: null,
  transactions: [],
  loading: false,
  error: null,

  fetchAccount: async (accountNumber) => {
    set({ loading: true, error: null });
    try {
      const account= await getAccount(accountNumber);
      set({ account, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch account", loading: false });
    }
  },

  fetchTransactions: async (accountNumber) => {
    set({ loading: true, error: null });
    try {
      const transactions = await getTransactions(accountNumber);
      set({ transactions : getRecentTransactions(transactions), loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch transactions", loading: false });
    }
  },
}));

export default useAccountStore;