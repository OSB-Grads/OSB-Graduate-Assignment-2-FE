import React, { useEffect, useState } from 'react'
import "./DeleteProductModal.css"
import InputField from '../inputField/inputField';
import ButtonComponent from '../Button/ButtonComponent';
import { FormControl, MenuItem, Modal, Select, TextField } from '@mui/material';
import useProductStore from '../../store/ProductStore/ProductStore';
// import axiosInstance from '../../utils/httpClientUtil';
// import { notify } from '../../components/Toast/Alerts';
// import { ToastTypes } from '../../components/Toast/interfaces';
// import useProductStore from '../../store/ProductStore/ProductStore'
// import useAccountStore from '../../store/AccountStore/accountStore';



function DelectProductModal(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const handleClose = () => props.setOpen(false);

    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productInterestRate, setProductInterestRate] = useState<number>(0.0);
    const [productFundingWindow, setProductFundingWindow] = useState<number>(0);
    const [coolingPeriod, setCoolingPeriod] = useState<number>(0);
    const [tenure, setTenure] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const { products, deleteProductByAdmin, fetchProductDetails } = useProductStore();



    const handleSelectedOptionChange = (e: React.ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }> | (Event & { target: { value: string; name: string; }; })) => {
        const selected = e.target.value;
        setProductId(selected);

        const productSelected = products.find((p) => p.productId === selected);

        setProductName(productSelected ? productSelected.productName : "");
        setProductFundingWindow(productSelected ? productSelected.fundingWindow : productFundingWindow);
        setCoolingPeriod(productSelected ? productSelected.coolingPeriod : coolingPeriod);
        setDescription(productSelected ? productSelected.description : description);
        setTenure(productSelected ? productSelected.tenure : tenure);
        setProductInterestRate(productSelected ? productSelected.interestRate : productInterestRate);
    }

    const handleSubmitdeleteProduct = async () => {
        await deleteProductByAdmin(productId);
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

    return (
        <>
            <Modal
                className='modal-box'
                open={props.open}
                onClose={handleClose}
            >
                <div className="deleteProduct-mainContainer">
                    <h3>Delete Product</h3>

                    <div className="productInputs">
                        <FormControl fullWidth>
                            <p className='deleteUpdateLabelCSS'>Product Id</p>
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
                        {productId !== "" ? (
                            <div className='deletionProductConditionCSS'>
                                <p className='deletionProductTextCSS'>
                                    Do You Want to Delete the Product <br />  <strong>id </strong>&nbsp;{productId}<br />
                                    <strong>Name</strong> :&nbsp;{productName}<br />
                                    <strong> description</strong> :&nbsp;{description}<br />
                                    <strong> tenure</strong> :&nbsp;{tenure}<br />
                                    <strong> period</strong> :&nbsp;{coolingPeriod}<br />
                                    <strong>fundingWIndow</strong> :&nbsp;{productFundingWindow}<br />
                                    <strong> interestRate</strong> :&nbsp;{productInterestRate}
                                </p>
                                <ButtonComponent
                                    label="Delete Product"
                                    onClick={handleSubmitdeleteProduct}
                                    type="button"
                                    variant="primary"
                                />
                            </div>
                        ) : (<></>)
                        }
                    </div>
                </div >
            </Modal >
        </>
    )
}

export default DelectProductModal;

