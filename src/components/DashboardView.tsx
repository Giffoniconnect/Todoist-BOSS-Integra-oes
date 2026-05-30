/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CardItem, AutomationConfig, AutomationPackage, SimulatedLog } from '../types';
import { 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers2,
  ChevronRight,
  PlusCircle,
  Package,
  Activity,
  ArrowRight
} from 'lucide-react';

interface DashboardViewProps {
  cards: CardItem[];
  configs: AutomationConfig[];
  logs: SimulatedLog[];
  packages: AutomationPackage[];
  onConfigure: (cardId: string) => void;
}

export default function DashboardView({ cards, configs, logs, packages, onConfigure }: DashboardViewProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(packages[0]?.id || null);

  // Dynamic statistics calculations
  const totalSectors = new Set(cards.map(c => c.sector)).size;
  const totalCategories = new Set(cards.map(c => c.category)).size;
  const totalAutomations = configs.length;
  const activeAutomations = configs.filter(c => c.status === 'Ativa').length;
  const planningAutomations = configs.filter(c => c.status === 'Em planejamento').length;
  const inactiveAutomations = configs.filter(c => c.status === 'Inativa').length;

  const currentPackage = packages.find(p => p.id === selectedPackageId);

  // Take the 5 latest logs
  const latestLogs = logs.slice(0, 5);

  const formatLogDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">
            Centro de Inteligência de Automações — Orquestração de rotinas judiciais, operacionais e financeiras.
          </p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          STATUS: OPERACIONAL
        </div>
      </div>

      {/* Metrics Row matching "Professional Polish" layout with live state metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric Card 1 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Setores & Categorias</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{totalSectors}</span>
              <span className="text-xs text-gray-400 font-medium">Setores</span>
              <span className="text-lg font-bold text-gray-300">/</span>
              <span className="text-3xl font-bold text-gray-900">{totalCategories}</span>
              <span className="text-xs text-gray-400 font-medium">Categorias</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 leading-normal">
            Total de {cards.length} cards estruturados em árvore.
          </p>
        </div>

        {/* Metric Card 2 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Automações Ativas</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3 text-emerald-500">●</span>
              <span className="text-3.5xl font-bold text-gray-950">
                {activeAutomations.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
                Ativas
              </span>
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500" 
              style={{ width: `${(activeAutomations / totalAutomations) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Em Planejamento</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3 text-amber-500">●</span>
              <span className="text-3.5xl font-bold text-gray-950">
                {planningAutomations.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded ml-1">
                Fila
              </span>
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-500" 
              style={{ width: `${(planningAutomations / totalAutomations) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Metric Card 4: Sincronia / Red Callout from HTML */}
        <div className="p-6 rounded-xl bg-[#E44232] text-white shadow-md shadow-[#E44232]/10 flex flex-col justify-between">
          <div>
            <p className="text-xs text-white/80 font-semibold uppercase tracking-wider mb-1">Integrador Todoist</p>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Simulador Ativo</h3>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-white/95">
            <span className="font-mono bg-white/15 px-1.5 py-0.5 rounded">MODO ADMIN</span>
            <span className="font-semibold underline">Configure Keys</span>
          </div>
        </div>

      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Packets & Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pacotes de Automação Section */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <Package className="text-[#E44232]" size={18} />
                  Pacotes de Automação
                </h3>
                <p className="text-xs text-gray-500">Agrupamentos estratégicos para disparo automático de tarefas em lote.</p>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded">
                {packages.length} PACOTES PRONTOS
              </span>
            </div>

            {/* Selector list of packages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPackageId === pkg.id
                      ? 'border-[#E44232] bg-[#E44232]/5 text-[#E44232]'
                      : 'border-[#E0E0E0] hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  <p className="font-bold text-sm text-gray-900">{pkg.name}</p>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{pkg.description}</p>
                </button>
              ))}
            </div>

            {/* Selected Package contents */}
            {currentPackage && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/60 mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-gray-400 tracking-widest">Rotinas Incluídas no {currentPackage.name}</h4>
                  <span className="text-xs font-semibold text-[#E44232] font-mono">{currentPackage.includes.length} tarefas associadas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPackage.includes.map((taskName, i) => {
                    // Try to find if we have a card with this title to allow direct configuring
                    const matchedCard = cards.find(c => c.title.toLowerCase() === taskName.toLowerCase());
                    return (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-150 text-xs shadow-2xs"
                      >
                        <div className="flex items-center gap-2 font-medium text-gray-800">
                          <CheckCircle2 size={14} className="text-[#E44232]" />
                          <span>{taskName}</span>
                        </div>
                        {matchedCard && (
                          <button
                            onClick={() => onConfigure(matchedCard.id)}
                            className="p-1 text-[11px] text-[#E44232] hover:bg-gray-50 font-bold rounded flex items-center gap-0.5 cursor-pointer underline hover:no-underline"
                            title="Editar automação deste card"
                          >
                            <span>Config</span>
                            <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats overview panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Atividade</span>
                <h5 className="font-bold text-gray-950 text-sm mt-3.5 mb-1">Central de Logs</h5>
                <p className="text-xs text-gray-500 leading-normal">Mapeamento em tempo real de todas as alterações feitas na árvore de automação.</p>
              </div>
              <a href="#/logs" className="text-xs text-[#E44232] hover:underline font-bold mt-4 inline-flex items-center gap-1">
                Acessar logs <ArrowRight size={12} />
              </a>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Automações</span>
                <h5 className="font-bold text-gray-950 text-sm mt-3.5 mb-1">Editor Completo</h5>
                <p className="text-xs text-gray-500 leading-normal">Todas as 35 rotinas jurídicas do escritório contam com 14 inputs de parametrização.</p>
              </div>
              <a href="#/configuracoes" className="text-xs text-[#E44232] hover:underline font-bold mt-4 inline-flex items-center gap-1">
                Nova Configuração <ArrowRight size={12} />
              </a>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">Integração</span>
                <h5 className="font-bold text-gray-950 text-sm mt-3.5 mb-1">Modelagem Segura</h5>
                <p className="text-xs text-gray-500 leading-normal">Todos os dados carregados estão em cache. Sem envio real de dados para APIs nesta fase.</p>
              </div>
              <span className="text-xs text-slate-400 font-bold mt-4 inline-flex items-center gap-1 cursor-default select-none">
                Pronto para Deploy
              </span>
            </div>

          </div>

        </div>

        {/* Right Columns: Recent Simulation Audit Logs */}
        <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h4 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
              <Activity size={18} className="text-[#E44232]" />
              Eventos Recentes
            </h4>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#E44232]/10 text-[#E44232] rounded uppercase tracking-widest font-mono">
              Live
            </span>
          </div>

          {/* Logs feed list */}
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {latestLogs.length > 0 ? (
              latestLogs.map((log) => (
                <div key={log.id} className="text-xs space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-900 block truncate max-w-[140px]">{log.event}</span>
                    <span className="text-[10px] text-gray-400 font-mono shrink-0">{formatLogDate(log.timestamp)}</span>
                  </div>
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                    {log.description}
                  </p>
                  <div className="flex justify-between items-center pt-1 border-b border-gray-100/60 pb-1.5">
                    <span className={`text-[9px] font-mono px-1 py-[1px] rounded uppercase font-bold text-white ${
                      log.type === 'config_altered' ? 'bg-blue-500' :
                      log.type === 'automation_activated' ? 'bg-emerald-500' :
                      log.type === 'automation_deactivated' ? 'bg-rose-500' : 'bg-purple-500'
                    }`}>
                      {log.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 text-xs py-8 italic">
                Nenhum log gravado no sensor.
              </div>
            )}
          </div>

          <a 
            href="#/logs" 
            className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 mt-2 text-center"
          >
            <span>Ver todos os logs</span>
            <ChevronRight size={14} />
          </a>
        </div>

      </div>
    </motion.div>
  );
}
