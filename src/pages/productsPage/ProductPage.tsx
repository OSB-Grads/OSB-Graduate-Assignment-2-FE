import React, { useEffect } from "react";
import useProductStore from "../../Store/ProductStore/ProductStore";
import { Box, Paper } from "@mui/material";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import "./ProductPage.css"
import Error404 from "../ErrorPages/Error404";


const ProductPage: React.FC = () => {

    const { products, loading, error, fetchProductDetails } = useProductStore();

    useEffect(() => { fetchProductDetails() }, []);

    return (
        <>
            <h2>Products</h2>
            {!loading && !error ?
                (
                    <>
                        <Box className="productBoxCssClass">
                            {products.map((product) => {
                                return (
                                    <Paper elevation={15} className="productPaperCss">
                                        <AssuredWorkloadIcon fontSize="large" />
                                        <div className="productContentCss">
                                            {product.productId.includes("FD") ?
                                                <p>FIXED DEPOSIT-{product.productId}</p> :
                                                product.productId.includes("SAV") ? <p>SAVING ACCOUNT-{product.productId}</p> : <p>product.productId</p>}
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
                    </>
                )
                : (<><Error404/></>)}
        </>
    )
}

export default ProductPage;