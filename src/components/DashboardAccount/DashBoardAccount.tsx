import React from 'react'


import '../DashboardAccount/DashboardAccount.css'
import accounticon from '../../assets/Bank-account-icon.png'

interface IAccountProp{
  AccountType:string;
  AccountNumber:string;
}


const DashboardAccount:React.FC<IAccountProp>=({AccountType,AccountNumber}) =>{
  return (
    <>
    <div className='dashboard-account-info'>
        <img src={accounticon} alt="Account icon" />

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
