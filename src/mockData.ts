/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardItem, AutomationConfig, AutomationPackage, SimulatedLog } from './types';

// Raw list of all 35 operational items matching the structural taxonomy tree
export const initialCards: CardItem[] = [
  // OPERAÇÕES - PRAZOS
  {
    id: 'op-prazo-1',
    title: 'Criar tarefa de prazo',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Prazos',
    status: 'Ativa'
  },
  {
    id: 'op-prazo-2',
    title: 'Delegar prazo',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Prazos',
    status: 'Ativa'
  },
  {
    id: 'op-prazo-3',
    title: 'Solicitar revisão',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Prazos',
    status: 'Em planejamento'
  },
  {
    id: 'op-prazo-4',
    title: 'Solicitar informações',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Prazos',
    status: 'Inativa'
  },
  {
    id: 'op-prazo-5',
    title: 'Solicitar provas',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Prazos',
    status: 'Inativa'
  },

  // OPERAÇÕES - CONTROLADORIA
  {
    id: 'op-contr-1',
    title: 'Criar tarefa de controladoria',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Controladoria',
    status: 'Ativa'
  },
  {
    id: 'op-contr-2',
    title: 'Atualizar andamento',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Controladoria',
    status: 'Ativa'
  },
  {
    id: 'op-contr-3',
    title: 'Conferir movimentação',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Controladoria',
    status: 'Ativa'
  },
  {
    id: 'op-contr-4',
    title: 'Migrar para controladoria',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Controladoria',
    status: 'Em planejamento'
  },
  {
    id: 'op-contr-5',
    title: 'Encerrar controle',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Controladoria',
    status: 'Inativa'
  },

  // OPERAÇÕES - PERÍCIAS
  {
    id: 'op-per-1',
    title: 'Agendar perícia',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Perícias',
    status: 'Ativa'
  },
  {
    id: 'op-per-2',
    title: 'Solicitar documentos',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Perícias',
    status: 'Ativa'
  },
  {
    id: 'op-per-3',
    title: 'Confirmar comparecimento',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Perícias',
    status: 'Em planejamento'
  },
  {
    id: 'op-per-4',
    title: 'Solicitar quesitos',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Perícias',
    status: 'Inativa'
  },
  {
    id: 'op-per-5',
    title: 'Solicitar assistente técnico',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Perícias',
    status: 'Inativa'
  },

  // OPERAÇÕES - AUDIÊNCIAS
  {
    id: 'op-aud-1',
    title: 'Agendar audiência',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Audiências',
    status: 'Ativa'
  },
  {
    id: 'op-aud-2',
    title: 'Confirmar comparecimento',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Audiências',
    status: 'Ativa'
  },
  {
    id: 'op-aud-3',
    title: 'Enviar link',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Audiências',
    status: 'Ativa'
  },
  {
    id: 'op-aud-4',
    title: 'Preparar cliente',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Audiências',
    status: 'Ativa'
  },
  {
    id: 'op-aud-5',
    title: 'Solicitar testemunhas',
    badge: 'Configurável',
    sector: 'Operações',
    category: 'Audiências',
    status: 'Em planejamento'
  },

  // FINANCEIRO
  {
    id: 'fin-nibo',
    title: 'Gerar lançamento no NIBO',
    badge: 'Configurável',
    sector: 'Financeiro',
    category: 'NIBO',
    status: 'Ativa'
  },
  {
    id: 'fin-cobr',
    title: 'Criar cobrança',
    badge: 'Configurável',
    sector: 'Financeiro',
    category: 'Faturamento',
    status: 'Ativa'
  },
  {
    id: 'fin-receb',
    title: 'Registrar recebimento',
    badge: 'Configurável',
    sector: 'Financeiro',
    category: 'Faturamento',
    status: 'Ativa'
  },
  {
    id: 'fin-nf',
    title: 'Solicitar nota fiscal',
    badge: 'Configurável',
    sector: 'Financeiro',
    category: 'Fiscal',
    status: 'Em planejamento'
  },
  {
    id: 'fin-contas',
    title: 'Prestação de contas',
    badge: 'Configurável',
    sector: 'Financeiro',
    category: 'Auditoria',
    status: 'Inativa'
  },

  // SECRETARIADO
  {
    id: 'sec-tarefa-p',
    title: 'Criar tarefa principal',
    badge: 'Configurável',
    sector: 'Secretariado',
    category: 'Reuniões',
    status: 'Ativa'
  },
  {
    id: 'sec-reun-est',
    title: 'Agendar reunião de estruturação',
    badge: 'Configurável',
    sector: 'Secretariado',
    category: 'Reuniões',
    status: 'Ativa'
  },
  {
    id: 'sec-reun-rev',
    title: 'Agendar reunião de revisão',
    badge: 'Configurável',
    sector: 'Secretariado',
    category: 'Reuniões',
    status: 'Ativa'
  },
  {
    id: 'sec-reun-cli',
    title: 'Agendar reunião com cliente',
    badge: 'Configurável',
    sector: 'Secretariado',
    category: 'Reuniões',
    status: 'Ativa'
  },
  {
    id: 'sec-add-tel',
    title: 'Adicionar telefone do cliente',
    badge: 'Configurável',
    sector: 'Secretariado',
    category: 'Administrativo',
    status: 'Ativa'
  },

  // MARKETING
  {
    id: 'mkt-inst',
    title: 'Adicionar contato no Instagram',
    badge: 'Configurável',
    sector: 'Marketing',
    category: 'Redes Sociais',
    status: 'Ativa'
  },
  {
    id: 'mkt-face1',
    title: 'Adicionar contato no Facebook',
    badge: 'Configurável',
    sector: 'Marketing',
    category: 'Redes Sociais',
    status: 'Ativa'
  },
  {
    id: 'mkt-tiktok1',
    title: 'Adicionar contato no TikTok',
    badge: 'Configurável',
    sector: 'Marketing',
    category: 'Redes Sociais',
    status: 'Ativa'
  },
  {
    id: 'mkt-pub',
    title: 'Solicitar publicação',
    badge: 'Configurável',
    sector: 'Marketing',
    category: 'Assessoria de Imprensa',
    status: 'Em planejamento'
  },
  {
    id: 'mkt-lead',
    title: 'Acompanhamento de lead',
    badge: 'Configurável',
    sector: 'Marketing',
    category: 'Vendas',
    status: 'Inativa'
  }
];

// Generates baseline initial configurations for all 35 options so everything is editable immediately
export const generateDefaultConfigs = (cards: CardItem[]): AutomationConfig[] => {
  return cards.map(card => {
    // Determine category based on card category
    const cat = card.category;
    let proj: AutomationConfig['todoistProject'] = 'Controladoria';
    if (card.sector === 'Secretariado') proj = 'Secretariado';
    else if (card.sector === 'Marketing') proj = 'Marketing';
    else if (card.sector === 'Financeiro') proj = 'Financeiro';
    else if (cat === 'Prazos') proj = 'Prazos';
    else if (cat === 'Perícias') proj = 'Perícias';
    else if (cat === 'Audiências') proj = 'Audiências';

    let resp: AutomationConfig['responsible'] = 'Renata';
    if (card.sector === 'Marketing') resp = 'Marketing';
    else if (card.sector === 'Financeiro') resp = 'Financeiro';
    else if (idxOf(card.id) % 3 === 0) resp = 'Felipe';
    else if (idxOf(card.id) % 3 === 1) resp = 'Débora';
    else if (idxOf(card.id) % 3 === 2) resp = 'Rodrigo';

    // Simulated bound subtasks matching the design layout requirements
    const subtasksList = [
      {
        id: `${card.id}-sub-1`,
        title: `Verificar pré-requisitos - ${card.title}`,
        description: 'Checar se todas as informações e documentações iniciais já foram preenchidas no sistema.',
        responsible: resp,
        project: proj,
        dueDate: 'Hoje',
        fatalDeadline: 'Prazo interno',
        comment: 'Cobrar setor responsável se houver pendências.',
        priority: 'P2' as const,
        status: 'Ativa' as const
      },
      {
        id: `${card.id}-sub-2`,
        title: `Notificar gestor imediato`,
        description: 'Garantir que a liderança foi sinalizada sobre o disparo da automação de controle.',
        responsible: 'Rodrigo',
        project: proj,
        dueDate: '+2 dias',
        fatalDeadline: 'Sem prazo fatal',
        comment: 'Enviar link do card ao notificar.',
        priority: 'P3' as const,
        status: 'Ativa' as const
      }
    ];

    return {
      cardId: card.id,
      name: card.title,
      sector: card.sector,
      category: card.category,
      creationType: card.id.includes('tarefa-p') || card.id.includes('prazo-1') ? 'Tarefa principal' : 'Subtarefa',
      mainTaskTitle: `[${card.category}] ${card.title}`,
      description: `Esta é a descrição padrão para a automação de ${card.title} cadastrada no plano de trabalho do setor de ${card.sector}.`,
      initialComment: `Gatilho automático disparado via Todoist Boss. Favor conferir o andamento em anexo.`,
      todoistProject: proj,
      responsible: resp,
      dueDate: 'Hoje',
      fatalDeadline: card.category === 'Prazos' ? 'Prazo fatal judicial' : 'Prazo de segurança',
      priority: card.category === 'Prazos' ? 'P1' : 'P2',
      labels: [card.sector.toLowerCase(), card.category.toLowerCase()],
      status: card.status,
      subtasks: subtasksList
    };
  });
};

function idxOf(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Simulated active pre-assembled packages
export const initialPackages: AutomationPackage[] = [
  {
    id: 'pkg-novo-cliente',
    name: 'Pacote Novo Cliente',
    description: 'Combina fluxos burocráticos do secretariado com engajamento inicial do marketing para onboarding de novas contas.',
    includes: [
      'Criar tarefa principal',
      'Agendar reunião de estruturação',
      'Agendar reunião de revisão',
      'Agendar reunião com cliente',
      'Adicionar telefone do cliente',
      'Adicionar contato no Instagram',
      'Adicionar contato no Facebook',
      'Adicionar contato no TikTok'
    ]
  },
  {
    id: 'pkg-proc-judicial',
    name: 'Pacote Processo Judicial em Andamento',
    description: 'Reúne controladoria jurídica de prazos, perícias técnicas e agendamentos de audiências em um único disparo.',
    includes: [
      'Criar tarefa de controladoria',
      'Conferir movimentação',
      'Migrar para controladoria',
      'Criar tarefa de prazo',
      'Agendar audiência',
      'Agendar perícia'
    ]
  },
  {
    id: 'pkg-financeiro',
    name: 'Pacote Financeiro Integrado',
    description: 'Realiza cobranças completas, lançamentos no NIBO, emissão fiscal e prestação auditada de investimentos.',
    includes: [
      'Gerar lançamento no NIBO',
      'Criar cobrança',
      'Registrar recebimento',
      'Solicitar nota fiscal',
      'Prestação de contas'
    ]
  }
];

// Seeded realistic simulation logs for the monitor board
export const initialLogs: SimulatedLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-05-30T10:45:10Z',
    event: 'Projeto Carregado',
    type: 'config_altered',
    description: 'Todoist Boss iniciado no ambiente. 35 macrocards carregados na árvore operacional padrão.'
  },
  {
    id: 'log-2',
    timestamp: '2026-05-30T10:50:24Z',
    event: 'Automação Ativada',
    type: 'automation_activated',
    description: 'Automação: "Criar tarefa de prazo" [Operações > Prazos] marcada para produção.'
  },
  {
    id: 'log-3',
    timestamp: '2026-05-30T11:02:11Z',
    event: 'Pacote Carregado',
    type: 'package_created',
    description: 'Simulador carregou "Pacote Novo Cliente" no monitor do painel principal.'
  },
  {
    id: 'log-4',
    timestamp: '2026-05-30T11:05:40Z',
    event: 'Configuração Alterada',
    type: 'config_altered',
    description: 'Token do NIBO carregado no modo simulação para testes locais.'
  }
];
