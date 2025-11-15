import React, { useEffect, useRef, useState } from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './style.css';

interface Props {
  adId?: string;
  onPress?: () => void;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdBanner: React.FC<Props> = ({ onPress }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    // Verifica se o Google AdSense está configurado
    const isAdSenseConfigured = false; // Mude para true quando configurar
    
    if (!isAdSenseConfigured) {
      setShowFallback(true);
      return;
    }

    try {
      // Carrega o Google AdSense apenas se ainda não foi carregado
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX');
        document.head.appendChild(script);
      }

      // Inicializa o anúncio
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setShowFallback(false);
      }
    } catch (error) {
      console.error('Erro ao carregar Google AdSense:', error);
      setShowFallback(true);
    }
  }, []);

  return (
    <IonCard className="ad-banner" button={!!onPress} onClick={onPress}>
      <IonCardContent className="ad-content">
        {showFallback ? (
          // Mostra o banner de exemplo quando AdSense não está configurado
          <div className="ad-fallback">
            <div className="ad-text">
              <h3>🎯 Espaço Publicitário</h3>
              <p>Anuncie aqui e alcance milhares de usuários!</p>
            </div>
            <div className="ad-cta">
              <span>Saiba mais</span>
            </div>
          </div>
        ) : (
          // Mostra o Google AdSense quando configurado
          <div className="ad-container" ref={adRef}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-format="fluid"
              data-ad-layout-key="-fb+5w+4e-db+86"
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            />
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};