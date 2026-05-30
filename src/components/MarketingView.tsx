/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Instagram, 
  Facebook, 
  Linkedin,
  Video,
  ChevronRight,
  Info 
} from 'lucide-react';

export default function MarketingView() {
  const marketingCards = [
    {
      id: 'mkt-1',
      title: 'Criar subtarefa para o Marketing - Adicionar contato no Instagram',
      description: 'Lançar subtarefa sob a conta de marketing para seguir o novo cliente e interagir com publicações estratégicas.',
      badge: 'Planejamento',
      icon: Instagram,
      color: 'text-[#E1306C] bg-[#E1306C]/10'
    },
    {
      id: 'mkt-2',
      title: 'Criar subtarefa para o Marketing - Adicionar contato no Facebook',
      description: 'Adicionar a conta do novo lead comercial aos nossos grupos e páginas do Facebook para postagem automatizada.',
      badge: 'Planejamento',
      icon: Facebook,
      color: 'text-[#1877F2] bg-[#1877F2]/10'
    },
    {
      id: 'mkt-3',
      title: 'Criar subtarefa para o Marketing - Adicionar contato no TikTok',
      description: 'Criação automática para monitoramento de tendências, lançamentos e menções por vídeo em mídias corporativas.',
      badge: 'Planejamento',
      icon: Video,
      color: 'text-[#25F4EE] bg-[#25F4EE]/10'
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
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Marketing</h2>
          <p className="text-gray-500 text-sm mt-1">Sincronismo de novas audiências e subtarefas de assessoria digital.</p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          ROUTE: /marketing
        </div>
      </div>

      {/* Mini layout banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900">
        <Info className="shrink-0 mt-0.5 text-amber-700" size={18} />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider">Metas Visuais Ativas</h4>
          <p className="text-xs text-amber-850 mt-1 leading-relaxed">
            Cards de atribuição representados de acordo com os critérios definidos. Todas as opções de configuração estão estáticas neste estágio fundador.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="marketing-cards">
        {marketingCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div 
              key={card.id}
              id={card.id}
              className="bg-white rounded-xl border border-[#E0E0E0] hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    {card.badge}
                  </span>
                  <div className={`p-2 rounded-lg ${card.color}`}>
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
                <span className="text-[11px] font-semibold text-gray-400 font-mono">MKT-0{idx + 1}</span>
                <button
                  disabled
                  className="text-xs text-gray-400 font-bold hover:underline cursor-not-allowed scale-95 origin-right"
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
