import { DollarSign, TrendingUp, Users, MapPin, Clock, Award, ArrowRight, CheckCircle, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AffiliatesLandingPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    experiencia: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', telefone: '', cidade: '', experiencia: '' });
  };

  const beneficios = [
    {
      icon: <DollarSign size={32} />,
      titulo: "Comissão Recorrente",
      descricao: "Ganhe 15% sobre todos os planos pagos dos estabelecimentos que você indicar, todo mês!"
    },
    {
      icon: <TrendingUp size={32} />,
      titulo: "Crescimento Garantido",
      descricao: "À medida que seus indicados crescem, você ganha mais. Sem limite de ganhos!"
    },
    {
      icon: <Clock size={32} />,
      titulo: "Trabalhe no Seu Tempo",
      descricao: "Flexibilidade total! Trabalhe quando quiser, de onde estiver."
    },
    {
      icon: <Award size={32} />,
      titulo: "Bônus por Performance",
      descricao: "Metas mensais com bônus extras para os afiliados mais produtivos."
    }
  ];

  const passos = [
    {
      numero: "1",
      titulo: "Cadastre-se",
      descricao: "Preencha o formulário e seja aprovado em nossa rede de afiliados"
    },
    {
      numero: "2",
      titulo: "Receba Indicações",
      descricao: "Nossa IA sugere estabelecimentos na sua região que ainda não estão na plataforma"
    },
    {
      numero: "3",
      titulo: "Faça o Contato",
      descricao: "Visite os locais, apresente nossa proposta e ajude-os a se cadastrar"
    },
    {
      numero: "4",
      titulo: "Ganhe Comissões",
      descricao: "Receba 15% de comissão recorrente sobre todos os planos pagos dos seus indicados"
    }
  ];

  const faq = [
    {
      pergunta: "Como funciona o sistema de comissões?",
      resposta: "Você ganha 15% de comissão recorrente sobre o valor dos planos pagos dos estabelecimentos que indicar. Se um bar paga R$ 100/mês, você ganha R$ 15 todo mês enquanto ele for nosso cliente."
    },
    {
      pergunta: "Como sei quais estabelecimentos devo procurar?",
      resposta: "Nossa plataforma usa IA para analisar sua região e sugerir bares, restaurantes e baladas que ainda não estão cadastrados. Você recebe uma lista personalizada com endereços e informações."
    },
    {
      pergunta: "Preciso ter experiência em vendas?",
      resposta: "Não é obrigatório! Oferecemos treinamento completo e materiais de apoio. O importante é ter boa comunicação e conhecer bem sua cidade."
    },
    {
      pergunta: "Como vocês rastreiam minhas indicações?",
      resposta: "Cada afiliado recebe um código único. Quando você apresenta um estabelecimento, ele se cadastra usando seu código, garantindo que a comissão seja creditada corretamente."
    },
    {
      pergunta: "Quando recebo os pagamentos?",
      resposta: "Os pagamentos são realizados todo dia 15 do mês seguinte. Por exemplo, comissões de janeiro são pagas em 15 de fevereiro."
    },
    {
      pergunta: "Há limite de quantos estabelecimentos posso indicar?",
      resposta: "Não há limite! Quanto mais estabelecimentos você indicar, maior será sua renda recorrente."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Afiliados Rolezito - Ganhe dinheiro indicando bares e restaurantes</title>
        <meta name="description" content="Seja um afiliado Rolezito e ganhe comissão recorrente indicando bares, restaurantes e baladas para o app. Descubra como aumentar sua renda ajudando estabelecimentos a se destacarem!" />
        <meta property="og:title" content="Afiliados Rolezito - Ganhe dinheiro indicando bares e restaurantes" />
        <meta property="og:description" content="Seja um afiliado Rolezito e ganhe comissão recorrente indicando bares, restaurantes e baladas para o app." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        <meta property="og:url" content="https://rolezito.com.br/affiliates" />
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
              Ganhe dinheiro indicando{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                bares, restaurantes e baladas
              </span>{' '}
              para ganharem destaque no app!
            </h1>
            <p className="text-xl lg:text-2xl text-purple-700 mb-10 leading-relaxed font-medium">
              Seja um afiliado Rolezito e construa uma renda recorrente ajudando estabelecimentos 
              a se conectarem com novos clientes na sua cidade.
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl inline-block border border-purple-100">
              <div className="flex items-center justify-center space-x-3 text-4xl font-black text-purple-600 mb-2">
                <DollarSign size={40} />
                <span>15% de comissão recorrente</span>
              </div>
              <p className="text-gray-600 text-lg font-medium">sobre todos os planos pagos dos seus indicados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              Por que se tornar um afiliado?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Uma oportunidade única de gerar renda recorrente ajudando o ecossistema gastronômico 
              e de entretenimento da sua cidade a crescer.
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

      {/* Como Funciona */}
      <section className="py-16 lg:py-24 gradient-purple-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-6">
              Como funciona o processo?
            </h2>
            <p className="text-xl text-purple-700 max-w-3xl mx-auto">
              Um passo a passo simples para você começar a gerar renda como afiliado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {passos.map((passo, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {passo.numero}
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">{passo.titulo}</h3>
                <p className="text-purple-700">{passo.descricao}</p>
                {index < passos.length - 1 && (
                  <ArrowRight className="text-purple-400 mx-auto mt-6 hidden lg:block" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
                Quero ser um afiliado!
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Preencha os dados abaixo e nossa equipe entrará em contato para iniciar sua jornada
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">O que você precisa ter:</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-gray-700 text-lg font-medium">Conhecimento da sua cidade e região</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-gray-700 text-lg font-medium">Boa comunicação e iniciativa</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-gray-700 text-lg font-medium">Disponibilidade para visitas presenciais</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                    <span className="text-gray-700 text-lg font-medium">Smartphone com internet</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 mt-10 border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-900 mb-4">💰 Potencial de Ganhos</h4>
                  <p className="text-purple-700 font-medium">
                    <strong>Exemplo:</strong> Se você indicar 20 estabelecimentos e cada um pagar R$ 150/mês, 
                    você ganhará R$ 450 por mês de forma recorrente!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 shadow-xl border border-gray-200">
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Nome Completo *
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
                      Cidade/Região *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cidade}
                      onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                      placeholder="São Paulo, SP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Experiência com vendas ou relacionamento
                    </label>
                    <textarea
                      value={formData.experiencia}
                      onChange={(e) => setFormData({...formData, experiencia: e.target.value})}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                      rows={4}
                      placeholder="Conte um pouco sobre sua experiência..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-5 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-xl"
                  >
                    Quero ser afiliado!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 gradient-purple-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-6">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.pergunta}</h3>
                <p className="text-gray-600">{item.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AffiliatesLandingPage;
