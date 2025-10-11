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
import './ProfileScreen.css';

export const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('Seu Nome');
  const [phone, setPhone] = useState('(00) 00000-0000');
  const [email, setEmail] = useState('seuemail@exemplo.com');
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = () => {
    setToastVisible(true);
    // Aqui você pode integrar com backend ou storage local
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
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
          <IonRefresherContent />
        </IonRefresher>

        <div className="profile-container">
          {/* Profile Header */}
          <IonCard className="profile-header-card">
            <IonCardContent className="profile-header">
              <IonAvatar className="profile-avatar">
                <img 
                  src="https://picsum.photos/seed/user1/120/120" 
                  alt="Avatar do usuário" 
                />
              </IonAvatar>
              <div className="profile-info">
                <h2 className="profile-name">{name}</h2>
                <p className="profile-subtitle">Membro desde outubro 2025</p>
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
                    value={name}
                    onIonInput={(e) => setName(e.detail.value!)}
                    placeholder="Digite seu nome"
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={mailOutline} slot="start" color="primary" />
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value!)}
                    placeholder="Digite seu email"
                    type="email"
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={callOutline} slot="start" color="primary" />
                  <IonLabel position="stacked">Telefone</IonLabel>
                  <IonInput
                    value={phone}
                    onIonInput={(e) => setPhone(e.detail.value!)}
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
              >
                Salvar Alterações
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

        {/* Toast */}
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message="Perfil atualizado com sucesso!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};