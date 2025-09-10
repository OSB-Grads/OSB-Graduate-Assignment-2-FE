import React, { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import { Box, Paper } from "@mui/material";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import "./ProductPage.css"


const ProductPage: React.FC = () => {

    const { products, loading, error, fetchProductDetails } = useProductStore();

    useEffect(() => { fetchProductDetails() }, []);

    return (
        <>
            <h2>Products</h2>
            {!loading ?
                (
                    <>
                        <Box className="productBoxCssClass">
                            {products.map((productDto) => {
                                return (
                                    <Paper elevation={15} className="productPaperCss">
                                        <AssuredWorkloadIcon fontSize="large" />
                                        <div className="productContentCss">
                                            {productDto.productId.includes("FD") ?
                                                <p>FIXED DEPOSIT-{productDto.productId}</p> :
                                                productDto.productId.includes("SAV") ? <p>SAVING ACCOUNT-{productDto.productId}</p> : <p>productDto.productId</p>}
                                            {productDto.description}
                                        </div>
                                        <div className="productInterestContentCss">
                                            <p>Interest</p>
                                            <p>{productDto.interestRate}  </p>
                                        </div>
                                        <p>&#10151;</p>
                                    </Paper>
                                )
                            })}
                        </Box>
                    </>
                )
                : (<></>)}
        </>
    )
}

export default ProductPage;