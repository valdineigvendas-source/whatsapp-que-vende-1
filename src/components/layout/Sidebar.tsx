import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Library,
  Search,
  Star,
  Layers,
  Briefcase,
  Trophy,
  Bot,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    screen,
    setScreen,
    favorites,
    completedDays,
    user,
    logout,
    activeNiche,
    nicheAutomationActive,
  } = useApp();

  const menuItems: { id: ScreenType; label: string; icon: any; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'library', label: 'Biblioteca', icon: Library },
    { id: 'search', label: 'Busca Inteligente', icon: Search },
    { id: 'favorites', label: 'Favoritos', icon: Star, badge: favorites.length > 0 ? favorites.length : undefined },
    { id: 'method', label: 'Método (6 Etapas)', icon: Layers },
    { id: 'professions', label: 'Por Profissão', icon: Briefcase },
    { id: 'challenge', label: 'Desafio 7 Dias', icon: Trophy, badge: `${completedDays.length}/7` },
    { id: 'ai-prompts', label: 'Prompts de IA', icon: Bot },
    { id: 'profile', label: 'Meu Perfil', icon: User },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0B0F13] border-r border-[#1B242C] h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0">
      {/* User Badge / Business Context with Niche Automation Tag */}
      <div className="p-4 border-b border-[#1B242C]/80">
        <div className="bg-[#11171D] p-3 rounded-xl border border-[#202C34] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] font-bold text-sm shrink-0">
            {user?.name?.slice(0, 2).toUpperCase() || 'WV'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{user?.name || 'Profissional'}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-[#25D366] truncate font-medium">{activeNiche.shortName}</span>
              {nicheAutomationActive && (
                <span className="text-[9px] font-mono font-bold bg-[#25D366]/20 text-[#25D366] px-1 py-0.2 rounded">
                  AUTO ⚡
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Menu Principal
        </div>
        {menuItems.map((item) => {
          const isActive = screen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#182620] text-[#25D366] font-semibold border border-[#25D366]/30 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-[#141B22]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#25D366]' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#25D366]/20 text-[#25D366] font-bold'
                      : 'bg-[#1C252D] text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Gamification Progress Box */}
      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-[#121A20] to-[#0D1418] border border-[#202C35]">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Desafio 7 Dias
          </span>
          <span className="text-[11px] font-mono text-[#25D366] font-bold">
            {Math.round((completedDays.length / 7) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#1C2630] rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#25D366] h-full transition-all duration-500 rounded-full"
            style={{ width: `${(completedDays.length / 7) * 100}%` }}
          />
        </div>
        <button
          onClick={() => setScreen('challenge')}
          className="mt-2.5 w-full text-center text-[11px] text-slate-400 hover:text-[#25D366] transition-colors flex items-center justify-center gap-1"
        >
          <span>Continuar missão diária</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Footer Profile Logout */}
      <div className="p-3 border-t border-[#1B242C] flex items-center justify-between">
        <button
          onClick={() => setScreen('settings')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#141B22] transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Configurações</span>
        </button>
        <button
          onClick={logout}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Sair da conta"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
