
import { X, Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);

  if (!isOpen) return null;

  const categories = ['Bar', 'Restaurante', 'Balada', 'Festa', 'Café', 'Pub'];
  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const musicStyles = ['Eletrônica', 'Sertanejo', 'Rock', 'Pop', 'Jazz', 'Forró'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Categorias */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categoria</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(prev =>
                      prev.includes(category)
                        ? prev.filter(c => c !== category)
                        : [...prev, category]
                    );
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedCategory.includes(category)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Faixa de Preço</h3>
            <div className="flex space-x-2">
              {priceRanges.map((price) => (
                <button
                  key={price}
                  onClick={() => {
                    setSelectedPrice(prev =>
                      prev.includes(price)
                        ? prev.filter(p => p !== price)
                        : [...prev, price]
                    );
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedPrice.includes(price)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Estilo Musical */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Estilo Musical</h3>
            <div className="grid grid-cols-2 gap-2">
              {musicStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedMusic(prev =>
                      prev.includes(style)
                        ? prev.filter(s => s !== style)
                        : [...prev, style]
                    );
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedMusic.includes(style)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setSelectedCategory([]);
                setSelectedPrice([]);
                setSelectedMusic([]);
              }}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
