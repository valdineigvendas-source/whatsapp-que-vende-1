import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MESSAGES, CATEGORIES, PROFESSIONS } from '../../data/mockData';
import { MessageItem, CategoryId } from '../../types';
import {
  Search,
  MessageSquarePlus,
  BadgeDollarSign,
  ShieldAlert,
  History,
  UserX,
  CheckCircle2,
  Copy,
  Check,
  Star,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const {
    user,
    setScreen,
    setSelectedMessageId,
    setSelectedCategory,
    setSearchQuery,
    copyToClipboard,
    isFavorite,
    toggleFavorite,
    openAdaptModal,
    recentMessageIds,
    messages,
    nicheAutomationActive,
    toggleNicheAutomation,
    activeNiche,
    setNicheProfession,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Large shortcuts requested by user
  const bigShortcuts = [
    {
      title: 'Primeiro contato',
      subtitle: 'Chegou lead novo no WhatsApp',
      categoryId: 'primeiro-contato' as CategoryId,
      icon: MessageSquarePlus,
      color: 'from-emerald-950/40 to-emerald-900/10 border-emerald-500/30 hover:border-[#25D366]',
      iconColor: 'text-[#25D366]',
    },
    {
      title: 'Perguntaram o preço',
      subtitle: 'Passar valor sem assustar',
      categoryId: 'apresentar-preco' as CategoryId,
      icon: BadgeDollarSign,
      color: 'from-teal-950/40 to-teal-900/10 border-teal-500/30 hover:border-teal-400',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Objeções',
      subtitle: '"Tá caro", "Vou pensar"',
      categoryId: 'objecoes' as CategoryId,
      icon: ShieldAlert,
      color: 'from-amber-950/40 to-amber-900/10 border-amber-500/30 hover:border-amber-400',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Follow-up',
      subtitle: 'Cobrança educada e elegante',
      categoryId: 'follow-up' as CategoryId,
      icon: History,
      color: 'from-blue-950/40 to-blue-900/10 border-blue-500/30 hover:border-blue-400',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Cliente sumiu',
      subtitle: 'Resgatar quem visualizou e sumiu',
      categoryId: 'recuperacao' as CategoryId,
      icon: UserX,
      color: 'from-purple-950/40 to-purple-900/10 border-purple-500/30 hover:border-purple-400',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Fechamento',
      subtitle: 'Pedir o Pix ou fechar contrato',
      categoryId: 'fechamento' as CategoryId,
      icon: CheckCircle2,
      color: 'from-emerald-950/40 to-emerald-900/10 border-[#25D366]/40 hover:border-[#25D366]',
      iconColor: 'text-[#25D366]',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setScreen('search');
    }
  };

  const handleShortcutClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setScreen('library');
  };

  const handleOpenDetail = (msg: MessageItem) => {
    setSelectedMessageId(msg.id);
    setScreen('message-detail');
  };

  const handleCopy = (e: React.MouseEvent, msg: MessageItem) => {
    e.stopPropagation();
    copyToClipboard(msg.content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Recent messages (adapted)
  const recentMessages = recentMessageIds
    .map((id) => messages.find((m) => m.id === id))
    .filter(Boolean) as MessageItem[];

  // Most accessed messages (adapted)
  const mostAccessedMessages = [...messages].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Olá, {user?.name?.split(' ')[0] || 'Vendedor'}! 👋
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            O que você precisa responder hoje no WhatsApp?
          </p>
        </div>

        {/* Quick profession and automation control */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Instant Niche Selector */}
          <div className="relative">
            <select
              value={activeNiche.id}
              onChange={(e) => setNicheProfession(e.target.value)}
              className="bg-[#141F1A] text-[#25D366] border border-[#25D366]/40 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#25D366] cursor-pointer"
              title="Trocar sua profissão nativa"
            >
              {PROFESSIONS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0E151B] text-white">
                  ⚡ {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleNicheAutomation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              nicheAutomationActive
                ? 'bg-[#182620] text-[#25D366] border-[#25D366]/50 shadow-xs'
                : 'bg-[#161F27] text-slate-400 border-[#253544]'
            }`}
            title="Alternar automação de nicho"
          >
            <Zap className={`w-3.5 h-3.5 ${nicheAutomationActive ? 'fill-[#25D366] text-[#25D366]' : ''}`} />
            <span>{nicheAutomationActive ? 'Automação Ativa' : 'Geral'}</span>
          </button>
        </div>
      </div>

      {/* Smart Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative group">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-[#25D366] transition-colors" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Digite uma situação ou o que o cliente falou... (ex: 'tá caro', 'sumiu')"
            className="w-full bg-[#111921] border border-[#22303C] rounded-2xl pl-12 pr-28 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 shadow-lg focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/50 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-2.5 px-4 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#25D366]/20"
          >
            Buscar
          </button>
        </div>

        {/* Quick search tags */}
        <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="shrink-0 text-slate-500">Exemplos rápidos:</span>
          {['Cliente sumiu', 'Pediu desconto', 'Achou caro', 'Primeiro contato'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setLocalSearch(term);
                setSearchQuery(term);
                setScreen('search');
              }}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-[#141C24] hover:bg-[#1D2833] hover:text-[#25D366] border border-[#23313D] transition-colors"
            >
              "{term}"
            </button>
          ))}
        </div>
      </form>

      {/* Large Shortcuts Grid (Atalhos Grandes) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#25D366]" />
            Atalhos Rápidos de Vendas
          </h2>
          <button
            onClick={() => setScreen('library')}
            className="text-xs text-[#25D366] hover:underline flex items-center gap-1 font-medium"
          >
            Ver todas as categorias
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {bigShortcuts.map((sc) => {
            const Icon = sc.icon;
            return (
              <button
                key={sc.title}
                onClick={() => handleShortcutClick(sc.categoryId)}
                className={`flex flex-col text-left p-4 rounded-2xl bg-gradient-to-b ${sc.color} border transition-all hover:scale-[1.02] active:scale-[0.99] group shadow-md`}
              >
                <div className={`w-10 h-10 rounded-xl bg-[#11171D] border border-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${sc.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors leading-snug">
                  {sc.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {sc.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seção: "Continue de onde parou" */}
      {recentMessages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              Continue de onde parou
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {recentMessages.slice(0, 3).map((msg) => {
              const isFav = isFavorite(msg.id);
              const isCopied = copiedId === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => handleOpenDetail(msg)}
                  className="p-4 rounded-2xl bg-[#0F161C] border border-[#1F2C36] hover:border-[#25D366]/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-[#25D366] uppercase tracking-wider">
                        {msg.category.replace('-', ' ')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(msg.id);
                        }}
                        className="text-slate-400 hover:text-amber-400 p-1"
                        title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors line-clamp-1">
                      {msg.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      "{msg.situation}"
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#1C2730] flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Tom: <strong className="text-slate-300">{msg.tone}</strong>
                    </span>

                    <button
                      onClick={(e) => handleCopy(e, msg)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#18232B] hover:bg-[#202E39] text-[#25D366] border border-[#25D366]/20'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Mensagem copiada!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Seção: "Mais acessados" */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#25D366]" />
            Mais Acessados pela Comunidade
          </h2>
          <span className="text-xs text-slate-500">Mais de 25.000 cópias este mês</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mostAccessedMessages.map((msg) => {
            const isFav = isFavorite(msg.id);
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                onClick={() => handleOpenDetail(msg)}
                className="p-4 sm:p-5 rounded-2xl bg-[#0F161C] border border-[#1E2B35] hover:border-[#25D366]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-xs font-bold text-[#25D366]">
                        {msg.title}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {msg.viewsCount.toLocaleString()} acessos
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(msg.id);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-400"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1216] border border-[#18232A] text-xs sm:text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
                    "{msg.content}"
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    💡 {msg.explanation.slice(0, 48)}...
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAdaptModal(msg);
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-[#25D366]" />
                      <span className="hidden sm:inline">Adaptar</span>
                    </button>

                    <button
                      onClick={(e) => handleCopy(e, msg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Mensagem copiada!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
