import React from 'react';
import { useApp } from '../../context/AppContext';
import { METHOD_STAGES, MESSAGES } from '../../data/mockData';
import { MethodStageInfo } from '../../types';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle,
  HelpCircle,
  Link,
  Presentation,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

export const MethodScreen: React.FC = () => {
  const {
    setSelectedCategory,
    setScreen,
    setSelectedMessageId,
    messages,
    activeNiche,
    nicheAutomationActive,
  } = useApp();

  const handleStageExplore = (stage: MethodStageInfo) => {
    setSelectedCategory(stage.relatedCategory);
    setScreen('library');
  };

  const getStageIcon = (stageNum: number) => {
    switch (stageNum) {
      case 1:
        return Sparkles;
      case 2:
        return HelpCircle;
      case 3:
        return Link;
      case 4:
        return Presentation;
      case 5:
        return ShieldCheck;
      case 6:
        return CheckCheck;
      default:
        return Target;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Metodologia Validada</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          O Método em 6 Etapas
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400 max-w-2xl">
          Vender no WhatsApp não é insistir nem mandar catálogo em PDF. É guiar o cliente passo a passo por 6 momentos psicológicos fundamentais.
        </p>
      </div>

      {/* Visual Funnel / Roadmap of the 6 Stages */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3 rounded-2xl bg-[#0C1217] border border-[#1C2731]">
        {METHOD_STAGES.map((stg) => {
          const Icon = getStageIcon(stg.number);
          const stageCount = messages.filter((m) => m.methodStage === stg.number).length;
          return (
            <button
              key={stg.number}
              onClick={() => handleStageExplore(stg)}
              className="p-3 rounded-xl bg-[#111A22] hover:bg-[#18242F] border border-[#202E3B] hover:border-[#25D366]/40 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[#25D366]">
                  0{stg.number}.
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#25D366]" />
                  <span className="text-xs font-bold text-white group-hover:text-[#25D366] truncate">
                    {stg.name}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 font-mono">
                {stageCount} mensagens
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Cards (6 Cards) */}
      <div className="space-y-4">
        {METHOD_STAGES.map((stage) => {
          const Icon = getStageIcon(stage.number);
          const stageMessages = messages.filter((m) => m.methodStage === stage.number);
          const sampleMessages = stageMessages.slice(0, 2);

          return (
            <div
              key={stage.number}
              className="p-5 sm:p-6 rounded-2xl bg-[#0E151B] border border-[#1E2B35] hover:border-[#25D366]/30 transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
            >
              {/* Left Column: Stage Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#15251C] border border-[#25D366]/30 text-[#25D366] flex items-center justify-center font-bold text-sm shrink-0">
                    0{stage.number}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{stage.name}</span>
                      <span className="text-xs text-slate-400 font-normal">· {stage.subtitle}</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#090F13] border border-[#18232B]">
                    <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider block mb-0.5">
                      Objetivo desta etapa
                    </span>
                    <span className="text-slate-300">{stage.objective}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#090F13] border border-[#18232B]">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      Regra de ouro no WhatsApp
                    </span>
                    <span className="text-slate-300">{stage.keyRule}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Sample & Direct Action */}
              <div className="lg:w-80 shrink-0 flex flex-col justify-between gap-3 bg-[#0A1014] p-4 rounded-xl border border-[#182229]">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">Roteiro em destaque:</span>
                    <span className="text-[11px] font-mono text-[#25D366]">
                      {stageMessages.length} modelos
                    </span>
                  </div>
                  {sampleMessages[0] ? (
                    <div
                      onClick={() => {
                        setSelectedMessageId(sampleMessages[0].id);
                        setScreen('message-detail');
                      }}
                      className="p-2.5 rounded-lg bg-[#111921] hover:bg-[#16212B] border border-[#1F2C37] cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-white line-clamp-1">
                        {sampleMessages[0].title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 italic">
                        "{sampleMessages[0].content}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Roteiros prontos para uso.</p>
                  )}
                </div>

                <button
                  onClick={() => handleStageExplore(stage)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#141F1A] hover:bg-[#1C2C24] text-[#25D366] border border-[#25D366]/30 text-xs font-bold transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Explorar mensagens de {stage.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
