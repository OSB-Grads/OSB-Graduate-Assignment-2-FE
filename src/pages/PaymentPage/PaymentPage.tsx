import { useEffect, useState } from "react";
import InputField from "../../components/inputField/inputField";
import NavItem from "../../components/NavItem/NavItem";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import axiosInstance from "../../utils/httpClientUtil";

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

    const [amount, setAmount] = useState("0.0");
    const [accounts, setAccounts] =
        React.useState<AccountData[]>(defaultAccounts);
    const [accountsLoading, setAccountsLoading] = React.useState<boolean>(true);
    const [accountsError, setAccountsError] = React.useState<string | null>(null);
    const [fromAccountNumber, setFromAccountNumber] = useState<string>();
    const [toAccountNumber, setToAccountNumber] = useState<string>();

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
    const handleFromAccountChange()


    return (
        <>
            <div className="paymentPageContainer">
                <h1>Make Payments </h1>
                <div className="paymentsInputFieldContainer">
                    <InputField
                        id="paymentsInputField"
                        label=""
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => { console.log("Change detected"); setAmount(e.target.value) }}
                    >
                    </InputField>
                </div>
                <div className="paymentsUserAccountDiv">
                    <h4>From Account Number</h4>
                    <Select label="From Account Number" id="paymentFromAccountSelectionList"
                     onChange={(e)=>{setFromAccountNumber(e.target.value as string); console.log("From AccountNumber",fromAccountNumber)}}>
                        {accounts.map((account) => { return (<MenuItem value={account.accountNumber}>{account.accountNumber}</MenuItem>) })}
                    </Select>
                    <h4>To Account Number</h4>
                    <Select label="To Account Number" id="paymentToAccountSelectionList"
                                         onChange={(e)=>{setToAccountNumber(e.target.value as string); console.log("To AccountNumber",toAccountNumber)}}>
                        {accounts.map((account) => { return (<MenuItem value={account.accountNumber}>{account.accountNumber}</MenuItem>) })}
                        <MenuItem value="Another Customer">Another Customer</MenuItem>
                    </Select>
                </div>
                <div className="paymentsToAccountNumberInput">
                    <InputField
                     label="To Account Number"
                     placeholder=" To Account Number"
                     value={toAccountNumber!=undefined?toAccountNumber:""}
                     onChange={(e)=>{}}>
                    </InputField>

                </div>
            </div>

        </>
    )

}


export default PaymentPage;