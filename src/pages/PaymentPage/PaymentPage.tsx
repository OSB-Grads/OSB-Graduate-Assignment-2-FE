import { useEffect, useState } from "react";
import InputField from "../../components/inputField/inputField";
import NavItem from "../../components/NavItem/NavItem";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React from "react";
import axiosInstance from "../../utils/httpClientUtil";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./PaymentPage.css"
import useTransactionStore from "../../store/transactionStore/transactionStore";
import Toast from "../../components/Toast/ToastComponent";
import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";

interface AccountData {
    accountNumber: string;
    accountType: string;
    balance: number;
    accountUpdated: string;
}
const defaultAccounts: AccountData[] = [
    {
        accountNumber: "1234567890",
        accountType: "Savings",
        balance: 2500.75,
        accountUpdated: "2025-09-09T12:30:00",
    },
];

const PaymentPage = () => {

    const [amount, setAmount] = useState<string>("");
    const [accounts, setAccounts] =
        React.useState<AccountData[]>(defaultAccounts);
    const [accountsLoading, setAccountsLoading] = React.useState<boolean>(true);
    const [accountsError, setAccountsError] = React.useState<string | null>(null);
    const [fromAccountNumber, setFromAccountNumber] = useState<string>("");
    const [toAccountNumber, setToAccountNumber] = useState<string>("");

    const { transactions, error, loading, transferAmountBetweenAccounts } = useTransactionStore();

    useEffect(() => {
        axiosInstance
            .get("/api/v1/accounts")
            .then((res) => {
                const accountsdetails = res.data.map((account: AccountData) => ({
                    accountNumber: account.accountNumber,
                    accountType: account.accountType,
                    balance: account.balance,
                    accountUpdated: account.accountUpdated,
                }));
                setAccounts(accountsdetails);
                setAccountsLoading(false);
            })
            .catch((err) => {
                setAccountsError("Failed to fetch the accounts");
                setAccountsLoading(false);
            });
    }, []);

    const handleFromAccountChange = (event: SelectChangeEvent) => {
        setFromAccountNumber(event.target.value as string);
        console.log("From AccountNumber", fromAccountNumber);
    }
    const handleToAccountChange = (event: SelectChangeEvent) => {
        setToAccountNumber(event.target.value as string);
        console.log("TO  AccountNumber", toAccountNumber);
    }

    const handleSubmit = async () => {
        try {
            if (fromAccountNumber != "" && toAccountNumber != "" && amount != "") {
                transferAmountBetweenAccounts(fromAccountNumber, toAccountNumber, Number(amount))
                setFromAccountNumber("");
                setToAccountNumber("")
                setAmount("");
                if (!error) {
                    notify({
                        type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
                        message: 'Transaction Successful',
                    })
                    console.log("Transfer successful");
                }
                else  throw new Error(" Transfer Failed");
            }
            else {
                throw new Error(" Transfer Failed");
            }
        }
        catch (err) {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'Transaction Failed',
            });
            console.log("Transfer failed", err)
        }

    }


    return (
        <>
            <div className="paymentPageContainer" >
                <h1 >Make Payments </h1>
                <div className="paymentsInputFieldContainer">
                    <InputField
                        id="paymentsInputField"
                        label=""
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => { console.log("Change detected"); setAmount(e.target.value as string) }}
                    >
                    </InputField>
                </div>
                <div className="paymentsUserAccountDiv" >
                    <div >
                        <h4>From Account Number</h4>
                        <Select label="From Account Number" id="paymentFromAccountSelectionList"
                            value={fromAccountNumber}
                            onChange={handleFromAccountChange}>
                            <MenuItem value="">From Account Number</MenuItem>
                            {accounts.map((account) => { return (<MenuItem value={account.accountNumber}>{account.accountNumber}</MenuItem>) })}

                        </Select>
                    </div>
                    <div >
                        <h4>To Account Number</h4>
                        <Select label="To Account Number" id="paymentToAccountSelectionList"
                            value={toAccountNumber}
                            onChange={(e) => { setToAccountNumber(e.target.value as string); console.log("To AccountNumber", toAccountNumber) }}>
                            <MenuItem value="">To Account Number</MenuItem>
                            {accounts.map((account) => { return (<MenuItem value={account.accountNumber}>{account.accountNumber}</MenuItem>) })}
                            <MenuItem value="Another Customer">Another Customer</MenuItem>
                        </Select>
                    </div>
                </div>
                {toAccountNumber === "Another Customer" ?
                    (<div className="paymentsToAccountNumberInput">
                        <InputField
                            label="To Account Number"
                            placeholder=" To Account Number"
                            value={toAccountNumber != undefined && toAccountNumber === "Another Customer" ? toAccountNumber : ""}
                            onChange={handleToAccountChange}>
                        </InputField>

                    </div>) : (<></>)
                }
                <ButtonComponent label="Make Payment" onClick={handleSubmit}></ButtonComponent>
            </div>

        </>
    )

}


export default PaymentPage;