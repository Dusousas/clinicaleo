'use client'

import React, { useState } from 'react';
import { Home, HelpCircle, TrendingUp, User } from 'lucide-react';

import InicioPage from './components/InicioPage';
import SuportePage from './components/SuportePage'; 
import EvolucaoPage from './components/EvolucaoPage'; 
import ContaPage from './components/ContaPage';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inicio');

  const sidebarItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'suporte', label: 'Suporte', icon: HelpCircle },
    { id: 'evolucao', label: 'Evolução', icon: TrendingUp },
    { id: 'conta', label: 'Conta', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <InicioPage />;
      case 'suporte':
        return <SuportePage />;
      case 'evolucao':
        return <EvolucaoPage />;
      case 'conta':
        return <ContaPage />;
      default:
        return <InicioPage />;
    }
  };

  return (
    <div className="bg-Bg1 h-full flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg lg:pt-40">
        <div className="p-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:pt-40 pb-20 lg:pb-0">
        {renderContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <nav className="flex">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${
                  activeTab === item.id
                    ? 'text-teal-700'
                    : 'text-gray-600'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}