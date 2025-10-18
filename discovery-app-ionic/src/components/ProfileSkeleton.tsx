import React from 'react';
import { IonSkeletonText, IonCard, IonCardContent, IonAvatar, IonList, IonItem } from '@ionic/react';
import './ProfileSkeleton.css';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="profile-skeleton-container">
      {/* Profile Header Skeleton */}
      <IonCard className="profile-skeleton-header-card">
        <IonCardContent className="profile-skeleton-header">
          <IonAvatar className="profile-skeleton-avatar">
            <IonSkeletonText animated className="skeleton-avatar-image" />
          </IonAvatar>
          <div className="profile-skeleton-info">
            <IonSkeletonText animated style={{ width: '60%', height: '24px', marginBottom: '6px' }} />
            <IonSkeletonText animated style={{ width: '45%', height: '16px' }} />
          </div>
        </IonCardContent>
      </IonCard>

      {/* Profile Form Skeleton */}
      <IonCard className="profile-skeleton-form-card">
        <IonCardContent>
          <IonSkeletonText animated style={{ width: '50%', height: '20px', marginBottom: '16px' }} />
          
          <IonList>
            {[1, 2, 3].map((index) => (
              <IonItem key={index} className="skeleton-form-item">
                <div className="skeleton-icon-container" slot="start">
                  <IonSkeletonText animated style={{ width: '24px', height: '24px' }} />
                </div>
                <div className="skeleton-input-container">
                  <IonSkeletonText animated style={{ width: '30%', height: '14px', marginBottom: '8px' }} />
                  <IonSkeletonText animated style={{ width: '80%', height: '18px' }} />
                </div>
              </IonItem>
            ))}
          </IonList>

          <div className="skeleton-save-button">
            <IonSkeletonText animated style={{ width: '100%', height: '44px' }} />
          </div>
        </IonCardContent>
      </IonCard>

      {/* Settings Skeleton */}
      <IonCard className="profile-skeleton-settings-card">
        <IonCardContent>
          <IonSkeletonText animated style={{ width: '40%', height: '20px', marginBottom: '16px' }} />
          
          <IonList>
            {[1, 2, 3, 4].map((index) => (
              <IonItem key={index} className="skeleton-settings-item">
                <div className="skeleton-icon-container" slot="start">
                  <IonSkeletonText animated style={{ width: '24px', height: '24px' }} />
                </div>
                <div className="skeleton-settings-content">
                  <IonSkeletonText animated style={{ width: '40%', height: '18px', marginBottom: '4px' }} />
                  <IonSkeletonText animated style={{ width: '65%', height: '14px' }} />
                </div>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};