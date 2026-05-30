/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewType, CardItem, AutomationConfig, AutomationPackage, SimulatedLog } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import OperacoesView from './components/OperacoesView';
import FinanceiroView from './components/FinanceiroView';
import SecretariadoView from './components/SecretariadoView';
import MarketingView from './components/MarketingView';
import ConfiguracoesView from './components/ConfiguracoesView';
import LogsView from './components/LogsView';
import { initialCards, generateDefaultConfigs, initialPackages, initialLogs } from './mockData';

const getInitialView = (): ViewType => {
  const hash = window.location.hash.replace('#/', '');
  if (['dashboard', 'operacoes', 'financeiro', 'secretariado', 'marketing', 'configuracoes', 'logs'].includes(hash)) {
    return hash as ViewType;
  }
  return 'dashboard';
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);

  // Central system states
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [configs, setConfigs] = useState<AutomationConfig[]>([]);
  const [packages] = useState<AutomationPackage[]>(initialPackages);
  const [logs, setLogs] = useState<SimulatedLog[]>(initialLogs);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Initialize configurations from cards list
  useEffect(() => {
    setConfigs(generateDefaultConfigs(initialCards));
  }, []);

  // Sync hash routing changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (['dashboard', 'operacoes', 'financeiro', 'secretariado', 'marketing', 'configuracoes', 'logs'].includes(hash)) {
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

  // Callback to edit config of any card from the operational panel lists
  const handleConfigureCard = (cardId: string) => {
    setSelectedCardId(cardId);
    handleViewChange('configuracoes');
  };

  // Update central configuration state & emit simulation log
  const handleUpdateConfig = (updatedConfig: AutomationConfig) => {
    // 1. Update config structure
    setConfigs(prev => prev.map(c => c.cardId === updatedConfig.cardId ? updatedConfig : c));
    
    // 2. Update status mapping on top-level card representation
    setCards(prev => prev.map(card => {
      if (card.id === updatedConfig.cardId) {
        return {
          ...card,
          status: updatedConfig.status
        };
      }
      return card;
    }));

    // 3. Emit simulation audit log
    const now = new Date();
    const formattedTime = now.toISOString();
    
    const newLog: SimulatedLog = {
      id: `log-generated-${now.getTime()}`,
      timestamp: formattedTime,
      event: 'Configuração Alterada',
      type: 'config_altered',
      description: `Automação "${updatedConfig.name}" atualizada: Projeto [${updatedConfig.todoistProject}], Responsável [${updatedConfig.responsible}], Status [${updatedConfig.status}], Prioridade [${updatedConfig.priority}].`
    };

    setLogs(prev => [newLog, ...prev]);
  };

  // Add a helper log from actions
  const handleAddLog = (event: string, description: string, type: SimulatedLog['type']) => {
    const now = new Date();
    const newLog: SimulatedLog = {
      id: `log-generated-${now.getTime()}`,
      timestamp: now.toISOString(),
      event,
      type,
      description
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            cards={cards} 
            configs={configs} 
            logs={logs} 
            packages={packages} 
            onConfigure={handleConfigureCard}
          />
        );
      case 'operacoes':
        return (
          <OperacoesView 
            cards={cards} 
            onConfigure={handleConfigureCard} 
          />
        );
      case 'financeiro':
        return (
          <FinanceiroView 
            cards={cards} 
            onConfigure={handleConfigureCard} 
          />
        );
      case 'secretariado':
        return (
          <SecretariadoView 
            cards={cards} 
            onConfigure={handleConfigureCard} 
          />
        );
      case 'marketing':
        return (
          <MarketingView 
            cards={cards} 
            onConfigure={handleConfigureCard} 
          />
        );
      case 'configuracoes':
        return (
          <ConfiguracoesView 
            cards={cards} 
            configs={configs} 
            preSelectedCardId={selectedCardId} 
            onUpdateConfig={handleUpdateConfig}
            onClearPreSelected={() => setSelectedCardId(null)}
            onLogAdd={handleAddLog}
          />
        );
      case 'logs':
        return (
          <LogsView 
            logs={logs} 
            onClearLogs={handleClearLogs} 
          />
        );
      default:
        return (
          <DashboardView 
            cards={cards} 
            configs={configs} 
            logs={logs} 
            packages={packages} 
            onConfigure={handleConfigureCard}
          />
        );
    }
  };

  return (
    <div id="todoist-boss-app" className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#202020] font-sans antialiased selection:bg-[#E44232]/10 selection:text-[#E44232]">
      
      {/* Desktop Header */}
      <header className="hidden lg:flex h-14 bg-[#E44232] flex items-center justify-between px-6 shrink-0 shadow-md z-15 text-white">
        <div className="flex items-center space-x-3 text-white">
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
                <span className="text-[#E44232] font-semibold">Ready to Scale</span>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
