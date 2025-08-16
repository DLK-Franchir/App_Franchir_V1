
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useNotifications, NotificationState } from '@/hooks/use-notifications';

interface NotificationContextType {
  notifications: NotificationState;
  dismissNotification: (notificationId: keyof NotificationState) => void;
  resetNotification: (notificationId: keyof NotificationState, count?: number) => void;
  updateNotificationCount: (notificationId: keyof NotificationState, count: number) => void;
  getTotalVisibleCount: () => number;
  resetAllNotifications: () => void;
  dismissAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notificationData = useNotifications();

  return (
    <NotificationContext.Provider value={notificationData}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}
