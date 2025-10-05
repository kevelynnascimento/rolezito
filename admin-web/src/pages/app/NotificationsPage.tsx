
import { ArrowLeft, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const notifications = [
    {
      id: '1',
      type: 'event',
      title: 'Evento hoje no Bar do João',
      message: 'Show ao vivo com banda local às 22h',
      time: '2 horas atrás',
      read: false,
      placeId: '1'
    },
    {
      id: '2',
      type: 'favorite',
      title: 'Clube Noturno Venus abriu',
      message: 'Seu local favorito acabou de abrir!',
      time: '4 horas atrás',
      read: false,
      placeId: '2'
    },
    {
      id: '3',
      type: 'event',
      title: 'Evento amanhã',
      message: 'Festa temática no Restaurante Bella Vista',
      time: '1 dia atrás',
      read: true,
      placeId: '3'
    },
    {
      id: '4',
      type: 'promotion',
      title: 'Promoção especial',
      message: 'Happy hour até às 20h no Bar do João',
      time: '2 dias atrás',
      read: true,
      placeId: '1'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '🎉';
      case 'favorite':
        return '❤️';
      case 'promotion':
        return '💰';
      default:
        return '🔔';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
        <Link to="/app" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Notificações</h1>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma notificação</h3>
            <p className="text-gray-500">Você será notificado sobre eventos e atualizações dos seus locais favoritos.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={`/app/place/${notification.placeId}`}
                className={`block bg-white rounded-lg p-4 border transition-colors hover:bg-gray-50 ${
                  !notification.read ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{notification.message}</p>
                    <p className="text-gray-400 text-xs">{notification.time}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
