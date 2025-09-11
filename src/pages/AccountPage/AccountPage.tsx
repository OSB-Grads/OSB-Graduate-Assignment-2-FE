import React from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";


import './AccountPage.css'
import TableComponent from "../../components/TableComponent/TableComponent";
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
