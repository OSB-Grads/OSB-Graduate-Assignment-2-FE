import React, { useEffect, useState } from 'react'
import "./CUProductModal.css"
import InputField from '../inputField/inputField';
import ButtonComponent from '../Button/ButtonComponent';
import { MenuItem, Modal, Select, TextField } from '@mui/material';
// import axiosInstance from '../../utils/httpClientUtil';
// import { notify } from '../../components/Toast/Alerts';
// import { ToastTypes } from '../../components/Toast/interfaces';
// import useProductStore from '../../store/ProductStore/ProductStore'
// import useAccountStore from '../../store/AccountStore/accountStore';



function CreateProductModal(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, preSelectedOperation: string }) {

    const handleClose = () => props.setOpen(false);
    // const [productType, setProductType] = useState("");
    // const [accountType, setAccountType] = useState("")
    // const [amount, setAmount] = useState("");

    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productInterestRate, setProductInterestRate] = useState<number>(0.0);
    const [productFundingWindow, setProductFundingWindow] = useState<number>(0);
    const [coolingPeriod, setCoolingPeriod] = useState<number>(0);
    const [tenure, setTenure] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

       const productData: Record<string, any>[] = [{
        productId: "FD001",
        productName: "Fixed Deposit 1",
        interestRate: 2,
        fundingWindow: 1,
        coolingPeriod: 4,
        Tenure: 5,
        description: "Fixed Deposit "
    }]


    // const { products, fetchProductDetails } = useProductStore();
    // // const{CreateAccount}=useAccountStore();
    // useEffect(() => { fetchProductDetails() }, []);

    // useEffect(() => {
    //     if (props.preSelectedProduct) {
    //         setProductType(props.preSelectedProduct);
    //     }

    // }, [props.preSelectedProduct])

    const handleSelectedOptionChange=(e: React.ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }> | (Event & { target: { value: string; name: string; }; }))=>{

     setProductId(e.target.value);

     const productSelected=productData.find((p)=>p.productId===productId);

     setProductName(productSelected?productSelected.productName:"");
    }

    const handleSubmit = async () => {
        // if (!productType || !amount) return;
        // const typeOfAccount = productType.includes("FD") ? "FIXED_DEPOSIT" : "SAVINGS";

        //  await CreateAccount(
        // amount, typeOfAccount,productType  
        // );
        // notify({
        //     type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
        //     message: "Product created successfully",
        // })

        handleClose();
    };
    return (
        <>
            <Modal
                className='modal-box'
                open={props.open}
                onClose={handleClose}
            >
                <div className="createProduct-mainContainer">

                    <div className="productInputs">
                        {props.preSelectedOperation === "Create" ? (
                            <InputField
                                id="productId"
                                label="Product Id"
                                placeholder="Enter Product Id"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />) :
                            ( 
                                < Select
                                    label="ProductId"
                                    value={productId}
                                    onChange={(e)=>handleSelectedOptionChange(e)}
                                    displayEmpty>
                                        <MenuItem key="Select" value="">Select</MenuItem>
                                    {productData.map((product) => (
                                        <MenuItem key={product.productId} value={product.productId}>{
                                            product.productId 
                                        }
                                    </MenuItem> ))}
                                 </Select>
                                    )}

                    <InputField
                        id="productName"
                        label="Product Name"
                        placeholder="Enter Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        disabled={props.preSelectedOperation==="Create"?false:true}
                    />

                    <div>
                        <InputField
                            id="productInterestRate"
                            label="Interest"
                            type="number"
                            placeholder="Enter Interest"
                            value={productInterestRate}
                            onChange={(e) => setProductInterestRate(Number(e.target.value))}
                        />

                        <InputField
                            id="productFundingWindow"
                            label="Funding Window"
                            type="number"
                            placeholder="Enter Funding Window"
                            value={productFundingWindow}
                            onChange={(e) => setProductFundingWindow(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <InputField
                            id="productCoolingPeriod"
                            label="Cooling Period"
                            type="number"
                            placeholder="Enter Cooling Period"
                            value={coolingPeriod}
                            onChange={(e) => setCoolingPeriod(Number(e.target.value))}
                        />

                        <InputField
                            id="productTenure"
                            label="Tenure"
                            type="number"
                            placeholder="Enter Tenure"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                        />
                    </div>

                    <InputField
                        id="productDescription"
                        label="Product Description"
                        placeholder="Enter Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="button-element">
                        <ButtonComponent
                            label="Create Product"
                            onClick={handleSubmit}
                            type="button"
                            variant="primary"
                        />
                    </div>
                </div>
            </div >
        </Modal >
        </>
    )
}

export default CreateProductModal;

