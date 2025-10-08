export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Notification) => void;
  clearNotifications: () => void;
  markAllAsRead: () => void;
}
