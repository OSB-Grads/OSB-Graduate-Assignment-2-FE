import React from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";


import './AccountPage.css'
import TableComponent from "../../components/TableComponent/TableComponent";


interface AccountData {
  accountNumber: string;
  accountType: string;
  balance: number;
  accountCreated: string;
  accountUpdated: string;
}

const defaultAccounts: AccountData[] = [
  {
    accountNumber: "1234567890",
    accountType: "Savings",
    balance: 2500.75,
    accountCreated: "2022-01-15T10:00:00",
    accountUpdated: "2025-09-09T12:30:00"
  }]

const AccountPage = () => {

  const tableheader = ["Name", "Email", "Action"];

const tabledata = [
  {
    Name: "John Doe",
    Email: "john@example.com",
    Action: <button onClick={() => alert("Clicked John")}>View</button>,
  },
  {
    Name: "Jane Smith",
    Email: "jane@example.com",
    Action: <button onClick={() => alert("Clicked Jane")}>View</button>,
  },
];

  return (
    <>
      <div className="accountpage-container">
        <div className="accountpage-heading">
          <div className="accountpage-heading-name">
            <span>Accounts</span>
          </div>
          
            <ButtonComponent
              label="Create Account"
              type="button"
              variant="secondary"
            ></ButtonComponent>
          
        </div>

        <div className="accounts-dispaly-page">
          <TableComponent
          tableheader={tableheader}
          tabledata={tabledata}
          ></TableComponent>


        </div>



      </div>
    </>
  );
};

export default AccountPage;
