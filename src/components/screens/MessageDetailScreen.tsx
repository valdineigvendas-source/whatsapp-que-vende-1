import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MESSAGES } from '../../data/mockData';
import { WhatsAppBubble } from '../common/WhatsAppBubble';
import {
  ArrowLeft,
  Lightbulb,
  AlertOctagon,
  ArrowRightCircle,
  Share2,
  Bookmark,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const MessageDetailScreen: React.FC = () => {
  const {
    selectedMessageId,
    setScreen,
    trackMessageView,
    openAdaptModal,
    setSelectedMessageId,
    messages,
    nicheAutomationActive,
    activeNiche,
  } = useApp();

  const currentMessage =
    messages.find((m) => m.id === selectedMessageId) || messages[0];

  useEffect(() => {
    if (currentMessage) {
      trackMessageView(currentMessage.id);
    }
  }, [currentMessage]);

  const relatedMessages = messages.filter(
    (m) => m.category === currentMessage.category && m.id !== currentMessage.id
  ).slice(0, 3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Top Navigation Bar with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setScreen('library')}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#25D366]" />
          <span>Voltar para a biblioteca</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{currentMessage.category.replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-slate-300">Fase {currentMessage.methodStage} do Método</span>
        </div>
      </div>

      {/* Main Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1.5 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Roteiro de Alta Conversão</span>
          {nicheAutomationActive && (
            <span className="text-[10px] font-semibold bg-[#15251C] text-[#25D366] px-2 py-0.5 rounded-full border border-[#25D366]/40">
              ⚡ Adaptado para {activeNiche.shortName}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {currentMessage.title}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Situação identificada:{' '}
          <strong className="text-slate-200">"{currentMessage.situation}"</strong>
        </p>
      </div>

      {/* WhatsApp Speech Card (Card de Conversa) */}
      <WhatsAppBubble
        text={currentMessage.content}
        situation={currentMessage.situation}
        messageId={currentMessage.id}
        onAdapt={() => openAdaptModal(currentMessage)}
        time="10:42"
      />

      {/* Pedagogical Explanation Box (Explicação de Vendas) */}
      <div className="p-5 rounded-2xl bg-[#0E161D] border border-[#1E2B35] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Por que essa mensagem funciona? (Explicação Estratégica)</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {currentMessage.explanation}
        </p>

        {currentMessage.tips && currentMessage.tips.length > 0 && (
          <div className="pt-3 border-t border-[#1C2731] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Regras práticas para aplicar no WhatsApp:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentMessage.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* What NOT to Say (O que NÃO falar) & Next Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentMessage.doNotSay && (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>O que JAMAIS dizer nessa situação</span>
            </div>
            <p className="text-xs text-rose-200 leading-relaxed italic">
              "{currentMessage.doNotSay}"
            </p>
            <p className="text-[11px] text-rose-400/80 pt-1">
              Isso soa desesperado, mata a percepção de autoridade e afasta o cliente.
            </p>
          </div>
        )}

        {currentMessage.suggestedFollowUp && (
          <div className="p-4 rounded-xl bg-[#121E19] border border-[#25D366]/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#25D366] uppercase tracking-wider">
              <ArrowRightCircle className="w-4 h-4" />
              <span>Próximo passo na conversa</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentMessage.suggestedFollowUp}
            </p>
          </div>
        )}
      </div>

      {/* Related Messages in this Category */}
      {relatedMessages.length > 0 && (
        <div className="pt-4 border-t border-[#1B252E]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Outras respostas recomendadas para situações parecidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessageId(msg.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 rounded-xl bg-[#0F161C] border border-[#1E2B35] hover:border-[#25D366]/40 text-left transition-colors group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors line-clamp-1">
                    {msg.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    "{msg.situation}"
                  </p>
                </div>
                <span className="mt-2 text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                  Ver resposta <ChevronRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
