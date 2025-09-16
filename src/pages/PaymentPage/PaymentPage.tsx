import { useState } from "react";
import InputField from "../../components/inputField/inputField";
import NavItem from "../../components/NavItem/NavItem";
import { Select } from "@mui/material";


const PaymentPage = () => {

    const [amount, setAmount] = useState("0.0");

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
                        onChange={(e) => { console.log("Change detected");setAmount(e.target.value)}}
                    >
                    </InputField>
                </div>
                <div className="paymentsUserAccountDiv">
                    <Select></Select>
                    <Select></Select>
                </div>
            </div>
            
        </>
    )

}


export default PaymentPage;