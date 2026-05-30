/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import SecretariadoView from './components/SecretariadoView';
import MarketingView from './components/MarketingView';
import ConfiguracoesView from './components/ConfiguracoesView';
import LogsView from './components/LogsView';

const getInitialView = (): ViewType => {
  const hash = window.location.hash.replace('#/', '');
  if (['dashboard', 'secretariado', 'marketing', 'configuracoes', 'logs'].includes(hash)) {
    return hash as ViewType;
  }
  return 'dashboard';
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);

  // Sync hash routing changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (['dashboard', 'secretariado', 'marketing', 'configuracoes', 'logs'].includes(hash)) {
        setCurrentView(hash as ViewType);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set default hash if not present
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    window.location.hash = `#/${view}`;
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'secretariado':
        return <SecretariadoView />;
      case 'marketing':
        return <MarketingView />;
      case 'configuracoes':
        return <ConfiguracoesView />;
      case 'logs':
        return <LogsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div id="todoist-boss-app" className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#202020] font-sans antialiased selection:bg-[#E44232]/10 selection:text-[#E44232]">
      
      {/* Desktop Header */}
      <header className="hidden lg:flex h-14 bg-[#E44232] flex items-center justify-between px-6 shrink-0 shadow-md z-15 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#E44232]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="font-display font-semibold text-base uppercase tracking-wider">Todoist Boss</h1>
        </div>
        <div className="flex items-center space-x-4 text-white/90 text-xs">
          <span className="bg-white/15 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider">v1.0.0 Alpha</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs shadow-inner">
            BC
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Shared Navigation Sidebar */}
        <Sidebar 
          currentView={currentView} 
          onViewChange={handleViewChange} 
        />

        {/* Main Content Workspace viewport */}
        <main className="flex-1 w-full bg-white lg:bg-[#FAFAFA] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
            
            {/* Active Router Outlet View */}
            <div className="min-h-[calc(100vh-10rem)]">
              {renderActiveView()}
            </div>

            {/* Footer information section */}
            <footer className="mt-12 pt-5 border-t border-[#E0E0E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
              <p>© {new Date().getFullYear()} TODOIST BOSS — Central de Controle</p>
              <div className="flex items-center gap-4">
                <a href="#/configuracoes" className="hover:text-gray-600 transition-colors">Configurações</a>
                <span>•</span>
                <a href="#/logs" className="hover:text-[#E44232] font-semibold transition-colors">Estável</a>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
