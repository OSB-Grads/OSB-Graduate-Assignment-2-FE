import React, { useEffect, useState } from 'react'
import "./CreateAccount.css"
import InputField from '../../components/inputField/inputField';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { MenuItem, Modal, TextField } from '@mui/material';
import axiosInstance from '../../utils/httpClientUtil';
import { notify } from '../../components/Toast/Alerts';
import { ToastTypes } from '../../components/Toast/interfaces';
import  useProductStore from '../../store/ProductStore/ProductStore'



function CreateAccountModal(props:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => props.setOpen(false);
    const [productType, setProductType] = useState("");
    const [accountType, setAccountType] = useState("")
    const [amount, setAmount] = useState("");

    const { products, fetchProductDetails } = useProductStore();
    useEffect(() => { fetchProductDetails() }, []);

    const handleSubmit = async () => {
        if (!productType || !amount) return;
        const typeOfAccount = productType.includes("FD") ? "FIXED_DEPOSIT" : "SAVINGS";

        const { data } = await axiosInstance.post(`/api/v1/accounts`,
            { balance: amount, accountType: typeOfAccount, },
            { params: { productId: productType } }   
        );
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: "Account created successfully",
        })
       
        handleClose();
    };
    return (
        <>
            <Modal 
                className='modal-box'
                open={props.open}
                onClose={handleClose}
            >
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
                                <MenuItem key={product.productId} value={product.productId} >
                                    
                                    {product.productId.includes("FD")?"FIXED DEPOSIT : ":product.productId.includes("SAV")?"SAVINGS : ":product.productId}
                                    {product.description}
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
                </div >
            </Modal>
        </>
    )
}

export default CreateAccountModal

