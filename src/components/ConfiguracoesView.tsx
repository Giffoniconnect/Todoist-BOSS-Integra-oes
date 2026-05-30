/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Key, 
  RefreshCw, 
  Lock, 
  Sliders, 
  ToggleLeft,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function ConfiguracoesView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Settings size={14} className="text-[#de483a]" />
            Configurações do Sistema
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            Configurações
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gerenciamento das credenciais e webhooks de sincronização com o Todoist.
          </p>
        </div>
      </div>

      {/* Main Settings Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API Configurations column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Key className="text-[#de483a]" size={18} />
              <h3 className="font-display font-bold text-base text-gray-950">Conexão API Todoist</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                  <span>API Token do Todoist</span>
                  <span className="text-[10px] text-amber-600 font-mono font-medium">Requerido Futuramente</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    disabled
                    value="••••••••••••••••••••••••••••••••"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-400 text-sm rounded-xl px-4 py-3 cursor-not-allowed select-none font-mono"
                  />
                  <span className="absolute right-3.5 top-3 text-gray-400">
                    <Lock size={16} />
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                  <HelpCircle size={12} /> O token de acesso pessoal pode ser gerado nas configurações de desenvolvedor do Todoist.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                  <span>URL do Webhook Ativo</span>
                  <span className="text-[10px] text-gray-400 font-mono">Automático</span>
                </label>
                <input
                  type="text"
                  disabled
                  value="https://ais-pre-3blmzzdymkuahglrqjpo.../api/webhooks/todoist"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-400 text-sm rounded-xl px-4 py-3 cursor-not-allowed select-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <RefreshCw className="text-[#de483a]" size={18} />
              <h3 className="font-display font-bold text-base text-gray-950">Frequência de Sincronismo</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Sincronizar em Tempo Real', desc: 'Ativa webhooks instantâneos enviados pelo Todoist.', active: false },
                { label: 'Polling a cada 5 Minutos', desc: 'Sincronização de segurança a cada intervalo de tempo.', active: false },
                { label: 'Sincronização ao iniciar sessão', desc: 'Baixar dados ao fazer login no dashboard.', active: true },
                { label: 'Sincronização manual apenas', desc: 'Desabilita o tráfego automatizado em background.', active: false }
              ].map((opt, i) => (
                <div key={i} className="p-4 border border-gray-150 rounded-xl bg-gray-50/50 flex items-start gap-3 select-none">
                  <input
                    type="radio"
                    disabled
                    checked={opt.active}
                    className="mt-1 accent-[#de483a]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">{opt.label}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info panel sidebar column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 space-y-4">
            <div className="flex items-center gap-2 text-[#de483a]">
              <Sliders size={20} />
              <h3 className="font-display font-bold text-base text-gray-900">Configurações Gerais</h3>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              Defina as políticas de privacidade da automação e comportamento padrão do Todoist Boss para o secretariado de seu escritório.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs border-b border-gray-200/80 pb-3">
                <div>
                  <h4 className="font-bold text-gray-800 uppercase tracking-wide">Notificar Usuário</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Disparar alerta no navegador nas subtarefas.</p>
                </div>
                <ToggleLeft className="text-gray-300" size={28} />
              </div>

              <div className="flex items-center justify-between text-xs border-b border-gray-200/80 pb-3">
                <div>
                  <h4 className="font-bold text-gray-800 uppercase tracking-wide">Auto-arquivamento</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Arquivar tarefas concluídas no Todoist Boss.</p>
                </div>
                <ToggleLeft className="text-gray-300" size={28} />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-gray-800 uppercase tracking-wide">Logs Detalhados</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Guardar histórico completo de requisições de API.</p>
                </div>
                <ToggleLeft className="text-gray-200" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-150 text-center space-y-3">
            <div className="h-10 w-10 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Clock size={18} />
            </div>
            <h4 className="font-display font-bold text-sm text-gray-900">Salvar Modificações</h4>
            <p className="text-xs text-gray-400 leading-relaxed px-2">
              As configurações acima estão travadas em modo de planejamento visual estático.
            </p>
            <button
              disabled
              className="w-full py-2.5 bg-gray-100 text-gray-400 border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl cursor-not-allowed"
            >
              Gravar Configuração
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
