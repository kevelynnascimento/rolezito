import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { 
  searchOutline,
  heartOutline, 
  personOutline
} from 'ionicons/icons';

import { DiscoverScreen } from '../pages/DiscoverScreen';
import { FavoritesScreen } from '../pages/FavoritesScreen';
import { ProfileScreen } from '../pages/ProfileScreen';
import './TabNavigation.css';

const TabNavigation: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/discover">
          <DiscoverScreen />
        </Route>
        <Route exact path="/tabs/favorites">
          <FavoritesScreen />
        </Route>
        <Route exact path="/tabs/profile">
          <ProfileScreen />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/discover" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="discover" href="/tabs/discover" className="custom-tab-button">
          <IonIcon aria-hidden="true" icon={searchOutline} />
          <IonLabel>Descobrir</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="favorites" href="/tabs/favorites" className="custom-tab-button">
          <IonIcon aria-hidden="true" icon={heartOutline} />
          <IonLabel>Favoritos</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="profile" href="/tabs/profile" className="custom-tab-button">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabNavigation;