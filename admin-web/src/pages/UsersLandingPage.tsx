import { MapPin, Clock, DollarSign, Star, Camera, Filter, Smartphone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DownloadButtons from '../components/DownloadButtons';

const UsersLandingPage = () => {
  const beneficios = [
    {
      icon: <MapPin size={24} />,
      titulo: "Geolocalização Precisa",
      descricao: "Encontre lugares próximos de você com precisão GPS em tempo real"
    },
    {
      icon: <Clock size={24} />,
      titulo: "Horários Atualizados",
      descricao: "Veja quais lugares estão abertos agora e evite surpresas desagradáveis"
    },
    {
      icon: <Filter size={24} />,
      titulo: "Filtros Inteligentes",
      descricao: "Filtre por tipo (bar, balada, restaurante), música, ambiente e muito mais"
    },
    {
      icon: <DollarSign size={24} />,
      titulo: "Faixa de Preço",
      descricao: "Escolha lugares que cabem no seu orçamento com nossa classificação de preços"
    },
    {
      icon: <Star size={24} />,
      titulo: "Avaliações Reais",
      descricao: "Leia avaliações honestas de outros usuários antes de decidir"
    },
    {
      icon: <Camera size={24} />,
      titulo: "Fotos Autênticas",
      descricao: "Veja fotos reais dos lugares tiradas pelos próprios frequentadores"
    }
  ];

  const categorias = [
    "🍻 Bares com música ao vivo",
    "🎵 Baladas sertanejas",
    "🍽️ Restaurantes românticos",
    "🎉 Festas universitárias",
    "🍕 Botecos descolados",
    "🎭 Eventos culturais",
    "🏖️ Beach clubs",
    "🎪 Shows e apresentações"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Rolezito - Descubra os melhores rolês da sua cidade</title>
        <meta name="description" content="O app que conecta você aos melhores lugares para curtir: bares, restaurantes, baladas e eventos próximos de você. Descubra, explore e aproveite os rolês mais incríveis!" />
        <meta property="og:title" content="Rolezito - Descubra os melhores rolês da sua cidade" />
        <meta property="og:description" content="O app que conecta você aos melhores lugares para curtir: bares, restaurantes, baladas e eventos próximos de você." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta property="og:url" content="https://rolezito.com.br/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rolezitoapp" />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <html lang="pt-BR" />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="gradient-purple-soft pt-16 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-purple-900 mb-6 animate-fade-in">
              Encontre os melhores{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                rolês
              </span>{' '}
              perto de você agora mesmo!
            </h1>
            <p className="text-xl lg:text-2xl text-purple-700 mb-8 leading-relaxed">
              Pare de perder tempo pesquisando no Google Maps ou Instagram. 
              Descubra lugares incríveis baseados na sua localização, horário e estilo preferido.
            </p>
            <div className="mb-12">
              <DownloadButtons />
            </div>
            <p className="text-lg text-purple-600 font-medium">
              📱 App em desenvolvimento - Seja notificado do lançamento!
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Por que usar o Rolezito?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chega de rolar o feed infinitamente ou ligar para amigos perguntando "onde vamos hoje?". 
              Com o Rolezito, você tem tudo na palma da mão.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-purple-50 rounded-2xl p-6 hover:bg-purple-100 transition-colors">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{beneficio.titulo}</h3>
                <p className="text-gray-600">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 lg:py-24 gradient-purple-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-6">
              Encontre exatamente o que procura
            </h2>
            <p className="text-xl text-purple-700 max-w-3xl mx-auto">
              Nossa categorização detalhada garante que você encontre o ambiente perfeito para cada ocasião.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categorias.map((categoria, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-800 font-medium">{categoria}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview do App */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Interface simples e intuitiva
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Desenvolvemos uma experiência de usuário focada na rapidez e facilidade. 
                Em poucos toques você encontra exatamente o que está procurando.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Permita acesso à localização</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Escolha suas preferências</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Descubra lugares incríveis!</span>
                </div>
              </div>
              <DownloadButtons />
            </div>
            <div className="order-1 lg:order-2 text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-12">
                <Smartphone className="text-purple-600 mx-auto mb-6" size={120} />
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  Mockups em Breve
                </h3>
                <p className="text-purple-700">
                  Estamos finalizando os designs da interface. 
                  Em breve você poderá ver como será a experiência completa!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Descubra o que está bombando perto de você
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Seja um dos primeiros a usar o Rolezito e nunca mais fique sem saber onde ir!
          </p>
          <DownloadButtons />
          <div className="mt-8 text-purple-200">
            <p className="text-sm">
              🔔 Cadastre-se para receber uma notificação quando o app estiver disponível
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UsersLandingPage;
