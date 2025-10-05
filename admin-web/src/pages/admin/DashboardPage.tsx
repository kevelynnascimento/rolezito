
import { BarChart3, Store, Users, UserPlus, TrendingUp, DollarSign } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      name: 'Total de Lojas',
      value: '2',
      subtitle: 'Cadastradas',
      icon: Store,
      color: 'bg-blue-500'
    },
    {
      name: 'Lojas Ativas',
      value: '1',
      subtitle: 'Pagantes',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      name: 'Em Trial',
      value: '1',
      subtitle: 'Período teste',
      icon: BarChart3,
      color: 'bg-yellow-500'
    },
    {
      name: 'Receita Mensal',
      value: 'R$ 2.400',
      subtitle: 'Estimativa',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const recentStores = [
    {
      name: 'Restaurante Sabor & Arte',
      email: 'contato@saborarte.com',
      status: 'Ativa',
      plan: 'Premium',
      since: '17m 4d'
    },
    {
      name: 'Pizzaria Bella Napoli',
      email: 'contato@bellanapoli.com',
      status: 'Trial',
      plan: 'Teste',
      since: '13m 17d'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Stores */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lojas Cadastradas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permanência
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentStores.map((store, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{store.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{store.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      store.status === 'Ativa' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {store.since}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
