/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'dashboard' | 'operacoes' | 'financeiro' | 'secretariado' | 'marketing' | 'configuracoes' | 'logs';

export interface CardItem {
  id: string;
  title: string;
  description?: string;
  badge: 'Configurável';
  sector: 'Operações' | 'Financeiro' | 'Secretariado' | 'Marketing';
  category: string;
  status: 'Ativa' | 'Inativa' | 'Em planejamento';
}

export interface SubtaskConfig {
  id: string;
  title: string;
  description: string;
  responsible: string;
  project: string;
  dueDate: string;
  fatalDeadline: string;
  comment: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'Ativa' | 'Inativa' | 'Em planejamento';
}

export interface AutomationConfig {
  cardId: string;
  name: string;
  sector: 'Operações' | 'Financeiro' | 'Secretariado' | 'Marketing';
  category: string;
  creationType: 'Tarefa principal' | 'Subtarefa' | 'Comentário' | 'Pacote de tarefas';
  mainTaskTitle: string;
  description: string;
  initialComment: string;
  todoistProject: 'Secretariado' | 'Marketing' | 'Prazos' | 'Controladoria' | 'Financeiro' | 'Perícias' | 'Audiências';
  responsible: 'Renata' | 'Felipe' | 'Débora' | 'Rodrigo' | 'Marketing' | 'Financeiro';
  dueDate: 'Hoje' | 'Amanhã' | '+2 dias' | '+5 dias' | 'Próxima segunda-feira' | 'Data manual';
  fatalDeadline: 'Prazo fatal judicial' | 'Prazo de segurança' | 'Prazo interno' | 'Sem prazo fatal';
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  labels: string[]; // e.g. ['urgente', 'prazo', 'cliente']
  status: 'Ativa' | 'Inativa' | 'Em planejamento';
  subtasks: SubtaskConfig[];
}

export interface AutomationPackage {
  id: string;
  name: string;
  description: string;
  includes: string[];
}

export interface SimulatedLog {
  id: string;
  timestamp: string;
  event: string;
  type: 'config_altered' | 'automation_activated' | 'automation_deactivated' | 'package_created';
  description: string;
}

