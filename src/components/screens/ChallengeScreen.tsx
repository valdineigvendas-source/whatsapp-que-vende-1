import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CHALLENGE_DAYS } from '../../data/mockData';
import {
  Trophy,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ChallengeScreen: React.FC = () => {
  const {
    completedDays,
    toggleDayCompletion,
    copyToClipboard,
    activeNiche,
    nicheAutomationActive,
    user,
  } = useApp();
  const [expandedDay, setExpandedDay] = useState<number>(3); // open day 3 by default
  const [copiedDay, setCopiedDay] = useState<number | null>(null);

  const progressPercent = Math.round((completedDays.length / 7) * 100);

  const getAdaptedDailyMessage = (text: string) => {
    if (!nicheAutomationActive) return text;
    let res = text;
    res = res.replace(/\[Serviço\]/g, activeNiche.serviceShort);
    res = res.replace(/\[Seu Nome\]/g, user?.name?.split(' ')[0] || 'Carlos');
    res = res.replace(/\[Problema\/Serviço\]/g, activeNiche.serviceShort);
    res = res.replace(/\[Benefício 1\]/g, activeNiche.typicalBenefit);
    res = res.replace(/\[Benefício 2\]/g, activeNiche.mainDifferentiator);
    res = res.replace(/\[Garantia\]/g, 'garantia total de entrega');
    res = res.replace(/\[X parcelas de Y\]/g, activeNiche.typicalInstallment);
    return res;
  };

  const handleCopy = (text: string, day: number) => {
    const finalMsg = getAdaptedDailyMessage(text);
    copyToClipboard(finalMsg, `Mensagem da Missão do Dia ${day} copiada! 🔥`);
    setCopiedDay(day);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>Área Gamificada de Execução</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Desafio WhatsApp que Vende
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          7 dias de missões práticas para transformar o seu atendimento e acelerar seus fechamentos no WhatsApp.
        </p>
      </div>

      {/* Gamification Progress Hero Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#121E19] via-[#0E151B] to-[#0A1014] border border-[#25D366]/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
                  Seu Progresso no Desafio
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {completedDays.length} Dias Feitos
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {completedDays.length === 7
                  ? '🎉 Parabéns! Você concluiu todos os 7 dias do método!'
                  : `${completedDays.length} de 7 etapas concluídas`}
              </h2>
            </div>
          </div>

          <div className="text-right self-end sm:self-auto">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#25D366]">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#18232B] rounded-full h-2.5 overflow-hidden p-0.5 border border-[#253542]">
          <div
            className="bg-gradient-to-r from-[#25D366] to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Day Pills Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 text-center">
          {CHALLENGE_DAYS.map((cd) => {
            const isDone = completedDays.includes(cd.day);
            const isCurrent = expandedDay === cd.day;

            return (
              <button
                key={cd.day}
                onClick={() => setExpandedDay(cd.day)}
                className={`p-2 rounded-xl border text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                  isDone
                    ? 'bg-[#15251C] border-[#25D366]/50 text-[#25D366]'
                    : isCurrent
                    ? 'bg-[#18222A] border-white/30 text-white'
                    : 'bg-[#0E151A] border-[#1D2832] text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] font-mono font-semibold">D{cd.day}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Days List (Accordion Cards) */}
      <div className="space-y-3.5">
        {CHALLENGE_DAYS.map((item) => {
          const isDone = completedDays.includes(item.day);
          const isExpanded = expandedDay === item.day;
          const isCopied = copiedDay === item.day;

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isDone
                  ? 'bg-[#0B1317] border-[#1E2E25]'
                  : isExpanded
                  ? 'bg-[#0E151B] border-[#25D366]/40 shadow-lg'
                  : 'bg-[#0E151B] border-[#1E2B35] hover:border-[#253542]'
              }`}
            >
              {/* Day Header Trigger */}
              <div
                onClick={() => setExpandedDay(isExpanded ? 0 : item.day)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDayCompletion(item.day);
                    }}
                    className={`p-1 rounded-lg transition-transform hover:scale-110 ${
                      isDone ? 'text-[#25D366]' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={isDone ? 'Marcar como não feito' : 'Marcar como concluído'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-[#25D366]/20" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#25D366]">
                        DIA {item.day}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {item.stageName}
                      </span>
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`hidden sm:inline text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                      isDone
                        ? 'bg-[#15251C] text-[#25D366] border-[#25D366]/30'
                        : 'bg-[#141C24] text-slate-400 border-[#23313D]'
                    }`}
                  >
                    {isDone ? 'Concluído' : 'Pendente'}
                  </span>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#18232B] text-xs sm:text-sm">
                  {/* Objective & Mission */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Objetivo do Dia
                      </span>
                      <p className="text-slate-200">{item.objective}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B]">
                      <span className="text-[10px] uppercase font-bold text-[#25D366] block mb-1">
                        Sua Missão Prática
                      </span>
                      <p className="text-slate-200">{item.task}</p>
                    </div>
                  </div>

                  {/* Ready Message for the day */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Mensagem Pronta para Executar Hoje:
                    </span>
                    <div className="p-3.5 rounded-xl bg-[#005C4B] text-white leading-relaxed shadow relative">
                      <p className="whitespace-pre-line text-xs sm:text-sm">{getAdaptedDailyMessage(item.readyMessage)}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-white/70">
                        <span>11:15</span>
                        <span className="text-[#53BDEB] font-bold">✓✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Pro Tip and Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-slate-400 italic">
                      💡 <strong>Dica Pro:</strong> {item.proTip}
                    </p>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => handleCopy(item.readyMessage, item.day)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiada!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Roteiro do Dia</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => toggleDayCompletion(item.day)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                          isDone
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-[#15251C] text-[#25D366] border-[#25D366]/40 hover:bg-[#1A2D22]'
                        }`}
                      >
                        {isDone ? 'Desmarcar' : 'Marcar como Feito ✓'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
