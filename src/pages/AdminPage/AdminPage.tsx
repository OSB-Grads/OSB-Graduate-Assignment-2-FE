import { useEffect, useState } from "react"
import ButtonComponent from "../../components/Button/ButtonComponent"
import CollapsibleCard from "../../components/CollapsibleCard/CollapsibleCard"
import CUProductModal from "../../components/ProductModal/CUProductModal"
import TableComponent from "../../components/TableComponent/TableComponent"
import "./AdminPage.css"
import DelectProductModal from "../../components/DeleteModalProductModal/DeleteProductModal"
import useProductStore from "../../store/ProductStore/ProductStore"
import useAccountStore from "../../store/AccountStore/accountStore"
import useUserStore from "../../store/userstore/userstore"
import { useLogStore } from "../../store/LogStore/logStore"

const AdminPage = () => {
    const productHeader: string[] = ["productId", "productName", "interestRate", "fundingWindow", "coolingPeriod", "tenure", "description"];
    const accountsHeader: string[] = ["accountNumber", "accountType", "balance", "accountCreated", "accountUpdated"];
    const usersHeader: string[] = ["name", "email", "phone", "address"];
    const logHeader:string[]=["id","action","details","ipAddress","user_id","status","timestamp"]
    const { products, fetchProductDetails } = useProductStore();

    const { allAccountsForAdmin, fetchAllAccountsByAdmin } = useAccountStore();
    const { fetchAllUsersForAdmin, userDataForAdmin } = useUserStore();
    const { logData, fetchAllLogsForAdmin } = useLogStore()

    const [openProductCU, setOpenProductCU] = useState<boolean>(false);
    const [openDeleteProduct, setOpenDeleteProduct] = useState<boolean>(false);
    const [operation, setOperation] = useState<string>("");


    useEffect(() => {
        const fetchAllDetailsPageInfo = async () => {
            await fetchProductDetails();
            await fetchAllAccountsByAdmin();
            await fetchAllUsersForAdmin();
            await fetchAllLogsForAdmin();
        }
        fetchAllDetailsPageInfo();
    }, [])


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
                            answer={<TableComponent tableheader={productHeader} tabledata={products}></TableComponent>}>
                        </CollapsibleCard>
                        <div className="AdminCUDProduct">
                            <ButtonComponent label="Create Product" onClick={() => {
                                setOpenProductCU(true);
                                setOperation("Create")
                            }}></ButtonComponent> &nbsp;
                            <ButtonComponent label="Update Product" onClick={() => { setOpenProductCU(true); setOperation("Update") }} /> &nbsp;
                            <ButtonComponent label="Delete Product" onClick={() => { setOpenDeleteProduct(true) }} /></div>
                    </div>

                    <CUProductModal open={openProductCU} setOpen={setOpenProductCU} preSelectedOperation={operation}></CUProductModal>
                    <DelectProductModal open={openDeleteProduct} setOpen={setOpenDeleteProduct} ></DelectProductModal>

                    <div className="adminPageAccountContent">
                        <h3> Accounts</h3>
                        <CollapsibleCard
                            title="Retreive All the Accounts"
                            answer={<TableComponent tableheader={accountsHeader} tabledata={allAccountsForAdmin}></TableComponent>}>
                        </CollapsibleCard>
                    </div>

                    <div className="adminPageAccountContent">
                        <h3> Users</h3>
                        <CollapsibleCard
                            title="Retreive All the Users"
                            answer={<TableComponent tableheader={usersHeader} tabledata={userDataForAdmin}></TableComponent>}>
                        </CollapsibleCard>
                    </div>

                    <div className="adminPageLogsContent">
                        <h3> Logs</h3>
                        <CollapsibleCard
                            title="Retreive All the Logs"
                            answer={<TableComponent tableheader={logHeader} tabledata={logData}></TableComponent>}>
                        </CollapsibleCard>
                    </div>
                </div>
            </div>

        </>
    )
}



export default AdminPage