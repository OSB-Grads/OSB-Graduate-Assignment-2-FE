import React from 'react';
import './Home.css'
import DashBoardAccount from '../components/DashBoardAccount';
import QuickActionList from '../components/QuickActionList';
import latestNotification1 from '../assets/latest-notification-1.png'
import latestNotification2 from '../assets/latest-notification-2.png'

export default function Home() {
  return (
    <div className='dashboard'>

      <div className='dashboard-welcome-note'>
        <div>
          <span>Welcome back, Olivia</span>
        </div>
      </div>

      <div className='dashboard-note'>
        <span>Your Accounts</span>
      </div>

      <div className='account-details'>
        <div>
          <DashBoardAccount></DashBoardAccount>
        </div>
      </div>

      <div className='quick-action-headding'>
        <span>Quick Actions</span>
      </div>

      <div className='quick-action-lists'>
        <QuickActionList></QuickActionList> 
      </div>

      <div className='lateset-notifications'>
         <span>Latest Notifications</span>
      </div>

      <div className='latest-notifiction'>

        <div className='notification-image'>
          <div >
          <img src={latestNotification1} alt="" />
          </div>
        </div>

        <div className='notification'>
          <div className='notification-label'>
            <span>New transaction</span>
          </div>
          <div className='notification-sublabel'>
            <span>2 hours ago</span>
          </div>

        </div>
        
      </div>


      <div className='latest-notifiction'>

        <div className='notification-image'>
          <div >
          <img src={latestNotification2} alt="" />
          </div>
        </div>

        <div className='notification'>
          <div className='notification-label'>
            <span>Account update</span>
          </div>
          <div className='notification-sublabel'>
            <span>Yesterday</span>
          </div>

        </div>
        
      </div>


      
    </div>
  );
}
