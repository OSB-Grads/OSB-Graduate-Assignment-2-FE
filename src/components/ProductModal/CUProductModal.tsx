import React, { useEffect, useState } from 'react'
import "./CUProductModal.css"
import InputField from '../inputField/inputField';
import ButtonComponent from '../Button/ButtonComponent';
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import useProductStore from '../../store/ProductStore/ProductStore';




function CreateProductModal(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, preSelectedOperation: string }) {

    const handleClose = () => props.setOpen(false);
    const { createProductByAdmin, products, updateProductByAdmin,fetchProductDetails } = useProductStore();

    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productInterestRate, setProductInterestRate] = useState<number>(0.0);
    const [productFundingWindow, setProductFundingWindow] = useState<number>(0);
    const [coolingPeriod, setCoolingPeriod] = useState<number>(0);
    const [tenure, setTenure] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const handleSubmitCreateProduct = async () => {

        await createProductByAdmin({
            "productId": productId,
            "productName": productName,
            "interestRate": productInterestRate,
            "fundingWindow": productFundingWindow,
            "tenure": tenure,
            "coolingPeriod": coolingPeriod,
            "description": description
        });

        setProductId("");
        setProductName("");
        setDescription("");
        setCoolingPeriod(0);
        setProductInterestRate(0);
        setTenure(0);
        setProductFundingWindow(0);
        await fetchProductDetails();
        handleClose();
    }


    const handleSubmitUpdateProduct = async () => {
        await updateProductByAdmin(productId, {
            "productId": productId,
            "productName": productName,
            "interestRate": productInterestRate,
            "fundingWindow": productFundingWindow,
            "tenure": tenure,
            "coolingPeriod": coolingPeriod,
            "description": description
        });

        setProductId("");
        setProductName("");
        setDescription("");
        setCoolingPeriod(0);
        setProductInterestRate(0);
        setTenure(0);
        setProductFundingWindow(0);

        handleClose();

    }

    const handleSelectedOptionChange = (e: React.ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }> | (Event & { target: { value: string; name: string; }; })) => {
        const selected = e.target.value;
        setProductId(selected);
        const productSelected = products.find((p) => p.productId === selected);
        setProductName(productSelected ? productSelected.productName : productName);
        setProductFundingWindow(productSelected ? productSelected.fundingWindow : productFundingWindow);
        setCoolingPeriod(productSelected ? productSelected.coolingPeriod : coolingPeriod);
        setDescription(productSelected ? productSelected.description : description);
        setTenure(productSelected ? productSelected.tenure : tenure);
        setProductInterestRate(productSelected ? productSelected.interestRate : productInterestRate);
    }
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
                                <div className='updateProductCss'>
                                    <FormControl fullWidth>
                                    {/* <InputLabel
                                        sx={{
                                            color: 'var(--color-white)',
                                            '&.Mui-focused': { color: 'var(--color-primary)' },
                                        }}
                                    >
                                        Product Id
                                    </InputLabel> */}
                                    <p className='productUpdateLabelCSS'>Product Id</p>
                                    < Select
                                        label="ProductId"
                                        value={productId}
                                        onChange={(e) => handleSelectedOptionChange(e)}
                                        displayEmpty>
                                        <MenuItem key="Select" value="">Select</MenuItem>
                                        {products.map((product) => (
                                            <MenuItem key={product.productId} value={product.productId}>{
                                                product.productId
                                            }
                                            </MenuItem>))}
                                    </Select>
                                    </FormControl>
                                </div>
                            )}

                        <InputField
                            id="productName"
                            label="Product Name"
                            placeholder="Enter Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            disabled={props.preSelectedOperation === "Create" ? false : true}
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
                            {props.preSelectedOperation === "Create" ? (
                                <ButtonComponent
                                    label="Create Product"
                                    onClick={handleSubmitCreateProduct}
                                    type="button"
                                    variant="primary"
                                />) : (
                                <ButtonComponent
                                    label="Update Product"
                                    onClick={handleSubmitUpdateProduct}
                                    type="button"
                                    variant="primary"
                                />
                            )}
                        </div>
                    </div>
                </div >
            </Modal >
        </>
    )
}

export default CreateProductModal;

