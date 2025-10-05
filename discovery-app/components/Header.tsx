import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  rightContent?: React.ReactNode; // Novo: permite conteúdo à direita
  showBackButton?: boolean; // Novo: controla se mostra o botão de voltar
}

export function Header({ title, rightContent, showBackButton = true }: HeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Voltar">
          <MaterialIcons name="arrow-back" size={24} color="#7C5CFA" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <Text style={styles.title} variant="titleMedium">{title}</Text>
      {rightContent ? (
        <View style={styles.rightContent}>{rightContent}</View>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 66, // Altura fixa para consistência
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6B7280', 
  },
  rightContent: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPlaceholder: {
    width: 40,
    height: 40,
  },
});
