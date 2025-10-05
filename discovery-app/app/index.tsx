import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import TabNavigation from '@/components/TabNavigation';

export default function HomeScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login'); // Redireciona para notificações se não estiver logado
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return null; // Pode substituir por um splash screen se preferir

  return <TabNavigation />;
}
