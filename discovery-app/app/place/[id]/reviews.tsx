import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, Button, Divider, Modal, Portal, TextInput, Snackbar, Card } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Header } from '../../../components/Header';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import ScreenContainer from '@/components/ScreenContainer';

const mockPlaces = [
	{
		id: '1',
		name: 'Bar do João',
		rating: 4.5,
		reviewCount: 128,
		reviews: [
			{
				id: 1,
				user: 'Maria Santos',
				rating: 5,
				comment: 'Lugar incrível! Música ótima e ambiente super agradável. O atendimento é excelente e os drinks são muito bem preparados. Voltarei com certeza!',
				date: '2 dias atrás',
			},
			{
				id: 2,
				user: 'Pedro Lima',
				rating: 4,
				comment: 'Boa música, mas o atendimento poderia ser mais rápido. No geral é um bom local para sair com os amigos.',
				date: '1 semana atrás',
			},
			{
				id: 3,
				user: 'Ana Costa',
				rating: 5,
				comment: 'Adorei o ambiente! Super aconchegante e a música ao vivo estava maravilhosa. Recomendo muito!',
				date: '2 semanas atrás',
			},
			{
				id: 4,
				user: 'João Silva',
				rating: 3,
				comment: 'Local ok, mas achei um pouco caro. O ambiente é legal mas poderia melhorar.',
				date: '3 semanas atrás',
			},
			{
				id: 5,
				user: 'Carla Oliveira',
				rating: 5,
				comment: 'Perfeito para um encontro! Ambiente romântico e música incrível. Os garçons são muito atenciosos.',
				date: '1 mês atrás',
			},
			{
				id: 6,
				user: 'Rafael Santos',
				rating: 4,
				comment: 'Gostei bastante do local. Boa variedade de drinks e petiscos. Só o som estava um pouco alto.',
				date: '1 mês atrás',
			},
			{
				id: 7,
				user: 'Juliana Freitas',
				rating: 5,
				comment: 'Melhor bar da região! Sempre que vou é uma experiência incrível. A banda ao vivo é sensacional!',
				date: '2 meses atrás',
			},
			{
				id: 8,
				user: 'Marcos Pereira',
				rating: 4,
				comment: 'Ambiente descontraído e bom para ir com amigos. Os preços são justos e o local é bem localizado.',
				date: '2 meses atrás',
			},
		],
	},
];

export default function ReviewsScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [showRatingModal, setShowRatingModal] = useState(false);
	const [userRating, setUserRating] = useState(0);
	const [userComment, setUserComment] = useState('');
	const [ratingSnackbar, setRatingSnackbar] = useState(false);
	const [filterRating, setFilterRating] = useState(0); // 0 = todas as avaliações

	// Encontrar o local pelos dados mock
	const place = mockPlaces.find(p => p.id === id) || mockPlaces[0];

	// Filtrar avaliações por rating
	const filteredReviews = filterRating === 0 
		? place.reviews 
		: place.reviews.filter(review => review.rating === filterRating);

	const handleRatingSubmit = () => {
		if (userRating === 0) {
			return;
		}

		// Aqui você enviaria a avaliação para o backend
		console.log('Rating submitted:', { rating: userRating, comment: userComment });

		// Reset form
		setUserRating(0);
		setUserComment('');
		setShowRatingModal(false);
		setRatingSnackbar(true);
	};

	const StarRating = ({ 
		rating, 
		onRatingPress, 
		size = 32, 
		readonly = false 
	}: {
		rating: number,
		onRatingPress?: (rating: number) => void,
		size?: number,
		readonly?: boolean
	}) => {
		return (
			<View style={styles.starContainer}>
				{[1, 2, 3, 4, 5].map((star) => (
					<TouchableOpacity
						key={star}
						onPress={() => !readonly && onRatingPress?.(star)}
						disabled={readonly}
						activeOpacity={readonly ? 1 : 0.7}
					>
						<MaterialIcons
							name="star"
							size={size}
							color={star <= rating ? '#FBBF24' : '#E5E7EB'}
							style={styles.star}
						/>
					</TouchableOpacity>
				))}
			</View>
		);
	};

	const getRatingText = (rating: number) => {
		switch (rating) {
			case 1: return "Muito ruim";
			case 2: return "Ruim";
			case 3: return "Ok";
			case 4: return "Bom";
			case 5: return "Excelente";
			default: return "";
		}
	};

	return (
		<SafeAreaContainer>
			<Header title="Avaliações" />
			<ScreenContainer>
				<ScrollView 
					contentContainerStyle={styles.scrollContent} 
					showsVerticalScrollIndicator={false}
				>
					{/* Cabeçalho com estatísticas */}
					<Card style={styles.statsCard}>
						<Card.Content>
							<View style={styles.statsContainer}>
								<View style={styles.ratingOverview}>
									<Text style={styles.overallRating}>{place.rating}</Text>
									<StarRating rating={Math.floor(place.rating)} size={20} readonly />
									<Text style={styles.reviewCount}>
										{place.reviewCount} avaliações
									</Text>
								</View>
								<Button
									mode="contained"
									onPress={() => setShowRatingModal(true)}
									style={styles.rateButton}
									contentStyle={styles.rateButtonContent}
									labelStyle={styles.rateButtonLabel}
									icon={() => <MaterialIcons name="star" size={16} color="#fff" />}
								>
									Avaliar
								</Button>
							</View>
						</Card.Content>
					</Card>

					{/* Lista de avaliações */}
					<View style={styles.reviewsList}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionTitle}>
								Todas as avaliações ({filteredReviews.length})
							</Text>
						</View>

						{/* Filtros por estrelas */}
						<ScrollView 
							horizontal 
							showsHorizontalScrollIndicator={false}
							style={styles.filterContainer}
							contentContainerStyle={styles.filterContent}
						>
							<TouchableOpacity
								style={[styles.filterChip, filterRating === 0 && styles.filterChipActive]}
								onPress={() => setFilterRating(0)}
							>
								<Text style={[styles.filterChipText, filterRating === 0 && styles.filterChipTextActive]}>
									Todas
								</Text>
							</TouchableOpacity>
							{[5, 4, 3, 2, 1].map((rating) => (
								<TouchableOpacity
									key={rating}
									style={[styles.filterChip, filterRating === rating && styles.filterChipActive]}
									onPress={() => setFilterRating(rating)}
								>
									<View style={styles.filterChipContent}>
										<MaterialIcons name="star" size={16} color={filterRating === rating ? '#fff' : '#A78BFA'} />
										<Text style={[styles.filterChipText, filterRating === rating && styles.filterChipTextActive]}>
											{rating}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>

						{filteredReviews.length === 0 ? (
							<View style={styles.emptyState}>
								<MaterialIcons name="star-border" size={48} color="#D1D5DB" />
								<Text style={styles.emptyStateTitle}>
									Nenhuma avaliação encontrada
								</Text>
								<Text style={styles.emptyStateText}>
									{filterRating === 0 
										? 'Ainda não há avaliações para este local.'
										: `Não há avaliações com ${filterRating} estrela${filterRating > 1 ? 's' : ''}.`
									}
								</Text>
								{filterRating !== 0 && (
									<Button
										mode="text"
										onPress={() => setFilterRating(0)}
										style={styles.resetFilterButton}
									>
										Ver todas as avaliações
									</Button>
								)}
							</View>
						) : (
							filteredReviews.map((review, index) => (
							<View key={review.id}>
								<Card style={styles.reviewCard}>
									<Card.Content>
										<View style={styles.reviewHeader}>
											<View style={styles.userInfo}>
												<Text style={styles.userName}>{review.user}</Text>
												<Text style={styles.reviewDate}>{review.date}</Text>
											</View>
											<StarRating rating={review.rating} size={16} readonly />
										</View>
										<Text style={styles.reviewComment}>{review.comment}</Text>
									</Card.Content>
								</Card>
								{index < filteredReviews.length - 1 && (
									<View style={styles.reviewSeparator} />
								)}
							</View>
						))
						)}
					</View>
				</ScrollView>

				{/* Modal de avaliação */}
				<Portal>
					<Modal
						visible={showRatingModal}
						onDismiss={() => setShowRatingModal(false)}
						contentContainerStyle={styles.modalContent}
					>
						<Card style={styles.ratingCard}>
							<Card.Content>
								<View style={styles.modalHeader}>
									<Text variant="titleMedium" style={styles.modalTitle}>
										Avaliar {place.name}
									</Text>
									<TouchableOpacity
										onPress={() => setShowRatingModal(false)}
										style={styles.closeButton}
									>
										<MaterialIcons name="close" size={24} color="#6B7280" />
									</TouchableOpacity>
								</View>

								<Text style={styles.ratingSubtitle}>
									Como foi sua experiência neste local?
								</Text>

								<View style={styles.ratingSection}>
									<StarRating 
										rating={userRating} 
										onRatingPress={setUserRating}
										size={40}
									/>
									{userRating > 0 && (
										<Text style={styles.ratingText}>
											{getRatingText(userRating)}
										</Text>
									)}
								</View>

								<TextInput
									label="Deixe um comentário (opcional)"
									value={userComment}
									onChangeText={setUserComment}
									mode="outlined"
									multiline
									numberOfLines={4}
									style={styles.commentInput}
									outlineColor="#E5E7EB"
									activeOutlineColor="#A78BFA"
									placeholder="Conte-nos sobre sua experiência..."
								/>

								<View style={styles.ratingActions}>
									<Button
										mode="outlined"
										onPress={() => setShowRatingModal(false)}
										style={styles.cancelButton}
									>
										Cancelar
									</Button>
									<Button
										mode="contained"
										onPress={handleRatingSubmit}
										style={styles.submitButton}
										disabled={userRating === 0}
									>
										Enviar Avaliação
									</Button>
								</View>
							</Card.Content>
						</Card>
					</Modal>
				</Portal>

				{/* Snackbar de confirmação */}
				<Snackbar
					visible={ratingSnackbar}
					onDismiss={() => setRatingSnackbar(false)}
					duration={3000}
					style={styles.snackbar}
					action={{
						label: 'OK',
						onPress: () => setRatingSnackbar(false),
						labelStyle: { color: '#fff' }
					}}
				>
					Avaliação enviada com sucesso! Obrigado pelo feedback.
				</Snackbar>
			</ScreenContainer>
		</SafeAreaContainer>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 20,
	},
	statsCard: {
		marginHorizontal: 8,
		marginTop: 8,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: '#fff',
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	ratingOverview: {
		alignItems: 'center',
		flex: 1,
	},
	overallRating: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#1E1E1E',
		marginBottom: 4,
	},
	reviewCount: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
	},
	rateButton: {
		backgroundColor: '#A78BFA',
		borderRadius: 20,
	},
	rateButtonContent: {
		paddingVertical: 4,
		paddingHorizontal: 16,
	},
	rateButtonLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
	},
	reviewsList: {
		marginTop: 16,
		paddingHorizontal: 8,
	},
	sectionHeader: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#1E1E1E',
		marginBottom: 16,
	},
	filterContainer: {
		marginBottom: 16,
	},
	filterContent: {
		paddingHorizontal: 0,
	},
	filterChip: {
		backgroundColor: '#F3F4F6',
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginRight: 8,
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	filterChipActive: {
		backgroundColor: '#A78BFA',
		borderColor: '#A78BFA',
	},
	filterChipContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	filterChipText: {
		fontSize: 14,
		color: '#374151',
		fontWeight: '500',
		marginLeft: 4,
	},
	filterChipTextActive: {
		color: '#fff',
	},
	reviewCard: {
		borderRadius: 12,
		elevation: 1,
		backgroundColor: '#fff',
	},
	reviewHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12,
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1E1E1E',
		marginBottom: 2,
	},
	reviewDate: {
		fontSize: 12,
		color: '#6B7280',
	},
	reviewComment: {
		fontSize: 14,
		color: '#374151',
		lineHeight: 20,
	},
	reviewSeparator: {
		height: 12,
	},
	emptyState: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
	emptyStateTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#374151',
		marginTop: 16,
		marginBottom: 8,
		textAlign: 'center',
	},
	emptyStateText: {
		fontSize: 14,
		color: '#6B7280',
		textAlign: 'center',
		lineHeight: 20,
		marginBottom: 16,
	},
	resetFilterButton: {
		marginTop: 8,
	},
	starContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	star: {
		marginHorizontal: 1,
	},
	// Modal styles
	modalContent: {
		margin: 20,
	},
	ratingCard: {
		borderRadius: 16,
		backgroundColor: '#fff',
		elevation: 8,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	modalTitle: {
		fontWeight: 'bold',
		color: '#1E1E1E',
		flex: 1,
	},
	closeButton: {
		padding: 4,
	},
	ratingSubtitle: {
		color: '#6B7280',
		fontSize: 14,
		marginBottom: 20,
		textAlign: 'center',
	},
	ratingSection: {
		alignItems: 'center',
		marginBottom: 24,
	},
	ratingText: {
		marginTop: 12,
		fontSize: 16,
		fontWeight: '600',
		color: '#A78BFA',
	},
	commentInput: {
		marginBottom: 24,
		backgroundColor: '#fff',
	},
	ratingActions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		borderRadius: 8,
		borderColor: '#E5E7EB',
	},
	submitButton: {
		flex: 1,
		backgroundColor: '#A78BFA',
		borderRadius: 8,
	},
	snackbar: {
		backgroundColor: '#A78BFA',
		marginBottom: 16,
	},
});
