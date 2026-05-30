/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'dashboard' | 'secretariado' | 'marketing' | 'configuracoes' | 'logs';

export interface CardItem {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}
