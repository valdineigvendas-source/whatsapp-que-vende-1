import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, User, CheckCircle, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { VerifyEmailScreen } from './VerifyEmailScreen';

export const LoginScreen: React.FC = () => {
  const { loginWithEmail, registerWithEmail, sendPasswordReset, showToast } = useApp();
  
  // Tabs: 'login' | 'register' | 'forgot' | 'verify'
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Form submit handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (!password || password.length < 6) {
      setError('A senha deve possuir pelo menos 6 caracteres.');
      return;
    }

    setError('');
    setLoading(true);
    const result = await loginWithEmail(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Falha ao autenticar.');
      return;
    }

    // If user's email is not yet verified, guide to verification view
    if (result.emailVerified === false) {
      setRegisteredEmail(email.trim().toLowerCase());
      setActiveTab('verify');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (!password || password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas digitadas não coincidem.');
      return;
    }

    setError('');
    setLoading(true);
    const result = await registerWithEmail(email, password, name.trim());
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Erro ao criar conta.');
    } else {
      setRegisteredEmail(email.trim().toLowerCase());
      setActiveTab('verify');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Informe seu e-mail cadastrado.');
      return;
    }

    setError('');
    setLoading(true);
    const result = await sendPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setResetSent(true);
      showToast('E-mail enviado com sucesso via Firebase Authentication!', 'success');
    } else {
      setError(result.error || 'Erro no envio do e-mail de recuperação.');
    }
  };

  // If in verify state
  if (activeTab === 'verify') {
    return (
      <VerifyEmailScreen
        email={registeredEmail || email}
        onVerified={() => {
          setActiveTab('login');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070B0E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle emerald ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Logo & Name */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-[#0A1014] shadow-xl shadow-[#25D366]/20 mb-4 font-black text-2xl">
            W
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WhatsApp <span className="text-[#25D366]">que Vende</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
            Seu assistente para transformar conversas em clientes.
          </p>
        </div>

        {/* Card Container */}
        <div className="mt-8 bg-[#0D1419] border border-[#1F2C34] py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">Acesse sua conta</h2>
                <p className="text-xs text-slate-400 mt-0.5">Entre com seu e-mail e senha cadastrados.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-300">Senha</label>
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setActiveTab('forgot');
                      }}
                      className="text-xs text-[#25D366] hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Entrando...</span>
                    </>
                  ) : (
                    <>
                      <span>Entrar</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#1F2C34] text-center">
                <p className="text-xs text-slate-400">
                  Ainda não tem conta no sistema?{' '}
                  <button
                    onClick={() => {
                      setError('');
                      setActiveTab('register');
                    }}
                    className="text-[#25D366] font-semibold hover:underline"
                  >
                    Criar minha conta
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CADASTRO / REGISTRO */}
          {activeTab === 'register' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">Criar minha conta</h2>
                <p className="text-xs text-slate-400 mt-0.5">Cadastre-se para acessar seu assistente exclusivo.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nome completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Senha (mínimo 6 caracteres)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar senha</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Criando conta...</span>
                    </>
                  ) : (
                    <>
                      <span>Criar minha conta</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#1F2C34] text-center">
                <p className="text-xs text-slate-400">
                  Já possui uma conta?{' '}
                  <button
                    onClick={() => {
                      setError('');
                      setActiveTab('login');
                    }}
                    className="text-[#25D366] font-semibold hover:underline"
                  >
                    Entrar
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ESQUECI MINHA SENHA */}
          {activeTab === 'forgot' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white">Recuperar senha</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Informe o seu e-mail cadastrado para enviarmos as instruções de redefinição via Firebase Authentication.
                </p>
              </div>

              {resetSent ? (
                <div className="bg-[#15241C] border border-[#25D366]/40 rounded-xl p-5 text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-[#25D366] mx-auto" />
                  <p className="text-sm font-semibold text-white">Instruções enviadas com sucesso!</p>
                  <p className="text-xs text-slate-300">
                    Enviamos um link oficial do Firebase para redefinição de senha para o e-mail{' '}
                    <strong className="text-[#25D366]">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setResetSent(false);
                      setActiveTab('login');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg inline-block transition-colors"
                  >
                    Voltar para o Login
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">E-mail cadastrado</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full bg-[#151F26] border border-[#26353F] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-sm transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Enviando link...</span>
                        </>
                      ) : (
                        <span>Enviar link de recuperação</span>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-[#1F2C34] text-center">
                    <button
                      onClick={() => {
                        setError('');
                        setActiveTab('login');
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← Voltar para o Login
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Security badge footer */}
          <div className="mt-6 pt-4 border-t border-[#1F2C34]/60 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Ambiente Seguro • Firebase Authentication & Firestore</span>
          </div>
        </div>
      </div>
    </div>
  );
};
