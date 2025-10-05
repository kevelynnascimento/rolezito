import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  UserPlus, 
  UsersIcon, 
  Settings,
  LogOut
} from 'lucide-react';

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Lojas',
      path: '/admin/stores',
      icon: Store
    },
    {
      name: 'Afiliados',
      path: '/admin/affiliates',
      icon: UserPlus
    },
    {
      name: 'Usuários',
      path: '/admin/users',
      icon: Users
    },
    {
      name: 'Grupos de Usuários',
      path: '/admin/user-groups',
      icon: UsersIcon
    },
    {
      name: 'Configurações',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Rolezito</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon size={18} className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
