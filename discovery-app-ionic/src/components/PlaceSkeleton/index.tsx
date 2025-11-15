import React from 'react';
import { IonSkeletonText, IonCard, IonCardContent } from '@ionic/react';
import './style.css';

interface PlaceSkeletonProps {
  count?: number;
}

export const PlaceSkeleton: React.FC<PlaceSkeletonProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <IonCard key={index} className="place-skeleton-card">
          <div className="place-skeleton-content">
            {/* Type badge skeleton */}
            <div className="skeleton-type-badge">
              <IonSkeletonText animated style={{ width: '45px', height: '16px' }} />
            </div>
            
            {/* Image skeleton */}
            <div className="skeleton-image-container">
              <IonSkeletonText animated className="skeleton-image" />
            </div>

            <IonCardContent className="skeleton-card-content">
              <div className="skeleton-card-info">
                {/* Title skeleton */}
                <IonSkeletonText animated style={{ width: '75%', height: '18px', marginBottom: '4px' }} />
                
                {/* Tag skeleton */}
                <IonSkeletonText animated style={{ width: '60%', height: '14px', marginBottom: '8px' }} />
                
                {/* Event date skeleton (random chance) */}
                {Math.random() > 0.6 && (
                  <IonSkeletonText animated style={{ width: '50%', height: '12px', marginBottom: '6px' }} />
                )}

                {/* Info row skeleton */}
                <div className="skeleton-info-row">
                  <div className="skeleton-info-left">
                    <div className="skeleton-location-icon">
                      <IonSkeletonText animated style={{ width: '16px', height: '16px' }} />
                    </div>
                    <IonSkeletonText animated style={{ width: '35px', height: '12px' }} />
                  </div>
                  
                  <div className="skeleton-status-chip">
                    <IonSkeletonText animated style={{ width: '50px', height: '20px' }} />
                  </div>
                </div>
              </div>
            </IonCardContent>
          </div>
        </IonCard>
      ))}
    </>
  );
};