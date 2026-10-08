import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, Sparkles, MessageSquare, LogOut } from 'lucide-react';
import { ScreenType } from '../../types';

export const Navbar: React.FC = () => {
  const { screen, setScreen, user, isLoggedIn, activeNiche, nicheAutomationActive, logout } = useApp();

  const navLinks: { label: string; screenId: ScreenType }[] = [
    { label: 'Início', screenId: 'dashboard' },
    { label: 'Biblioteca', screenId: 'library' },
    { label: 'Método', screenId: 'method' },
    { label: 'Profissões', screenId: 'professions' },
    { label: 'Desafio 7D', screenId: 'challenge' },
    { label: 'Prompts IA', screenId: 'ai-prompts' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1014]/90 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => setScreen(isLoggedIn ? 'dashboard' : 'login')}
          className="text-left font-bold tracking-tight text-white hover:text-[#25D366] transition-colors flex items-center gap-2 select-none"
        >
          <span className="w-8 h-8 rounded-lg bg-[#25D366] text-[#0B1014] flex items-center justify-center font-extrabold text-base">
            W
          </span>
          <span className="text-base sm:text-lg">
            WhatsApp <span className="text-[#25D366]">que Vende</span>
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links (desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          {navLinks.map((link) => {
            const isActive = screen === link.screenId;
            return (
              <button
                key={link.screenId}
                onClick={() => setScreen(link.screenId)}
                className={`whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-[#25D366] font-semibold'
                    : 'hover:text-slate-200'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Niche Indicator Pill */}
          <button
            onClick={() => setScreen('professions')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141F1A] border border-[#25D366]/40 text-xs font-semibold text-[#25D366] hover:bg-[#1A2822] transition-colors"
            title="Sua profissão nativa (Clique para alterar)"
          >
            <span className={`w-2 h-2 rounded-full ${nicheAutomationActive ? 'bg-[#25D366] animate-pulse' : 'bg-slate-500'}`} />
            <span>Nicho: <strong>{activeNiche.shortName}</strong></span>
          </button>

          <button
            onClick={() => setScreen('search')}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium border ${
              screen === 'search'
                ? 'bg-[#15241C] text-[#25D366] border-[#25D366]/40'
                : 'bg-[#131C24] text-slate-300 hover:text-white border-[#2A3942]'
            }`}
            title="Busca rápida de respostas"
          >
            <Search className="w-4 h-4 text-[#25D366]" />
            <span className="hidden sm:inline">Buscar</span>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setScreen('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  screen === 'profile'
                    ? 'bg-[#25D366] text-[#0A1014] border-[#25D366]'
                    : 'bg-[#182229] text-slate-200 hover:text-white border-[#2A3942]'
                }`}
                title="Meu Perfil"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Perfil'}</span>
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-[#2A3942] transition-colors"
                title="Sair da conta"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setScreen('login')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#25D366] text-[#0A1014] hover:bg-[#20bd5a] transition-colors"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
