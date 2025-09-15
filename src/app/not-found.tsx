"use client";

import React from 'react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="bg-Bg1 h-[100vh] flex flex-col items-center justify-center px-4">
      <div className="maxW text-center">

        <h2 className="text-8xl font-semibold mb-2">404</h2>

        <h2 className="text-4xl font-bold text-white mb-4">Ops! Página não encontrada</h2>
        <p className="text-lg text-gray-700 mb-8">A página que você está procurando não existe ou foi movida para outro lugar</p>

        <div className="space-y-4">
          <button onClick={handleGoBack} className="w-full bg-white text-textPrimary cursor-pointer hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">← Voltar</button>
        </div>

      </div>
    </div>
  );
}