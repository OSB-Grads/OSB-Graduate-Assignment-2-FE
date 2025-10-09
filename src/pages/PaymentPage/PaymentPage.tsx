import { useEffect, useState } from "react";
import InputField from "../../components/inputField/inputField";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import ButtonComponent from "../../components/Button/ButtonComponent";
import "./PaymentPage.css"
import useTransactionStore from "../../store/transactionStore/transactionStore";
import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import useAccountStore from "../../store/AccountStore/accountStore";
import { useLocation } from "react-router-dom";


const PaymentPage = () => {

    const [amount, setAmount] = useState<string>("");
    const [fromAccountNumber, setFromAccountNumber] = useState<string>("");
    const [toAccountNumber, setToAccountNumber] = useState<string>("");

    const { transferAmountBetweenAccounts } = useTransactionStore();
    const { accounts } = useAccountStore();

    const [customToAccountNumber, setCustomToAccountNumber] = useState<string>("");

    const location=useLocation();
    const state=location.state as {mode:string} | undefined;
    
    useEffect(()=>{
       if(state?.mode=='makePayment'){
        setToAccountNumber("Another Customer");
       }
    },[state])




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
            const toAccount = toAccountNumber === "Another Customer" ? customToAccountNumber : toAccountNumber;
            transferAmountBetweenAccounts(fromAccountNumber, toAccount, Number(amount));
            setFromAccountNumber("");
            setToAccountNumber("");
            setCustomToAccountNumber("");
            setAmount("");
            console.log("Transaction Successful");
        }
        catch (err) {
            console.log("Transfer failed", err);
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
                        onChange={(e) => { setAmount(e.target.value as string) }}
                    >
                    </InputField>
                </div>
                <div className="paymentsUserAccountDiv" >
                    <div >
                        <h4>From Account Number</h4>
                        <Select label="From Account Number" id="paymentFromAccountSelectionList"
                            value={fromAccountNumber}
                            onChange={handleFromAccountChange}
                            displayEmpty
                            sx={{
                                '.MuiSelect-icon': {
                                    color: 'white',
                                    fill: 'white',
                                }
                            }}>
                            <MenuItem value="" >Select From Account </MenuItem>
                            {accounts.map((account) => { return (<MenuItem value={account.accountNumber}>{account.accountNumber}</MenuItem>) })}

                        </Select>
                    </div>
                    <div >
                        <h4>To Account Number</h4>
                        <Select label="To Account Number" id="paymentToAccountSelectionList"
                            value={toAccountNumber}
                            onChange={handleToAccountChange}
                            displayEmpty
                            sx={{
                                '.MuiSelect-icon': {
                                    color: 'white',
                                    fill: 'white',
                                }
                            }}>
                            <MenuItem value="">Select To Account</MenuItem>
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
                            value={customToAccountNumber}
                            onChange={(e) => { setCustomToAccountNumber(e.target.value as string) }}>
                        </InputField>

                    </div>) : (<></>)
                }
                <ButtonComponent label="Make Payment" onClick={handleSubmit}></ButtonComponent>
            </div>

        </>
    )

}


export default PaymentPage;