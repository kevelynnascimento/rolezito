
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GruposUsuariosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    {
      id: 1,
      name: 'Jovens Urbanos',
      description: 'Usuários entre 18-25 anos em centros urbanos',
      members: 1250,
      preferences: ['Baladas', 'Bares', 'Música Eletrônica'],
      created: '10/01/2024'
    },
    {
      id: 2,
      name: 'Casais Gourmet',
      description: 'Casais que buscam experiências gastronômicas',
      members: 890,
      preferences: ['Restaurantes', 'Vinhos', 'Ambiente Romântico'],
      created: '15/01/2024'
    },
    {
      id: 3,
      name: 'LGBTQIA+ Friendly',
      description: 'Comunidade LGBTQIA+ e estabelecimentos inclusivos',
      members: 650,
      preferences: ['Diversidade', 'Inclusão', 'Eventos Temáticos'],
      created: '20/01/2024'
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grupos de Usuários</h1>
          <p className="text-gray-600">Gerencie segmentações de usuários por preferências</p>
        </div>
       <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo grupo
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar grupos por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.members} membros</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="text-gray-600 hover:text-gray-900 p-1">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{group.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preferências:</h4>
              <div className="flex flex-wrap gap-2">
                {group.preferences.map((pref, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Criado em {group.created}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GruposUsuariosPage;
