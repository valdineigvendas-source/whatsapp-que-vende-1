import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, MESSAGES, PROFESSIONS } from '../../data/mockData';
import { CategoryId, MessageItem } from '../../types';
import {
  Search,
  MessageSquarePlus,
  HelpCircle,
  BadgeDollarSign,
  ShieldAlert,
  History,
  UserCheck,
  CheckCircle2,
  HeartHandshake,
  Copy,
  Check,
  Star,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Sparkles,
  Zap,
} from 'lucide-react';

export const LibraryScreen: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    setSelectedMessageId,
    setScreen,
    copyToClipboard,
    isFavorite,
    toggleFavorite,
    openAdaptModal,
    messages,
    nicheAutomationActive,
    toggleNicheAutomation,
    activeNiche,
    setNicheProfession,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [toneFilter, setToneFilter] = useState<string>('todos');
  const [stageFilter, setStageFilter] = useState<number | 'todas'>('todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquarePlus':
        return MessageSquarePlus;
      case 'HelpCircle':
        return HelpCircle;
      case 'BadgeDollarSign':
        return BadgeDollarSign;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'History':
      case 'ClockRewind':
        return History;
      case 'UserCheck':
        return UserCheck;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'HeartHandshake':
        return HeartHandshake;
      default:
        return MessageSquarePlus;
    }
  };

  // Filter messages using adapted messages array
  const filteredMessages = messages.filter((msg) => {
    const matchesCategory = selectedCategory ? msg.category === selectedCategory : true;
    const matchesStage = stageFilter === 'todas' ? true : msg.methodStage === stageFilter;
    const matchesSearch =
      searchFilter === '' ||
      msg.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      msg.situation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesTone = toneFilter === 'todos' || msg.tone === toneFilter;

    return matchesCategory && matchesStage && matchesSearch && matchesTone;
  });

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

  const tonesList = ['todos', 'Consultivo', 'Direto', 'Empático', 'Persuasivo'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Biblioteca de Mensagens
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-400">
            Escolha uma categoria para encontrar roteiros validados e prontos para enviar no WhatsApp.
          </p>
        </div>

        {/* Niche quick info button */}
        <button
          onClick={() => setScreen('professions')}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141F1A] border border-[#25D366]/40 text-xs text-[#25D366] hover:bg-[#1A2822] transition-colors"
        >
          <span>Nicho: <strong>{activeNiche.shortName}</strong></span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ⚡ Automation Banner: Adaptação Nativa de Nicho */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        nicheAutomationActive
          ? 'bg-gradient-to-r from-[#12231A] via-[#0E1B15] to-[#0D151B] border-[#25D366]/40 shadow-lg shadow-[#25D366]/5'
          : 'bg-[#11171D] border-[#22303C]'
      }`}>
        <div className="flex items-start sm:items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
            nicheAutomationActive ? 'bg-[#25D366] text-[#0A1014] shadow-md shadow-[#25D366]/20' : 'bg-[#1E2933] text-slate-400'
          }`}>
            ⚡
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                {nicheAutomationActive ? 'Automação Nativa de Nicho Ativa' : 'Modo Geral (Variáveis Padrão)'}
              </h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                nicheAutomationActive ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30' : 'bg-slate-700 text-slate-300'
              }`}>
                {nicheAutomationActive ? activeNiche.shortName : 'Desativado'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {nicheAutomationActive
                ? `Todas as ${messages.length} mensagens de todas as 6 etapas foram adaptadas automaticamente para ${activeNiche.name} com valores e rotina do seu nicho!`
                : 'As mensagens estão exibindo marcadores gerais como [Serviço/Produto] e [Valor].'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto shrink-0">
          {/* Quick Niche Switcher Dropdown */}
          <div className="relative">
            <select
              value={activeNiche.id}
              onChange={(e) => setNicheProfession(e.target.value)}
              className="bg-[#15231C] text-[#25D366] border border-[#25D366]/40 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#25D366] cursor-pointer"
              title="Trocar nicho imediatamente"
            >
              {PROFESSIONS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0E151B] text-white">
                  ⚡ {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setScreen('professions')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#16222B] hover:bg-[#1E2D38] text-slate-200 border border-[#273846] transition-colors"
          >
            Ver Detalhes do Nicho
          </button>
          <button
            onClick={toggleNicheAutomation}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              nicheAutomationActive
                ? 'bg-[#182620] hover:bg-[#20332B] text-[#25D366] border border-[#25D366]/40'
                : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
            }`}
          >
            {nicheAutomationActive ? 'Desativar Automação' : 'Ativar Modo Nicho ⚡'}
          </button>
        </div>
      </div>

      {/* Real Estate Specific Fast Track Banner */}
      {activeNiche.id === 'corretor-imoveis' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0F1E16] to-[#0A1218] border border-[#25D366]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-[#0A1014] flex items-center justify-center font-bold shrink-0">
              🏠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Central de Atendimento do Corretor de Imóveis</span>
                <span className="text-[10px] bg-[#172E21] text-[#25D366] px-2 py-0.5 rounded-full border border-[#25D366]/30 font-semibold">10 Situações</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Acesse as opções de mensagens organizadas para cada situação do atendimento imobiliário (filtro, qualificação financeira, objeções, agendamento de visitas, blindagem anti-no-show e proposta).
              </p>
            </div>
          </div>
          <button
            onClick={() => setScreen('professions')}
            className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] text-xs font-bold whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 transition-all shadow"
          >
            <span>Ver Opções por Situação</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Categories Cards Grid (Exatamente as 8 categorias solicitadas) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Categorias de Atendimento
          </span>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-[#25D366] hover:underline font-medium"
            >
              Ver todas as categorias
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategory === cat.id;
            const count = messages.filter((m) => m.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#15251C] border-[#25D366] shadow-lg shadow-[#25D366]/10 ring-1 ring-[#25D366]'
                    : 'bg-[#0E151B] border-[#1E2B35] hover:border-[#25D366]/50 hover:bg-[#121B22]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#25D366] text-[#0A1014]'
                          : 'bg-[#18232B] text-[#25D366] group-hover:bg-[#25D366]/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Unboxed clean metadata per design constitution */}
                    <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200">
                      {count} msgs
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold leading-tight ${
                      isSelected ? 'text-[#25D366]' : 'text-white group-hover:text-[#25D366]'
                    }`}
                  >
                    {cat.name}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Method Stage (As 6 Etapas do Método) */}
      <div className="p-4 rounded-2xl bg-[#0B1014] border border-[#1C2731] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span>Filtrar por Etapa do Método de Vendas:</span>
          </span>
          {stageFilter !== 'todas' && (
            <button
              onClick={() => setStageFilter('todas')}
              className="text-xs text-[#25D366] hover:underline"
            >
              Ver todas as etapas
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { stage: 'todas' as const, label: 'Todas as Etapas', count: messages.length },
            { stage: 1, label: '1. Atrair', count: messages.filter((m) => m.methodStage === 1).length },
            { stage: 2, label: '2. Entender', count: messages.filter((m) => m.methodStage === 2).length },
            { stage: 3, label: '3. Conectar', count: messages.filter((m) => m.methodStage === 3).length },
            { stage: 4, label: '4. Apresentar', count: messages.filter((m) => m.methodStage === 4).length },
            { stage: 5, label: '5. Contornar', count: messages.filter((m) => m.methodStage === 5).length },
            { stage: 6, label: '6. Fechar', count: messages.filter((m) => m.methodStage === 6).length },
          ].map((item) => {
            const isActive = stageFilter === item.stage;
            return (
              <button
                key={item.label}
                onClick={() => setStageFilter(item.stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#15251C] border-[#25D366] text-[#25D366] shadow-sm'
                    : 'bg-[#121A21] border-[#1F2C37] text-slate-400 hover:text-white hover:bg-[#16212B]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-slate-500">({item.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar for the Messages */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filtrar mensagens nesta categoria..."
            className="w-full bg-[#111921] border border-[#22303C] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
          />
        </div>

        {/* Tone Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Tom:
          </span>
          {tonesList.map((tone) => (
            <button
              key={tone}
              onClick={() => setToneFilter(tone)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                toneFilter === tone
                  ? 'bg-[#25D366] text-[#0A1014] font-bold'
                  : 'bg-[#141D25] text-slate-400 hover:text-white border border-[#23313D]'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Messages List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Mostrando <strong>{filteredMessages.length}</strong> roteiros encontrados
            {selectedCategory && (
              <>
                {' '}
                em <strong className="text-[#25D366]">{selectedCategory.replace('-', ' ')}</strong>
              </>
            )}
          </span>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0D1419] border border-[#1E2B35] space-y-3">
            <p className="text-base font-semibold text-slate-300">Nenhuma mensagem encontrada</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tente buscar por outro termo ou limpe os filtros de categoria e tom de voz.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedCategory(null);
                setToneFilter('todos');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#1C2731] hover:bg-[#253644] text-xs font-medium text-white transition-colors"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMessages.map((msg) => {
              const isFav = isFavorite(msg.id);
              const isCopied = copiedId === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => handleOpenDetail(msg)}
                  className="p-5 rounded-2xl bg-[#0E151B] border border-[#1E2B35] hover:border-[#25D366]/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-[#25D366] uppercase tracking-wider">
                        {msg.category.replace('-', ' ')} · Fase {msg.methodStage}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(msg.id);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-400"
                        title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                      {msg.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Situação: <span className="text-slate-300 italic">"{msg.situation}"</span>
                    </p>

                    {/* Speech card bubble snippet */}
                    <div className="mt-3 p-3.5 rounded-xl bg-[#090F13] border border-[#162027] text-xs sm:text-sm text-slate-200 leading-relaxed font-sans line-clamp-3">
                      "{msg.content}"
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#19242D] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">
                      Tom: <strong className="text-slate-300">{msg.tone}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openAdaptModal(msg);
                        }}
                        className="p-2 rounded-lg text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] text-xs font-medium flex items-center gap-1"
                        title="Adaptar variáveis"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#25D366]" />
                        <span className="hidden sm:inline">Adaptar</span>
                      </button>

                      <button
                        onClick={(e) => handleCopy(e, msg)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
        )}
      </div>
    </div>
  );
};
