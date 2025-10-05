import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import ScreenContainer from '@/components/ScreenContainer';

const notifications = [
  {
    id: '1',
    type: 'event',
    title: 'Evento hoje no Bar do João',
    message: 'Show ao vivo com banda local às 22h',
    time: '2 horas atrás',
    read: false,
    placeId: '1',
  },
  {
    id: '2',
    type: 'favorite',
    title: 'Clube Noturno Venus abriu',
    message: 'Seu local favorito acabou de abrir!',
    time: '4 horas atrás',
    read: false,
    placeId: '2',
  },
  {
    id: '3',
    type: 'event',
    title: 'Evento amanhã',
    message: 'Festa temática no Restaurante Bella Vista',
    time: '1 dia atrás',
    read: true,
    placeId: '3',
  },
  {
    id: '4',
    type: 'promotion',
    title: 'Promoção especial',
    message: 'Happy hour até às 20h no Bar do João',
    time: '2 dias atrás',
    read: true,
    placeId: '1',
  },
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

export default function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaContainer>
      <Header title="Notificações" />
      <ScreenContainer>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="notifications-none" size={48} color="#D1C4E9" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
              <Text style={styles.emptyText}>Você será notificado sobre eventos e atualizações dos seus locais favoritos.</Text>
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  activeOpacity={0.85}
                  onPress={() => router.push({ pathname: '/place/[id]', params: { id: notification.placeId } })}
                >
                  <Card
                    style={[
                      styles.card,
                      !notification.read && styles.cardUnread,
                    ]}
                    elevation={1}
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.icon}>{getNotificationIcon(notification.type)}</Text>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <View style={styles.titleRow}>
                          <Text style={[styles.title, !notification.read && styles.titleUnread]} numberOfLines={1}>
                            {notification.title}
                          </Text>
                          {!notification.read && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.message} numberOfLines={2}>{notification.message}</Text>
                        <Text style={styles.time}>{notification.time}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingTop: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 0,
  },
  cardUnread: {
    borderColor: '#A78BFA',
    backgroundColor: '#F3E8FF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
  },
  icon: {
    fontSize: 28,
    marginTop: 2,
    marginRight: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  title: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    flex: 1,
  },
  titleUnread: {
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 12,
    backgroundColor: '#A78BFA',
    marginLeft: 4,
  },
  message: {
    color: '#444',
    fontSize: 13,
    marginBottom: 2,
  },
  time: {
    color: '#A0AEC0',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#888',
    marginBottom: 6,
  },
  emptyText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 260,
  },
});
