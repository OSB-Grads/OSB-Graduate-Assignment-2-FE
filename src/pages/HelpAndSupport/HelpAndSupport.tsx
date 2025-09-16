import React from 'react'
import './HelpAndSupport.css'
import CollapsibleCard from '../../components/CollapsibleCard/CollapsibleCard'
import { HelpItems } from '../../data/HelpAndSupport'
import type { helpItem } from '../../data/HelpAndSupport'

const HelpAndSupport = () => {
  return (
    <div className='help-support-main-container'>
      <div className='help-support-container'>
        <div className='help-support-container-heading'>
          <span> Help & Support</span>
        </div>

        <div className='help-support-questions-answers'>
          {HelpItems.map((item,index)=>(
            <CollapsibleCard title={item.label} key={index}
            answer={item.sublabel}/>
        
          ))}
        </div>

      </div>

    </div>
  )
}

export default HelpAndSupport
