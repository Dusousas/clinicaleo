'use client'

import React, { useState } from 'react';
import Users from '../../users/components/Users';
import AdminNumbers from './AdminNumbers';
import Sidebar from './Sidebar';
import ChatMedico from '@/app/chat-medicos/components/ChatMedico';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Usuários');

  const renderContent = () => {
    switch (activeTab) {
      case 'Usuários':
        return <Users />;
      case 'Mensagens':
        return <ChatMedico />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="lg:pt-32 lg:pb-6">
            <AdminNumbers />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto py-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
