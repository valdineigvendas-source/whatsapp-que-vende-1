import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Briefcase, Building, ArrowRight, X } from 'lucide-react';
import { PROFESSIONS } from '../../data/mockData';

export const OnboardingModal: React.FC = () => {
  const { user, updateProfile, setIsNewUserOnboarding, setScreen, showToast } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [profession, setProfession] = useState(user?.profession || 'Corretor de Imóveis');
  const [businessType, setBusinessType] = useState(user?.businessType || 'Autônomo / MEI');
  const [saving, setSaving] = useState(false);

  const handleFinish = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const chosenName = name.trim() || user?.name || 'Usuário';
      await updateProfile({
        name: chosenName,
        profession: profession || 'Corretor de Imóveis',
        businessType: businessType || 'Autônomo / MEI',
        businessSignature: `— Atendimento ${chosenName}`,
      });
      showToast('Configuração inicial concluída com sucesso! 🎉', 'success');
    } catch (err) {
      console.warn('Erro ao salvar perfil, avançando:', err);
    } finally {
      // Always dismiss modal immediately so user enters the app
      setIsNewUserOnboarding(false);
      setScreen('dashboard');
      setSaving(false);
    }
  };

  const handleSkip = () => {
    setIsNewUserOnboarding(false);
    setScreen('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0D1419] border border-[#1F2C34] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close / Skip button */}
        <button
          onClick={handleSkip}
          type="button"
          title="Pular personalização"
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Vamos personalizar seu <span className="text-[#25D366]">WhatsApp que Vende</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure suas informações profissionais para adaptar automaticamente os scripts ao seu negócio.
          </p>
        </div>

        <form onSubmit={handleFinish} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Como podemos te chamar?
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu Nome Completo ou Como Se Apresenta"
              className="w-full bg-[#151F26] border border-[#26353F] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#25D366]" /> Sua Profissão / Área de Atuação
            </label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full bg-[#151F26] border border-[#26353F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]"
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
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#25D366]" /> Tipo de Negócio
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-[#151F26] border border-[#26353F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366]"
            >
              <option value="Autônomo / Profissional Liberal">Autônomo / Profissional Liberal</option>
              <option value="MEI / Pequena Empresa">MEI / Pequena Empresa</option>
              <option value="Consultoria / Prestador de Serviços">Consultoria / Prestador de Serviços</option>
              <option value="Comércio / Loja">Comércio / Loja</option>
              <option value="Empresa com Equipe de Vendas">Empresa com Equipe de Vendas</option>
            </select>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20 cursor-pointer"
            >
              {saving ? (
                <span>Salvando perfil...</span>
              ) : (
                <>
                  <span>Começar a Usar Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors text-center cursor-pointer"
            >
              Configurar depois (ir direto ao Dashboard)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
