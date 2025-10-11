import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './AdBanner.css';

interface Props {
  adId?: string;
  onPress?: () => void;
}

export const AdBanner: React.FC<Props> = ({ onPress }) => {
  return (
    <IonCard className="ad-banner" button onClick={onPress}>
      <IonCardContent className="ad-content">
        <div className="ad-text">
          <h3>Anúncio Promocional</h3>
          <p>Descubra as melhores ofertas da região!</p>
        </div>
        <div className="ad-cta">
          <span>Toque para saber mais</span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};