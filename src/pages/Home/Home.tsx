import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import {
  QuickActionListData,
  type QuickList,
} from "../../data/QuickActionData";

import LatestNotificationTransferIcon from "../../assets/Latest-notification-transfer-icon.png";

import axiosInstance from "../../utils/httpClientUtil";
import { formatDistanceToNow, parseISO } from "date-fns";

import DashBoardAccount from "../../components/DashboardAccount/DashBoardAccount";
import QuickActionItem from "../../components/QuickActionItem/QuickActionItem";
import UserStore from "../../store/userstore/userstore";
import { getUserStore } from "../../store/userstore/userstoreGetters";

interface AccountData {
  accountNumber: string;
  accountType: string;
  balance: number;
  accountCreated: string;
  accountUpdated: string;
}

interface TransactionData {
  fromAccount: string;
  toAccount: string;
  description: string;
  amount: number;
  createdAt: string;
}

const defaultAccounts: AccountData[] = [
  {
    accountNumber: "1234567890",
    accountType: "Savings",
    balance: 2500.75,
    accountCreated: "2022-01-15T10:00:00",
    accountUpdated: "2025-09-09T12:30:00",
  },
];

const defaultTransactions: TransactionData[] = [
  {
    fromAccount: "1234567890",
    toAccount: "9876543210",
    description: "Transaction done successfully",
    amount: 100001,
    createdAt: "2 hours",
  },
];

export default function Home() {
  
  const [userLoading, setUserLoading] = React.useState(true);
  const [userError, setUserError] = React.useState<string | null>(null);

  const [accounts, setAccounts] =
    React.useState<AccountData[]>(defaultAccounts);
  const [accountsLoading, setAccountsLoading] = React.useState<boolean>(true);
  const [accountsError, setAccountsError] = React.useState<string | null>(null);

  const [transactions, setTransactions] =
    React.useState<TransactionData[]>(defaultTransactions);
  const [transactionsLoading, setTransactionsLoading] =
    React.useState<boolean>(true);
  const [transactionsError, setTransactionsError] = React.useState<
    string | null
  >(null);

  const { user, getUser } = getUserStore();
  useEffect(() => {
    try {
      if (user == null) {
        getUser();
        setUserLoading(false);
        setUserError(null);
      }
    } catch (err: any) {
      setUserError(err);
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/accounts")
      .then((res) => {
        setAccounts(res.data);
        setAccountsLoading(false);
      })
      .catch((err) => {
        setAccountsError("failed to fetch the accounts");
        setAccountsLoading(false);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/transactions")
      .then((res) => {
        const formatData = res.data.map((item: any) => ({
          fromAccount: item.fromAccount,
          toAccount: item.toAccount,
          description: item.description,
          amount: item.amount,
          createdAt: formatDistanceToNow(parseISO(item.createdAt), {
            addSuffix: true,
          }),
        }));
        setTransactions(formatData);
        setTransactionsLoading(false);
      })
      .catch((err) => {
        setTransactionsError("failed to fetch the transaction");
        setTransactionsLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-welcome-note">
        <div>
          {user?.name ? (
            <span>{`Welcome back, ${user?.name}`}</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>

      <div className="dashboard-note">
        <span>Your Accounts</span>
      </div>

      <div className="account-details">
        <div>
          {/* {accountsError && <p>{accountsError}</p>}  */}
          {accounts.map((account, index) => (
            <DashBoardAccount
              key={index}
              AccountType={account.accountType}
              AccountNumber={account.accountNumber}
            />
          ))}
        </div>
      </div>

      <div className="quick-action-headding">
        <span>Quick Actions</span>
      </div>

      <div className="quick-action-lists">
        <div className="quick-actions">
          {QuickActionListData.map((item: QuickList) => (
            <Link to={item.path} key={item.id}>
              <QuickActionItem
                label={item.label}
                subLabel={item.subLabel}
                icon={item.icon}
              ></QuickActionItem>
            </Link>
          ))}
        </div>
      </div>

      <div className="lateset-notifications">
        <span>Latest Notifications</span>
      </div>

      <div className="latest-notifiction">
        <div className="latest-notifiction-actions">
          {transactions.map((item, index) => (
            <QuickActionItem
              key={index}
              label={`${item.description} : amount of ${item.amount} is transfered from ${item.fromAccount} to ${item.toAccount}`}
              subLabel={item.createdAt}
              icon={LatestNotificationTransferIcon}
            ></QuickActionItem>
          ))}
        </div>
      </div>
    </div>
  );
}
