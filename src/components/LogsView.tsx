/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ScrollText, 
  Terminal, 
  Trash2, 
  RefreshCw,
  Search,
  Inbox
} from 'lucide-react';

export default function LogsView() {
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
            <ScrollText size={14} className="text-[#de483a]" />
            Auditoria & Monitoramento
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            Logs do Sistema
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Histórico detalhado de requisições, sincronização de cards e disparos de subtarefas.
          </p>
        </div>
      </div>

      {/* Terminal Tools toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            disabled
            placeholder="Buscar nos logs..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-400 placeholder-gray-400 text-xs rounded-lg pl-8.5 pr-4 py-2 cursor-not-allowed"
          />
          <Search size={14} className="text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            disabled
            className="px-3.5 py-1.5 bg-gray-50 text-gray-400 border border-gray-200 hover:border-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-not-allowed"
          >
            <RefreshCw size={13} className="animate-spin-slow" />
            Recarregar
          </button>
          <button
            disabled
            className="px-3.5 py-1.5 bg-gray-50 text-gray-400 border border-gray-200 hover:border-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-not-allowed"
          >
            <Trash2 size={13} />
            Limpar
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs min-h-[400px] flex flex-col justify-between">
        
        {/* Terminal Header */}
        <div className="bg-gray-950 px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gray-400" />
            <span className="font-mono text-xs font-medium text-gray-300">
              todoist_boss_console.log
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
        </div>

        {/* Empty Console Body */}
        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center border border-dashed border-gray-200">
            <Inbox size={26} className="stroke-[1.5]" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <p className="font-display font-bold text-gray-800 text-base" id="log-empty-message">
              Nenhum evento registrado.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              O monitor de registros está configurado. Os logs serão transmitidos em tempo real assim que os webhooks forem ativados.
            </p>
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-mono">
          <div className="flex items-center gap-4">
            <span>Status: <span className="text-[#de483a] font-semibold">Ocupado / Escuta Inativa</span></span>
            <span className="hidden sm:inline">•</span>
            <span>Estágio: <span className="text-gray-800 font-semibold">Visual Layout Only</span></span>
          </div>
          <div>
            <span>Nenhum pacote carregado</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
