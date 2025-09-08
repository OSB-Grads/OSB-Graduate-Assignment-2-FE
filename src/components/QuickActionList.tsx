import React from 'react'
import { Link } from 'react-router-dom'

import '../pages/Home.css'
import type {QuickList} from '../data/QuickActionData';
import {QuickActionListData} from '../data/QuickActionData';


const QuickActionList=()=>{
  return (
    <div className='quick-actions'>

      {QuickActionListData.map((item:QuickList)=>(
       <Link 
       to={item.path}
       key={item.id}>
         <div className='action-list'>
            <img src={item.icon} alt="" />
            <div className='action-info'>
                <div className='action-info-name'>
                    <span>{item.label}</span>
                </div>
                <div className='action-info-fullname'>
                    <span>{item.subLabel}</span>
                </div>
            </div>
         </div>

         </Link>
       ))}


    </div>
  )
}

export default QuickActionList
