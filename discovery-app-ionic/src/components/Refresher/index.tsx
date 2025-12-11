import React from 'react';
import { IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';

interface RefresherProps {
  onRefresh: () => Promise<void>;
  spinnerType?: 'bubbles' | 'circles' | 'circular' | 'crescent' | 'dots' | 'lines' | 'lines-small';
}

export const Refresher: React.FC<RefresherProps> = ({ 
  onRefresh, 
  spinnerType = 'crescent' 
}) => {
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await onRefresh();
    event.detail.complete();
  };

  return (
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent refreshingSpinner={spinnerType} />
    </IonRefresher>
  );
};