/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CardItem } from '../types';
import { 
  CircleDollarSign, 
  Receipt, 
  Coins, 
  Wallet, 
  Search, 
  TrendingUp, 
  HelpCircle,
  PiggyBank
} from 'lucide-react';

interface FinanceiroViewProps {
  cards: CardItem[];
  onConfigure: (cardId: string) => void;
}

export default function FinanceiroView({ cards, onConfigure }: FinanceiroViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract cards belonging to 'Financeiro' sector
  const financeiroCards = cards.filter(card => card.sector === 'Financeiro');

  // Search filter
  const filteredCards = financeiroCards.filter(card => {
    return card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           card.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  const getFinanceIcon = (title: string) => {
    if (title.includes('NIBO')) return <Receipt size={18} className="text-blue-500" />;
    if (title.includes('cobrança')) return <CircleDollarSign size={18} className="text-rose-500" />;
    if (title.includes('recebimento')) return <Coins size={18} className="text-emerald-500" />;
    if (title.includes('fiscal')) return <Wallet size={18} className="text-amber-500" />;
    return <PiggyBank size={18} className="text-purple-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Top Banner section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Financeiro</h2>
          <p className="text-gray-500 text-sm mt-1">
            Integração com ERP NIBO, automação de faturas, monitoramento de comprovantes fiscais e contas.
          </p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          ROUTE: /financeiro
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#E44232]" />
          <span className="text-xs font-semibold text-gray-700">Controles do Faturamento Integrado</span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar lançamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs rounded-lg pl-8 py-2 focus:bg-white focus:outline-hidden transition-colors"
          />
          <Search size={14} className="text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Cards lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="financeiro-cards">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="bg-white rounded-xl border border-[#E0E0E0] hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(card.status)}`}>
                    {card.status}
                  </span>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getFinanceIcon(card.title)}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  Define o modelo de criação automática para a rotina financeira de {card.title} alinhado à tesouraria.
                </p>

                <div className="text-[11px] text-gray-400 font-semibold mt-3">
                  Seção: <span className="text-gray-600 font-semibold">{card.category}</span>
                </div>
              </div>

              <div className="bg-gray-50/50 hover:bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-450 uppercase">
                  {card.badge}
                </span>
                <button
                  onClick={() => onConfigure(card.id)}
                  className="text-xs text-[#E44232] hover:text-[#B03428] font-bold underline cursor-pointer transition-colors"
                >
                  Configurar automação
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-450">
            Nenhum card simulado encontrado no setor financeiro.
          </div>
        )}
      </div>
    </motion.div>
  );
}
