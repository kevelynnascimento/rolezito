import React, { useState } from 'react';
import { StyleSheet, View as RNView } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';

import { Text, View } from '@/components/Themed';
import { Header } from '@/components/Header';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import SafeAreaContainerWithBottomMenu from '@/components/SafeAreaContainerWithBottomMenu';
import ScreenContainer from '@/components/ScreenContainer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('Seu Nome');
  const [phone, setPhone] = useState('(00) 00000-0000');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSave = () => {
    setSnackbarVisible(true);
    // Aqui você pode integrar com backend ou storage local
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaContainerWithBottomMenu>
      <Header title="Perfil" showBackButton={false} />
      <ScreenContainer backgroundColor="#F8FAFC">
        <RNView style={styles.content}>
          <RNView style={styles.formCard}>
            <TextInput
              label="Nome"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSave} style={styles.saveButton} buttonColor="#A78BFA">
              Salvar
            </Button>

            <Button onPress={handleLogout}> Sair </Button>
          </RNView>
        </RNView>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={{ backgroundColor: '#A78BFA' }}
        >
          Perfil atualizado!
        </Snackbar>
      </ScreenContainer>
    </SafeAreaContainerWithBottomMenu>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
    width: '100%',
    borderRadius: 12,
  },
});
