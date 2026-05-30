/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  CheckSquare, 
  Clock, 
  PhoneCall,
  Sliders,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export default function SecretariadoView() {
  const secretariadoCards = [
    {
      id: 'sec-1',
      title: 'Criar Tarefa no Todoist',
      description: 'Lançamento estrutural da tarefa principal na conta do Todoist para acompanhamento geral do escritório.',
      badge: 'Planejamento',
      icon: CheckSquare
    },
    {
      id: 'sec-2',
      title: 'Criar Subtarefa para o Secretariado - Agendar reunião de Estruturação',
      description: 'Criação automática da subtarefa de agendamento interno para estruturar os fluxos burocráticos iniciais.',
      badge: 'Planejamento',
      icon: Calendar
    },
    {
      id: 'sec-3',
      title: 'Criar Subtarefa para o Secretariado - Agendar reunião de Revisão',
      description: 'Agendamento periódico para conferência de métricas e status de entregáveis operacionais.',
      badge: 'Planejamento',
      icon: Clock
    },
    {
      id: 'sec-4',
      title: 'Criar Subtarefa para o Secretariado - Agendar reunião com o Cliente',
      description: 'Estabelecer primeiro contato com o novo cliente e alinhar calendário com a gerência.',
      badge: 'Planejamento',
      icon: PhoneCall
    },
    {
      id: 'sec-5',
      title: 'Criar Subtarefa para o Secretariado - Adicionar telefone do cliente no celular',
      description: 'Adicionar o número de telefone de contato gerado no cadastro oficial ao celular funcional da unidade.',
      badge: 'Planejamento',
      icon: Sliders
    }
  ];

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
          <h4 className="text-xs font-bold uppercase tracking-wider">Estruturas Estáticas Ativas</h4>
          <p className="text-xs text-amber-850 mt-1 leading-relaxed">
            Estes cards representam a fundação visual requerida. Na fase seguinte, serão conectados via webhook à API oficial para sincronismo ativo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="secretariado-cards">
        {secretariadoCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div 
              key={card.id}
              id={card.id}
              className="bg-white rounded-xl border border-[#E0E0E0] hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#E44232]/10 text-[#E44232] rounded">
                    {card.badge}
                  </span>
                  <div className="p-2 bg-gray-50 text-gray-400 rounded-lg">
                    <IconComponent size={18} />
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                  {card.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 font-mono">SEC-0{idx + 1}</span>
                <button
                  disabled
                  className="text-xs text-[#B03428] font-bold hover:underline cursor-not-allowed scale-95 origin-right"
                >
                  Configurar depois
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
