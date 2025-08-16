
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface NotificationBadge {
  id: string;
  count: number;
  isVisible: boolean;
  lastUpdated: number;
}

export interface NotificationState {
  header: NotificationBadge;
  messages: NotificationBadge;
  notifications: NotificationBadge;
  documents: NotificationBadge;
}

const STORAGE_KEY = 'franchir-notifications';

// Valeurs par défaut des notifications
const getDefaultNotificationState = (): NotificationState => ({
  header: {
    id: 'header',
    count: 3,
    isVisible: true,
    lastUpdated: Date.now()
  },
  messages: {
    id: 'messages',
    count: 2,
    isVisible: true,
    lastUpdated: Date.now()
  },
  notifications: {
    id: 'notifications',
    count: 3,
    isVisible: true,
    lastUpdated: Date.now()
  },
  documents: {
    id: 'documents',
    count: 0,
    isVisible: false,
    lastUpdated: Date.now()
  }
});

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationState>(() => {
    // Éviter l'erreur de SSR hydratation
    if (typeof window === 'undefined') {
      return getDefaultNotificationState();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Vérifier que toutes les clés nécessaires existent
        const defaultState = getDefaultNotificationState();
        return {
          ...defaultState,
          ...parsed
        };
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des notifications depuis localStorage:', error);
    }

    return getDefaultNotificationState();
  });

  // Sauvegarder dans localStorage quand l'état change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde des notifications:', error);
      }
    }
  }, [notifications]);

  // Marquer une notification comme lue (la cache)
  const dismissNotification = useCallback((notificationId: keyof NotificationState) => {
    setNotifications(prev => ({
      ...prev,
      [notificationId]: {
        ...prev[notificationId],
        isVisible: false,
        count: 0,
        lastUpdated: Date.now()
      }
    }));
  }, []);

  // Réinitialiser une notification (la rendre visible avec un count)
  const resetNotification = useCallback((notificationId: keyof NotificationState, count: number = 1) => {
    setNotifications(prev => ({
      ...prev,
      [notificationId]: {
        ...prev[notificationId],
        count: count,
        isVisible: count > 0,
        lastUpdated: Date.now()
      }
    }));
  }, []);

  // Mettre à jour le count d'une notification
  const updateNotificationCount = useCallback((notificationId: keyof NotificationState, count: number) => {
    setNotifications(prev => ({
      ...prev,
      [notificationId]: {
        ...prev[notificationId],
        count: count,
        isVisible: count > 0,
        lastUpdated: Date.now()
      }
    }));
  }, []);

  // Obtenir le total des notifications visibles
  const getTotalVisibleCount = useCallback(() => {
    return Object.values(notifications).reduce((total, notification) => {
      return total + (notification.isVisible ? notification.count : 0);
    }, 0);
  }, [notifications]);

  // Réinitialiser toutes les notifications
  const resetAllNotifications = useCallback(() => {
    setNotifications(getDefaultNotificationState());
  }, []);

  // Masquer toutes les notifications
  const dismissAllNotifications = useCallback(() => {
    setNotifications(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        const typedKey = key as keyof NotificationState;
        newState[typedKey] = {
          ...newState[typedKey],
          isVisible: false,
          count: 0,
          lastUpdated: Date.now()
        };
      });
      return newState;
    });
  }, []);

  return {
    notifications,
    dismissNotification,
    resetNotification,
    updateNotificationCount,
    getTotalVisibleCount,
    resetAllNotifications,
    dismissAllNotifications
  };
}
