import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import { lightNavTheme, lightPaperTheme } from '@/constants/theme';
import { StatusBar } from 'react-native';
import { AuthProvider } from '@/contexts/AuthContext';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootLayoutNav />
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navTheme = lightNavTheme; // Se quiser, pode alternar para darkNavTheme se implementar

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AuthProvider>
        <PaperProvider theme={lightPaperTheme}>
          <ThemeProvider value={navTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="notifications" options={{ headerShown: false }} />
              <Stack.Screen name="place/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="place/[id]/reviews" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
