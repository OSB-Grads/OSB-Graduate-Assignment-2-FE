
import type { Notification } from "./Notification.interface";
export const addNotification=(set:any ,notification:Notification) =>{
    set((state:any) => ({
      notifications: [notification, ...state.notifications].slice(0, 3),
      unreadCount: state.unreadCount + 1,
    }))
}

  export const clearNotifications=(set:any) => set({ notifications: [], unreadCount: 0 })
  export const markAllAsRead=(set:any) => set({ unreadCount: 0 })