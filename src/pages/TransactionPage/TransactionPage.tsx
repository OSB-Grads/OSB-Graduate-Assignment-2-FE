import { useEffect, useState } from "react";
import transactioStore from "../../store/transactionStore/transactionStore";
import InputField from "../../components/inputField/inputField";
import "./TransactionPage.css"
import type { transactionDTO } from "../../store/transactionStore/transactionStore.interface";
import { TablePagination } from "@mui/material";
import TableComponent from "../../components/TableComponent/TableComponent";

const TransactionPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [value,setValue] =useState("");
  const rowsPerPage = 10;
  [{fromAccount : "" ,
      toAccount : "" ,
      description : "",
      amount : 0,
      status :"PENDING",
      type : "DEPOSIT",
      createdAt : ""} ]
      const { transactions, loading, error, fetchTransactionDetails } = transactioStore();
      const [filteredRes, setFilteredRes] = useState<transactionDTO[]>([]);
      const [filter, setFilter] = useState<string>('');
  
  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  useEffect(() => {
    setFilteredRes(transactions)
  }, [transactions])

  
  const headersForTransactionTable=["fromAccount","toAccount","description","amount","type","createdAt"];
  const paginatedData = filteredRes
  .filter((transaction) => transaction.description.includes(filter))
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = ( _:unknown,newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
    <div className="transactionMainContainer">
    <div className="main-heading">
      <h1>Transactions</h1>
      <p className = "tagline">View and filter your account transactions</p>
      </div>
      <div className="transaction-SearchBar">
        <InputField
          id=""
          label=""
          type="text"
          placeholder="Search"
          value = {value}
          onChange={(e)=>{setFilter(e.target.value)}}   
          />
      </div>
      <div className="transactiontableCss">
        <TableComponent tableheader={headersForTransactionTable} tabledata={[]}>
        </TableComponent>
        <TablePagination
        component="div"
        count={transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        />
      </div>
      </div>
    </>
  );
};

export default TransactionPage;
