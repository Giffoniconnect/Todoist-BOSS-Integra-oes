/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardItem, AutomationConfig, SubtaskConfig } from '../types';
import { 
  Settings, 
  Key, 
  RefreshCw, 
  Lock, 
  Sliders, 
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  Plus,
  Trash2,
  Check,
  CheckCircle,
  FolderDot,
  Briefcase,
  Layers,
  Workflow,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface ConfiguracoesViewProps {
  cards: CardItem[];
  configs: AutomationConfig[];
  preSelectedCardId: string | null;
  onUpdateConfig: (updated: AutomationConfig) => void;
  onClearPreSelected: () => void;
  onLogAdd: (event: string, description: string, type: 'config_altered' | 'automation_activated' | 'automation_deactivated') => void;
}

export default function ConfiguracoesView({ 
  cards, 
  configs, 
  preSelectedCardId, 
  onUpdateConfig, 
  onClearPreSelected,
  onLogAdd 
}: ConfiguracoesViewProps) {
  
  // Navigation tabs for Settings
  const [activeTab, setActiveTab] = useState<'automations' | 'keys'>('automations');

  // Selected Card for configuration
  const [selectedCardId, setSelectedCardId] = useState<string>(preSelectedCardId || cards[0]?.id || '');

  // Form Field States
  const [name, setName] = useState('');
  const [sector, setSector] = useState<'Operações' | 'Financeiro' | 'Secretariado' | 'Marketing'>('Operações');
  const [category, setCategory] = useState('');
  const [creationType, setCreationType] = useState<'Tarefa principal' | 'Subtarefa' | 'Comentário' | 'Pacote de tarefas'>('Subtarefa');
  const [mainTaskTitle, setMainTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [initialComment, setInitialComment] = useState('');
  const [todoistProject, setTodoistProject] = useState<'Secretariado' | 'Marketing' | 'Prazos' | 'Controladoria' | 'Financeiro' | 'Perícias' | 'Audiências'>('Controladoria');
  const [responsible, setResponsible] = useState<'Renata' | 'Felipe' | 'Débora' | 'Rodrigo' | 'Marketing' | 'Financeiro'>('Renata');
  const [dueDate, setDueDate] = useState<'Hoje' | 'Amanhã' | '+2 dias' | '+5 dias' | 'Próxima segunda-feira' | 'Data manual'>('Hoje');
  const [fatalDeadline, setFatalDeadline] = useState<'Prazo fatal judicial' | 'Prazo de segurança' | 'Prazo interno' | 'Sem prazo fatal'>('Sem prazo fatal');
  const [priority, setPriority] = useState<'P1' | 'P2' | 'P3' | 'P4'>('P2');
  const [labels, setLabels] = useState<string[]>([]);
  const [status, setStatus] = useState<'Ativa' | 'Inativa' | 'Em planejamento'>('Ativa');
  const [subtasks, setSubtasks] = useState<SubtaskConfig[]>([]);

  // Helpers for adding subtask
  const [showAddSubForm, setShowAddSubForm] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subResp, setSubResp] = useState('Renata');
  const [subProj, setSubProj] = useState('Controladoria');
  const [subDue, setSubDue] = useState('Hoje');
  const [subFatal, setSubFatal] = useState('Sem prazo fatal');
  const [subComment, setSubComment] = useState('');
  const [subPrior, setSubPrior] = useState<'P1' | 'P2' | 'P3' | 'P4'>('P3');

  // Success Notification
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Available label tags for checkable selection
  const availableLabels = ['urgente', 'prazo', 'cliente', 'financeiro', 'marketing', 'secretariado'];

  // Handle selected card hash redirects
  useEffect(() => {
    if (preSelectedCardId) {
      setSelectedCardId(preSelectedCardId);
      onClearPreSelected();
    }
  }, [preSelectedCardId]);

  // Load configuration whenever selectedCardId changes
  useEffect(() => {
    const matchedConfig = configs.find(c => c.cardId === selectedCardId);
    if (matchedConfig) {
      setName(matchedConfig.name);
      setSector(matchedConfig.sector);
      setCategory(matchedConfig.category);
      setCreationType(matchedConfig.creationType);
      setMainTaskTitle(matchedConfig.mainTaskTitle);
      setDescription(matchedConfig.description);
      setInitialComment(matchedConfig.initialComment);
      setTodoistProject(matchedConfig.todoistProject);
      setResponsible(matchedConfig.responsible);
      setDueDate(matchedConfig.dueDate);
      setFatalDeadline(matchedConfig.fatalDeadline);
      setPriority(matchedConfig.priority);
      setLabels(matchedConfig.labels || []);
      setStatus(matchedConfig.status);
      setSubtasks(matchedConfig.subtasks || []);
    }
  }, [selectedCardId, configs]);

  // Handle label pill toggles
  const handleToggleLabel = (label: string) => {
    if (labels.includes(label)) {
      setLabels(prev => prev.filter(l => l !== label));
    } else {
      setLabels(prev => [...prev, label]);
    }
  };

  // Handle subtask creation
  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) return;

    const newSub: SubtaskConfig = {
      id: `subtask-${Date.now()}`,
      title: subTitle,
      description: subDesc,
      responsible: subResp,
      project: subProj,
      dueDate: subDue,
      fatalDeadline: subFatal,
      comment: subComment,
      priority: subPrior,
      status: 'Ativa'
    };

    setSubtasks(prev => [...prev, newSub]);
    setSubTitle('');
    setSubDesc('');
    setSubComment('');
    setShowAddSubForm(false);
  };

  // Remove subtask
  const handleRemoveSubtask = (subId: string) => {
    setSubtasks(prev => prev.filter(s => s.id !== subId));
  };

  // Trigger Save to main state
  const handleSaveConfig = () => {
    const originalConfig = configs.find(c => c.cardId === selectedCardId);
    
    const updated: AutomationConfig = {
      cardId: selectedCardId,
      name,
      sector,
      category,
      creationType,
      mainTaskTitle,
      description,
      initialComment,
      todoistProject,
      responsible,
      dueDate,
      fatalDeadline,
      priority,
      labels,
      status,
      subtasks
    };

    onUpdateConfig(updated);

    // Emit logs specifically for activations/deactivations
    if (originalConfig && originalConfig.status !== status) {
      if (status === 'Ativa') {
        onLogAdd('Automação Ativada', `A rotina "${name}" foi ativada para o setor de ${sector}`, 'automation_activated');
      } else if (status === 'Inativa') {
        onLogAdd('Automação Desativada', `A rotina "${name}" foi suspensa temporariamente`, 'automation_deactivated');
      }
    }

    // Show toast
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 4000);
  };

  // Grouped cards list selector
  const groupedCards = cards.reduce((acc, card) => {
    if (!acc[card.sector]) {
      acc[card.sector] = [];
    }
    acc[card.sector].push(card);
    return acc;
  }, {} as Record<string, CardItem[]>);

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
            <Settings size={14} className="text-[#E44232]" />
            Painel Administrativo do Todoist Boss
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            Configurações de Automação
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Parametrize regras padrão de disparo de tarefas, subtarefas e vincule novos prazos ao Todoist.
          </p>
        </div>

        {/* Saved Alert Toast */}
        <AnimatePresence>
          {showSavedToast && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-emerald-500 border border-emerald-600 text-white rounded-lg px-4 py-2 text-xs font-bold shadow-md flex items-center gap-2"
            >
              <CheckCircle size={16} />
              <span>Rotina Salva e Sincronizada!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Primary Tab Selector */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('automations')}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
            activeTab === 'automations'
              ? 'border-[#E44232] text-[#E44232]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Modelos de Automação ({configs.length} cards)
        </button>
        <button
          onClick={() => setActiveTab('keys')}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${
            activeTab === 'keys'
              ? 'border-transparent text-gray-400 hover:text-gray-800'
              : 'border-transparent text-gray-450'
          }`}
        >
          Credenciais do Servidor
        </button>
      </div>

      {/* TAB A: ATuomations Engine */}
      {activeTab === 'automations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SELECTOR RAILS: 3 columns */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wider">Selecione o Card do Fluxo</h3>
                <p className="text-[11px] text-gray-500">Escolha uma das {cards.length} rotinas da árvore operacional para modificar.</p>
              </div>

              {/* Selector drop lists */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {Object.entries(groupedCards).map(([secName, secCards]) => (
                  <div key={secName} className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1.5 rounded flex items-center gap-1.5">
                      <FolderDot size={11} className="text-[#E44232]" />
                      {secName}
                    </p>
                    <div className="pl-1 space-y-1">
                      {secCards.map(card => {
                        const isSelected = card.id === selectedCardId;
                        return (
                          <button
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all border flex items-center justify-between gap-1 cursor-pointer ${
                              isSelected
                                ? 'bg-[#E44232]/5 text-[#E44232] border-[#E44232]/30 font-semibold'
                                : 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            <span className="truncate max-w-[180px]">{card.title}</span>
                            <span className={`text-[9px] px-1 py-[1px] rounded scale-85 shrink-0 ${
                              card.status === 'Ativa' ? 'bg-emerald-100 text-emerald-800' :
                              card.status === 'Inativa' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {card.status === 'Ativa' ? 'Ativ' : card.status === 'Inativa' ? 'Inat' : 'Plan'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-amber-900">
              <div className="flex gap-2">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <h4 className="text-xs font-bold uppercase">Sincronização Segura</h4>
              </div>
              <p className="text-[11px] text-amber-800 mt-1 leading-normal">
                Você está em modo de simulação. As alterações feitas estarão armazenadas no cache local e atualizam instantaneamente as estatísticas do Dashboard e cards dos setores.
              </p>
            </div>
          </div>

          {/* MAIN FORM AREA: 8 columns */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E44232] tracking-wider">Detalhamento Técnico</span>
                <h3 className="font-bold text-gray-900 text-base leading-snug">
                  Configurações Operacionais: {name}
                </h3>
              </div>
              
              <button
                onClick={handleSaveConfig}
                className="bg-[#E44232] hover:bg-[#B03428] text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Check size={14} className="stroke-[3px]" />
                Salvar Automação
              </button>
            </div>

            {/* Form grid for the 14 mandatory fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 1. Nome da Automação */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  1. Nome da automação
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white text-gray-900 focus:outline-hidden"
                  placeholder="Nome do gatilho"
                />
              </div>

              {/* 2. Setor */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  2. Setor do escritório
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Operações">Operações</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Secretariado">Secretariado</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* 3. Categoria */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  3. Categoria taxonômica
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white text-gray-900"
                  placeholder="Ex: Prazos, Controladoria, NIBO"
                />
              </div>

              {/* 4. Tipo de criação */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  4. Tipo de criação no Todoist
                </label>
                <select
                  value={creationType}
                  onChange={(e) => setCreationType(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Tarefa principal">Tarefa principal</option>
                  <option value="Subtarefa">Subtarefa</option>
                  <option value="Comentário">Comentário</option>
                  <option value="Pacote de tarefas">Pacote de tarefas</option>
                </select>
              </div>

              {/* 5. Título da Tarefa Principal */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  5. Título padrão da Tarefa Principal
                </label>
                <input
                  type="text"
                  value={mainTaskTitle}
                  onChange={(e) => setMainTaskTitle(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white text-gray-900"
                  placeholder="Título do card do Todoist"
                />
              </div>

              {/* 6. Descrição da tarefa */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  6. Descrição padrão da Tarefa (Markdown suportado)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-3 text-xs focus:bg-white text-gray-900"
                  placeholder="Escreva a descrição que será inserida ao criar a tarefa principal..."
                />
              </div>

              {/* 7. Comentário inicial */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  7. Comentário inicial automático
                </label>
                <textarea
                  rows={2}
                  value={initialComment}
                  onChange={(e) => setInitialComment(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-3 text-xs focus:bg-white text-gray-900"
                  placeholder="Insira detalhes adicionais ou anexos futuros..."
                />
              </div>

              {/* 8. Projeto Todoist */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  8. Projeto de destino do Todoist
                </label>
                <select
                  value={todoistProject}
                  onChange={(e) => setTodoistProject(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Secretariado">Secretariado</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Prazos">Prazos</option>
                  <option value="Controladoria">Controladoria</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Perícias">Perícias</option>
                  <option value="Audiências">Audiências</option>
                </select>
              </div>

              {/* 9. Responsável */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  9. Responsável padrão pelo andamento
                </label>
                <select
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Renata">Renata</option>
                  <option value="Felipe">Felipe</option>
                  <option value="Débora">Débora</option>
                  <option value="Rodrigo">Rodrigo</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Financeiro">Financeiro</option>
                </select>
              </div>

              {/* 10. Data de vencimento */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  10. Regra de data de vencimento
                </label>
                <select
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Hoje">Hoje</option>
                  <option value="Amanhã">Amanhã</option>
                  <option value="+2 dias">+2 dias</option>
                  <option value="+5 dias">+5 dias</option>
                  <option value="Próxima segunda-feira">Próxima segunda-feira</option>
                  <option value="Data manual">Data manual</option>
                </select>
              </div>

              {/* 11. Prazo fatal */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  11. Classificação do Prazo Fatal
                </label>
                <select
                  value={fatalDeadline}
                  onChange={(e) => setFatalDeadline(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-lg p-2 text-xs focus:bg-white text-gray-900"
                >
                  <option value="Prazo fatal judicial">Prazo fatal judicial (crítico)</option>
                  <option value="Prazo de segurança">Prazo de segurança</option>
                  <option value="Prazo interno">Prazo interno</option>
                  <option value="Sem prazo fatal">Sem prazo fatal</option>
                </select>
              </div>

              {/* 12. Prioridade */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  12. Prioridade Todoist
                </label>
                <div className="flex gap-1.5 pt-1">
                  {(['P1', 'P2', 'P3', 'P4'] as const).map(p => {
                    const color = p === 'P1' ? 'border-red-500 text-red-600 bg-red-50' : 
                                  p === 'P2' ? 'border-amber-500 text-amber-600 bg-amber-50' :
                                  p === 'P3' ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 
                                  'border-gray-500 text-gray-600 bg-gray-50';
                    return (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        type="button"
                        className={`px-3 py-1 text-xs font-bold rounded-md border cursor-pointer transition-all ${
                          priority === p 
                            ? `${color} ring-2 ring-[#E44232]/20 scale-105` 
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 13. Etiquetas (Checkable Pill Boxes) */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  13. Etiquetas para o Todoist
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {availableLabels.map(lbl => {
                    const hasLabel = labels.includes(lbl);
                    return (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => handleToggleLabel(lbl)}
                        className={`px-2 py-1 text-[10px] rounded-lg font-semibold tracking-wide cursor-pointer transition-all ${
                          hasLabel
                            ? 'bg-[#E44232]/10 text-[#E44232] border border-[#E44232]/30'
                            : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-150'
                        }`}
                      >
                        {hasLabel ? '✓ ' : ''}{lbl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 14. Status da Automação */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-[#E44232] uppercase tracking-wider mb-1.5">
                  14. Status da Automação Principal
                </label>
                <div className="flex gap-3">
                  {(['Ativa', 'Inativa', 'Em planejamento'] as const).map(st => {
                    const activeColor = st === 'Ativa' ? 'bg-emerald-500 text-white' :
                                        st === 'Inativa' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white';
                    return (
                      <button
                        key={st}
                        onClick={() => setStatus(st)}
                        type="button"
                        className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          status === st 
                            ? `${activeColor} border-transparent shadow` 
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* SECTION: SUBTAREFAS VINCULADAS */}
            <div className="border-t border-gray-150 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                    <Workflow size={16} className="text-[#E44232]" />
                    Subtarefas vinculadas ao Card (Simulador)
                  </h4>
                  <p className="text-[11px] text-gray-550">Dispare essas subtarefas sob a tarefa gerada automaticamente no Todoist.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddSubForm(!showAddSubForm)}
                  className="px-2.5 py-1.5 border border-[#E44232]/30 text-[#E44232] hover:bg-[#E44232]/5 rounded-lg text-xs font-bold leading-none flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={14} />
                  <span>Cadastrar Subtarefa</span>
                </button>
              </div>

              {/* Subtask addition sub-form */}
              {showAddSubForm && (
                <form 
                  onSubmit={handleAddSubtask}
                  className="bg-gray-50/50 p-4 border border-dashed border-gray-300 rounded-xl space-y-3"
                >
                  <h5 className="text-xs font-bold text-gray-700 uppercase">Nova Subtarefa de Atribuição</h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Título</label>
                      <input
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-hidden"
                        placeholder="Ex: Verificar documentos"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Descrição</label>
                      <input
                        type="text"
                        value={subDesc}
                        onChange={(e) => setSubDesc(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 focus:outline-hidden"
                        placeholder="Curto descritivo da tarefa secundária"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Responsável</label>
                      <select
                        value={subResp}
                        onChange={(e) => setSubResp(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-950"
                      >
                        <option value="Renata">Renata</option>
                        <option value="Felipe">Felipe</option>
                        <option value="Débora">Débora</option>
                        <option value="Rodrigo">Rodrigo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Vencimento</label>
                      <select
                        value={subDue}
                        onChange={(e) => setSubDue(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-950"
                      >
                        <option value="Hoje">Hoje</option>
                        <option value="Amanhã">Amanhã</option>
                        <option value="+2 dias">+2 dias</option>
                        <option value="+5 dias">+5 dias</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Prioridade</label>
                      <select
                        value={subPrior}
                        onChange={(e) => setSubPrior(e.target.value as any)}
                        className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-950"
                      >
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                        <option value="P4">P4</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Prazo fatal</label>
                      <select
                        value={subFatal}
                        onChange={(e) => setSubFatal(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-950"
                      >
                        <option value="Prazo fatal judicial">Prazo fatal judicial</option>
                        <option value="Prazo interno">Prazo interno</option>
                        <option value="Sem prazo fatal">Sem prazo fatal</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs mt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddSubForm(false)}
                      className="px-3 py-1.5 bg-gray-200 hover:bg-gray-250 text-gray-700 rounded font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#E44232] hover:bg-[#B03428] text-white rounded font-bold cursor-pointer"
                    >
                      Salvar Subtarefa
                    </button>
                  </div>
                </form>
              )}

              {/* Subtask mapping list rendering */}
              <div className="space-y-3">
                {subtasks.length > 0 ? (
                  subtasks.map((sub, idx) => (
                    <div 
                      key={sub.id} 
                      className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-3xs"
                    >
                      <div className="space-y-1 select-none">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-[#E44232] shrink-0" size={14} />
                          <h5 className="text-xs font-bold text-gray-900 leading-none">{sub.title}</h5>
                          <span className={`text-[9px] font-bold font-mono px-1 py-[1.5px] rounded ${
                            sub.priority === 'P1' ? 'bg-red-100 text-red-800' :
                            sub.priority === 'P2' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {sub.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-normal max-w-[500px]">
                          {sub.description || 'Nenhuma descrição fornecida.'}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-400 font-medium">
                          <span>Resp: <strong className="text-gray-600">{sub.responsible}</strong></span>
                          <span>•</span>
                          <span>Vencimento: <strong className="text-gray-600">{sub.dueDate}</strong></span>
                          <span>•</span>
                          <span>Prazo: <strong className="text-gray-600">{sub.fatalDeadline}</strong></span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(sub.id)}
                        className="text-gray-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer self-end md:self-center"
                        title="Remover subtarefa da regra"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-xs text-gray-400 italic py-4">
                    Nenhuma subtarefa registrada para esta automação.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="border-t border-gray-150 pt-4 flex justify-end gap-3.5">
              <button
                onClick={handleSaveConfig}
                className="bg-[#E44232] hover:bg-[#B03428] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow hover:shadow-md transition-all duration-150"
              >
                <Check size={14} className="stroke-[3px]" />
                Gravar e Aplicar Configuração
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB B: LEGACY KEYS & CREDENTIALS PANEL */}
      {activeTab === 'keys' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Key className="text-[#E44232]" size={18} />
                <h3 className="font-display font-bold text-base text-gray-950">Autenticação do Todoist</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                    <span>Token Integrador Todoist</span>
                    <span className="text-[10px] text-amber-600 font-mono font-medium">Sincronizador Inativo</span>
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
                    <HelpCircle size={12} /> Esse token de acesso privado do Todoist deve ser configurado quando o servidor entrar em produção.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                    <span>Ponto de Entrada (Webhook URL)</span>
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

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <RefreshCw className="text-[#E44232]" size={18} />
                <h3 className="font-display font-bold text-base text-gray-950">Frequência de Sincronismo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Sincronizar em Tempo Real', desc: 'Ativa webhooks instantâneos enviados pelo Todoist.', active: false },
                  { label: 'Polling a cada 5 Minutos', desc: 'Sincronização de segurança a cada intervalo de tempo.', active: false },
                  { label: 'Sincronização ao iniciar sessão', desc: 'Baixar dados ao fazer login no dashboard.', active: true },
                  { label: 'Sincronização manual apenas', desc: 'Desabilita o tráfego automatizado em background.', active: false }
                ].map((opt, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 flex items-start gap-3 select-none">
                    <input
                      type="radio"
                      disabled
                      checked={opt.active}
                      className="mt-1 accent-[#E44232]"
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

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-center gap-2 text-[#E44232]">
                <Sliders size={20} />
                <h3 className="font-display font-bold text-base text-gray-900 font-semibold">Configurações Gerais</h3>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                Opções para controle de disparo e regras gerais do aplicativo.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-xs border-b border-gray-200/80 pb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 uppercase tracking-wide">Notificar Usuário</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Disparar alerta nas subtarefas.</p>
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
                    <p className="text-[10px] text-gray-400 mt-0.5">Histórico completo de requisições de API.</p>
                  </div>
                  <ToggleRight className="text-emerald-500" size={28} />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </motion.div>
  );
}
