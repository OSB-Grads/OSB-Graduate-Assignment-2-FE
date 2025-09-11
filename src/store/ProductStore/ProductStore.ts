import {create} from "zustand";
import axiosInstance from "../../utils/httpClientUtil";
import type { IProductStore } from "./product.interface";
import { fetchProductDetails } from "./product.logic";

const useProductStore=create<IProductStore>((set)=>({
    products:[],
    loading:false,
     error:false,
     fetchProductDetails:async()=> await fetchProductDetails(set)
}));

export default useProductStore;