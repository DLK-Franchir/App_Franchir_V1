
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotificationContext } from '@/contexts/notification-context';
import { Bell, RotateCcw, Plus, Minus } from 'lucide-react';

// Composant de debug pour les notifications (uniquement en dev)
export function NotificationDebug() {
  const {
    notifications,
    dismissNotification,
    resetNotification,
    updateNotificationCount,
    getTotalVisibleCount,
    resetAllNotifications,
    dismissAllNotifications
  } = useNotificationContext();

  const [isVisible, setIsVisible] = useState(false);

  // Ne pas afficher en production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Bouton pour ouvrir le debug */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          title="Debug Notifications"
        >
          <Bell className="h-5 w-5" />
          {getTotalVisibleCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 p-0 rounded-full">
              {getTotalVisibleCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Panel de debug */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 w-96 max-h-96 overflow-y-auto">
          <Card className="bg-white border-2 border-purple-200 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-700 font-montserrat flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Debug Notifications
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats globales */}
              <div className="flex gap-2">
                <Badge variant="outline">
                  Total: {getTotalVisibleCount()}
                </Badge>
                <Button
                  onClick={resetAllNotifications}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset All
                </Button>
                <Button
                  onClick={dismissAllNotifications}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Dismiss All
                </Button>
              </div>

              {/* Contrôles pour chaque notification */}
              {Object.entries(notifications).map(([key, notification]) => (
                <div key={key} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{key}</span>
                    <div className="flex items-center gap-2">
                      {notification.isVisible && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {notification.count}
                        </Badge>
                      )}
                      <Button
                        onClick={() => dismissNotification(key as any)}
                        size="sm"
                        variant="ghost"
                        className="text-xs p-1 h-6"
                        disabled={!notification.isVisible}
                      >
                        Hide
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        const newCount = Math.max(0, notification.count - 1);
                        updateNotificationCount(key as any, newCount);
                      }}
                      size="sm"
                      variant="outline"
                      className="text-xs p-1 h-6 w-6"
                      disabled={notification.count <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="text-xs min-w-[20px] text-center">
                      {notification.count}
                    </span>
                    
                    <Button
                      onClick={() => {
                        const newCount = notification.count + 1;
                        updateNotificationCount(key as any, newCount);
                      }}
                      size="sm"
                      variant="outline"
                      className="text-xs p-1 h-6 w-6"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      onClick={() => resetNotification(key as any, 3)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Reset
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Last updated: {new Date(notification.lastUpdated).toLocaleTimeString()}
                  </div>
                </div>
              ))}

              {/* Info sur localStorage */}
              <div className="text-xs text-gray-500 border-t pt-2">
                <p>💾 Les notifications sont sauvegardées dans localStorage</p>
                <p>🔄 Rechargez la page pour voir la persistance</p>
                <p>👆 Cliquez sur les badges dans l'header/sidebar pour les masquer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
