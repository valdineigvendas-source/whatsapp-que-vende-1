import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROFESSIONS } from '../../data/mockData';
import { ProfessionNiche, MessageItem, AttendanceSituation, AttendanceOption } from '../../types';
import {
  Scissors,
  Smile,
  Sparkles,
  Heart,
  Dumbbell,
  Camera,
  Zap,
  Scale,
  Calculator,
  Home,
  Palette,
  Wrench,
  ShoppingBag,
  Briefcase,
  Copy,
  Check,
  SlidersHorizontal,
  ChevronRight,
  DollarSign,
  AlertCircle,
  Search,
  Filter,
  Layers,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles as SparklesIcon,
} from 'lucide-react';

export const ProfessionsScreen: React.FC = () => {
  const {
    selectedProfessionId,
    setSelectedProfessionId,
    copyToClipboard,
    openAdaptModal,
    user,
    setNicheProfession,
    nicheAutomationActive,
    setScreen,
  } = useApp();

  const [activeProfId, setActiveProfId] = useState<string>(
    selectedProfessionId || 'corretor-imoveis'
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedOptionId, setCopiedOptionId] = useState<string | null>(null);

  // Situation filters for professions with attendance situations (e.g. Corretor de Imóveis)
  const [selectedSituationNumber, setSelectedSituationNumber] = useState<number | 'all'>('all');
  const [pillarFilter, setPillarFilter] = useState<'all' | string>('all');
  const [situationSearch, setSituationSearch] = useState<string>('');
  const [activeViewMode, setActiveViewMode] = useState<'situations' | 'sample'>('situations');

  const getProfessionIcon = (id: string) => {
    switch (id) {
      case 'barbeiro':
        return Scissors;
      case 'dentista':
        return Smile;
      case 'manicure':
        return Sparkles;
      case 'esteticista':
        return Heart;
      case 'personal-trainer':
        return Dumbbell;
      case 'fotografo':
        return Camera;
      case 'eletricista':
        return Zap;
      case 'advogado':
        return Scale;
      case 'contador':
        return Calculator;
      case 'corretor-imoveis':
        return Home;
      case 'designer':
        return Palette;
      case 'mecanico':
        return Wrench;
      case 'loja':
        return ShoppingBag;
      case 'outros-servicos':
      default:
        return Briefcase;
    }
  };

  const currentProfession =
    PROFESSIONS.find((p) => p.id === activeProfId) || PROFESSIONS[0];

  const handleCopySample = (text: string, idx: number) => {
    copyToClipboard(text, 'Mensagem copiada para a área de transferência!');
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2200);
  };

  const handleCopyOption = (text: string, optId: string) => {
    copyToClipboard(text, 'Opção de mensagem copiada com sucesso!');
    setCopiedOptionId(optId);
    setTimeout(() => setCopiedOptionId(null), 2200);
  };

  const handleSetPrimary = () => {
    setNicheProfession(currentProfession.id);
  };

  const isUserProfession =
    user?.profession === currentProfession.name || selectedProfessionId === currentProfession.id;

  const hasAttendanceSituations =
    Boolean(currentProfession.attendanceSituations && currentProfession.attendanceSituations.length > 0);

  // Filter attendance situations
  const filteredSituations = (currentProfession.attendanceSituations || []).filter((sit) => {
    const matchesNumber =
      selectedSituationNumber === 'all' || sit.number === selectedSituationNumber;
    const matchesPillar =
      pillarFilter === 'all' || sit.faoPillar.includes(pillarFilter);
    const matchesSearch =
      situationSearch.trim() === '' ||
      sit.title.toLowerCase().includes(situationSearch.toLowerCase()) ||
      sit.description.toLowerCase().includes(situationSearch.toLowerCase()) ||
      sit.options.some(
        (opt) =>
          opt.title.toLowerCase().includes(situationSearch.toLowerCase()) ||
          opt.text.toLowerCase().includes(situationSearch.toLowerCase()) ||
          opt.whenToUse.toLowerCase().includes(situationSearch.toLowerCase())
      );

    return matchesNumber && matchesPillar && matchesSearch;
  });

  const getToneBadgeClass = (tone: string) => {
    switch (tone) {
      case 'Consultivo':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30';
      case 'Persuasivo':
        return 'bg-violet-950/70 text-violet-300 border-violet-500/30';
      case 'Empático':
        return 'bg-sky-950/70 text-sky-300 border-sky-500/30';
      case 'Direto':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getPillarBadgeClass = (pillar?: string) => {
    if (!pillar) return 'bg-slate-800 text-slate-300 border-slate-700';
    if (pillar.includes('Filtro')) {
      return 'bg-blue-950/70 text-blue-300 border-blue-500/30';
    }
    if (pillar.includes('Alinhamento')) {
      return 'bg-teal-950/70 text-teal-300 border-teal-500/30';
    }
    return 'bg-emerald-950/70 text-[#25D366] border-[#25D366]/40';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Modelos Especializados por Nicho</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Roteiros por Profissão
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          Mensagens criadas sob medida para o vocabulário, dores e objeções reais da sua área de atuação.
        </p>
      </div>

      {/* Grid of the 14 Requested Professions */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">
          Selecione a sua profissão ou área:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {PROFESSIONS.map((prof) => {
            const Icon = getProfessionIcon(prof.id);
            const isSelected = prof.id === activeProfId;

            return (
              <button
                key={prof.id}
                onClick={() => {
                  setActiveProfId(prof.id);
                  setNicheProfession(prof.id);
                  setSelectedSituationNumber('all');
                  setSituationSearch('');
                }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                  isSelected
                    ? 'bg-[#15251C] border-[#25D366] text-[#25D366] shadow-md ring-1 ring-[#25D366]'
                    : 'bg-[#0E151B] border-[#1E2B35] text-slate-300 hover:text-white hover:bg-[#131B22]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#25D366] text-[#0A1014]'
                      : 'bg-[#17222B] text-slate-400 group-hover:text-[#25D366]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {prof.name.split(' / ')[0]}
                </span>
                {prof.attendanceSituations && prof.attendanceSituations.length > 0 && (
                  <span className="text-[9px] font-semibold text-[#25D366] bg-[#12231A] px-1.5 py-0.5 rounded-full border border-[#25D366]/30">
                    10 Situações
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Profession Active Panel */}
      <div className="bg-[#0E151B] border border-[#1E2B35] rounded-2xl p-5 sm:p-7 space-y-6">
        {/* Niche Summary Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1A252E]">
          <div className="flex items-center gap-3.5">
            {React.createElement(getProfessionIcon(currentProfession.id), {
              className: 'w-8 h-8 text-[#25D366]',
            })}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {currentProfession.name}
                </h2>
                {isUserProfession && (
                  <span className="text-[11px] font-semibold text-[#25D366] bg-[#15251C] px-2 py-0.5 rounded-full border border-[#25D366]/40">
                    Sua área ativa
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentProfession.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {isUserProfession && nicheAutomationActive ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#25D366] bg-[#122218] px-3 py-2 rounded-xl border border-[#25D366]/40 flex items-center gap-1.5">
                  <span>⚡ Automação Ativa em Todo o App</span>
                </span>
                <button
                  onClick={() => setScreen('library')}
                  className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Ver na Biblioteca</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSetPrimary}
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-[#25D366]/20 active:scale-[0.98]"
              >
                <span>⚡ Ativar Automação para {currentProfession.name.split(' / ')[0]}</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Intel Banner (Ticket Médio & Objeção Comum) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B] flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-[#25D366] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Faixa Típica de Ticket
              </span>
              <span className="font-mono text-slate-200 font-semibold">
                {currentProfession.typicalTicket}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B] flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Maior Objeção Neste Nicho
              </span>
              <span className="text-slate-200 italic font-medium">
                {currentProfession.commonObjection}
              </span>
            </div>
          </div>
        </div>

        {/* SPECIALIZED ATTENDANCE SITUATIONS (Available for Corretor de Imóveis) */}
        {hasAttendanceSituations ? (
          <div className="space-y-6 pt-2">
            {/* View Selector Tabs (Situations vs Quick Models) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A252E] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider bg-[#13241A] px-2.5 py-0.5 rounded-md border border-[#25D366]/40">
                    Central de Atendimento Imobiliário
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    • 10 Situações com Múltiplas Opções
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Opções de Mensagens por Situação de Atendimento
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Não utilize um script rígido. Selecione a situação exata em que o cliente se encontra e escolha a opção de mensagem ideal para o seu momento.
                </p>
              </div>

              <div className="flex items-center bg-[#090F13] p-1 rounded-xl border border-[#1F2E3A] self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setActiveViewMode('situations')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === 'situations'
                      ? 'bg-[#25D366] text-[#0A1014] shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Opções por Situação ({currentProfession.attendanceSituations?.length || 10})
                </button>
                <button
                  onClick={() => setActiveViewMode('sample')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === 'sample'
                      ? 'bg-[#25D366] text-[#0A1014] shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Modelos Rápidos ({currentProfession.sampleMessages.length})
                </button>
              </div>
            </div>

            {activeViewMode === 'situations' ? (
              <div className="space-y-5">
                {/* Search & Pillar Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por situação, objeção, dúvida ou mensagem..."
                      value={situationSearch}
                      onChange={(e) => setSituationSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#090F13] border border-[#1E2B35] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                    {situationSearch && (
                      <button
                        onClick={() => setSituationSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Pillar Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <span className="text-[11px] text-slate-500 font-semibold px-1 shrink-0">
                      Pilar:
                    </span>
                    <button
                      onClick={() => setPillarFilter('all')}
                      className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                        pillarFilter === 'all'
                          ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-bold'
                          : 'bg-[#090F13] text-slate-400 hover:text-slate-200 border border-[#1E2B35]'
                      }`}
                    >
                      Todos os Pilares
                    </button>
                    <button
                      onClick={() => setPillarFilter('Filtro')}
                      className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                        pillarFilter === 'Filtro'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                          : 'bg-[#090F13] text-slate-400 hover:text-slate-200 border border-[#1E2B35]'
                      }`}
                    >
                      Filtro (F)
                    </button>
                    <button
                      onClick={() => setPillarFilter('Alinhamento')}
                      className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                        pillarFilter === 'Alinhamento'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                          : 'bg-[#090F13] text-slate-400 hover:text-slate-200 border border-[#1E2B35]'
                      }`}
                    >
                      Alinhamento (A)
                    </button>
                    <button
                      onClick={() => setPillarFilter('Objeção')}
                      className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                        pillarFilter === 'Objeção'
                          ? 'bg-emerald-500/20 text-[#25D366] border border-[#25D366]/40 font-bold'
                          : 'bg-[#090F13] text-slate-400 hover:text-slate-200 border border-[#1E2B35]'
                      }`}
                    >
                      Objeção & Agendamento (O)
                    </button>
                  </div>
                </div>

                {/* Quick Situation Pills (1 to 10) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-0.5">
                    <span>Situações de Atendimento:</span>
                    {selectedSituationNumber !== 'all' && (
                      <button
                        onClick={() => setSelectedSituationNumber('all')}
                        className="text-[#25D366] hover:underline"
                      >
                        Ver todas as 10 situações
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    <button
                      onClick={() => setSelectedSituationNumber('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                        selectedSituationNumber === 'all'
                          ? 'bg-[#1A3324] text-[#25D366] border border-[#25D366]/50'
                          : 'bg-[#090F13] text-slate-400 hover:text-slate-300 border border-[#18232B]'
                      }`}
                    >
                      Todas as 10
                    </button>
                    {(currentProfession.attendanceSituations || []).map((sit) => {
                      const isSitActive = selectedSituationNumber === sit.number;
                      return (
                        <button
                          key={sit.id}
                          onClick={() => setSelectedSituationNumber(sit.number)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                            isSitActive
                              ? 'bg-[#1A3324] text-[#25D366] border border-[#25D366]/50 font-bold'
                              : 'bg-[#090F13] text-slate-400 hover:text-slate-200 border border-[#18232B]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                              isSitActive
                                ? 'bg-[#25D366] text-[#0A1014]'
                                : 'bg-[#19242D] text-slate-400'
                            }`}
                          >
                            {sit.number}
                          </span>
                          <span>{sit.stageName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* List of Situations with Message Options */}
                {filteredSituations.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-[#090F13] border border-[#18232B] space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <h4 className="text-sm font-bold text-white">Nenhuma situação encontrada</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Não encontramos nenhuma situação ou mensagem com o termo "{situationSearch}". Tente buscar por "preço", "visita", "no-show", "condomínio" ou limpe os filtros.
                    </p>
                    <button
                      onClick={() => {
                        setSituationSearch('');
                        setPillarFilter('all');
                        setSelectedSituationNumber('all');
                      }}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#18252E] text-xs font-bold text-[#25D366] hover:bg-[#20313E] transition-colors"
                    >
                      Limpar todos os filtros
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredSituations.map((sit) => (
                      <div
                        key={sit.id}
                        className="rounded-2xl bg-[#0A1014] border border-[#1B2832] overflow-hidden shadow-lg"
                      >
                        {/* Situation Card Header */}
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0E161C] via-[#0E171E] to-[#0A1014] border-b border-[#18232B]">
                          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-[#25D366] text-[#0A1014] text-xs font-black flex items-center justify-center shadow">
                                {sit.number}
                              </span>
                              <span className="text-xs font-bold text-slate-300">
                                {sit.stageName}
                              </span>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getPillarBadgeClass(
                                sit.faoPillar
                              )}`}
                            >
                              {sit.faoPillar}
                            </span>
                          </div>

                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {sit.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                            <span className="text-[#25D366] font-bold shrink-0">📍 Situação:</span>
                            <span>{sit.description}</span>
                          </p>
                        </div>

                        {/* Message Options for this Situation */}
                        <div className="p-4 sm:p-5 space-y-5 bg-[#080D11]">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Opções de mensagens para esta situação ({sit.options.length} alternativas):
                            </span>
                            <span className="text-[11px] text-slate-500 italic hidden sm:inline">
                              Escolha a que melhor se encaixa com o seu cliente
                            </span>
                          </div>

                          <div className="space-y-4">
                            {sit.options.map((opt, optIdx) => {
                              const isOptionCopied = copiedOptionId === opt.id;

                              // Construct pseudo message for personalizing modal
                              const pseudoMsg: MessageItem = {
                                id: `fao-${sit.id}-${opt.id}`,
                                title: opt.title,
                                situation: `${sit.title} • ${opt.whenToUse}`,
                                content: opt.text,
                                explanation: opt.whyItWorks,
                                category: 'primeiro-contato',
                                methodStage: (sit.number <= 3 ? 1 : sit.number <= 6 ? 2 : 3) as any,
                                tone: opt.tone as any,
                                viewsCount: 1500,
                              };

                              return (
                                <div
                                  key={opt.id}
                                  className="p-4 sm:p-5 rounded-xl bg-[#0D151B] border border-[#19252E] hover:border-[#223340] transition-all space-y-3.5 group"
                                >
                                  {/* Option Header */}
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                                        {opt.title}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getToneBadgeClass(
                                        opt.tone
                                      )}`}
                                    >
                                      Tom: {opt.tone}
                                    </span>
                                  </div>

                                  {/* WhatsApp Simulated Speech Bubble */}
                                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#005C4B] text-white text-xs sm:text-sm leading-relaxed shadow-md relative select-text">
                                    <p className="whitespace-pre-line font-normal">{opt.text}</p>
                                    <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-white/70 select-none">
                                      <span>11:15</span>
                                      <span className="text-[#53BDEB] font-bold">✓✓</span>
                                    </div>
                                  </div>

                                  {/* Contextual Intelligence (Quando usar & Por que funciona) */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-[#070B0E] p-3 rounded-lg border border-[#152028]">
                                    <div>
                                      <span className="font-bold text-slate-300 block mb-0.5">
                                        🎯 Quando usar esta opção:
                                      </span>
                                      <span className="text-slate-400">{opt.whenToUse}</span>
                                    </div>
                                    <div>
                                      <span className="font-bold text-slate-300 block mb-0.5">
                                        💡 Por que funciona (Gatilho):
                                      </span>
                                      <span className="text-slate-400">{opt.whyItWorks}</span>
                                    </div>
                                  </div>

                                  {/* Actions: Personalize & Copy */}
                                  <div className="flex items-center justify-end gap-2 pt-1">
                                    <button
                                      onClick={() => openAdaptModal(pseudoMsg)}
                                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#141F27] hover:bg-[#1B2934] border border-[#22313D] flex items-center gap-1.5 transition-colors"
                                    >
                                      <SlidersHorizontal className="w-3 h-3 text-[#25D366]" />
                                      <span>Personalizar</span>
                                    </button>

                                    <button
                                      onClick={() => handleCopyOption(opt.text, opt.id)}
                                      className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                                        isOptionCopied
                                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                                          : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] active:scale-[0.98]'
                                      }`}
                                    >
                                      {isOptionCopied ? (
                                        <>
                                          <Check className="w-3.5 h-3.5" />
                                          <span>Opção copiada!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span>Copiar esta opção</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Sample Messages View (Quick Models) */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Modelos Rápidos Adaptados para {currentProfession.name}
                  </h3>
                  <button
                    onClick={() => setActiveViewMode('situations')}
                    className="text-xs text-[#25D366] hover:underline font-semibold"
                  >
                    ← Voltar para as 10 Situações de Atendimento
                  </button>
                </div>

                <div className="space-y-4">
                  {currentProfession.sampleMessages.map((sample, idx) => {
                    const isCopied = copiedIndex === idx;

                    const pseudoMsg: MessageItem = {
                      id: `prof-${currentProfession.id}-${idx}`,
                      title: sample.title,
                      situation: sample.situation,
                      content: sample.text,
                      explanation: sample.tip,
                      category: 'primeiro-contato',
                      methodStage: 1,
                      tone: 'Consultivo',
                      viewsCount: 1000,
                    };

                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0A1014] border border-[#18232B] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white">{sample.title}</h4>
                            <p className="text-xs text-slate-400">
                              Quando usar: <span className="text-slate-300 italic">"{sample.situation}"</span>
                            </p>
                          </div>
                        </div>

                        {/* Simulated WhatsApp Speech Bubble */}
                        <div className="p-3.5 rounded-xl bg-[#005C4B] text-white text-xs sm:text-sm leading-relaxed shadow relative">
                          <p className="whitespace-pre-line">{sample.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-white/70">
                            <span>10:48</span>
                            <span className="text-[#53BDEB] font-bold">✓✓</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                          <span className="text-slate-400">
                            💡 <strong>Dica prática:</strong> {sample.tip}
                          </span>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => openAdaptModal(pseudoMsg)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] flex items-center gap-1"
                            >
                              <SlidersHorizontal className="w-3 h-3 text-[#25D366]" />
                              <span>Personalizar</span>
                            </button>

                            <button
                              onClick={() => handleCopySample(sample.text, idx)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copiado!</span>
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
            )}
          </div>
        ) : (
          /* Standard Professions view for professions without specialized attendance situations */
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Modelos de Mensagem Adaptados para {currentProfession.name}
            </h3>

            <div className="space-y-4">
              {currentProfession.sampleMessages.map((sample, idx) => {
                const isCopied = copiedIndex === idx;

                const pseudoMsg: MessageItem = {
                  id: `prof-${currentProfession.id}-${idx}`,
                  title: sample.title,
                  situation: sample.situation,
                  content: sample.text,
                  explanation: sample.tip,
                  category: 'primeiro-contato',
                  methodStage: 1,
                  tone: 'Consultivo',
                  viewsCount: 1000,
                };

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0A1014] border border-[#18232B] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{sample.title}</h4>
                        <p className="text-xs text-slate-400">
                          Quando usar: <span className="text-slate-300 italic">"{sample.situation}"</span>
                        </p>
                      </div>
                    </div>

                    {/* Simulated WhatsApp Speech Bubble */}
                    <div className="p-3.5 rounded-xl bg-[#005C4B] text-white text-xs sm:text-sm leading-relaxed shadow relative">
                      <p className="whitespace-pre-line">{sample.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-white/70">
                        <span>10:48</span>
                        <span className="text-[#53BDEB] font-bold">✓✓</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                      <span className="text-slate-400">
                        💡 <strong>Dica prática:</strong> {sample.tip}
                      </span>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => openAdaptModal(pseudoMsg)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] flex items-center gap-1"
                        >
                          <SlidersHorizontal className="w-3 h-3 text-[#25D366]" />
                          <span>Personalizar</span>
                        </button>

                        <button
                          onClick={() => handleCopySample(sample.text, idx)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copiado!</span>
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
        )}
      </div>
    </div>
  );
};
