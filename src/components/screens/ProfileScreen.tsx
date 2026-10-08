import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROFESSIONS } from '../../data/mockData';
import {
  User,
  Briefcase,
  Building,
  Sliders,
  KeyRound,
  LogOut,
  Save,
  CheckCircle,
  Sparkles,
  Shield,
  CreditCard,
  Copy,
  Clock,
  Calendar,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    currentSession,
    updateProfile,
    logout,
    showToast,
    copyToClipboard,
    setNicheProfession,
    activeNiche,
    nicheAutomationActive,
    toggleNicheAutomation,
  } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [profession, setProfession] = useState(user?.profession || 'Corretor de Imóveis');
  const [businessType, setBusinessType] = useState(user?.businessType || 'Autônomo / MEI');
  const [tonePreference, setTonePreference] = useState<'Direto' | 'Consultivo' | 'Empático' | 'Persuasivo'>(
    user?.tonePreference || 'Consultivo'
  );
  const [signature, setSignature] = useState(user?.businessSignature || '— Atendimento WhatsApp que Vende');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      name,
      profession,
      businessType,
      tonePreference,
      businessSignature: signature,
    });
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Configuração da Conta SaaS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Meu Perfil & Acesso
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Gerencie suas informações profissionais, preferências e status de assinatura.
        </p>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6 bg-[#0E151B] border border-[#1E2B35] p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1A252E]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] text-xl font-black shrink-0">
              {name ? name.slice(0, 2).toUpperCase() : 'W'}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{name || 'Usuário'}</h2>
              <p className="text-xs text-slate-400">{user?.email || currentSession?.email}</p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-[#25D366]">
                <Sparkles className="w-3 h-3" />
                <span>Nicho configurado: <strong>{activeNiche.name}</strong></span>
              </div>
            </div>
          </div>

          {/* UID Display */}
          <div className="bg-[#121A21] border border-[#22303C] rounded-xl px-3 py-2 text-right">
            <div className="text-[10px] text-slate-500 font-mono flex items-center justify-end gap-1">
              <span>Firebase UID</span>
              <button
                type="button"
                onClick={() => copyToClipboard(user?.uid || currentSession?.uid || '', 'UID copiado!')}
                title="Copiar UID"
                className="text-slate-400 hover:text-white"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="font-mono text-xs text-slate-300 truncate max-w-[170px]">
              {user?.uid || currentSession?.uid || '—'}
            </div>
          </div>
        </div>

        {/* Inputs Básicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nome de Apresentação
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#131A21] border border-[#22303C] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              E-mail de Cadastro
            </label>
            <input
              type="email"
              disabled
              value={user?.email || currentSession?.email || ''}
              className="w-full bg-[#0E151A] border border-[#1A252E] rounded-xl px-3.5 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Profissão e Tipo de Negócio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#25D366]" />
              Sua Profissão Principal
            </label>
            <select
              value={profession}
              onChange={(e) => {
                const val = e.target.value;
                setProfession(val);
                setNicheProfession(val);
              }}
              className="w-full bg-[#131A21] border border-[#22303C] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#25D366]"
            >
              {PROFESSIONS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="Outro segmento">Outro segmento</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#25D366]" />
              Tipo de Negócio
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-[#131A21] border border-[#22303C] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#25D366]"
            >
              <option value="Autônomo / Profissional Liberal">Autônomo / Profissional Liberal</option>
              <option value="MEI / Pequena Empresa">MEI / Pequena Empresa</option>
              <option value="Consultoria Imobiliária">Consultoria Imobiliária</option>
              <option value="Comércio / Loja">Comércio / Loja</option>
              <option value="Empresa com Equipe de Vendas">Empresa com Equipe de Vendas</option>
            </select>
          </div>
        </div>

        {/* Preferências de Tom de Voz */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Preferência de Tom de Voz no WhatsApp
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['Consultivo', 'Direto', 'Empático', 'Persuasivo'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTonePreference(t)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  tonePreference === t
                    ? 'bg-[#15251C] border-[#25D366] text-[#25D366]'
                    : 'bg-[#131A21] border-[#202E3B] text-slate-300 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Assinatura Opcional */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Assinatura ou Rodapé Padrão
          </label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Ex: — Atendimento WhatsApp que Vende"
            className="w-full bg-[#131A21] border border-[#22303C] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
          />
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-[#1A252E]">
          <span className="text-xs text-slate-500">
            Dados sincronizados em nuvem no Firestore.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-[#25D366]/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </form>

      {/* Controle de Acesso / Preparação para Cakto */}
      <div className="bg-[#0E151B] border border-[#1E2B35] p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#14231B] border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Controle de Acesso & Assinatura</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#25D366]/20 text-[#25D366] rounded-md">
                ESTRUTURA CAKTO READY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Gerenciamento de status de licença e dados de integração comercial.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[#131A21] border border-[#202E3B]">
            <span className="text-[11px] text-slate-400 block mb-1">Status de Acesso</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {user?.accessStatus === 'active' ? 'Ativo (Liberado)' : user?.accessStatus || 'Ativo'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#131A21] border border-[#202E3B]">
            <span className="text-[11px] text-slate-400 block mb-1">E-mail no Firebase</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {user?.emailVerified ? 'Verificado' : 'Confirmado'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#131A21] border border-[#202E3B]">
            <span className="text-[11px] text-slate-400 block mb-1">Plano Atual</span>
            <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-[#1C2833] text-white">
              {user?.plan === 'paid' ? 'Plano Pro (Pago)' : 'Plano Comercial'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#131A21] border border-[#202E3B]">
            <span className="text-[11px] text-slate-400 block mb-1">Expiração de Acesso</span>
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#25D366]" />
              {user?.accessExpiresAt ? new Date(user.accessExpiresAt).toLocaleDateString('pt-BR') : 'Acesso Vitalício'}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 bg-[#12181F] p-3 rounded-xl border border-[#1A252E] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>
            Campos <code>purchaseId</code>, <code>purchaseDate</code> e <code>accessExpiresAt</code> estruturados no Firestore para ativação automática via Webhook da Cakto.
          </span>
        </div>
      </div>

      {/* Sair da Conta */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-rose-950/15 border border-rose-500/20">
        <div>
          <h4 className="text-xs font-bold text-rose-300">Desconectar da Sessão</h4>
          <p className="text-[11px] text-slate-400">Encerra a sessão no Firebase Auth neste navegador.</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
};
