
import { Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const DownloadButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Botão App Store */}
      <Link 
        to="/app"
        className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
      >
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
          <Smartphone size={20} />
        </div>
        <div className="text-left">
          <div className="text-xs text-gray-300">Baixar na</div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </Link>

      {/* Botão Google Play */}
      <Link 
        to="/app"
        className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
      >
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
          <Smartphone size={20} />
        </div>
        <div className="text-left">
          <div className="text-xs text-gray-300">Disponível no</div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </Link>
    </div>
  );
};

export default DownloadButtons;
