import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold">Rolezito</span>
            </div>
            <p className="text-gray-300 text-sm">
              O app que conecta você aos melhores lugares para curtir na sua cidade. 
              Descubra, explore e aproveite os rolês mais incríveis!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/affiliates" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Para Afiliados
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Para Estabelecimentos
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>contato@rolezito.app</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin size={16} />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Rolezito. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
