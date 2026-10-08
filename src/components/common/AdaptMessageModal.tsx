import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MessageItem } from '../../types';

interface AdaptMessageModalProps {
  message: MessageItem;
  onClose: () => void;
}

export const AdaptMessageModal: React.FC<AdaptMessageModalProps> = ({ message, onClose }) => {
  const { copyToClipboard, user, activeNiche } = useApp();

  // Identified variables automatically pre-filled from active niche
  const [clientName, setClientName] = useState('Mariana');
  const [productService, setProductService] = useState(
    activeNiche?.serviceName || 'Atendimento Especializado'
  );
  const [price, setPrice] = useState(activeNiche?.typicalTicket || 'R$ 150,00');
  const [optionOne, setOptionOne] = useState(activeNiche?.optionOne || 'quinta às 16h');
  const [optionTwo, setOptionTwo] = useState(activeNiche?.optionTwo || 'sexta às 10h');
  const [yourName, setYourName] = useState(user?.name ? user.name.split(' ')[0] : 'Carlos');
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate adapted text
  const generateAdapted = () => {
    let result = message.content;
    result = result.replace(/\[Nome\]/g, clientName || '[Nome]');
    result = result.replace(/\[Seu Nome\]/g, yourName || '[Seu Nome]');
    result = result.replace(/\[Serviço\/Produto\]/g, productService || '[Serviço]');
    result = result.replace(/\[Serviço\]/g, productService || '[Serviço]');
    result = result.replace(/\[Produto\/Serviço\]/g, productService || '[Serviço]');
    result = result.replace(/\[Valor\]/g, price || '[Valor]');
    result = result.replace(/\[Opção 1[^\]]*\]/g, optionOne || '[Opção 1]');
    result = result.replace(/\[Opção 2[^\]]*\]/g, optionTwo || '[Opção 2]');
    return result;
  };

  useEffect(() => {
    setCustomText(generateAdapted());
  }, [clientName, productService, price, optionOne, optionTwo, yourName, message]);

  const handleCopy = () => {
    copyToClipboard(customText, 'Mensagem personalizada copiada com sucesso! 🚀');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleReset = () => {
    setClientName('Mariana');
    setProductService('Atendimento Especializado');
    setPrice('R$ 150,00');
    setCustomText(message.content);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F171E] border border-[#1F2C34] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2C34] bg-[#0A1014]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Adaptar Mensagem</h3>
              <p className="text-xs text-slate-400">Preencha os dados do cliente para gerar uma resposta pronta</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Variable Inputs */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block">
              1. Campos de personalização rápida
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 mb-1 block">Nome do Cliente</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Mariana"
                  className="w-full bg-[#182229] border border-[#2A3942] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">Seu Nome / Atendente</label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Ex: Carlos"
                  className="w-full bg-[#182229] border border-[#2A3942] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">Serviço ou Produto</label>
                <input
                  type="text"
                  value={productService}
                  onChange={(e) => setProductService(e.target.value)}
                  placeholder="Ex: Consultoria / Corte / Ensaio"
                  className="w-full bg-[#182229] border border-[#2A3942] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">Valor / Proposta (se aplicável)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: R$ 250,00"
                  className="w-full bg-[#182229] border border-[#2A3942] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                />
              </div>
            </div>
          </div>

          {/* Live Preview / Direct Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                2. Prévia adaptada (você pode editar o texto livremente)
              </label>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Resetar original
              </button>
            </div>

            <div className="rounded-xl bg-[#0B141A] border border-[#19242B] p-4 relative">
              <div className="bg-[#005C4B] text-[#E9EDEF] rounded-xl p-3.5 text-sm shadow">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-white focus:outline-none resize-none leading-relaxed text-sm font-sans placeholder-slate-400"
                />
                <div className="flex items-center justify-end gap-1 mt-1 text-[11px] text-[#8696A0]">
                  <span>10:45</span>
                  <span className="text-[#53BDEB] font-bold">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#0A1014] border-t border-[#1F2C34]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenWhatsApp}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#182229] hover:bg-[#202C33] text-[#25D366] border border-[#25D366]/30 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Abrir WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014]'
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
                  <span>Copiar Mensagem Pronta</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
