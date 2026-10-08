import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MESSAGES } from '../../data/mockData';
import { MessageItem } from '../../types';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  Star,
  SlidersHorizontal,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  X,
} from 'lucide-react';

export const SmartSearchScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedMessageId,
    setScreen,
    copyToClipboard,
    isFavorite,
    toggleFavorite,
    openAdaptModal,
    messages,
    nicheAutomationActive,
    activeNiche,
  } = useApp();

  const [inputVal, setInputVal] = useState(searchQuery || 'Cliente disse que está caro');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      setInputVal(searchQuery);
    }
  }, [searchQuery]);

  const quickSearchPills = [
    'Cliente disse que está caro',
    'Cliente sumiu após o preço',
    'Vou ver com meu esposo/sócio',
    'Achei mais barato com outro',
    'Pediu desconto',
    'Primeiro contato de anúncio',
    'Estou sem dinheiro agora',
    'Vou pensar e te chamo',
  ];

  // Smart search match logic over adapted messages
  const queryWords = inputVal.toLowerCase().split(' ').filter(Boolean);

  const matchedMessages = messages.map((msg) => {
    let score = 0;
    const fullText = `${msg.title} ${msg.situation} ${msg.content} ${msg.explanation} ${msg.category}`.toLowerCase();

    queryWords.forEach((word) => {
      if (word.length > 2 && fullText.includes(word)) {
        score += 1;
        if (msg.situation.toLowerCase().includes(word)) score += 2;
        if (msg.title.toLowerCase().includes(word)) score += 2;
      }
    });

    return { msg, score };
  })
    .filter((item) => (queryWords.length === 0 ? true : item.score > 0))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.msg);

  const topRecommended = matchedMessages.slice(0, 3);
  const relatedObjections = matchedMessages.slice(3, 7);

  const handleCopy = (e: React.MouseEvent, msg: MessageItem) => {
    e.stopPropagation();
    copyToClipboard(msg.content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenDetail = (msg: MessageItem) => {
    setSelectedMessageId(msg.id);
    setScreen('message-detail');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Localizador de Respostas em Segundos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Busca Inteligente de Vendas
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          O que o cliente acabou de mandar para você? Digite abaixo para ver a resposta recomendada.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Ex: 'Cliente disse que está caro', 'Cliente sumiu', 'Pediu desconto'..."
            className="w-full bg-[#111921] border border-[#22303C] rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 shadow-xl focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/40"
          />
          {inputVal && (
            <button
              onClick={() => {
                setInputVal('');
                setSearchQuery('');
              }}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick query pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="shrink-0 text-slate-500">Sugestões rápidas:</span>
          {quickSearchPills.map((pill) => (
            <button
              key={pill}
              onClick={() => {
                setInputVal(pill);
                setSearchQuery(pill);
              }}
              className={`shrink-0 px-3 py-1.5 rounded-lg border transition-colors ${
                inputVal === pill
                  ? 'bg-[#15251C] border-[#25D366] text-[#25D366] font-semibold'
                  : 'bg-[#121A22] border-[#202D39] text-slate-300 hover:text-white hover:bg-[#18232D]'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {matchedMessages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0E151B] border border-[#1E2B35] space-y-3">
          <p className="text-base font-semibold text-slate-300">Nenhum resultado para "{inputVal}"</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tente palavras mais genéricas como "preço", "caro", "sumiu", "fechamento" ou "contato".
          </p>
          <button
            onClick={() => setInputVal('Cliente disse que está caro')}
            className="mt-2 px-4 py-2 rounded-xl bg-[#17232D] hover:bg-[#202E3B] text-xs font-semibold text-[#25D366] transition-colors"
          >
            Ver exemplo: "Cliente disse que está caro"
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. Respostas Recomendadas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                1. Respostas Recomendadas para Enviar
              </h2>
              <span className="text-xs text-slate-500">
                {matchedMessages.length} opções encontradas
              </span>
            </div>

            <div className="space-y-3.5">
              {topRecommended.map((msg, idx) => {
                const isFav = isFavorite(msg.id);
                const isCopied = copiedId === msg.id;

                return (
                  <div
                    key={msg.id}
                    onClick={() => handleOpenDetail(msg)}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0E161C] border border-[#1E2B35] hover:border-[#25D366]/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#25D366]/20 text-[#25D366] text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                            {msg.title}
                          </span>
                        </div>
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

                      <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#172229] text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        "{msg.content}"
                      </div>
                    </div>

                    <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#18232A]">
                      <p className="text-xs text-slate-400">
                        💡 <strong>Por que enviar:</strong> {msg.explanation}
                      </p>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAdaptModal(msg);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] flex items-center gap-1"
                        >
                          <SlidersHorizontal className="w-3 h-3 text-[#25D366]" />
                          <span>Adaptar</span>
                        </button>

                        <button
                          onClick={(e) => handleCopy(e, msg)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm ${
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

          {/* 2. Objeções Relacionadas */}
          {relatedObjections.length > 0 && (
            <div className="pt-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                2. Objeções Relacionadas a Este Cenário
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedObjections.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleOpenDetail(msg)}
                    className="p-3.5 rounded-xl bg-[#0D1419] border border-[#1D2933] hover:border-amber-400/30 cursor-pointer transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        {msg.category.replace('-', ' ')}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 mt-1">
                        {msg.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        "{msg.situation}"
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#17222A]">
                      <span>Tom: {msg.tone}</span>
                      <span className="text-[#25D366] group-hover:underline flex items-center gap-0.5">
                        Ver resposta <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Próximos Passos e O que NÃO Fazer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#121E19] border border-[#25D366]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#25D366] uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>3. Próximos Passos Recomendados</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Aguarde 2 a 3 minutos antes de mandar para parecer humano.</li>
                <li>• Se for mandar áudio, seja objetivo e nunca passe de 45 segundos.</li>
                <li>• Caso o cliente não responda em 24h, use o Follow-up de Checagem.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>O que NÃO Fazer</span>
              </div>
              <ul className="text-xs text-rose-200/90 space-y-1.5">
                <li>• Não dê desconto imediato no desespero de fechar.</li>
                <li>• Não discorde do cliente chamando o outro serviço de "ruim".</li>
                <li>• Não envie ponto de interrogação ("?") se ele demorar a responder.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
