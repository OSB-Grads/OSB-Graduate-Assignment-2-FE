import React from 'react'


import '../DashboardAccount/DashboardAccount.css'

interface AccountProp{
  AccountType:string;
  AccountNumber:string;
}

const DashboardAccount:React.FC<AccountProp>=({AccountType,AccountNumber}) =>{
  return (
    <>
    <div className='dashboard-account-info'>
        <img src="" alt="" />

        <div className='dashboard-account'>

            <div className='dashboard-account-name'>
                <span>{AccountType} Account</span>
            </div>
            <div className='dashboard-account-number'> 
                <span>{AccountNumber}</span>
            </div>

        </div>
       
    </div>


      
    </>
  )
}

export default DashboardAccount
