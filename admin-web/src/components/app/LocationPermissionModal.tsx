import { MapPin, X } from 'lucide-react';
import { useEffect } from 'react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  isLoading: boolean;
}

const LocationPermissionModal = ({ 
  isOpen, 
  onAccept, 
  onDecline, 
  isLoading 
}: LocationPermissionModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-end md:items-center justify-center p-0 m-0 w-screen h-screen pointer-events-auto">
      <div
        className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md mx-auto pb-6 pt-8 px-6 relative md:max-h-[90vh] md:w-[90vw] md:pb-8 md:pt-10 md:px-8"
        style={{ minHeight: '60vh', maxHeight: '90vh' }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors"
          onClick={onDecline}
          aria-label="Fechar"
          disabled={isLoading}
        >
          <X size={28} />
        </button>
        <div className="text-center mt-2">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-purple-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Encontrar locais perto de você?
          </h2>
          <p className="text-gray-600 mb-6">
            Permita o acesso à sua localização para mostrarmos os melhores locais próximos a você.
          </p>
          <div className="space-y-3">
            <button
              onClick={onAccept}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Obtendo localização...' : 'Permitir localização'}
            </button>
            <button
              onClick={onDecline}
              disabled={isLoading}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continuar sem localização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
