/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CardItem } from '../types';
import { 
  CalendarRange, 
  Files, 
  FileCheck, 
  HelpCircle, 
  Hourglass, 
  Search,
  Settings,
  Scale
} from 'lucide-react';

interface OperacoesViewProps {
  cards: CardItem[];
  onConfigure: (cardId: string) => void;
}

export default function OperacoesView({ cards, onConfigure }: OperacoesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Prazos' | 'Controladoria' | 'Perícias' | 'Audiências'>('Todos');

  // Filter cards belonging to the 'Operações' sector
  const operacoesCards = cards.filter(card => card.sector === 'Operações');

  // Apply search filtering and category filtering
  const filteredCards = operacoesCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          card.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || card.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todos', 'Prazos', 'Controladoria', 'Perícias', 'Audiências'] as const;

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Prazos':
        return <Hourglass size={16} className="text-blue-500" />;
      case 'Controladoria':
        return <Files size={16} className="text-purple-500" />;
      case 'Perícias':
        return <FileCheck size={16} className="text-teal-500" />;
      case 'Audiências':
        return <Scale size={16} className="text-amber-500" />;
      default:
        return <Settings size={16} className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Operações</h2>
          <p className="text-gray-500 text-sm mt-1">
            Gatilhos de prazos judiciais, controladoria processual, vistorias técnicas e audiências.
          </p>
        </div>
        <div className="text-right text-xs text-gray-400 font-mono tracking-wider bg-gray-100 px-2.5 py-1 rounded">
          ROUTE: /operacoes
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E44232] text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs rounded-lg pl-8 py-2 focus:bg-white focus:outline-hidden transition-colors"
          />
          <Search size={14} className="text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Grid Layout grouped by selected categories or standard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="operacoes-cards">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <div
              key={card.id}
              id={card.id}
              className="bg-white rounded-xl border border-[#E0E0E0] hover:border-gray-300 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-5.5">
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(card.status)}`}>
                    {card.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded">
                    {card.badge}
                  </span>
                </div>

                {/* Card Title */}
                <h4 className="font-bold text-gray-950 text-sm mb-1 leading-snug">
                  {card.title}
                </h4>

                {/* Subtitle Category metadata */}
                <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5 mt-2">
                  {getCategoryIcon(card.category)}
                  Setor: <span className="font-semibold text-gray-800">{card.sector}</span> 
                  • Categoria: <span className="font-semibold text-gray-800">{card.category}</span>
                </p>
              </div>

              {/* Configure actions */}
              <div className="bg-gray-50/50 hover:bg-gray-50 px-5.5 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 lowercase">
                  #{card.id}
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
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-400">
            Nenhum card operacional encontrado para os filtros selecionados.
          </div>
        )}
      </div>
    </motion.div>
  );
}
