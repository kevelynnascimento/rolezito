import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { AdBanner } from "../../components/AdBanner";
import { PlaceSkeleton } from "../../components/PlaceSkeleton";
import { useFavorites } from "../../hooks/useFavorites";
import "./style.css";
import { PlaceCard } from "../../components/PlaceCard";
import { Place } from "../../types/place";
import { PageHeader } from "../../components/PageHeader";
import { Refresher } from "../../components/Refresher";

export const FavoritesScreen: React.FC = () => {
  const { favorites, loading, refreshing, error, refresh } = useFavorites();

  const handleRefresh = async () => {
    await refresh();
  };

  // Função para criar lista com anúncios intercalados
  // Mostra um banner a cada 3 lugares para facilitar visualização
  const createListWithAds = () => {
    const listWithAds: Array<{
      type: "place" | "ad";
      data?: Place;
      adId?: string;
    }> = [];
    const AD_FREQUENCY = 3; // Banner a cada 3 lugares

    favorites.forEach((place, index) => {
      listWithAds.push({ type: "place", data: place });

      // Adiciona banner após cada grupo de lugares (exceto após o último)
      if ((index + 1) % AD_FREQUENCY === 0 && index + 1 < favorites.length) {
        listWithAds.push({
          type: "ad",
          adId: `favorites-ad-${Math.floor((index + 1) / AD_FREQUENCY)}`,
        });
      }
    });

    return listWithAds;
  };

  const handleAdPress = () => {
    console.log("Anúncio clicado na página de favoritos");
  };

  return (
    <IonPage>
      <PageHeader title="Favoritos" />
      <IonContent className="favorites-content">
        <Refresher onRefresh={handleRefresh} />
        <div className="favorites-list">
          {loading ? (
            <PlaceSkeleton count={5} />
          ) : error ? (
            <div className="error-container">
              <p>Erro: {error}</p>
            </div>
          ) : refreshing ? (
            <PlaceSkeleton count={3} />
          ) : favorites.length > 0 ? (
            createListWithAds().map((item, idx) => {
              if (item.type === "ad") {
                return (
                  <AdBanner
                    key={item.adId}
                    adId={item.adId}
                    onPress={handleAdPress}
                  />
                );
              } else {
                return (
                  <PlaceCard
                    key={`favorite-${item.data!.id}-${idx}`}
                    place={item.data!}
                  />
                );
              }
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💜</div>
              <h2>Nenhum favorito ainda</h2>
              <p>
                Adicione places e eventos aos seus favoritos para vê-los aqui!
              </p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
