import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MESSAGES } from '../../data/mockData';
import { MessageItem } from '../../types';
import {
  Star,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  Search,
  BookOpen,
} from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    setSelectedMessageId,
    setScreen,
    copyToClipboard,
    openAdaptModal,
    messages,
    activeNiche,
    nicheAutomationActive,
  } = useApp();

  const [filterText, setFilterText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const favoriteMessages = messages.filter((msg) => favorites.includes(msg.id));

  const filteredFavorites = favoriteMessages.filter((msg) => {
    if (!filterText) return true;
    const term = filterText.toLowerCase();
    return (
      msg.title.toLowerCase().includes(term) ||
      msg.situation.toLowerCase().includes(term) ||
      msg.content.toLowerCase().includes(term)
    );
  });

  const handleCopy = (e: React.MouseEvent, msg: MessageItem) => {
    e.stopPropagation();
    copyToClipboard(msg.content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpen = (msg: MessageItem) => {
    setSelectedMessageId(msg.id);
    setScreen('message-detail');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Seu Arsenal Pessoal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mensagens Favoritas
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Acesso ultra rápido aos roteiros que você mais utiliza no seu dia a dia.
          </p>
        </div>

        {/* Count */}
        <span className="self-start sm:self-auto text-xs font-mono px-3 py-1.5 rounded-xl bg-[#141E26] border border-[#23313D] text-slate-300">
          <strong>{favorites.length}</strong> salvas
        </span>
      </div>

      {/* Search within favorites */}
      {favoriteMessages.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Pesquisar entre suas mensagens favoritas..."
            className="w-full bg-[#111921] border border-[#22303C] rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
          />
        </div>
      )}

      {/* Empty State */}
      {favoriteMessages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0E151B] border border-[#1E2B35] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto">
            <Star className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Nenhum favorito salvo ainda</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Ao navegar pela biblioteca ou dashboard, clique na estrelinha de qualquer mensagem para guardá-la aqui para acesso imediato.
            </p>
          </div>
          <button
            onClick={() => setScreen('library')}
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] text-xs font-bold transition-colors inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explorar Biblioteca de Mensagens</span>
          </button>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-[#0E151B] border border-[#1E2B35]">
          <p className="text-sm text-slate-300">Nenhum favorito encontrado para "{filterText}"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFavorites.map((msg) => {
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                onClick={() => handleOpen(msg)}
                className="p-5 rounded-2xl bg-[#0E151B] border border-[#1E2B35] hover:border-[#25D366]/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-[#25D366] uppercase tracking-wider">
                      {msg.category.replace('-', ' ')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(msg.id);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                    {msg.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Situação: <span className="text-slate-300 italic">"{msg.situation}"</span>
                  </p>

                  <div className="mt-3 p-3.5 rounded-xl bg-[#090F13] border border-[#172229] text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    "{msg.content}"
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#19242D] flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">
                    💡 {msg.explanation.slice(0, 40)}...
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAdaptModal(msg);
                      }}
                      className="p-2 rounded-lg text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] text-xs font-medium flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#25D366]" />
                      <span className="hidden sm:inline">Adaptar</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(msg);
                      }}
                      className="p-2 rounded-lg text-slate-300 bg-[#162028] hover:bg-[#1E2B36] border border-[#243340] text-xs font-medium flex items-center gap-1"
                      title="Abrir detalhes"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Abrir</span>
                    </button>

                    <button
                      onClick={(e) => handleCopy(e, msg)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
  );
};
