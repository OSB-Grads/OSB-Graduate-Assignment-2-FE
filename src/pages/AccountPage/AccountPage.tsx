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

  const [accounts, setAccounts] =
      React.useState<AccountData[]>(defaultAccounts);
    const [accountsLoading, setAccountsLoading] = React.useState<boolean>(true);
    const [accountsError, setAccountsError] = React.useState<string | null>(null);

  // useEffect(() => {
  //     axiosInstance
  //       .get("/api/v1/accounts")
  //       .then((res) => {
  //         setAccounts(res.data);
  //         setAccountsLoading(false);
  //       })
  //       .catch((err) => {
  //         setAccountsError("failed to fetch the accounts");
  //         setAccountsLoading(false);
  //       });
  //   }, []);

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
          {/* <TableComponent
          tableheader={tableheader}
          tabledata={tabledata}
          ></TableComponent> */}


        </div>



      </div>
    </>
  );
};

export default AccountPage;
