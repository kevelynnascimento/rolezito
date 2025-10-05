import { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Text,
  useTheme,
  IconButton,
  Surface,
  Divider
} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      // Verificar se é email ou username
      const isEmail = username.includes('@');
      const success = await login(isEmail ? username : username, password);
      
      if (success) {
        router.replace('/');
      } else {
        Alert.alert('Erro', 'Email/usuário ou senha inválidos');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro durante o login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#A78BFA', '#8B5CF6', '#7C3AED']}
        style={[styles.gradient, { paddingTop: insets.top }]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialIcons name="place" size={40} color="#FFFFFF" />
            </View>
            <Text variant="headlineMedium" style={styles.appTitle}>
              Rolezito
            </Text>
            <Text variant="bodyLarge" style={styles.appSubtitle}>
              Descubra os melhores lugares
            </Text>
          </View>

          {/* Login Card */}
          <Surface style={[styles.loginCard, { maxWidth: width - 40 }]} elevation={5}>
            <View style={styles.cardHeader}>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                Bem-vindo de volta!
              </Text>
              <Text variant="bodyMedium" style={styles.cardSubtitle}>
                Entre com suas credenciais para continuar
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                label="Email"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                style={styles.input}
                disabled={loading}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                left={<TextInput.Icon icon="email" />}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                disabled={loading}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                disabled={loading || !username.trim() || !password.trim()}
                loading={loading}
                buttonColor="#A78BFA"
                textColor="#FFFFFF"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text variant="bodySmall" style={styles.dividerText}>ou</Text>
                <Divider style={styles.divider} />
              </View>

              <Link href="/register" asChild>
                <Pressable style={styles.registerLink}>
                  <Text variant="bodyMedium" style={styles.registerText}>
                    Não tem uma conta? 
                    <Text style={styles.registerTextBold}> Cadastre-se</Text>
                  </Text>
                </Pressable>
              </Link>
            </View>
          </Surface>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    margin: 20,
    marginTop: 0,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  inputOutline: {
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
  },
  inputContent: {
    paddingLeft: 16,
  },
  loginButton: {
    borderRadius: 12,
    marginTop: 8,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registerText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  registerTextBold: {
    color: '#A78BFA',
    fontWeight: 'bold',
  },
});