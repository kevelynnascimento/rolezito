import { TrendingUp, MapPin, BarChart3, Star, Users, Eye, CheckCircle, ArrowRight, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StoreLandingPage = () => {
  const [formData, setFormData] = useState({
    nomeEstabelecimento: '',
    tipoEstabelecimento: '',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    plano: 'gratuito'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do estabelecimento:', formData);
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
    setFormData({
      nomeEstabelecimento: '',
      tipoEstabelecimento: '',
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      plano: 'gratuito'
    });
  };

  const beneficios = [
    {
      icon: <MapPin size={32} />,
      titulo: "Visibilidade Geolocalizada",
      descricao: "Apareça para clientes que estão próximos do seu estabelecimento em tempo real"
    },
    {
      icon: <TrendingUp size={32} />,
      titulo: "Aumento de Clientes",
      descricao: "Atraia novos clientes que procuram exatamente o tipo de ambiente que você oferece"
    },
    {
      icon: <BarChart3 size={32} />,
      titulo: "Estatísticas Detalhadas",
      descricao: "Acompanhe visualizações, cliques e conversões do seu estabelecimento"
    },
    {
      icon: <Star size={32} />,
      titulo: "Gestão de Avaliações",
      descricao: "Responda avaliações e construa uma reputação sólida na plataforma"
    }
  ];

  const planos = [
    {
      nome: "Plano Gratuito",
      preco: "R$ 0",
      periodo: "/mês",
      descricao: "Perfeito para começar",
      recursos: [
        "Listagem básica no app",
        "Informações de contato",
        "Horário de funcionamento",
        "Até 3 fotos",
        "Avaliações dos clientes"
      ],
      botao: "Começar Grátis",
      destaque: false
    },
    {
      nome: "Plano Destaque",
      preco: "R$ 149",
      periodo: "/mês",
      descricao: "Para quem quer se destacar",
      recursos: [
        "Tudo do plano gratuito",
        "Destaque nos resultados de busca",
        "Banner promocional",
        "Fotos e vídeos ilimitados",
        "Estatísticas avançadas",
        "Suporte prioritário",
        "Promoções e eventos especiais"
      ],
      botao: "Escolher Destaque",
      destaque: true
    }
  ];

  const depoimentos = [
    {
      nome: "Carlos Silva",
      estabelecimento: "Bar do Carlos",
      foto: "👨‍🍳",
      depoimento: "Desde que entrei no Rolezito, o movimento do bar aumentou 40%. Agora apareço para pessoas que nem sabiam que existia!",
      ganho: "+40% de clientes"
    },
    {
      nome: "Marina Santos",
      estabelecimento: "Restaurante Villa Marina",
      foto: "👩‍🍳",
      depoimento: "O plano destaque foi o melhor investimento que fiz. Aparece sempre no topo e as reservas triplicaram nos fins de semana.",
      ganho: "3x mais reservas"
    },
    {
      nome: "João Pereira",
      estabelecimento: "Boteco do João",
      foto: "👨‍💼",
      depoimento: "A geolocalização é incrível! Quando tem eventos próximos, o pessoal já sabe que estamos aqui. Faturamento subiu muito!",
      ganho: "+60% faturamento"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Para Estabelecimentos - Destaque seu bar ou restaurante no Rolezito</title>
        <meta name="description" content="Cadastre seu bar, restaurante ou balada no Rolezito e seja descoberto por milhares de pessoas próximas. Aumente sua visibilidade e conquiste novos clientes!" />
        <meta property="og:title" content="Para Estabelecimentos - Destaque seu bar ou restaurante no Rolezito" />
        <meta property="og:description" content="Cadastre seu bar, restaurante ou balada no Rolezito e seja descoberto por milhares de pessoas próximas." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta property="og:url" content="https://rolezito.com.br/stores" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rolezitoapp" />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <html lang="pt-BR" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-purple-soft pt-20 pb-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Button - More prominent */}
          <div className="absolute top-8 right-8 z-10">
            <Link 
              to="/admin/login"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all transform hover:scale-105 shadow-xl border border-gray-700"
            >
              <Settings size={18} />
              <span className="font-semibold">Acessar Admin</span>
            </Link>
          </div>

          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-black text-purple-900 mb-8 leading-tight">
              Coloque seu{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                bar ou restaurante
              </span>{' '}
              no radar dos jovens da sua cidade!
            </h1>
            <p className="text-xl lg:text-2xl text-purple-700 mb-10 leading-relaxed font-medium">
              Seja descoberto por milhares de pessoas que procuram exatamente o tipo de 
              ambiente que você oferece. Aumente sua visibilidade e atraia novos clientes.
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl inline-block border border-purple-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-black text-purple-600 mb-2">50k+</div>
                  <div className="text-gray-600 font-semibold">Usuários ativos</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-purple-600 mb-2">1000+</div>
                  <div className="text-gray-600 font-semibold">Estabelecimentos</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-purple-600 mb-2">15+</div>
                  <div className="text-gray-600 font-semibold">Cidades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              Por que estar no Rolezito?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Nossa plataforma conecta seu estabelecimento com pessoas que estão ativamente 
              procurando um lugar para sair. Não é publicidade tradicional, é marketing direcionado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-10 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl">
                  {beneficio.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{beneficio.titulo}</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-medium">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 lg:py-28 gradient-purple-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-purple-900 mb-8">
              Escolha o plano ideal
            </h2>
            <p className="text-xl text-purple-700 font-medium">
              Comece gratuitamente e faça upgrade quando quiser se destacar ainda mais
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {planos.map((plano, index) => (
              <div key={index} className={`rounded-3xl p-10 ${plano.destaque ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white transform scale-105 shadow-2xl border-none' : 'bg-white shadow-xl border border-purple-100 hover:shadow-2xl transition-shadow duration-300'}`}>
                {plano.destaque && (
                  <div className="text-center mb-6">
                    <span className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-full text-sm font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-10">
                  <h3 className={`text-3xl font-black mb-3 ${plano.destaque ? 'text-white' : 'text-gray-900'}`}>
                    {plano.nome}
                  </h3>
                  <p className={`mb-6 ${plano.destaque ? 'text-purple-200 font-medium' : 'text-gray-600 font-medium'}`}>
                    {plano.descricao}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-black ${plano.destaque ? 'text-white' : 'text-purple-600'}`}>
                      {plano.preco}
                    </span>
                    <span className={`ml-1 ${plano.destaque ? 'text-purple-200 font-medium' : 'text-gray-600 font-medium'}`}>
                      {plano.periodo}
                    </span>
                  </div>
                </div>

                <ul className="space-y-5 mb-10">
                  {plano.recursos.map((recurso, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <CheckCircle className={`flex-shrink-0 mt-1 ${plano.destaque ? 'text-green-300' : 'text-green-500'}`} size={24} />
                      <span className={`${plano.destaque ? 'text-purple-200 font-medium' : 'text-gray-700 font-medium'}`}>
                        {recurso}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  plano.destaque 
                    ? 'bg-white text-purple-700 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                }`}>
                  {plano.botao}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              O que nossos parceiros dizem
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Resultados reais de estabelecimentos que já estão no Rolezito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {depoimentos.map((depoimento, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="text-center mb-8">
                  <div className="text-5xl mb-3">{depoimento.foto}</div>
                  <h3 className="font-bold text-gray-900">{depoimento.nome}</h3>
                  <p className="text-sm text-gray-600 font-medium">{depoimento.estabelecimento}</p>
                </div>
                
                <blockquote className="text-gray-700 text-center mb-6 italic leading-relaxed font-medium">
                  "{depoimento.depoimento}"
                </blockquote>
                
                <div className="text-center">
                  <span className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold">
                    {depoimento.ganho}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro */}
      <section className="py-20 lg:py-28 gradient-purple-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black text-purple-900 mb-8">
                Cadastrar meu local
              </h2>
              <p className="text-xl text-purple-700 font-medium">
                Preencha os dados abaixo e nossa equipe entrará em contato para ativar seu perfil
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 shadow-2xl border border-purple-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Nome do Estabelecimento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeEstabelecimento}
                    onChange={(e) => setFormData({...formData, nomeEstabelecimento: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                    placeholder="Nome do seu bar/restaurante"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Tipo de Estabelecimento *
                  </label>
                  <select
                    required
                    value={formData.tipoEstabelecimento}
                    onChange={(e) => setFormData({...formData, tipoEstabelecimento: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="bar">Bar</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="balada">Balada/Casa Noturna</option>
                    <option value="pub">Pub</option>
                    <option value="boteco">Boteco</option>
                    <option value="cafe">Café</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Plano Desejado
                  </label>
                  <select
                    value={formData.plano}
                    onChange={(e) => setFormData({...formData, plano: e.target.value})}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900"
                  >
                    <option value="gratuito">Plano Gratuito</option>
                    <option value="destaque">Plano Destaque</option>
                  </select>
                </div>
              </div>

              <div className="mt-10">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Endereço Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                  placeholder="Rua, número, bairro, cidade, estado"
                />
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-5 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-xl"
                >
                  Cadastrar meu local
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoreLandingPage;
