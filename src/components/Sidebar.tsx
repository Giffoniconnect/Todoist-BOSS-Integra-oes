/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Megaphone, 
  Settings, 
  ScrollText, 
  Menu, 
  X,
  User,
  ExternalLink
} from 'lucide-react';
import { ViewType } from '../types';
import TodoistIcon from './TodoistIcon';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'secretariado' as ViewType, label: 'Secretariado', icon: Briefcase },
    { id: 'marketing' as ViewType, label: 'Marketing', icon: Megaphone },
    { id: 'configuracoes' as ViewType, label: 'Configurações', icon: Settings },
    { id: 'logs' as ViewType, label: 'Logs', icon: ScrollText },
  ];

  const handleNavClick = (viewId: ViewType) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#E44232] text-white border-b border-[#B03428] px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-[#E44232]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="font-display font-bold tracking-tight text-white text-lg">
            TODOIST <span className="text-white/90">BOSS</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white/90 hover:text-white focus:outline-hidden rounded-md hover:bg-[#B03428]/30 cursor-pointer"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Sidebar Container */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#F3F3F3] border-r border-[#E0E0E0] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Upper Portion */}
        <div className="flex flex-col pt-6 px-4">
          {/* Logo Section */}
          <div className="hidden lg:flex items-center gap-3 px-2 mb-8 select-none">
            <div className="w-8 h-8 bg-[#E44232] rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-[#202020] text-xl leading-none">
                TODOIST <span className="text-[#E44232]">BOSS</span>
              </span>
              <span className="text-[9px] text-[#E44232] font-bold tracking-widest mt-1">
                INTEGRAÇÃO OFICIAL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" id="nav-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white border border-[#E0E0E0] shadow-xs text-[#E44232] font-semibold'
                      : 'text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900 border border-transparent'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-150 ${
                      isActive ? 'text-[#E44232]' : 'text-gray-500'
                    }`} 
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Status Panel based on Design HTML */}
        <div className="p-4 space-y-3">
          <div className="bg-[#E44232]/10 rounded-lg p-3 border border-[#E44232]/20">
            <p className="text-[10px] text-[#E44232] font-bold uppercase mb-1 tracking-wider text-left">Status do Projeto</p>
            <div className="flex items-center space-x-2">
              <span className="block w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-semibold text-gray-800">Fundação Visual OK</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-[#EAEAEA]/40 rounded-lg border border-gray-200/50">
            <div className="h-8 w-8 rounded-full bg-[#E44232]/10 flex items-center justify-center text-[#E44232] font-bold text-xs shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">Escritório Central</p>
              <p className="text-[10px] text-gray-500 font-mono truncate">v1.0.0 Alpha</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/31 z-30 lg:hidden backdrop-blur-xs"
        />
      )}
    </>
  );
}
