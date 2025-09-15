import React, { useEffect, useState } from 'react'
import "./CreateAccount.css"
import InputField from '../../components/inputField/inputField';
import ButtonComponent from '../../components/Button/ButtonComponent';
import useProductStore from '../../store/ProductStore/ProductStore';
import { MenuItem, TextField } from '@mui/material';
import axiosInstance from '../../utils/httpClientUtil';


function CreateAccountModal() {

    const [open, setOpen] = useState(false);
    const [productType, setProductType] = useState("");
    const [accountType, setAccountType] = useState("")
    const [amount, setAmount] = useState("");

    const { products, fetchProductDetails } = useProductStore();
    useEffect(() => { fetchProductDetails() }, []);


    const handleSubmit = async () => {
        if (!productType || !amount) return;
        const typeOfAccount = productType.includes("FD") ? "FIXED_DEPOSIT" : "SAVINGS";

        const {data} = await axiosInstance.post(`/api/v1/accounts`,
            { amount: amount, accountType: typeOfAccount, },
            { params: { productId: productType } }
        );
    };
    return (
        <>
            <div className="createAccount-mainContainer">
                <div className="accountInputs">
                    <TextField className="basicMUIText"
                        select
                        label="Select Product"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        fullWidth
                    >
                        {products.map((product) => (
                            <MenuItem key={product.productId} value={product.productId}>
                                
                            </MenuItem>
                        ))}
                    </TextField>
                    <InputField
                        id="amount"
                        label="Initial Deposit"
                        type="number"
                        placeholder="Enter Initial amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                
                <div className="button-element">
                <ButtonComponent
                    label="Create Account"
                    onClick={handleSubmit}
                    type="button"
                    variant="primary"
                />
                </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccountModal
