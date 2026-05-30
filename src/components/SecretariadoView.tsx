/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CardItem } from '../types';
import { 
  Briefcase, 
  Calendar, 
  CheckSquare, 
  Clock, 
  PhoneCall,
  Sliders,
  Info 
} from 'lucide-react';

interface SecretariadoViewProps {
  cards: CardItem[];
  onConfigure: (cardId: string) => void;
}

export default function SecretariadoView({ cards, onConfigure }: SecretariadoViewProps) {
  // Extract Secretariado cards
  const secretariadoCards = cards.filter(card => card.sector === 'Secretariado');

  const getStatusColor = (status: CardItem['status']) => {
    switch (status) {
      case 'Ativa':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Inativa':
        return 'text-gray-500 bg-gray-50 border-gray-100';
      case 'Em planejamento':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const getSecretariadoIcon = (id: string) => {
    if (id.includes('tarefa-p')) return <CheckSquare size={18} className="text-[#E44232]" />;
    if (id.includes('reun-est')) return <Calendar size={18} className="text-blue-500" />;
    if (id.includes('reun-rev')) return <Clock size={18} className="text-purple-500" />;
    if (id.includes('reun-cli')) return <PhoneCall size={18} className="text-teal-500" />;
    return <Sliders size={18} className="text-amber-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Secretariado</h2>
          <p className="text-gray-500 text-sm mt-1">Gestão operacional de subtarefas e cronogramas administrativos.</p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          ROUTE: /secretariado
        </div>
      </div>

      {/* Mini layout banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900">
        <Info className="shrink-0 mt-0.5 text-amber-700" size={18} />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">Secretariado Ativo</h4>
          <p className="text-xs text-amber-850 mt-1 leading-relaxed">
            Use os botões de configuração rápidos para alterar os dados de execução pré-definidos para o Secretariado no Todoist.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="secretariado-cards">
        {secretariadoCards.map((card, idx) => (
          <div 
            key={card.id}
            id={card.id}
            className="bg-white rounded-xl border border-[#E0E0E0] hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4 gap-4">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(card.status)}`}>
                  {card.status}
                </span>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {getSecretariadoIcon(card.id)}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                {card.title}
              </h3>
              
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Configuração para disparo em lote sob o escopo de reuniões e trâmites de recepção jurídica.
              </p>

              <div className="text-[11px] text-gray-400 font-semibold mt-3">
                Categoria: <span className="text-gray-600 font-semibold">{card.category}</span>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400 font-mono">SEC-0{idx + 1}</span>
              <button
                onClick={() => onConfigure(card.id)}
                className="text-xs text-[#E44232] hover:text-[#B03428] font-bold underline cursor-pointer transition-colors"
              >
                Configurar automação
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
