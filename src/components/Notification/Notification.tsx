import React, { useState } from 'react'
import './Notification.css'
import useNotificationStore from '../../store/NotificationStore/NotificationStore';
import bellIcon from '../../assets/bell-icon.png'

interface INotification {
    isOpen: boolean
}

const Notification: React.FC<INotification> = ({ isOpen }) => {
    const { notifications, unreadCount } = useNotificationStore();
    
    return (
        <>
            <div className="notification-conatiner">
                <img src={bellIcon} alt="bell-icon" className="bell-icon-image" />
                {unreadCount > 0 &&
                    <span className="notification-counter">{unreadCount}</span>
                }
            </div>
            {isOpen &&
                <div className="notification-dropdown">
                    {notifications.length == 0 ?
                        <div className="notification-item">You're all cought up !</div>
                        : notifications.slice(0, 3).map((item, index) => (
                            <div className="notification-item" key={index}>{item.message}</div>
                        ))
                    }
                </div>
            }

        </>
    )
}

export default Notification;
