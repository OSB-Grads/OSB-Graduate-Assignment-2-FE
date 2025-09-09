import React from 'react'
import { Link } from 'react-router-dom'


import './QuickActionItem.css'


interface QuickactionProps{
    
    label:string;
    subLabel:string;
    icon:string;
}


const QuickActionItem:React.FC<QuickactionProps> = ({label,subLabel,icon})=>{


  return (
    
         <div className='action-list'>
            <img src={icon} alt="" />
            <div className='action-info'>
                <div className='action-info-name'>
                    <span>{label}</span>
                </div>
                <div className='action-info-fullname'>
                    <span>{subLabel}</span>
                </div>
            </div>
         </div>
    
  )
}

export default QuickActionItem
