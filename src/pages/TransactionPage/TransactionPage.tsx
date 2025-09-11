import { useEffect, useState } from "react";
import transactioStore from "../../store/transactionStore/transactionStore";
import InputField from "../../components/inputField/inputField";
import handleFilterOperation from "./FilterLogic";
import "./TransactionPage.css"
import type { transactionDTO } from "../../store/transactionStore/transactionStore.interface";
import { Table, TablePagination } from "@mui/material";
import TableComponent from "../../components/TableComponent/TableComponent";

const TransactionPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [value,setValue] =useState("");
  const rowsPerPage = 10;
  // [{fromAccount : "" ,
  //     toAccount : "" ,
  //     description : "",
  //     amount : 0,
  //     status :"PENDING",
  //     type : "DEPOSIT",
  //     createdAt : ""} ]
      const transactions:transactionDTO[] = [
  {
    fromAccount: "ACC1001",
    toAccount: "ACC2001",
    description: "Salary Deposit",
    amount: 1000,
    type: "DEPOSIT",
    createdAt: "2025-09-01",
  },
  {
    fromAccount: "ACC1002",
    toAccount: "ACC2002",
    description: "Utility Bill Payment",
    amount: 150,
    type: "WITHDRAW",
    createdAt: "2025-09-02",
  },
  {
    fromAccount: "ACC1001",
    toAccount: "ACC1003",
    description: "Transfer to Friend",
    amount: 200,
    type: "TRANSFER",
    createdAt: "2025-09-03",
  },
  {
    fromAccount: "ACC1004",
    toAccount: "ACC2004",
    description: "Deposit via ATM",
    amount: 500,
    type: "DEPOSIT",
    createdAt: "2025-09-04",
  },
  {
    fromAccount: "ACC1002",
    toAccount: "ACC1005",
    description: "Online Purchase",
    amount: 300,
    type: "WITHDRAW",
    createdAt: "2025-09-05",
  },
  {
    fromAccount: "ACC1003",
    toAccount: "ACC2006",
    description: "Salary Deposit",
    amount: 1200,
    type: "DEPOSIT",
    createdAt: "2025-09-06",
  },
  {
    fromAccount: "ACC1001",
    toAccount: "ACC1004",
    description: "Transfer to Family",
    amount: 250,
    type: "TRANSFER",
    createdAt: "2025-09-07",
  },
  {
    fromAccount: "ACC1003",
    toAccount: "ACC2007",
    description: "Grocery Payment",
    amount: 400,

    type: "WITHDRAW",
    createdAt: "2025-09-08",
  },
  {
    fromAccount: "ACC1002",
    toAccount: "ACC2008",
    description: "ATM Deposit",
    amount: 600,
    type: "DEPOSIT",
    createdAt: "2025-09-09",
  },
  {
    fromAccount: "ACC1004",
    toAccount: "ACC1001",
    description: "Transfer to Friend",
    amount: 350,
    type: "TRANSFER",
    createdAt: "2025-09-10",
  },
  {
    fromAccount: "ACC1001",
    toAccount: "ACC2001",
    description: "Salary Deposit",
    amount: 1000,
    type: "DEPOSIT",
    createdAt: "2025-09-01",
  },
  {
    fromAccount: "ACC1002",
    toAccount: "ACC2002",
    description: "Utility Bill Payment",
    amount: 150,
    type: "WITHDRAW",
    createdAt: "2025-09-02",
  },
  {
    fromAccount: "ACC1001",
    toAccount: "ACC1003",
    description: "Transfer to Friend",
    amount: 200,
    type: "TRANSFER",
    createdAt: "2025-09-03",
  },
  {
    fromAccount: "ACC1004",
    toAccount: "ACC2004",
    description: "Deposit via ATM",
    amount: 500,
    type: "DEPOSIT",
    createdAt: "2025-09-04",
  },
  {
    fromAccount: "ACC1002",
    toAccount: "ACC1005",
    description: "Online Purchase",
    amount: 300,
    type: "WITHDRAW",
    createdAt: "2025-09-05",
  },
  
];
  const [filteredRes, setFilteredRes] = useState<transactionDTO[]>(transactions);


  
  // useEffect(() => {
  //   fetchTransactionDetails();
  //   setFilteredRes(transactions)
  // }, []);

  // const { transactions, loading, error, fetchTransactionDetails } = transactioStore();
  const headersForTransactionTable=["fromAccount","toAccount","description","amount","type","createdAt"];
  const paginatedData = filteredRes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          onChange={(e)=>{handleFilterOperation(e,setValue, transactions, setFilteredRes)}}   
          />
      </div>
      <div className="transactiontableCss">
        <TableComponent tableheader={headersForTransactionTable} tabledata={paginatedData}>
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
