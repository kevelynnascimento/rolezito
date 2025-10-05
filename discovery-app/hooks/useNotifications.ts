import { useState, useEffect } from 'react';
import { notificationService, Notification } from '@/services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar notificações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      // Atualizar localmente
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao marcar como lida');
      return false;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const refetch = () => fetchNotifications();

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    refetch,
  };
};