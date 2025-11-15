import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonList,
  IonIcon,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { 
  personOutline, 
  callOutline, 
  mailOutline, 
  logOutOutline,
  settingsOutline,
  helpCircleOutline,
  informationCircleOutline 
} from 'ionicons/icons';
import { ProfileSkeleton } from '../../components/ProfileSkeleton';
import { useProfile } from '../../hooks/useProfile';
import './style.css';

export const ProfileScreen: React.FC = () => {
  const { 
    profile, 
    loading, 
    refreshing, 
    saving, 
    error, 
    refresh, 
    saveProfile, 
    updateProfile 
  } = useProfile();
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const handleSave = async () => {
    if (!profile) return;
    
    const success = await saveProfile({
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    });
    
    if (success) {
      setToastMessage('Perfil atualizado com sucesso!');
      setToastColor('success');
    } else {
      setToastMessage('Erro ao salvar perfil. Tente novamente.');
      setToastColor('danger');
    }
    setToastVisible(true);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refresh();
    event.detail.complete();
  };

  const handleInputChange = (field: 'name' | 'email' | 'phone', value: string) => {
    if (profile && updateProfile) {
      updateProfile({ ...profile, [field]: value });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="profile-content">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Puxe para atualizar..."
            refreshingText="Carregando..."
            pullingIcon="arrow-down-outline"
            refreshingSpinner="crescent"
          />
        </IonRefresher>

        {loading ? (
          <ProfileSkeleton />
        ) : error ? (
          <div className="error-container">
            <p>Erro: {error}</p>
          </div>
        ) : refreshing ? (
          <ProfileSkeleton />
        ) : profile ? (
          <div className="profile-container">
            {/* Profile Header */}
            <IonCard className="profile-header-card">
              <IonCardContent className="profile-header">
                <IonAvatar className="profile-avatar">
                  <img 
                    src={profile.avatarUrl} 
                    alt="Avatar do usuário" 
                  />
                </IonAvatar>
                <div className="profile-info">
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-subtitle">Membro desde {profile.memberSince}</p>
                </div>
              </IonCardContent>
            </IonCard>

            {/* Profile Form */}
            <IonCard className="profile-form-card">
              <IonCardContent>
                <h3 className="section-title">Informações Pessoais</h3>
                
                <IonList>
                  <IonItem>
                    <IonIcon icon={personOutline} slot="start" color="primary" />
                    <IonLabel position="stacked">Nome</IonLabel>
                    <IonInput
                      value={profile.name}
                      onIonInput={(e) => handleInputChange('name', e.detail.value!)}
                      placeholder="Digite seu nome"
                    />
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start" color="primary" />
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                      value={profile.email}
                      onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                      placeholder="Digite seu email"
                      type="email"
                    />
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={callOutline} slot="start" color="primary" />
                    <IonLabel position="stacked">Telefone</IonLabel>
                    <IonInput
                      value={profile.phone}
                      onIonInput={(e) => handleInputChange('phone', e.detail.value!)}
                      placeholder="Digite seu telefone"
                      type="tel"
                    />
                  </IonItem>
                </IonList>

                <IonButton 
                  expand="block" 
                  onClick={handleSave}
                  color="primary"
                  className="save-button"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </IonButton>
              </IonCardContent>
            </IonCard>

            {/* Settings & Options */}
            <IonCard className="settings-card">
              <IonCardContent>
                <h3 className="section-title">Configurações</h3>
                
                <IonList>
                  <IonItem button>
                    <IonIcon icon={settingsOutline} slot="start" color="medium" />
                    <IonLabel>
                      <h2>Configurações</h2>
                      <p>Preferências e privacidade</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem button>
                    <IonIcon icon={helpCircleOutline} slot="start" color="medium" />
                    <IonLabel>
                      <h2>Ajuda</h2>
                      <p>Suporte e FAQ</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem button>
                    <IonIcon icon={informationCircleOutline} slot="start" color="medium" />
                    <IonLabel>
                      <h2>Sobre</h2>
                      <p>Versão e informações do app</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem button onClick={handleLogout} className="logout-item">
                    <IonIcon icon={logOutOutline} slot="start" color="danger" />
                    <IonLabel color="danger">
                      <h2>Sair</h2>
                      <p>Fazer logout da conta</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </div>
        ) : null}

        {/* Toast */}
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};