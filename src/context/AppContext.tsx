import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ScreenType, MessageItem, UserProfile, CategoryId } from '../types';
import { MESSAGES, CATEGORIES, CHALLENGE_DAYS, PROFESSIONS } from '../data/mockData';
import { NICHE_PROFILES, NicheProfile, resolveNicheProfile, adaptMessageToNiche } from '../utils/nicheProfiles';
import { db } from '../services/firebase';
import { authService, AuthSession } from '../services/authService';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'favorite' | 'automation';
}

interface AppContextType {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  selectedMessageId: string | null;
  setSelectedMessageId: (id: string | null) => void;
  selectedCategory: CategoryId | null;
  setSelectedCategory: (cat: CategoryId | null) => void;
  selectedProfessionId: string | null;
  setSelectedProfessionId: (id: string | null) => void;

  // Niche Automation System
  nicheAutomationActive: boolean;
  setNicheAutomationActive: (active: boolean) => void;
  toggleNicheAutomation: () => void;
  activeNiche: NicheProfile;
  setNicheProfession: (professionIdOrName: string) => void;
  messages: MessageItem[];

  // Auth & Profile
  user: UserProfile | null;
  currentSession: AuthSession | null;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  authLoading: boolean;
  isNewUserOnboarding: boolean;
  setIsNewUserOnboarding: (val: boolean) => void;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string; emailVerified?: boolean }>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmEmailVerification: (email: string, code?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;

  // Favorites
  favorites: string[];
  toggleFavorite: (messageId: string) => void;
  isFavorite: (messageId: string) => boolean;

  // Recent History
  recentMessageIds: string[];
  trackMessageView: (messageId: string) => void;

  // Challenge
  completedDays: number[];
  toggleDayCompletion: (day: number) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Adapt Modal
  adaptModalMessage: MessageItem | null;
  openAdaptModal: (msg: MessageItem) => void;
  closeAdaptModal: () => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'favorite' | 'automation') => void;

  // Copy helper
  copyToClipboard: (text: string, customFeedback?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>('msg-1');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>('corretor-imoveis');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adaptModalMessage, setAdaptModalMessage] = useState<MessageItem | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Multi-tenant Auth state
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isNewUserOnboarding, setIsNewUserOnboarding] = useState<boolean>(false);

  // Per-user isolated states
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentMessageIds, setRecentMessageIds] = useState<string[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [nicheAutomationActive, setNicheAutomationActive] = useState<boolean>(true);

  const isLoggedIn = !!currentSession && !!user;
  const isEmailVerified = !!user?.emailVerified;

  // Bootstrapping session & user state on initial app load
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let unsubFavs: (() => void) | null = null;
    let unsubProg: (() => void) | null = null;

    const initAuth = async () => {
      try {
        const session = authService.getCurrentSession();
        if (!session || !session.uid) {
          setCurrentSession(null);
          setUser(null);
          setFavorites([]);
          setRecentMessageIds([]);
          setCompletedDays([]);
          setScreen('login');
          setAuthLoading(false);
          return;
        }

        setCurrentSession(session);

        // Fetch User profile from Firestore
        const userDocRef = doc(db, 'users', session.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as UserProfile;
          setUser(profileData);
          if (profileData.profession) {
            const resolved = resolveNicheProfile(profileData.profession);
            setSelectedProfessionId(resolved.id);
          }
          setScreen('dashboard');
        } else {
          // Document does not exist yet (create default profile for session)
          const fallbackProfile: UserProfile = {
            uid: session.uid,
            name: session.name || session.email.split('@')[0],
            email: session.email,
            profession: 'Corretor de Imóveis',
            businessType: 'Autônomo / MEI',
            tonePreference: 'Consultivo',
            autoCopySignature: false,
            businessSignature: `— Atendimento ${session.name}`,
            accessStatus: 'pending',
            plan: 'free',
            emailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, fallbackProfile);
          setUser(fallbackProfile);
          setScreen('dashboard');
        }

        // Real-time listener for user profile changes
        unsubProfile = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const updated = snapshot.data() as UserProfile;
            setUser(updated);
          }
        });

        // Real-time listener for user favorites
        const favsRef = doc(db, 'users', session.uid, 'favorites', 'default');
        unsubFavs = onSnapshot(favsRef, (snap) => {
          if (snap.exists() && Array.isArray(snap.data()?.messageIds)) {
            setFavorites(snap.data()?.messageIds);
          } else {
            setFavorites([]);
          }
        });

        // Real-time listener for user progress
        const progRef = doc(db, 'users', session.uid, 'progress', 'default');
        unsubProg = onSnapshot(progRef, (snap) => {
          if (snap.exists()) {
            const prog = snap.data();
            if (Array.isArray(prog?.completedDays)) setCompletedDays(prog.completedDays);
            if (Array.isArray(prog?.recentMessageIds)) setRecentMessageIds(prog.recentMessageIds);
          }
        });

        setAuthLoading(false);
      } catch (err) {
        console.error('Error in initAuth:', err);
        setAuthLoading(false);
      }
    };

    initAuth();

    return () => {
      if (unsubProfile) unsubProfile();
      if (unsubFavs) unsubFavs();
      if (unsubProg) unsubProg();
    };
  }, []);

  // Helper to subscribe to Firestore for an active session
  const attachUserListeners = (uid: string) => {
    const userDocRef = doc(db, 'users', uid);
    const unsubProfile = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const updated = snapshot.data() as UserProfile;
        setUser(updated);
      }
    });

    const favsRef = doc(db, 'users', uid, 'favorites', 'default');
    const unsubFavs = onSnapshot(favsRef, (snap) => {
      if (snap.exists() && Array.isArray(snap.data()?.messageIds)) {
        setFavorites(snap.data()?.messageIds);
      } else {
        setFavorites([]);
      }
    });

    const progRef = doc(db, 'users', uid, 'progress', 'default');
    const unsubProg = onSnapshot(progRef, (snap) => {
      if (snap.exists()) {
        const prog = snap.data();
        if (Array.isArray(prog?.completedDays)) setCompletedDays(prog.completedDays);
        if (Array.isArray(prog?.recentMessageIds)) setRecentMessageIds(prog.recentMessageIds);
      }
    });

    return () => {
      unsubProfile();
      unsubFavs();
      unsubProg();
    };
  };

  // Active Niche Profile resolved from user's profession
  const activeNiche = useMemo(() => {
    return resolveNicheProfile(user?.profession || selectedProfessionId);
  }, [user?.profession, selectedProfessionId]);

  // Reactive message list: tailored to user's profession when automation is ON
  const messages = useMemo(() => {
    if (!nicheAutomationActive) {
      return MESSAGES;
    }
    return MESSAGES.map((msg) => adaptMessageToNiche(msg, activeNiche));
  }, [nicheAutomationActive, activeNiche]);

  const showToast = (message: string, type: 'success' | 'info' | 'favorite' | 'automation' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const copyToClipboard = (text: string, customFeedback?: string) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(customFeedback || 'Mensagem copiada!', 'success');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(customFeedback || 'Mensagem copiada!', 'success');
    }
  };

  // Auth Operations
  const loginWithEmail = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string; emailVerified?: boolean }> => {
    try {
      const result = await authService.login(email, pass);
      if (!result.success || !result.user) {
        return { success: false, error: result.error || 'Falha ao autenticar.' };
      }

      const activeSession = authService.getCurrentSession();
      setCurrentSession(activeSession);
      setUser(result.user);

      if (result.user.profession) {
        const resolved = resolveNicheProfile(result.user.profession);
        setSelectedProfessionId(resolved.id);
      }

      attachUserListeners(result.user.uid);
      setScreen('dashboard');

      if (!result.user.emailVerified) {
        showToast('Confirme seu e-mail para ter acesso irrestrito.', 'info');
      } else {
        showToast(`Bem-vindo(a) de volta! Pronto para vender mais?`, 'success');
      }

      return { success: true, emailVerified: !!result.user.emailVerified };
    } catch (err: any) {
      return { success: false, error: err.message || 'Falha ao autenticar. Verifique seus dados.' };
    }
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authService.register(email, pass, name);
      if (!result.success || !result.user) {
        return { success: false, error: result.error || 'Erro ao criar conta.' };
      }

      const activeSession = authService.getCurrentSession();
      setCurrentSession(activeSession);
      setUser(result.user);

      if (result.user.profession) {
        const resolved = resolveNicheProfile(result.user.profession);
        setSelectedProfessionId(resolved.id);
      }

      attachUserListeners(result.user.uid);
      setIsNewUserOnboarding(true);
      showToast(`Conta criada! Enviamos o link de verificação para seu e-mail.`, 'success');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Não foi possível criar sua conta.' };
    }
  };

  const resendVerificationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    return await authService.resendVerificationEmail(email);
  };

  const confirmEmailVerification = async (
    email: string,
    code?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await authService.confirmEmailVerification(email, code);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authService.requestPasswordReset(email);
      if (result.success) {
        showToast('E-mail de recuperação enviado com sucesso via Firebase!', 'success');
      }
      return result;
    } catch (err: any) {
      return { success: false, error: 'Erro ao solicitar recuperação de senha.' };
    }
  };

  const logout = async () => {
    try {
      authService.logout();
      setCurrentSession(null);
      setUser(null);
      setFavorites([]);
      setRecentMessageIds([]);
      setCompletedDays([]);
      setScreen('login');
      showToast('Você saiu da sua conta com segurança.', 'info');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!currentSession) return;
    try {
      const userRef = doc(db, 'users', currentSession.uid);
      const dataToUpdate = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, dataToUpdate, { merge: true });

      setUser((prev) => (prev ? { ...prev, ...dataToUpdate } : null));

      if (updated.profession) {
        const resolved = resolveNicheProfile(updated.profession);
        setSelectedProfessionId(resolved.id);
        setNicheAutomationActive(true);
        showToast(
          `⚡ Automação ativada: Todas as mensagens foram adaptadas para ${resolved.shortName}!`,
          'automation'
        );
      } else {
        showToast('Perfil atualizado com sucesso!', 'success');
      }
    } catch (err) {
      console.error('Error updating profile in Firestore:', err);
      showToast('Erro ao atualizar perfil.', 'info');
    }
  };

  const toggleFavorite = async (messageId: string) => {
    if (!currentSession) return;
    const exists = favorites.includes(messageId);
    const updatedFavs = exists
      ? favorites.filter((id) => id !== messageId)
      : [...favorites, messageId];

    setFavorites(updatedFavs);

    if (exists) {
      showToast('Mensagem removida dos favoritos.', 'info');
    } else {
      showToast('Mensagem salva nos seus Favoritos! ⭐', 'favorite');
    }

    try {
      const favsRef = doc(db, 'users', currentSession.uid, 'favorites', 'default');
      await setDoc(
        favsRef,
        {
          userId: currentSession.uid,
          messageIds: updatedFavs,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error('Error saving favorite to Firestore:', err);
    }
  };

  const isFavorite = (messageId: string) => favorites.includes(messageId);

  const trackMessageView = async (messageId: string) => {
    if (!currentSession) return;
    const filtered = recentMessageIds.filter((id) => id !== messageId);
    const updatedRecents = [messageId, ...filtered].slice(0, 10);
    setRecentMessageIds(updatedRecents);

    try {
      const progRef = doc(db, 'users', currentSession.uid, 'progress', 'default');
      await setDoc(
        progRef,
        {
          userId: currentSession.uid,
          recentMessageIds: updatedRecents,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error('Error updating recent view in Firestore:', err);
    }
  };

  const toggleDayCompletion = async (day: number) => {
    if (!currentSession) return;
    const isCompleted = completedDays.includes(day);
    const updatedDays = isCompleted
      ? completedDays.filter((d) => d !== day)
      : [...completedDays, day].sort((a, b) => a - b);

    setCompletedDays(updatedDays);

    if (!isCompleted) {
      showToast(`Dia ${day} concluído com sucesso! 🎉`, 'success');
    }

    try {
      const progRef = doc(db, 'users', currentSession.uid, 'progress', 'default');
      await setDoc(
        progRef,
        {
          userId: currentSession.uid,
          completedDays: updatedDays,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error('Error saving challenge progress to Firestore:', err);
    }
  };

  const setNicheProfession = async (professionIdOrName: string) => {
    const resolved = resolveNicheProfile(professionIdOrName);
    setSelectedProfessionId(resolved.id);
    setNicheAutomationActive(true);

    if (currentSession && user) {
      await updateProfile({ profession: resolved.name });
    } else {
      showToast(
        `⚡ Automação ativada: Todas as mensagens foram adaptadas para ${resolved.shortName}!`,
        'automation'
      );
    }
  };

  const toggleNicheAutomation = () => {
    const nextState = !nicheAutomationActive;
    setNicheAutomationActive(nextState);
    if (nextState) {
      showToast(
        `⚡ Automação ativada para ${activeNiche.shortName}! Todas as mensagens adaptadas.`,
        'automation'
      );
    } else {
      showToast('Automação desativada. Exibindo mensagens genéricas padrão.', 'info');
    }
  };

  const openAdaptModal = (msg: MessageItem) => {
    setAdaptModalMessage(msg);
  };

  const closeAdaptModal = () => {
    setAdaptModalMessage(null);
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        selectedMessageId,
        setSelectedMessageId,
        selectedCategory,
        setSelectedCategory,
        selectedProfessionId,
        setSelectedProfessionId,
        nicheAutomationActive,
        setNicheAutomationActive,
        toggleNicheAutomation,
        activeNiche,
        setNicheProfession,
        messages,
        user,
        currentSession,
        isLoggedIn,
        isEmailVerified,
        authLoading,
        isNewUserOnboarding,
        setIsNewUserOnboarding,
        loginWithEmail,
        registerWithEmail,
        sendPasswordReset,
        resendVerificationEmail,
        confirmEmailVerification,
        logout,
        updateProfile,
        favorites,
        toggleFavorite,
        isFavorite,
        recentMessageIds,
        trackMessageView,
        completedDays,
        toggleDayCompletion,
        searchQuery,
        setSearchQuery,
        adaptModalMessage,
        openAdaptModal,
        closeAdaptModal,
        toasts,
        showToast,
        copyToClipboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
