import React, { Component } from 'react'
import logoimage  from '../assets/logo.png'
import bellIcon from '../assets/Depth 5, Frame 0.png'
import profileImage from '../assets/Depth 4, Frame 2.png'
import './Hedder.css'

const Hedder =() =>{
    return (
     <>
     <div className='dashborad-headder'>
        <div className='dashborad-logo'>
            <img src={logoimage} alt="logo image " />
            <span>FinanceFirst</span>
        </div>

        <div className='headder-right'>
            <div className='headder-bell-icon'>
                <img src={bellIcon} alt="bell-icon" />
            </div>
            <div className='profile-info'>
              <img src={profileImage}alt="" />
            </div>

        </div>
     </div>
     </>
    )
  }

  export default Hedder
