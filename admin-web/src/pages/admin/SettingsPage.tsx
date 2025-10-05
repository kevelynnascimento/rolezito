import { useState } from 'react';
import { Save, Bell, Mail, Shield, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfiguracoesPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  const [emailSettings, setEmailSettings] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'noreply@rolezito.com',
    password: '••••••••'
  });

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Rolezito',
    siteUrl: 'https://rolezito.com',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR'
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Configurações Gerais</h2>
            <p className="text-sm text-gray-600">Configurações básicas da plataforma</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Site
            </label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL do Site
            </label>
            <input
              type="url"
              value={generalSettings.siteUrl}
              onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuso Horário
            </label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
              <option value="America/New_York">New York (UTC-5)</option>
              <option value="Europe/London">London (UTC+0)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Idioma
            </label>
            <select
              value={generalSettings.language}
              onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Bell className="text-yellow-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
            <p className="text-sm text-gray-600">Configure como receber notificações</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações por Email</h3>
              <p className="text-sm text-gray-600">Receba atualizações importantes por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações Push</h3>
              <p className="text-sm text-gray-600">Receba notificações em tempo real</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações SMS</h3>
              <p className="text-sm text-gray-600">Receba SMS para alertas críticos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Mail className="text-green-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Configurações de Email</h2>
            <p className="text-sm text-gray-600">Configure o servidor SMTP para envio de emails</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servidor SMTP
            </label>
            <input
              type="text"
              value={emailSettings.host}
              onChange={(e) => setEmailSettings({ ...emailSettings, host: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Porta
            </label>
            <input
              type="text"
              value={emailSettings.port}
              onChange={(e) => setEmailSettings({ ...emailSettings, port: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>
            <input
              type="email"
              value={emailSettings.username}
              onChange={(e) => setEmailSettings({ ...emailSettings, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={emailSettings.password}
              onChange={(e) => setEmailSettings({ ...emailSettings, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-purple-500 hover:bg-purple-600 px-10 py-5">
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
