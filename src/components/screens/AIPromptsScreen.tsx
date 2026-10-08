import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_PROMPTS } from '../../data/mockData';
import { AIPromptTemplate } from '../../types';
import {
  Bot,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  History,
  Briefcase,
} from 'lucide-react';

export const AIPromptsScreen: React.FC = () => {
  const { copyToClipboard } = useApp();
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [activePromptId, setActivePromptId] = useState<string>('prompt-1');
  const [variablesState, setVariablesState] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    AI_PROMPTS.forEach((p) => {
      initial[p.id] = {};
      p.variables.forEach((v) => {
        initial[p.id][v.key] = v.defaultValue || '';
      });
    });
    return initial;
  });
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'todos', label: 'Todos os Prompts', icon: Bot },
    { id: 'criar', label: 'Criar Mensagens', icon: MessageSquare },
    { id: 'melhorar', label: 'Melhorar Resposta', icon: Sparkles },
    { id: 'objecoes', label: 'Responder Objeções', icon: ShieldAlert },
    { id: 'followup', label: 'Criar Follow-ups', icon: History },
    { id: 'profissao', label: 'Para Sua Profissão', icon: Briefcase },
  ];

  const filteredPrompts = AI_PROMPTS.filter(
    (p) => activeTab === 'todos' || p.category === activeTab
  );

  const currentPrompt =
    AI_PROMPTS.find((p) => p.id === activePromptId) || AI_PROMPTS[0];

  const handleVariableChange = (promptId: string, key: string, value: string) => {
    setVariablesState((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [key]: value,
      },
    }));
  };

  // Compile final prompt
  const getCompiledPrompt = (template: AIPromptTemplate) => {
    let text = template.template;
    const currentVars = variablesState[template.id] || {};

    template.variables.forEach((v) => {
      const val = currentVars[v.key] || v.placeholder;
      text = text.replace(new RegExp(`\\{${v.key}\\}`, 'g'), val);
    });

    return text;
  };

  const handleCopyPrompt = () => {
    const compiled = getCompiledPrompt(currentPrompt);
    copyToClipboard(compiled, 'Prompt copiado! Cole no ChatGPT, Claude ou Gemini. 🤖');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" />
          <span>Inteligência Artificial Aplicada a Vendas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Prompts Prontos para IA
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400 max-w-2xl">
          Instruções de alta conversão prontas para você usar com ChatGPT, Claude ou Gemini. Preencha os campos abaixo e copie o prompt formatado.
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1A252E]">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#15251C] border-[#25D366] text-[#25D366]'
                  : 'bg-[#0E151A] border-[#1D2832] text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid: Left Column (Prompts Selector) & Right Column (Interactive Customizer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Prompts */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Modelos de IA Disponíveis ({filteredPrompts.length})
          </span>

          {filteredPrompts.map((prompt) => {
            const isSelected = prompt.id === currentPrompt.id;

            return (
              <button
                key={prompt.id}
                onClick={() => setActivePromptId(prompt.id)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#121B21] border-[#25D366] shadow-md ring-1 ring-[#25D366]'
                    : 'bg-[#0E151A] border-[#1E2B35] hover:border-[#25D366]/40 hover:bg-[#121A20]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-[#25D366] uppercase tracking-wider">
                      {prompt.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {prompt.variables.length} variáveis
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold ${
                      isSelected ? 'text-[#25D366]' : 'text-white group-hover:text-[#25D366]'
                    }`}
                  >
                    {prompt.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Prompt Customizer & Preview */}
        <div className="lg:col-span-7 bg-[#0E151B] border border-[#1E2B35] rounded-2xl p-6 sm:p-7 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#25D366] uppercase tracking-wider">
                Personalizador Dinâmico
              </span>
              <span className="text-xs text-slate-500">Cole no ChatGPT ou Gemini</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {currentPrompt.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentPrompt.description}
            </p>
          </div>

          {/* Variables Fields */}
          <div className="space-y-3.5 pt-2 border-t border-[#18232B]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#25D366]" />
              Preencha com os dados do seu negócio:
            </span>

            <div className="space-y-3">
              {currentPrompt.variables.map((variable) => (
                <div key={variable.key}>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {variable.label}
                  </label>
                  <input
                    type="text"
                    value={variablesState[currentPrompt.id]?.[variable.key] || ''}
                    onChange={(e) =>
                      handleVariableChange(currentPrompt.id, variable.key, e.target.value)
                    }
                    placeholder={variable.placeholder}
                    className="w-full bg-[#121920] border border-[#22303C] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Compiled Output Preview Box */}
          <div className="space-y-2 pt-2 border-t border-[#18232B]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Resultado formatado do Prompt:
              </span>
              <span className="text-[11px] text-slate-500">Pronto para copiar</span>
            </div>

            <div className="rounded-xl bg-[#090E12] border border-[#17222A] p-4 text-xs font-mono text-slate-300 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap selection:bg-[#25D366]/40">
              {getCompiledPrompt(currentPrompt)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400">
              ⚡ Funciona 100% no ChatGPT, Claude, Gemini ou Copilot.
            </span>

            <button
              onClick={handleCopyPrompt}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                  : 'bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] shadow-[#25D366]/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Prompt Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Prompt Completo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
