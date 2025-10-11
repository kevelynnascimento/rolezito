import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Importar as telas
import DiscoverScreen from '@/screens/DiscoverScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DiscoverRoute = () => <DiscoverScreen />;
const FavoritesRoute = () => <FavoritesScreen />;
const ProfileRoute = () => <ProfileScreen />;

export default function TabNavigation() {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const [routes] = useState([
    { 
      key: 'discover', 
      title: 'Descobrir', 
      focusedIcon: ({ color }: { color: string }) => <MaterialIcons name="search" color={color} size={24} />,
      unfocusedIcon: ({ color }: { color: string }) => <MaterialIcons name="search" color={color} size={24} />,
    },
    { 
      key: 'favorites', 
      title: 'Favoritos', 
      focusedIcon: ({ color }: { color: string }) => <MaterialIcons name="favorite-border" color={color} size={24} />,
      unfocusedIcon: ({ color }: { color: string }) => <MaterialIcons name="favorite-border" color={color} size={24} />
    },
    { 
      key: 'profile', 
      title: 'Perfil', 
      focusedIcon: ({ color }: { color: string }) => <MaterialIcons name="perm-identity" color={color} size={24} />,
      unfocusedIcon: ({ color }: { color: string }) => <MaterialIcons name="perm-identity" color={color} size={24} />
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    discover: DiscoverRoute,
    favorites: FavoritesRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: '#A78BFA',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        paddingBottom: insets.bottom, 
        height: 56 + insets.bottom
      }}
      activeColor="#FFF"
      inactiveColor="#E0D7FB"
      labeled={true}
      sceneAnimationEnabled={false}
      activeIndicatorStyle={{
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        elevation: 0,
      }}
      theme={{
        colors: {
          secondaryContainer: 'transparent',
          onSecondaryContainer: '#FFF',
        }
      }}
    />
  );
}
