import { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Text,
  useTheme,
  HelperText,
  Surface,
  IconButton,
  Divider
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  type FormFields = 'username' | 'email' | 'password' | 'confirmPassword' | 'fullName';
  type ErrorsType = Partial<Record<FormFields, string | null>>;
  const [errors, setErrors] = useState<ErrorsType>({});
  const { register } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const success = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });

      if (success) {
        Alert.alert(
          'Sucesso',
          'Conta criada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/')
            }
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível criar a conta');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Ocorreu um erro durante o registro');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '') &&
    Object.keys(errors).length === 0;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#A78BFA', '#8B5CF6', '#7C3AED']}
        style={[styles.gradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <IconButton
            icon="arrow-left"
            iconColor="#FFFFFF"
            size={24}
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialIcons name="person-add" size={40} color="#FFFFFF" />
            </View>
            <Text variant="headlineMedium" style={styles.appTitle}>
              Criar Conta
            </Text>
            <Text variant="bodyLarge" style={styles.appSubtitle}>
              Junte-se à nossa comunidade
            </Text>
          </View>

          {/* Register Card */}
          <Surface style={[styles.registerCard, { maxWidth: width - 40 }]} elevation={5}>
            <View style={styles.cardHeader}>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                Bem-vindo!
              </Text>
              <Text variant="bodyMedium" style={styles.cardSubtitle}>
                Preencha seus dados para criar sua conta
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                label="Nome Completo"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                mode="outlined"
                style={styles.input}
                disabled={loading}
                error={!!errors.fullName}
                autoCapitalize="words"
                left={<TextInput.Icon icon="account" />}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />
              {errors.fullName && (
                <HelperText type="error" visible={!!errors.fullName} style={styles.errorText}>
                  {errors.fullName}
                </HelperText>
              )}

              <TextInput
                label="Nome de Usuário"
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value)}
                mode="outlined"
                style={styles.input}
                disabled={loading}
                error={!!errors.username}
                autoCapitalize="none"
                autoCorrect={false}
                left={<TextInput.Icon icon="at" />}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />
              {errors.username && (
                <HelperText type="error" visible={!!errors.username} style={styles.errorText}>
                  {errors.username}
                </HelperText>
              )}

              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                mode="outlined"
                style={styles.input}
                disabled={loading}
                error={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                left={<TextInput.Icon icon="email" />}
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />
              {errors.email && (
                <HelperText type="error" visible={!!errors.email} style={styles.errorText}>
                  {errors.email}
                </HelperText>
              )}

              <TextInput
                label="Senha"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                disabled={loading}
                error={!!errors.password}
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
              {errors.password && (
                <HelperText type="error" visible={!!errors.password} style={styles.errorText}>
                  {errors.password}
                </HelperText>
              )}

              <TextInput
                label="Confirmar Senha"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                mode="outlined"
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                disabled={loading}
                error={!!errors.confirmPassword}
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                outlineStyle={styles.inputOutline}
                contentStyle={styles.inputContent}
              />
              {errors.confirmPassword && (
                <HelperText type="error" visible={!!errors.confirmPassword} style={styles.errorText}>
                  {errors.confirmPassword}
                </HelperText>
              )}

              <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.registerButton}
                contentStyle={styles.buttonContent}
                disabled={loading || !isFormValid}
                loading={loading}
                buttonColor="#A78BFA"
                textColor="#FFFFFF"
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>

              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text variant="bodySmall" style={styles.dividerText}>ou</Text>
                <Divider style={styles.divider} />
              </View>

              <Button
                mode="text"
                onPress={() => router.back()}
                style={styles.loginLink}
                disabled={loading}
                textColor="#A78BFA"
              >
                Já tem uma conta? Fazer login
              </Button>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
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
  registerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    margin: 20,
    marginTop: 0,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 28,
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
    marginBottom: 8,
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
  errorText: {
    marginBottom: 12,
    marginTop: -4,
    marginLeft: 0,
  },
  registerButton: {
    borderRadius: 12,
    marginTop: 16,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
  loginLink: {
    alignSelf: 'center',
    marginTop: 8,
  },
});