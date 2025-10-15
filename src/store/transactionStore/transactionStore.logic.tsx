import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import useNotificationStore from "../NotificationStore/NotificationStore";
import { getTransactionsFromAccountnumber, transactionsApi, transferAmountAPI } from "./transactionStore.api";

export const fetchTransactionDetails = async (set: any, get: any) => {
    try {
        set(() => ({ loading: true }));
        const result = await transactionsApi();

        const newTransactions = result?.data || [];
        const { addNotification } = useNotificationStore.getState();
        const { lastSeenTransactionTime } = get();
        const sorted = [...newTransactions].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const newOnes = sorted.filter(
            item=> new Date(item.createdAt) > new Date(lastSeenTransactionTime || 0)
        );
        if (newOnes.length > 0) {
            newOnes.forEach(item => {
                addNotification({
                    id: item.id,
                    message: item.description,
                    createdAt: item.createdAt,
                });
                const newestTime = sorted[0].createdAt;
                set({ lastSeenTransactionTime: newestTime });
            })
        }
        
        set(() => ({ transactions:result.data, loading: false, error: false }));
    } catch (error) {
        console.log("Error in transaction fetch", error)
        set(() => ({ error: true, loading: false }));
    }
}


export const transferAmountBetweenAccounts = async (set: any, fromAccountNumber: string, toAccountNumber: string, amount: number) => {
    try {
        set(() => ({ loading: true }));
        if (fromAccountNumber != "" && toAccountNumber != "" && amount != 0 && fromAccountNumber != toAccountNumber) {
            const result = await transferAmountAPI(fromAccountNumber, toAccountNumber, amount);
            set(() => ({ transactions: result.data, loading: false }));
            notify({
                type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
                message: 'Transaction Successful',
            });
        }
        else {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'Incorrect Input Please Use Correct Details',
            });
        }
    } catch (error) {
        console.log("Error in transaction fetch", error)
        set(() => ({ error: true, loading: false }));
        notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Transaction Failed',
        });
    }
}

export const fetchTransactionFromAccountnumber = async (set: any, accountNumber: string) => {
    try {
        set(() => ({ loadingTransactionsByAccount: true }));
        const result = await getTransactionsFromAccountnumber(accountNumber);
        set(() => ({ transactionsFromAccountnumber: result, loadingTransactionsByAccount: false }))

    } catch (error) {
        console.log("Error in transaction fetch from account number", error)
        set(() => ({ errorTransactionsByAccount: true, loadingTransactionsByAccount: false }));
    }
}