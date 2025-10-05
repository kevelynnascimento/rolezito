
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Heart, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Descobrir',
      path: '/app',
      icon: MapPin,
      activeIcon: MapPin
    },
    {
      name: 'Favoritos',
      path: '/app/favorites',
      icon: Heart,
      activeIcon: Heart
    },
    {
      name: 'Perfil',
      path: '/app/profile',
      icon: User,
      activeIcon: User
    }
  ];

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app' || location.pathname === '/app/';
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => {
          const Icon = isActive(item.path) ? item.activeIcon : item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive(item.path)
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
