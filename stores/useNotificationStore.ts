import { create } from "zustand";
import { NotificationItem } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/mocks/data";

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<NotificationItem, "id" | "timestamp" | "read">) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (item) =>
    set((state) => {
      const newNotif: NotificationItem = {
        ...item,
        id: `notif_${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      const updated = [newNotif, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
}));
