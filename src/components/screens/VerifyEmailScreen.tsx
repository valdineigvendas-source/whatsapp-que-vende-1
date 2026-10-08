import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle, RefreshCw, LogOut, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface VerifyEmailScreenProps {
  email?: string;
  onVerified?: () => void;
}

export const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ email: propEmail, onVerified }) => {
  const { user, currentSession, resendVerificationEmail, confirmEmailVerification, logout, showToast } = useApp();
  const targetEmail = propEmail || user?.email || currentSession?.email || '';

  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleResend = async () => {
    if (!targetEmail) return;
    setLoadingResend(true);
    setFeedback(null);
    try {
      const result = await resendVerificationEmail(targetEmail);
      if (result.success) {
        setFeedback({
          message: 'E-mail de confirmação reenviado com sucesso! Verifique sua caixa de entrada e spam.',
          type: 'success',
        });
        showToast('E-mail reenviado!', 'success');
      } else {
        setFeedback({
          message: result.error || 'Erro ao reenviar o e-mail de confirmação.',
          type: 'error',
        });
      }
    } catch {
      setFeedback({
        message: 'Falha na comunicação ao tentar reenviar o e-mail.',
        type: 'error',
      });
    } finally {
      setLoadingResend(false);
    }
  };

  const handleConfirm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetEmail) return;
    setLoadingConfirm(true);
    setFeedback(null);
    try {
      const result = await confirmEmailVerification(targetEmail, code.trim() || undefined);
      if (result.success) {
        setFeedback({
          message: 'E-mail confirmado com sucesso! Redirecionando para seu ambiente...',
          type: 'success',
        });
        showToast('E-mail verificado com sucesso! 🎉', 'success');
        if (onVerified) onVerified();
      } else {
        setFeedback({
          message: result.error || 'Não foi possível confirmar o e-mail. Verifique o código digitado.',
          type: 'error',
        });
      }
    } catch {
      setFeedback({
        message: 'Erro ao validar confirmação de e-mail.',
        type: 'error',
      });
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B0E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-[#0A1014] shadow-xl shadow-[#25D366]/20 mb-3 font-black text-2xl">
            W
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WhatsApp <span className="text-[#25D366]">que Vende</span>
          </h1>
        </div>

        {/* Card Box */}
        <div className="bg-[#0D1419] border border-[#1F2C34] py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#15251C] text-[#25D366] border border-[#25D366]/30 mb-1">
              <Mail className="w-6 h-6 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Verifique seu e-mail
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Enviamos um link de confirmação para seu endereço de e-mail:
            </p>
            <div className="inline-block bg-[#121A21] border border-[#22303C] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-[#25D366]">
              {targetEmail || 'seu e-mail'}
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Confirme seu e-mail para continuar e desbloquear o acesso protegido do aplicativo.
            </p>
          </div>

          {/* Feedback alerts */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Quick confirmation or optional code input */}
          <form onSubmit={handleConfirm} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Já clicou no link ou recebeu um código de 6 dígitos? (Opcional)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: 849201 ou deixe em branco"
                maxLength={6}
                className="w-full bg-[#121920] border border-[#202C36] rounded-xl px-3.5 py-2.5 text-sm text-center font-mono tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
              />
            </div>

            <button
              type="submit"
              disabled={loadingConfirm}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-[#0A1014] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20 cursor-pointer"
            >
              {loadingConfirm ? (
                <span>Validando confirmação...</span>
              ) : (
                <>
                  <span>Já Confirmei / Liberar Acesso</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Action buttons */}
          <div className="pt-2 border-t border-[#1F2C34] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              disabled={loadingResend}
              onClick={handleResend}
              className="w-full sm:w-auto text-xs text-slate-300 hover:text-[#25D366] disabled:opacity-50 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingResend ? 'animate-spin text-[#25D366]' : ''}`} />
              <span>{loadingResend ? 'Reenviando...' : 'Reenviar e-mail'}</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full sm:w-auto text-xs text-slate-400 hover:text-rose-400 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Voltar para login</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Proteção e validação via Firebase Authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
