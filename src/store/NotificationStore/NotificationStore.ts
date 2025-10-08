
import { create } from "zustand";
import type { NotificationState } from "./Notification.interface";
import {addNotification,clearNotifications,markAllAsRead}from "./Notification.logic"


const useNotificationStore = create<NotificationState>(
   
  (set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification)=>addNotification(set,notification),

  clearNotifications: () => clearNotifications(set),
  markAllAsRead: () => markAllAsRead(set),

})
);

export default useNotificationStore;
