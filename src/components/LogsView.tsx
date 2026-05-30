/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SimulatedLog } from '../types';
import { 
  ScrollText, 
  Terminal, 
  Trash2, 
  RefreshCw,
  Search,
  Inbox,
  AlertCircle
} from 'lucide-react';

interface LogsViewProps {
  logs: SimulatedLog[];
  onClearLogs: () => void;
}

export default function LogsView({ logs, onClearLogs }: LogsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Format full dates for display
  const formatFullDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return `[${d.toLocaleDateString()} ${d.toLocaleTimeString()}]`;
    } catch {
      return '';
    }
  };

  // Filter logs via search text
  const filteredLogs = logs.filter(log => {
    const term = searchTerm.toLowerCase();
    return log.event.toLowerCase().includes(term) || 
           log.description.toLowerCase().includes(term) ||
           log.type.toLowerCase().includes(term);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <ScrollText size={14} className="text-[#E44232]" />
            Auditoria & Monitoramento Centralizado
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            Logs de Automação
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Mapeamento dinâmico de disparos, alterações de regras e carregamento de pacotes por setor.
          </p>
        </div>
      </div>

      {/* Terminal Tools toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar eventos..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs rounded-lg pl-8.5 pr-4 py-2 focus:bg-white focus:outline-hidden"
          />
          <Search size={14} className="text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onClearLogs}
            className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-150 border border-gray-250 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 size={13} className="text-rose-500" />
            Limpar Registro
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs min-h-[450px] flex flex-col justify-between">
        
        {/* Terminal Header */}
        <div className="bg-gray-950 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-gray-400 animate-pulse" />
            <span className="font-mono text-[11px] font-medium text-gray-300">
              todoist_boss_console_stream.log
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80"></span>
            <span className="h-2 w-2 rounded-full bg-amber-500/80"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-500/80"></span>
          </div>
        </div>

        {/* Console logs body */}
        <div className="bg-gray-950 p-6 flex-1 font-mono text-[11px] text-gray-200 space-y-3 overflow-y-auto max-h-[500px]">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => {
              // Color tags based on event types
              let badgeColor = 'text-blue-400';
              if (log.type === 'automation_activated') badgeColor = 'text-emerald-400';
              if (log.type === 'automation_deactivated') badgeColor = 'text-rose-400';
              if (log.type === 'package_created') badgeColor = 'text-purple-400';

              return (
                <div key={log.id} className="border-b border-gray-900 pb-2.5 transition-colors hover:bg-white/5 px-2 rounded">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-500">{formatFullDate(log.timestamp)}</span>
                    <span className={`font-bold ${badgeColor}`}>[{log.event.toUpperCase()}]</span>
                    <span className="text-gray-400">• Tipo: {log.type.replace('_', ' ')}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mt-1">{log.description}</p>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-24 space-y-4">
              <div className="h-12 w-12 bg-gray-900 border border-gray-800 text-gray-500 rounded-full flex items-center justify-center border-dashed">
                <Inbox size={20} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-400 text-sm">Sem correspondências registradas</p>
                <p className="text-[10px] text-gray-500 max-w-xs mx-auto">
                  Modifique alguma configuração de automação para disparar novos logs simulados de auditoria.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Footer Info */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400 font-mono select-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Status: Stream Ativo (Simulação)
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Estágio: <strong>v1.0.0 Alpha</strong></span>
          </div>
          <div>
            <span>Processando {filteredLogs.length} de {logs.length} eventos totais</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
