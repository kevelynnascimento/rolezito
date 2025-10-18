import { useState, useCallback, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  memberSince: string;
}

const mockUserProfile: UserProfile = {
  name: 'Seu Nome',
  email: 'seuemail@exemplo.com',
  phone: '(00) 00000-0000',
  avatarUrl: 'https://picsum.photos/seed/user1/120/120',
  memberSince: 'outubro 2025'
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadProfile = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          setProfile(mockUserProfile);
          setLoading(false);
          setRefreshing(false);
          resolve();
        } catch {
          setError('Erro ao carregar perfil');
          setLoading(false);
          setRefreshing(false);
          resolve();
        }
      }, isRefresh ? 1500 : 800);
    });
  }, []);

  const saveProfile = useCallback(async (updatedProfile: Partial<UserProfile>) => {
    setSaving(true);
    setError(null);
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          if (profile) {
            setProfile({ ...profile, ...updatedProfile });
          }
          setSaving(false);
          resolve(true);
        } catch {
          setError('Erro ao salvar perfil');
          setSaving(false);
          resolve(false);
        }
      }, 1000);
    });
  }, [profile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const refresh = () => {
    return loadProfile(true);
  };

  return { 
    profile, 
    loading, 
    refreshing, 
    saving, 
    error, 
    refresh, 
    saveProfile,
    updateProfile: setProfile 
  };
}