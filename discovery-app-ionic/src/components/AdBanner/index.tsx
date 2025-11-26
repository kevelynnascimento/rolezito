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

export const AdBanner: React.FC<Props> = ({ adId }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    const loadAd = async () => {
      try {
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        if (window.adsbygoogle && adRef.current) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdLoaded(true);
          } catch (e) {
            console.error('Erro ao inicializar anúncio:', e);
            setAdError(true);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar Google AdSense:', error);
        setAdError(true);
      }
    };

    const timer = setTimeout(() => {
      if (!adLoaded) {
        loadAd();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adId, adLoaded]);

  return (
    <IonCard className="ad-banner">
      <IonCardContent className="ad-content">
        {!adLoaded || adError ? (
          <div className="ad-fallback">
            <div className="ad-label">Publicidade</div>
            <div className="ad-mock">
              <div className="ad-mock-header">
                <div className="ad-mock-icon"></div>
                <div className="ad-mock-text">
                  <div className="ad-mock-title">Anúncio Patrocinado</div>
                  <div className="ad-mock-url">www.exemplo.com</div>
                </div>
              </div>
              <div className="ad-mock-content">
                <div className="ad-mock-image"></div>
                <div className="ad-mock-body">
                  <div className="ad-mock-headline">Descubra ofertas incríveis perto de você</div>
                  <div className="ad-mock-description">Produtos e serviços selecionados especialmente para você. Clique e confira!</div>
                </div>
              </div>
              <div className="ad-mock-footer">
                <span className="ad-mock-cta">Saiba mais</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="ad-container" ref={adRef}>
            <div className="ad-label">Publicidade</div>
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