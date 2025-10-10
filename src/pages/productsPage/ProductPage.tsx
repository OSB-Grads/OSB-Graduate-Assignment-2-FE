import React, { useEffect, useState } from "react";
import useProductStore from "../../store/ProductStore/ProductStore";
import { Box, Paper } from "@mui/material";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import "./ProductPage.css"
import Error404 from "../ErrorPages/Error404";
import { useNavigate } from "react-router-dom";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal";



const ProductPage: React.FC = () => {

    const { products, loading, error, fetchProductDetails } = useProductStore();
    const navigate=useNavigate();

    const[open,setOpen]=useState<boolean>(false);
    const[selectedProduct,setSelectedProduct]=useState<string>("");

    const handleProductClick=(productId:string)=>{
        setOpen(pre=>!pre)
        setSelectedProduct(productId)
    }

    useEffect(() => { fetchProductDetails() }, []);
    useEffect(()=>{
        if(error){
            navigate('/genericError')
        }
    },[])

    return (
        <>
            <h2>Products</h2>
            <>
                <Box className="productBoxCssClass">
                    {products.map((product) => {
                        return (
                            <Paper elevation={15} className="productPaperCss"
                            onClick={()=>handleProductClick(product.productId)}>
                                <AssuredWorkloadIcon fontSize="large" />
                                <div className="productContentCss">
                                    {product.productId.includes("FD") ?
                                        <p>FIXED DEPOSIT-{product.productId}</p> :
                                        product.productId.includes("SAV") ? <p>SAVINGS-{product.productId}</p> : <p>product.productId</p>}
                                    {product.description}
                                </div>
                                <div className="productInterestContentCss">
                                    <p>Interest</p>
                                    <p>{product.interestRate}  </p>
                                </div>
                                <p>&#10151;</p>
                            </Paper>
                        )
                    })}
                </Box>
                <CreateAccountModal open={open} setOpen={setOpen} preSelectedProduct={selectedProduct}/>
            </>
        </>
    )
}

export default ProductPage;