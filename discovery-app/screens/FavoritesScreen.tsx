import { StyleSheet, ScrollView, View } from 'react-native';

import { PlaceCard } from '@/components/PlaceCard';
import { Header } from '@/components/Header';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import SafeAreaContainerWithBottomMenu from '@/components/SafeAreaContainerWithBottomMenu';
import ScreenContainer from '@/components/ScreenContainer';

const places = [
	{
		image: 'https://picsum.photos/200',
		title: 'Bar do Zeca',
		tag: 'Bar',
		rating: 4.5,
		distance: '0.8 km',
		status: 'Aberto' as 'Aberto',
	},
	{
		image: 'https://picsum.photos/200',
		title: 'Bar do João',
		tag: 'Bar',
		rating: 4.2,
		distance: '1.2 km',
		status: 'Fechado' as 'Fechado',
	},
	{
		image: 'https://picsum.photos/200',
		title: 'Restaurante da Ana',
		tag: 'Restaurante',
		rating: 4.8,
		distance: '2.0 km',
		status: 'Aberto' as 'Aberto',
	},
	{
		image: 'https://picsum.photos/200',
		title: 'Balada Top',
		tag: 'Balada',
		rating: 4.7,
		distance: '3.5 km',
		status: 'Aberto' as 'Aberto',
	},
];

export default function FavoritesScreen() {
	return (
		<SafeAreaContainerWithBottomMenu>
			<Header title="Favoritos" showBackButton={false} />
			<ScreenContainer backgroundColor="#F8FAFC">
				<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
					{places.map((place, idx) => (
						<PlaceCard
							key={idx}
							image={place.image}
							title={place.title}
							tag={place.tag}
							rating={place.rating}
							distance={place.distance}
							status={place.status}
						/>
					))}
				</ScrollView>
			</ScreenContainer>
		</SafeAreaContainerWithBottomMenu>
	);
}

const styles = StyleSheet.create({
});
