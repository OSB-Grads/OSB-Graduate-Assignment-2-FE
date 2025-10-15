import { useState } from "react"
import ButtonComponent from "../../components/Button/ButtonComponent"
import CollapsibleCard from "../../components/CollapsibleCard/CollapsibleCard"
import CUProductModal from "../../components/ProductModal/CUProductModal"
import Leftnavbar from "../../components/Leftnavbar/Leftnavbar"
import TableComponent from "../../components/TableComponent/TableComponent"
import "./AdminPage.css"
import DelectProductModal from "../../components/DeleteModalProductModal/DeleteProductModal"

const AdminPage = () => {

    const productHeader: string[] = ["productId", "productName", "interestRate", "fundingWindow", "coolingPeriod", "Tenure", "description"];
    const productData: Record<string, any>[] = [{
        productId: "FD001",
        productName: "Fixed Deposit 1",
        interestRate: 2,
        fundingWindow: 1,
        coolingPeriod: 4,
        Tenure: 5,
        description: "Fixed Deposit "
    }]

    const [openProductCU,setOpenProductCU]=useState<boolean>(false);
    const [openDeleteProduct,setOpenDeleteProduct]=useState<boolean>(false);
    const [operation,setOperation]=useState<string>("");



    return (
        <>
            <div className="adminPageRoot">
                <div className="adminPageHeader">
                    <h2>Admin Page</h2>
                </div>
                <div className="adminPageContent">
                    <div className="adminPageProductContent">
                        <h3> Products</h3>
                        <CollapsibleCard  
                        title="Retreive All the Products"
                            answer={<TableComponent tableheader={productHeader} tabledata={productData}></TableComponent>}>
                        </CollapsibleCard>
                        <div className="AdminCUDProduct">
                        <ButtonComponent label="Create Product" onClick={()=>{
                            setOpenProductCU(true);
                            setOperation("Create")}}></ButtonComponent> &nbsp;
                        <ButtonComponent label="Update Product" onClick={()=>{ setOpenProductCU(true);setOperation("Update")}} /> &nbsp;
                        <ButtonComponent label="Delete Product" onClick={()=>{setOpenDeleteProduct(true)}}/></div>
                    </div>

                    <CUProductModal open={openProductCU} setOpen={setOpenProductCU} preSelectedOperation={operation}></CUProductModal>
                    <DelectProductModal open={openDeleteProduct} setOpen={setOpenDeleteProduct} ></DelectProductModal>                    

                    <div className="adminPageAccountContent">
                        <h3> Accounts</h3>
                        <CollapsibleCard  
                        title="Retreive All the Accounts"
                            answer={<TableComponent tableheader={productHeader} tabledata={productData}></TableComponent>}>
                        </CollapsibleCard>
                    </div>

                    
                    <div className="adminPageAccountContent">
                        <h3> Users</h3>
                        <CollapsibleCard  
                        title="Retreive All the Accounts"
                            answer={<TableComponent tableheader={productHeader} tabledata={productData}></TableComponent>}>
                        </CollapsibleCard>
                    </div>



                     <div className="adminPageLogsContent">
                        <h3> Logs</h3>
                        <CollapsibleCard  
                        title="Retreive All the Logs"
                            answer={<TableComponent tableheader={productHeader} tabledata={productData}></TableComponent>}>
                        </CollapsibleCard>
                    </div>


                </div>
            </div>

        </>
    )
}



export default AdminPage