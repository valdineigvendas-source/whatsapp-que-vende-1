import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROFESSIONS } from '../../data/mockData';
import {
  Settings,
  Bell,
  Shield,
  User,
  Sliders,
  Check,
  Save,
  Moon,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    user,
    updateProfile,
    showToast,
    nicheAutomationActive,
    toggleNicheAutomation,
    activeNiche,
    setNicheProfession,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'preferencias' | 'profissao' | 'conta' | 'notificacoes' | 'seguranca'>('preferencias');

  // Form states
  const [tone, setTone] = useState(user?.tonePreference || 'Consultivo');
  const [profession, setProfession] = useState(user?.profession || 'Barbeiro / Barbearia');
  const [autoSignature, setAutoSignature] = useState(user?.autoCopySignature || false);
  const [notificationsTips, setNotificationsTips] = useState(true);
  const [notificationsChallenge, setNotificationsChallenge] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handleSave = () => {
    updateProfile({
      tonePreference: tone as any,
      profession,
      autoCopySignature: autoSignature,
    });
    showToast('Configurações salvas com sucesso! ✅', 'success');
  };

  const navTabs = [
    { id: 'preferencias' as const, label: 'Preferências', icon: Sliders },
    { id: 'profissao' as const, label: 'Profissão & Nicho', icon: Sparkles },
    { id: 'conta' as const, label: 'Dados da Conta', icon: User },
    { id: 'notificacoes' as const, label: 'Notificações', icon: Bell },
    { id: 'seguranca' as const, label: 'Segurança', icon: Shield },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#25D366] mb-1 uppercase tracking-wider">
          <Settings className="w-3.5 h-3.5" />
          <span>Central de Ajustes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Configurações do Aplicativo
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          Gerencie seu perfil, preferências de resposta e alertas do WhatsApp que Vende.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1A252E]">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#15251C] border-[#25D366] text-[#25D366]'
                  : 'bg-[#0E151A] border-[#1D2832] text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="bg-[#0E151B] border border-[#1E2B35] rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Tab 1: Preferências */}
        {activeTab === 'preferencias' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Preferências de Atendimento</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Defina como as respostas padrão devem se comportar.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Tom de Voz Padrão nas Sugestões
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Consultivo', 'Direto', 'Empático', 'Persuasivo'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        tone === t
                          ? 'bg-[#15251C] border-[#25D366] text-[#25D366]'
                          : 'bg-[#131A21] border-[#202E3B] text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#18232B] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">Automação de Nicho Automática</h4>
                    <span className="text-[10px] font-mono font-bold bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded">
                      RECOMENDADO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Substitui termos genéricos pelo vocabulário exato da sua profissão ({activeNiche.shortName}) em todas as 6 etapas do app.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleNicheAutomation}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    nicheAutomationActive ? 'bg-[#25D366] justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="pt-3 border-t border-[#18232B] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Adicionar Assinatura Automática ao Copiar</h4>
                  <p className="text-[11px] text-slate-400">Inclui seu rodapé comercial ao final de cada mensagem copiada.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoSignature(!autoSignature)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    autoSignature ? 'bg-[#25D366] justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="pt-3 border-t border-[#18232B] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Feedback Tátil ao Copiar</h4>
                  <p className="text-[11px] text-slate-400">Vibração sutil ao clicar em copiar em celulares compatíveis.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHapticFeedback(!hapticFeedback)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    hapticFeedback ? 'bg-[#25D366] justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Profissão */}
        {activeTab === 'profissao' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Sua Atuação Profissional</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Altere seu nicho para recalibrar as sugestões de respostas.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Escolha seu Nicho Ativo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PROFESSIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setProfession(p.name);
                        setNicheProfession(p.name);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                        profession === p.name
                          ? 'bg-[#15251C] border-[#25D366] text-[#25D366] font-bold'
                          : 'bg-[#121A21] border-[#1F2C37] text-slate-300 hover:text-white'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dados da Conta */}
        {activeTab === 'conta' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Dados da Conta</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Informações de cadastro e contato do seu perfil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Nome</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full bg-[#121920] border border-[#202C36] rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-[#121920] border border-[#202C36] rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Plano Atual</label>
                <div className="p-2.5 rounded-xl bg-[#15251C] border border-[#25D366]/40 text-xs font-semibold text-[#25D366]">
                  Plano Vitalício Pro — Acesso Total Liberado
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notificações */}
        {activeTab === 'notificacoes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Preferências de Notificações</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Escolha o que você gostaria de ser avisado durante a rotina.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#18232B]">
                <div>
                  <h4 className="text-xs font-bold text-white">Lembrete do Desafio 7 Dias</h4>
                  <p className="text-[11px] text-slate-400">Aviso diário pela manhã para executar a missão do dia.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsChallenge(!notificationsChallenge)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    notificationsChallenge ? 'bg-[#25D366] justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Dicas Semanais de Vendas</h4>
                  <p className="text-[11px] text-slate-400">Novos roteiros de contorno de objeções direto no aplicativo.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsTips(!notificationsTips)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    notificationsTips ? 'bg-[#25D366] justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Segurança */}
        {activeTab === 'seguranca' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-white">Segurança & Privacidade</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Proteja sua conta e controle seus dispositivos conectados.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Sessão Atual</span>
                  <span className="text-slate-400">Navegador Web · Ativo agora</span>
                </div>
                <span className="text-[11px] font-mono text-[#25D366]">Conectado</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090F13] border border-[#18232B] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Criptografia Local</span>
                  <span className="text-slate-400">Seus dados e favoritos são mantidos com total sigilo.</span>
                </div>
                <span className="text-[11px] font-mono text-[#25D366]">Ativada</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Save Button */}
        <div className="pt-6 border-t border-[#18232B] flex items-center justify-between">
          <span className="text-xs text-slate-500">Alterações salvas instantaneamente</span>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1014] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );
};
