import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Library,
  Search,
  Star,
  User,
  MoreHorizontal,
  Layers,
  Briefcase,
  Trophy,
  Bot,
  Settings,
  X,
  LogOut,
} from 'lucide-react';
import { ScreenType } from '../../types';

export const MobileNav: React.FC = () => {
  const { screen, setScreen, favorites, logout } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryTabs: { id: ScreenType; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'library', label: 'Biblioteca', icon: Library },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'favorites', label: 'Favoritos', icon: Star, badge: favorites.length > 0 ? favorites.length : undefined },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  const secondaryTabs: { id: ScreenType; label: string; icon: any; desc: string }[] = [
    { id: 'method', label: 'As 6 Etapas do Método', icon: Layers, desc: 'Atrair, Entender, Conectar, Apresentar, Contornar, Fechar' },
    { id: 'professions', label: 'Modelos por Profissão', icon: Briefcase, desc: 'Barbeiro, Dentista, Personal, Fotógrafo e mais 10 nichos' },
    { id: 'challenge', label: 'Desafio 7 Dias', icon: Trophy, desc: 'Área gamificada passo a passo' },
    { id: 'ai-prompts', label: 'Prompts de IA', icon: Bot, desc: 'Modelos prontos para ChatGPT, Gemini e Claude' },
    { id: 'settings', label: 'Configurações', icon: Settings, desc: 'Preferências de tom e dados' },
  ];

  return (
    <>
      {/* Mobile Drawer for More Items */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="bg-[#0F171E] border-t border-[#1F2C34] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2C34]">
              <span className="text-sm font-bold text-white">Mais Ferramentas</span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {secondaryTabs.map((item) => {
                const Icon = item.icon;
                const isActive = screen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setScreen(item.id);
                      setShowMoreMenu(false);
                    }}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left border transition-all ${
                      isActive
                        ? 'bg-[#182620] border-[#25D366]/40 text-[#25D366]'
                        : 'bg-[#131A21] border-[#1E293B] text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1F2C35] flex items-center justify-center shrink-0 text-[#25D366]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="text-xs text-slate-400 truncate">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#1F2C34] flex items-center justify-between">
              <span className="text-xs text-slate-500">Versão SaaS 2.4.0</span>
              <button
                onClick={() => {
                  setShowMoreMenu(false);
                  logout();
                }}
                className="text-xs text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1014]/95 backdrop-blur-md border-t border-[#1E293B] lg:hidden px-2 py-1.5">
        <div className="flex items-center justify-around">
          {primaryTabs.map((tab) => {
            const isActive = screen === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setScreen(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                  isActive ? 'text-[#25D366]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2 bg-[#25D366] text-[#0B1014] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* Quick trigger for other screens */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Mais</span>
          </button>
        </div>
      </div>
    </>
  );
};
