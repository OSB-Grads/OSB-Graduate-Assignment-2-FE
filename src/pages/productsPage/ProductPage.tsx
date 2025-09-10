import React, { useEffect } from "react";
import useProductStore from "../../stores/useProductStore";
im



const ProductPage:React.FC=()=>{

    const {products,loading,error,fetchProductDetails}=useProductStore();

    useEffect(()=>{ fetchProductDetails()},[])

    return (
        <>
        <h3>Products</h3>
        {!loading?
         
        :}
        </>
    )
}

export default ProductPage;