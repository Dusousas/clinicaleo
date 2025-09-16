"use client";

import React, { useState } from "react";
import Users from "../../users/components/Users";
import Sidebar from "./Sidebar";
import ChatAdmin from "../../chat-medico/components/ChatAdmin";
import Consultas from "./Consultas";
import Financeiro from "./Financeiro";
import Produtos from "./Produtos";
import PerguntasSimples from "./PerguntasSimples";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Usuários");

  const renderContent = () => {
    switch (activeTab) {
      case "Usuários":
        return <Users />;
      case "Mensagens":
        return <ChatAdmin />;
      case "Consultas":
        return <Consultas />;
      case "Financeiro":
        return <Financeiro />;
      case "Produtos":
        return <Produtos />;
      case "Questionários":
        return <PerguntasSimples />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto lg:pt-50 pb-30 bg-Bg1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
