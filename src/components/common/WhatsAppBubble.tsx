import React, { useState } from 'react';
import { Copy, Check, Star, SlidersHorizontal, Send, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WhatsAppBubbleProps {
  text: string;
  situation?: string;
  senderName?: string;
  isOutgoing?: boolean;
  time?: string;
  onAdapt?: () => void;
  messageId?: string;
  className?: string;
  showActions?: boolean;
}

export const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({
  text,
  situation,
  senderName = 'Você',
  isOutgoing = true,
  time = '10:42',
  onAdapt,
  messageId,
  className = '',
  showActions = true,
}) => {
  const { copyToClipboard, isFavorite, toggleFavorite } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFav = messageId ? isFavorite(messageId) : false;

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className={`rounded-2xl bg-[#0C1317] border border-[#1F2C34] p-4 sm:p-5 shadow-lg ${className}`}>
      {situation && (
        <div className="mb-3.5 pb-3 border-b border-[#1F2C34]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold text-[#25D366] uppercase tracking-wider">
              Situação da Venda
            </span>
            <p className="text-sm font-medium text-slate-200 mt-0.5">
              "{situation}"
            </p>
          </div>
          {messageId && (
            <button
              onClick={() => toggleFavorite(messageId)}
              className={`self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                isFav
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-[#182229] text-slate-400 hover:text-white border-[#2A3942]'
              }`}
              title={isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isFav ? 'Salva' : 'Favoritar'}</span>
            </button>
          )}
        </div>
      )}

      {/* Simulated WhatsApp Chat Viewport */}
      <div className="relative rounded-xl bg-[#0B141A] p-3.5 sm:p-4 border border-[#19242B] overflow-hidden">
        {/* Subtle WhatsApp wallpaper dots/grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
          style={{
            backgroundImage: `radial-gradient(circle, #25D366 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-[#8696A0] px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              Modelo Pronto para Disparo
            </span>
            <span>Prévia do chat</span>
          </div>

          {/* Outgoing Message Bubble */}
          <div className="self-end max-w-[94%] sm:max-w-[85%] bg-[#005C4B] text-[#E9EDEF] rounded-2xl rounded-tr-xs p-3.5 shadow-md relative group">
            <div className="text-[11px] font-medium text-[#25D366] mb-1">
              {senderName}
            </div>
            
            <p className="text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-line text-white/95">
              {text}
            </p>

            <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-[#8696A0] select-none">
              <span>{time}</span>
              <span className="text-[#53BDEB] font-bold text-[13px] leading-none tracking-tighter">✓✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action Bar */}
      {showActions && (
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
          <button
            onClick={handleCopy}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
              copied
                ? 'bg-[#15803D] text-white shadow-lg shadow-[#15803D]/25'
                : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] font-bold shadow-md shadow-[#25D366]/20 active:scale-[0.98]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Mensagem copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar mensagem</span>
              </>
            )}
          </button>

          {onAdapt && (
            <button
              onClick={onAdapt}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#182229] hover:bg-[#222E35] text-slate-200 text-sm font-medium border border-[#2A3942] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#25D366]" />
              <span>Adaptar</span>
            </button>
          )}

          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#111B21] hover:bg-[#1A252D] text-[#25D366] hover:text-[#32E877] text-sm font-medium border border-[#25D366]/30 transition-colors"
            title="Abrir WhatsApp com este texto"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Testar no WhatsApp</span>
            <span className="sm:hidden">Abrir</span>
          </button>
        </div>
      )}
    </div>
  );
};
