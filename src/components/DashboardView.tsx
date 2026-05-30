/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
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
  ChevronRight
} from 'lucide-react';

export default function DashboardView() {
  // Balanced professional telemetry data
  const totalCards = 15;
  const totalSectors = 5;
  const integrationsCount = 8;

  const futureIntegrations = [
    { name: 'Sincronização Bidirecional Todoist', desc: 'Sincroniza tarefas e subtarefas em tempo real entre o app e as contas corporativas.', type: 'Core' },
    { name: 'Gatilho de E-mail Automático', desc: 'Gera ações automatizadas e novas tarefas com base em e-mails marcados com flags.', type: 'Email' },
    { name: 'Integração Telegram & WhatsApp', desc: 'Dispara notificações instantâneas e resumos diários para o time.', type: 'Notificação' },
    { name: 'AI Auto-Agrupamento', desc: 'Mecanismo inteligente para classificação de prioridades do escritório.', type: 'AI' }
  ];

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
          <p className="text-gray-500 text-sm mt-1">Centro de Integração Operacional do escritório com o Todoist.</p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          ROUTE: /dashboard
        </div>
      </div>

      {/* Metrics Row matching "Professional Polish" layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric Card 1 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs hover:shadow-sm transition-all duration-200">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total de Cards</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-905">{totalCards}</span>
            <span className="text-xs font-semibold text-[#E44232] bg-[#E44232]/10 px-1.5 py-0.5 rounded">Ativo</span>
          </div>
          <div className="mt-4 h-1 bg-[#E44232]/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#E44232] w-[45%]"></div>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs hover:shadow-sm transition-all duration-200">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total de Setores</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-905">{totalSectors.toString().padStart(2, '0')}</span>
            <span className="text-xs text-gray-400 font-mono">Estruturados</span>
          </div>
          <div className="mt-4 h-1 bg-gray-200 rounded-full"></div>
        </div>

        {/* Metric Card 3 */}
        <div className="p-6 rounded-xl bg-white border border-[#E0E0E0] shadow-xs hover:shadow-sm transition-all duration-200">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Integrações Futuras</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-905">{integrationsCount.toString().padStart(2, '0')}</span>
            <span className="text-xs text-amber-600 font-medium">Roadmap</span>
          </div>
          <div className="mt-4 flex -space-x-1.5 overflow-hidden">
            <div className="w-5 h-5 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">IN</div>
            <div className="w-5 h-5 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-green-600">FB</div>
            <div className="w-5 h-5 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-yellow-600">TK</div>
          </div>
        </div>

        {/* Metric Card 4: Sincronia / Red Callout from HTML */}
        <div className="p-6 rounded-xl bg-[#E44232] text-white shadow-lg shadow-[#E44232]/20 flex flex-col justify-between">
          <div>
            <p className="text-xs text-white/80 font-semibold uppercase tracking-wider mb-1">Sincronização</p>
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Pendente</h3>
          </div>
          <p className="text-xs text-white/70 italic mt-3 font-mono">
            Aguardando API Key nas Configurações
          </p>
        </div>

      </div>

      {/* Highlights and Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Operational Highlights */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg font-bold text-gray-900">Destaques Operacionais</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 border-l-4 border-l-[#E44232] shadow-xs flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 bg-[#E44232]/10 text-[#E44232] text-[10px] font-bold rounded uppercase tracking-wide">Planejamento</span>
                  <span className="text-xs text-[#B03428] font-semibold">Configurar depois</span>
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-1">Agendar reunião de Estruturação</h5>
                <p className="text-xs text-gray-500 leading-relaxed">Subtarefa automática para fluxo de Secretariado. Define a pauta inicial.</p>
              </div>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 border-l-4 border-l-[#B03428] shadow-xs flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wide">Marketing</span>
                  <span className="text-xs text-gray-400 font-semibold cursor-not-allowed">Configurar depois</span>
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-1">Adicionar contato no Instagram</h5>
                <p className="text-xs text-gray-500 leading-relaxed">Engajamento inicial com novos contatos e leads capturados via automação.</p>
              </div>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 border-l-4 border-l-[#E44232] shadow-xs flex flex-col justify-between min-h-[140px]">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 bg-[#E44232]/10 text-[#E44232] text-[10px] font-bold rounded uppercase tracking-wide">Secretariado</span>
                  <span className="text-xs text-[#B03428] font-semibold">Configurar depois</span>
                </div>
                <h5 className="font-bold text-gray-900 text-sm mb-1">Agendar reunião com o Cliente</h5>
                <p className="text-xs text-gray-500 leading-relaxed">Sincronização direta de agenda via integrações nativas com Google Workspace.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 border border-dashed border-[#E0E0E0] rounded-xl p-5 flex items-center justify-center text-center">
              <p className="text-xs text-gray-400 italic">
                Mais cards e rotas disponíveis nas seções <br/> 
                <a href="#/secretariado" className="text-[#E44232] hover:underline font-semibold">Secretariado</a> e <a href="#/marketing" className="text-[#E44232] hover:underline font-semibold">Marketing</a>.
              </p>
            </div>

          </div>
        </div>

        {/* Right column: Future integrators list */}
        <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h4 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
              <Workflow size={18} className="text-[#E44232]" />
              Roadmap de Conexão
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Automotores futuros planejados.</p>
          </div>

          <div className="space-y-4">
            {futureIntegrations.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#E44232] bg-[#E44232]/5 px-1.5 py-0.5 rounded">
                    {item.type}
                  </span>
                  <span className="text-[9px] text-gray-400 font-semibold uppercase">Pendente</span>
                </div>
                <h5 className="text-xs font-bold text-gray-950">{item.name}</h5>
                <p className="text-[11px] text-gray-500 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
