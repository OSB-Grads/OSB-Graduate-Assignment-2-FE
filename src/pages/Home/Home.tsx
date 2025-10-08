import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

import {
  QuickActionListData,
  type QuickList,
} from "../../data/QuickActionData";

import LatestNotificationTransferIcon from "../../assets/Latest-notification-transfer-icon.png";

import { formatDistanceToNow, parseISO } from 'date-fns';
import DashBoardAccount from "../../components/DashboardAccount/DashBoardAccount";
import QuickActionItem from "../../components/QuickActionItem/QuickActionItem";
import useUserStore from "../../store/userstore/userstore.ts";
import useTransactionStore from "../../store/transactionStore/transactionStore";
import useAccountStore from "../../store/AccountStore/accountStore.tsx";



export default function Home() {
   const navigate = useNavigate();

  const [userLoading, setUserLoading] = React.useState(true);
  const [userError, setUserError] = React.useState<string | null>(null);

  const { user, getUser } = useUserStore();
  const { transactions, fetchTransactionDetails, loading, error } = useTransactionStore();
  const { accounts, accountError, accountLoading, fetchAllAccounts } = useAccountStore();

  useEffect(() => {
    console.log(accounts, accountError, accountLoading)
  }, [accounts, accountError, accountLoading])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          await getUser();
        }
        setUserError(null);
      } catch (err: any) {
        setUserError(err.message || 'Error loading data');
      } finally {
        setUserLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAccounts=async () => {
      try {
        await fetchAllAccounts();
      }
      catch (err) {
        console.log("Error While Fetching account details", err);
      }
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchTransactions=async () => {
      try {
        await fetchTransactionDetails();
      }
      catch (err) {
        console.log("Error While Fetching Transaction details", err);
      }
    }
    fetchTransactions();
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

          {!accountError && !accountLoading && accounts.map((account, index) => {
            return (
              <DashBoardAccount
                key={index}
                AccountType={account.accountType.includes("FIXED")?"FIXED DEPOSIT":"SAVINGS"}
                AccountNumber={"**"+account.accountNumber.slice(-4)}
                onClick={()=>navigate(`/account-details/${account.accountNumber}`)}
              />
            )
          })}
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
          {
            !error && !loading && transactions.map((item, index) => {
              return (
                <QuickActionItem
                  key={index}
                  label={`${item.description} : amount of ${item.amount} is transferred ${item.fromAccount ? `from ${item.fromAccount} ` : ''}${item.toAccount ? `to ${item.toAccount}` : ''}`}
                  subLabel={formatDistanceToNow(parseISO(item.createdAt))}
                  icon={LatestNotificationTransferIcon}
                ></QuickActionItem>
              )
            })}
        </div>
      </div>
    </div>
  );
}
