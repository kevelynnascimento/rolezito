import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Para Afiliados', path: '/affiliates' },
    { name: 'Para Estabelecimentos', path: '/stores' },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-purple-900">Rolezito</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Download Button */}
          <div className="hidden md:block">
            <Link to="/app">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Baixar App
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveRoute(item.path)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/app">
                <button className="mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium text-center hover:from-purple-600 hover:to-purple-700 transition-all">
                  Baixar App
                </button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
