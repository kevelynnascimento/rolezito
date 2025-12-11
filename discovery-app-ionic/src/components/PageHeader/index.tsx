import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./style.css";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
}) => {
  const history = useHistory();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      history.goBack();
    }
  };

  return (
    <IonHeader className="page-header">
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button">
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
