
import { Camera, Edit, MapPin, Music, Users, DollarSign } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    city: 'São Paulo',
    preferences: {
      categories: ['Bar', 'Restaurante'],
      musicStyles: ['Rock', 'Eletrônica'],
      priceRange: ['$$', '$$$'],
      ageGroup: 'Jovem (18-30)'
    }
  });

  const categoryOptions = ['Bar', 'Restaurante', 'Balada', 'Festa', 'Café', 'Pub'];
  const musicOptions = ['Rock', 'Eletrônica', 'Sertanejo', 'Pop', 'Jazz', 'Forró'];
  const priceOptions = ['$', '$$', '$$$', '$$$$'];
  const ageGroupOptions = ['Jovem (18-30)', 'Adulto (30-45)', 'Maduro (45+)'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Edit size={16} />
            <span>{isEditing ? 'Salvar' : 'Editar'}</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Photo and Basic Info */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">
                  {userData.name.charAt(0)}
                </span>
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="text-xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
              )}
              <p className="text-gray-600">{userData.city}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <p className="text-gray-900">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <p className="text-gray-900">{userData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências de Locais</h3>
          
          {/* Categories */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin size={16} className="text-purple-600" />
              <span className="font-medium text-gray-700">Tipos de Local</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  disabled={!isEditing}
                  onClick={() => {
                    if (isEditing) {
                      const newCategories = userData.preferences.categories.includes(category)
                        ? userData.preferences.categories.filter(c => c !== category)
                        : [...userData.preferences.categories, category];
                      setUserData({
                        ...userData,
                        preferences: { ...userData.preferences, categories: newCategories }
                      });
                    }
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    userData.preferences.categories.includes(category)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700'
                  } ${isEditing ? 'hover:bg-gray-100' : 'cursor-default'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Music Styles */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Music size={16} className="text-purple-600" />
              <span className="font-medium text-gray-700">Estilos Musicais</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {musicOptions.map((style) => (
                <button
                  key={style}
                  disabled={!isEditing}
                  onClick={() => {
                    if (isEditing) {
                      const newStyles = userData.preferences.musicStyles.includes(style)
                        ? userData.preferences.musicStyles.filter(s => s !== style)
                        : [...userData.preferences.musicStyles, style];
                      setUserData({
                        ...userData,
                        preferences: { ...userData.preferences, musicStyles: newStyles }
                      });
                    }
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    userData.preferences.musicStyles.includes(style)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700'
                  } ${isEditing ? 'hover:bg-gray-100' : 'cursor-default'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign size={16} className="text-purple-600" />
              <span className="font-medium text-gray-700">Faixa de Preço</span>
            </div>
            <div className="flex space-x-2">
              {priceOptions.map((price) => (
                <button
                  key={price}
                  disabled={!isEditing}
                  onClick={() => {
                    if (isEditing) {
                      const newPrices = userData.preferences.priceRange.includes(price)
                        ? userData.preferences.priceRange.filter(p => p !== price)
                        : [...userData.preferences.priceRange, price];
                      setUserData({
                        ...userData,
                        preferences: { ...userData.preferences, priceRange: newPrices }
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    userData.preferences.priceRange.includes(price)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700'
                  } ${isEditing ? 'hover:bg-gray-100' : 'cursor-default'}`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Users size={16} className="text-purple-600" />
              <span className="font-medium text-gray-700">Faixa Etária Preferida</span>
            </div>
            {isEditing ? (
              <select
                value={userData.preferences.ageGroup}
                onChange={(e) => setUserData({
                  ...userData,
                  preferences: { ...userData.preferences, ageGroup: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {ageGroupOptions.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            ) : (
              <p className="text-gray-900">{userData.preferences.ageGroup}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
