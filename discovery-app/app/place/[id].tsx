import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Linking, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, Card, IconButton, Badge, Button, Divider, Chip, Modal, Portal, TextInput, Snackbar } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Header } from '../../components/Header';
import { CustomMapView } from '../../components/MapView';
import SafeAreaContainer from '@/components/SafeAreaContainer';
import ScreenContainer from '@/components/ScreenContainer';
import { Place, PlaceType } from '@/types/place';

const mockPlaces = [
	{
		id: '1',
		type: 'local',
		name: 'Bar do João',
		category: 'Bar com música ao vivo',
		latitude: -23.5505, // Coordenadas para Vila Madalena, São Paulo
		longitude: -46.6333,
		images: [
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
			'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
			'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
		],
		rating: 4.5,
		reviewCount: 128,
		distance: '0.8 km',
		address: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
		phone: '(11) 3456-7890',
		isOpen: true,
		openingHours: {
			today: '18h às 02h',
			week: [
				'Segunda: Fechado',
				'Terça: Fechado',
				'Quarta: 18h às 02h',
				'Quinta: 18h às 02h',
				'Sexta: 18h às 03h',
				'Sábado: 18h às 03h',
				'Domingo: 18h às 01h',
			],
		},
		description:
			'Um bar aconchegante com música ao vivo todas as noites. Ambiente descontraído, ótimo para ir com amigos ou em um date casual.',
		styleChips: [
			{ label: '🎵 Música ao vivo' },
			{ label: '🍺 Bar' },
			{ label: '👥 Ambiente social' },
			{ label: '💕 Romântico' },
			{ label: '🚗 Estacionamento' },
			{ label: '📶 Wi-Fi' },
		],
		highlights: [
			'Música ao vivo todas as noites',
			'Happy hour até às 20h',
			'DJ convidado hoje',
		],
		reviews: [
			{
				id: 1,
				user: 'Maria Santos',
				rating: 5,
				comment:
					'Lugar incrível! Música ótima e ambiente super agradável.',
				date: '2 dias atrás',
			},
			{
				id: 2,
				user: 'Pedro Lima',
				rating: 4,
				comment:
					'Boa música, mas o atendimento poderia ser mais rápido.',
				date: '1 semana atrás',
			},
		],
	},
];

// Dados mockados para eventos
const mockEvents = [
	{
		id: 'event1',
		type: 'event',
		name: 'Churrasquinho do Menos é Mais',
		category: 'Evento Musical',
		images: [
			'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
			'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
			'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
		],
		rating: 4.7,
		reviewCount: 89,
		distance: '2.3 km',
		eventDate: '2024-11-20',
		eventTime: '18:00',
		eventEndTime: '23:00',
		eventLocation: 'Cerimonial Elegance - Bairro Nobre',
		ticketUrl: 'https://ingresso.com/menos-e-mais-churrasco',
		price: 'A partir de R$ 80',
		organizer: 'Menos é Mais Produções',
		description:
			'Evento especial com churrasco e música do grupo Menos é Mais. Uma noite inesquecível com os maiores sucessos do pagode brasileiro!',
		styleChips: [
			{ label: '🎵 Música ao vivo' },
			{ label: '🍖 Churrasco' },
			{ label: '🎤 Pagode' },
			{ label: '🎪 Evento especial' },
			{ label: '🍺 Bar liberado' },
			{ label: '📱 Check-in digital' },
		],
		highlights: [
			'Grupo Menos é Mais ao vivo',
			'Churrasco premium incluído',
			'Bar com drinks especiais',
			'Área VIP disponível',
		],
		eventInfo: {
			doors: '17:00 - Abertura dos portões',
			duration: '5 horas de evento',
			ageRating: '18+',
			dress: 'Esporte fino',
		}
	},
];

const getEventIcon = (tag: string) => {
	switch (tag.toLowerCase()) {
		case 'música':
			return '🎵';
		case 'promoção':
			return '💰';
		case 'entretenimento':
			return '🎉';
		case 'gastronomia':
			return '🍽️';
		default:
			return '📅';
	}
};

const formatEventDate = (eventDate: string, eventTime: string) => {
	const date = new Date(eventDate);
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	
	const isToday = date.toDateString() === today.toDateString();
	const isTomorrow = date.toDateString() === tomorrow.toDateString();
	
	if (isToday) {
		return `Hoje às ${eventTime}`;
	} else if (isTomorrow) {
		return `Amanhã às ${eventTime}`;
	} else {
		const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
		const dayName = weekdays[date.getDay()];
		return `${dayName} (${date.getDate()}/${date.getMonth() + 1}) às ${eventTime}`;
	}
};

export default function PlaceDetailScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showNavigationModal, setShowNavigationModal] = useState(false);
	const [showRatingModal, setShowRatingModal] = useState(false);
	const [userRating, setUserRating] = useState(0);
	const [userComment, setUserComment] = useState('');
	const [ratingSnackbar, setRatingSnackbar] = useState(false);
	const screenWidth = Dimensions.get('window').width;
	
	// Detecta se é evento ou local baseado no ID
	const isEvent = String(id).startsWith('event');
	
	// Busca dados baseado no tipo
	const place = isEvent ? mockEvents[0] : mockPlaces[0];

	const handleScroll = (event: any) => {
		const scrollPosition = event.nativeEvent.contentOffset.x;
		const index = Math.round(scrollPosition / (screenWidth - 32));
		setCurrentImageIndex(index);
	};

	const handleNavigationOption = (option: string) => {
		const lat = place.latitude;
		const lng = place.longitude;
		const destination = encodeURIComponent(place.address);

		let url = '';

		switch (option) {
			case 'googlemaps':
				if (Platform.OS === 'ios') {
					url = `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=16`;
				} else {
					url = `geo:${lat},${lng}?q=${lat},${lng}(${destination})`;
				}
				break;
			case 'apple':
				url = `http://maps.apple.com/?q=${destination}&ll=${lat},${lng}`;
				break;
			case 'waze':
				url = `waze://?ll=${lat},${lng}&navigate=yes`;
				break;
			case 'uber':
				url = `uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&dropoff[nickname]=${destination}`;
				break;
		}

		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				// Fallback para URLs web
				let webUrl = '';
				switch (option) {
					case 'googlemaps':
						webUrl = `https://maps.google.com/?q=${lat},${lng}`;
						break;
					case 'apple':
						webUrl = `https://maps.apple.com/?q=${destination}&ll=${lat},${lng}`;
						break;
					case 'waze':
						webUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
						break;
					case 'uber':
						webUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`;
						break;
				}
				if (webUrl) {
					Linking.openURL(webUrl);
				}
			}
		});

		setShowNavigationModal(false);
	};

	const handleRatingSubmit = () => {
		if (userRating === 0) {
			return;
		}

		// Here you would send the rating to your backend
		console.log('Rating submitted:', { rating: userRating, comment: userComment });

		// Reset form
		setUserRating(0);
		setUserComment('');
		setShowRatingModal(false);
		setRatingSnackbar(true);
	};

	const StarRating = ({ rating, onRatingPress, size = 32, readonly = false }: {
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

	return (
		<SafeAreaContainer>
			<Header
				title={place.name}
			/>
			<ScreenContainer>
				{/* Header customizado */}

				{/* Card principal com carrossel e informações */}
				<ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
					<Card style={styles.mainCard}>
						{/* Carousel de imagens */}
						<View style={styles.imageContainer}>
							<ScrollView
								horizontal
								pagingEnabled
								showsHorizontalScrollIndicator={false}
								onScroll={handleScroll}
								scrollEventThrottle={16}
								style={styles.carousel}
							>
								{place.images.map((image, index) => (
									<Image
										key={index}
										source={{ uri: image }}
										style={[styles.mainImage, { width: screenWidth - 32 }]}
									/>
								))}
							</ScrollView>
							<View style={styles.imageCount}>
								<Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>
									{currentImageIndex + 1} / {place.images.length}
								</Text>
							</View>
							<View style={styles.paginationContainer}>
								{place.images.map((_, index) => (
									<View
										key={index}
										style={[
											styles.paginationDot,
											{
												backgroundColor: index === currentImageIndex ? '#A78BFA' : 'rgba(255,255,255,0.5)',
											},
										]}
									/>
								))}
							</View>
						</View>

						{/* Info principal */}
						<Card.Content style={styles.cardContent}>
							<View style={styles.titleRow}>
								<View style={{ flex: 1 }}>
									<Text
										variant="titleLarge"
										style={{ fontWeight: 'bold', color: '#1E1E1E', fontSize: 24 }}
									>
										{place.name}
									</Text>
									<Text
										style={{
											color: '#6B7280',
											marginBottom: 8,
											fontSize: 16,
										}}
									>
										{place.category}
									</Text>
								</View>
								<Badge
									style={[
										styles.statusBadge,
										{
											backgroundColor: place.isOpen ? '#E3FCE4' : '#FDEAEA',
											color: place.isOpen ? '#2E7D32' : '#C62828',
											fontSize: 12,
										},
									]}
								>
									{place.isOpen ? 'Aberto' : 'Fechado'}
								</Badge>
							</View>

							<View style={styles.modernInfoRow}>
								<View style={styles.ratingContainer}>
									{/* // TODO: Descomentar para avaliações */}
									{/* <MaterialIcons name="star" size={20} color="#FBBF24" />
									<Text style={styles.mainRatingText}>{place.rating}</Text>
									<Text style={styles.reviewText}>({place.reviewCount} avaliações)</Text> */}
							</View>
							<View style={styles.distanceContainer}>
								<MaterialIcons name="location-on" size={16} color="#A78BFA" />
								<Text style={styles.distanceText}>{place.distance}</Text>
							</View>
						</View>
						
						<Text style={styles.descriptionText}>
							{place.description}
						</Text>
						
						{/* Style Chips */}
						{place.styleChips && place.styleChips.length > 0 && (
							<View style={styles.styleChipsContainer}>
								{place.styleChips.map((chip, index) => (
									<Chip 
										key={index}
										mode="outlined" 
										style={styles.styleChip}
										textStyle={styles.chipText}
									>
										{chip.label}
									</Chip>
								))}
							</View>
						)}

						{/* Highlights/Destaques */}
							{place.highlights && place.highlights.length > 0 && (
								<View style={styles.highlightsContainer}>
									{place.highlights.map((highlight, index) => (
										<View key={index} style={[
											styles.highlightItem,
											{ marginBottom: index === place.highlights.length - 1 ? 0 : 8 }
										]}>
											<View style={styles.highlightDot} />
											<Text style={styles.highlightText}>{highlight}</Text>
										</View>
									))}
								</View>
							)}
						</Card.Content>
					</Card>
					{/* Endereço */}
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => setShowNavigationModal(true)}
					>
						<Card style={[styles.card, styles.addressCard]}>
							<Card.Content>
								<View style={styles.addressHeader}>
									<MaterialIcons
										name="location-on"
										size={20}
										color="#A78BFA"
									/>
									<Text
										variant="titleMedium"
										style={styles.addressTitle}
									>
										Endereço
									</Text>
								</View>
								<Text style={styles.addressText}>
									{place.address}
								</Text>
								<CustomMapView
									latitude={place.latitude}
									longitude={place.longitude}
									title={place.name}
									address={place.address}
								/>
								<Text style={styles.tapHint}>
									📍 Toque para abrir na navegação
								</Text>
							</Card.Content>
						</Card>
					</TouchableOpacity>

					{/* Informações */}
					<Card style={styles.card}>
						<Card.Content>
							<Text
								variant="titleMedium"
								style={{
									fontWeight: 'bold',
									marginBottom: 16,
									color: '#1E1E1E',
								}}
							>
								Informações
							</Text>
							<View style={styles.infoBlock}>
								<MaterialIcons name="phone" size={18} color="#A78BFA" />
								<View style={styles.phoneContainer}>
									<Text style={styles.phoneLabel}>Telefone</Text>
									<Button
										mode="text"
										compact
										onPress={() => Linking.openURL(`tel:${place.phone}`)}
										labelStyle={styles.phoneButton}
										contentStyle={styles.phoneButtonContent}
									>
										{place.phone}
									</Button>
								</View>
							</View>
							<View style={styles.infoBlock}>
								<MaterialIcons
									name="schedule"
									size={18}
									color="#A78BFA"
									style={{ marginTop: 2 }}
								/>
								<View style={styles.scheduleContainer}>
									<Text style={styles.scheduleLabel}>Horário de funcionamento</Text>
									<View style={styles.todaySchedule}>
										<Text style={styles.todayLabel}>Hoje</Text>
										<Text style={styles.todayHours}>{place.openingHours.today}</Text>
									</View>
									<View style={styles.weekSchedule}>
										{place.openingHours.week.map((d, i) => {
											const [day, hours] = d.split(': ');
											const isToday = i === 2; // Quarta-feira (assumindo que hoje é quarta)
											return (
												<View key={i} style={styles.scheduleRow}>
													<Text style={[styles.dayText, isToday && styles.todayDayText]}>
														{day}
													</Text>
													<Text style={[styles.hoursText, isToday && styles.todayHoursText]}>
														{hours}
													</Text>
												</View>
											);
										})}
									</View>
								</View>
							</View>
						</Card.Content>
					</Card>

					{/* Avaliações */}

					{/* TODO: Ativar quando habilitar reviews, preciso descomentar aqui */}
					{/* <Card style={styles.card}>
						<Card.Content>
							<TouchableOpacity
								onPress={() => router.push({ pathname: '/place/[id]/reviews', params: { id: String(id) } })}
								activeOpacity={0.7}
							>
								<View style={styles.reviewsHeader}>
									<Text
										variant="titleMedium"
										style={{
											fontWeight: 'bold',
											color: '#1E1E1E',
											flex: 1,
										}}
									>
										Avaliações
									</Text>
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

								{place.reviews.map((review) => (
									<View key={review.id} style={{ marginBottom: 12 }}>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<Text style={{ fontWeight: 'bold', color: '#1E1E1E' }}>
												{review.user}
											</Text>
											<Text
												style={{
													color: '#888',
													fontSize: 13,
												}}
											>
												{review.date}
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												marginVertical: 2,
											}}
										>
											<StarRating rating={review.rating} size={16} readonly />
										</View>
										<Text style={{ color: '#444' }}>
											{review.comment}
										</Text>
										<Divider style={{ marginTop: 8 }} />
									</View>
								))}

								<Button
									mode="text"
									style={{ marginTop: 8 }}
									labelStyle={{ color: '#A78BFA' }}
									onPress={() => router.push({ pathname: '/place/[id]/reviews', params: { id: String(id) } })}
								>
									Ver todas as avaliações
								</Button>
							</TouchableOpacity>
						</Card.Content>
					</Card> */}

				</ScrollView>

				{/* Modal de navegação */}
				<Portal>
					<Modal
						visible={showNavigationModal}
						onDismiss={() => setShowNavigationModal(false)}
						contentContainerStyle={styles.modalContent}
					>
						<Card style={styles.navigationCard}>
							<Card.Content>
								<View style={styles.modalHeader}>
									<MaterialIcons name="navigation" size={24} color="#A78BFA" />
									<Text variant="titleMedium" style={styles.modalTitle}>
										Abrir navegação
									</Text>
									<IconButton
										icon="close"
										size={20}
										onPress={() => setShowNavigationModal(false)}
										style={styles.closeButton}
									/>
								</View>

								<Text style={styles.modalAddressText}>{place.address}</Text>

								<View style={styles.navigationOptions}>
									<Button
										mode="outlined"
										onPress={() => handleNavigationOption('googlemaps')}
										style={styles.navigationButton}
										icon={() => <MaterialIcons name="map" size={20} color="#4285F4" />}
										labelStyle={styles.buttonLabel}
									>
										Google Maps
									</Button>

									{Platform.OS === 'ios' && (
										<Button
											mode="outlined"
											onPress={() => handleNavigationOption('apple')}
											style={styles.navigationButton}
											icon={() => <MaterialIcons name="map" size={20} color="#007AFF" />}
											labelStyle={styles.buttonLabel}
										>
											Apple Maps
										</Button>
									)}

									<Button
										mode="outlined"
										onPress={() => handleNavigationOption('waze')}
										style={styles.navigationButton}
										icon={() => <MaterialIcons name="navigation" size={20} color="#00BFFF" />}
										labelStyle={styles.buttonLabel}
									>
										Waze
									</Button>

									<Button
										mode="outlined"
										onPress={() => handleNavigationOption('uber')}
										style={styles.navigationButton}
										icon={() => <MaterialIcons name="local-taxi" size={20} color="#000000" />}
										labelStyle={styles.buttonLabel}
									>
										Uber
									</Button>
								</View>
							</Card.Content>
						</Card>
					</Modal>

					{/* Modal de avaliação */}
					<Modal
						visible={showRatingModal}
						onDismiss={() => setShowRatingModal(false)}
						contentContainerStyle={styles.modalContent}
					>
						<Card style={styles.ratingCard}>
							<Card.Content>
								<View style={styles.modalHeader}>
									<MaterialIcons name="star" size={24} color="#A78BFA" />
									<Text variant="titleMedium" style={styles.modalTitle}>
										Avaliar {place.name}
									</Text>
									<IconButton
										icon="close"
										size={20}
										onPress={() => setShowRatingModal(false)}
										style={styles.closeButton}
									/>
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
											{userRating === 1 && "Muito ruim"}
											{userRating === 2 && "Ruim"}
											{userRating === 3 && "Regular"}
											{userRating === 4 && "Bom"}
											{userRating === 5 && "Excelente"}
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
										style={[styles.submitButton, { opacity: userRating === 0 ? 0.5 : 1 }]}
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
	// Card principal moderno
	mainCard: {
		marginHorizontal: 8,
		borderRadius: 20,
		elevation: 4,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		overflow: 'hidden',
	},
	imageContainer: {
		height: 250,
		backgroundColor: '#E5E7EB',
		position: 'relative',
		overflow: 'hidden',
	},
	carousel: {
		flex: 1,
	},
	mainImage: {
		height: 250,
		resizeMode: 'cover',
	},
	imageCount: {
		position: 'absolute',
		top: 10,
		right: 16,
		backgroundColor: 'rgba(0,0,0,0.6)',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	paginationContainer: {
		position: 'absolute',
		bottom: 16,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	card: {
		marginHorizontal: 8,
		marginTop: 8,
		borderRadius: 12,
		elevation: 2,
		backgroundColor: '#fff',
		paddingBottom: 2,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
	},
	openBadge: {
		backgroundColor: '#E3FCE4',
		color: '#2E7D32',
		alignSelf: 'flex-start',
		fontWeight: 'bold',
		fontSize: 13,
	},
	closedBadge: {
		backgroundColor: '#FDEAEA',
		color: '#C62828',
		alignSelf: 'flex-start',
		fontWeight: 'bold',
		fontSize: 13,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	infoText: {
		fontSize: 13,
		color: '#444',
		marginLeft: 3,
		marginRight: 6,
	},
	eventItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 10,
	},
	highlightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 12,
		backgroundColor: '#A78BFA',
		marginRight: 8,
	},
	infoBlock: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 16,
	},
	// Novos estilos para o endereço
	addressHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	addressTitle: {
		fontWeight: 'bold',
		marginLeft: 8,
		color: '#1E1E1E',
		fontSize: 16,
	},
	addressText: {
		color: '#444',
		fontSize: 15,
		lineHeight: 22,
		marginBottom: 8,
	},
	tapHint: {
		color: '#A78BFA',
		fontSize: 13,
		fontStyle: 'italic',
		marginTop: 12,
		textAlign: 'center',
		backgroundColor: '#F3E8FF',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	// Novos estilos para telefone
	phoneContainer: {
		flex: 1,
		marginLeft: 12,
	},
	phoneLabel: {
		color: '#6B7280',
		fontSize: 14,
		marginBottom: 4,
	},
	phoneButton: {
		color: '#A78BFA',
		fontSize: 16,
		fontWeight: '600',
	},
	phoneButtonContent: {
		paddingLeft: 0,
		justifyContent: 'flex-start',
	},
	// Novos estilos para horário
	scheduleContainer: {
		flex: 1,
		marginLeft: 12,
	},
	scheduleLabel: {
		color: '#6B7280',
		fontSize: 14,
		marginBottom: 8,
	},
	todaySchedule: {
		backgroundColor: '#F3E8FF',
		padding: 12,
		borderRadius: 8,
		marginBottom: 12,
		borderLeftWidth: 3,
		borderLeftColor: '#A78BFA',
	},
	todayLabel: {
		color: '#A78BFA',
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 2,
	},
	todayHours: {
		color: '#1E1E1E',
		fontSize: 16,
		fontWeight: '600',
	},
	weekSchedule: {
		backgroundColor: '#F8FAFC',
		borderRadius: 8,
		padding: 8,
	},
	scheduleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderRadius: 6,
	},
	dayText: {
		color: '#374151',
		fontSize: 14,
		fontWeight: '500',
		flex: 1,
	},
	hoursText: {
		color: '#6B7280',
		fontSize: 14,
	},
	todayDayText: {
		color: '#A78BFA',
		fontWeight: 'bold',
	},
	todayHoursText: {
		color: '#A78BFA',
		fontWeight: 'bold',
	},
	// Estilos para o card de endereço clicável
	addressCard: {
		borderColor: '#E0D7FB',
		backgroundColor: '#FEFBFF',
	},
	// Estilos para o modal de navegação
	modalContent: {
		margin: 20,
	},
	navigationCard: {
		borderRadius: 16,
		backgroundColor: '#fff',
		elevation: 8,
	},
	modalHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	modalTitle: {
		flex: 1,
		marginLeft: 8,
		fontWeight: 'bold',
		color: '#1E1E1E',
	},
	closeButton: {
		margin: 0,
	},
	modalAddressText: {
		color: '#6B7280',
		fontSize: 14,
		marginBottom: 16,
		lineHeight: 18,
	},
	navigationOptions: {
		gap: 8,
	},
	navigationButton: {
		borderRadius: 8,
		borderColor: '#E5E7EB',
		marginBottom: 4,
	},
	buttonLabel: {
		fontSize: 14,
		fontWeight: '500',
		color: '#374151',
	},
	// Estilos para avaliações
	reviewsHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	rateButton: {
		backgroundColor: '#A78BFA',
		borderRadius: 20,
		paddingHorizontal: 4,
	},
	rateButtonContent: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	rateButtonLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: '#fff',
	},
	// Estilos para componente de estrelas
	starContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	star: {
		marginHorizontal: 1,
	},
	// Estilos para modal de avaliação
	ratingCard: {
		borderRadius: 16,
		backgroundColor: '#fff',
		elevation: 8,
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
	statusBadge: {
		alignSelf: 'flex-start',
		borderRadius: 12,
		paddingHorizontal: 8,
	},
	// Novos estilos para o card moderno
	cardContent: {
		padding: 20,
	},
	modernInfoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	mainRatingText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1E1E1E',
		marginLeft: 4,
	},
	reviewText: {
		fontSize: 14,
		color: '#6B7280',
		marginLeft: 4,
	},
	distanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F3E8FF',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	distanceText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#A78BFA',
		marginLeft: 4,
	},
	descriptionText: {
		color: '#374151',
		fontSize: 15,
		lineHeight: 22,
		marginTop: 12,
		marginBottom: 16,
	},
	highlightsContainer: {
		backgroundColor: '#F8FAFC',
		borderRadius: 12,
		padding: 16,
		marginTop: 8,
	},
	highlightItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	highlightDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#A78BFA',
		marginRight: 12,
	},
	highlightText: {
		fontSize: 14,
		color: '#374151',
		fontWeight: '500',
	},
	// Style Chips
	styleChipsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginTop: 16,
		marginBottom: 8,
	},
	styleChip: {
		backgroundColor: '#F8FAFC',
		borderColor: '#E2E8F0',
		borderWidth: 1,
		borderRadius: 20,
		height: 36,
	},
	chipText: {
		fontSize: 12,
		fontWeight: '500',
		color: '#64748B',
	},
});
