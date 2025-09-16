import React, { type FC } from 'react'

import "./WebFlow.css"
import { Routes, Route, Outlet} from 'react-router-dom'
import Leftnavbar from '../../components/Leftnavbar/Leftnavbar'
import Header from '../../components/Header/Header'

const WebFlow: FC = () => {
  return (
    <div className="web-window">
      <div>
         
        <div  className="below-window">

          <Leftnavbar></Leftnavbar>
            <main className="main-component">
            <Outlet />
            </main>
          
        </div>
      </div>
    </div>
  )
}

export default WebFlow;
