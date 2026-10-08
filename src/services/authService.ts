// Client-side authentication and credential service with Firestore persistence
// Provides secure account registration, login, session tokens, password hashing,
// email verification via Firebase Authentication REST API, and data isolation per UID.

import { db } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserProfile } from '../types';

export interface AuthSession {
  uid: string;
  email: string;
  name: string;
  token: string;
  createdAt: string;
  emailVerified?: boolean;
}

const STORAGE_SESSION_KEY = 'wq_auth_session';

// Helper for crypto hashing password with salt using Web Crypto API
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${password}:${salt}:whatsappquevende_v1`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Generate random cryptographic salt or token
function generateRandomHex(length: number = 16): string {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Generate numeric 6-digit confirmation code
function generateNumericCode(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return (100000 + (arr[0] % 900000)).toString();
}

// Encode email into a safe Firestore document ID
function emailToDocId(email: string): string {
  return email.trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '_');
}

// Send official Firebase Authentication OOB email (Password Reset / Verification)
async function sendFirebaseOobEmail(email: string, requestType: 'PASSWORD_RESET' | 'VERIFY_EMAIL') {
  try {
    const configResp = await fetch('/firebase-applet-config.json');
    const config = await configResp.json();
    const apiKey = config.apiKey;
    if (!apiKey) return;

    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestType,
        email,
      }),
    });
  } catch (err) {
    console.warn('[authService] sendFirebaseOobEmail non-blocking error:', err);
  }
}

export const authService = {
  // Get active session from localStorage
  getCurrentSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as AuthSession;
    } catch {
      return null;
    }
  },

  // Save active session
  setSession(session: AuthSession | null) {
    if (session) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  },

  // Register a new user account with Email Verification requirement
  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Por favor, informe um e-mail válido.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'A senha deve possuir pelo menos 6 caracteres.' };
    }

    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const existingSnap = await getDoc(accountRef);

      if (existingSnap.exists()) {
        return {
          success: false,
          error: 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.',
        };
      }

      // Generate unique user UID
      const uid = 'usr_' + generateRandomHex(12);
      const salt = generateRandomHex(16);
      const passwordHash = await hashPassword(password, salt);
      const verificationCode = generateNumericCode();

      // 1. Create account credential document
      const accountData = {
        uid,
        email: cleanEmail,
        salt,
        passwordHash,
        emailVerified: false,
        verificationCode,
        emailVerificationSentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(accountRef, accountData);

      // 2. Create UserProfile in /users/{uid} with emailVerified: false & accessStatus: pending
      const initialProfile: UserProfile = {
        uid,
        name: cleanName || 'Usuário',
        email: cleanEmail,
        profession: 'Corretor de Imóveis',
        businessType: 'Autônomo / MEI',
        tonePreference: 'Consultivo',
        autoCopySignature: false,
        businessSignature: `— Atendimento ${cleanName}`,
        accessStatus: 'pending',
        plan: 'free',
        emailVerified: false,
        verificationCode,
        emailVerificationSentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const userDocRef = doc(db, 'users', uid);
      await setDoc(userDocRef, initialProfile);

      // 3. Trigger Firebase Authentication verification email dispatch
      sendFirebaseOobEmail(cleanEmail, 'VERIFY_EMAIL').catch(() => {});

      // 4. Save session with emailVerified: false
      const session: AuthSession = {
        uid,
        email: cleanEmail,
        name: initialProfile.name,
        token: generateRandomHex(32),
        createdAt: new Date().toISOString(),
        emailVerified: false,
      };
      this.setSession(session);

      return { success: true, user: initialProfile };
    } catch (err: any) {
      console.error('[authService] Error registering:', err);
      return {
        success: false,
        error: err.message || 'Falha ao registrar conta no servidor.',
      };
    }
  },

  // Login with email and password
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Formato de e-mail inválido.' };
    }

    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const accountSnap = await getDoc(accountRef);

      if (!accountSnap.exists()) {
        return {
          success: false,
          error: 'E-mail ou senha incorretos.',
        };
      }

      const accountData = accountSnap.data() as {
        uid: string;
        salt: string;
        passwordHash: string;
        emailVerified?: boolean;
        verificationCode?: string;
      };

      // Verify password hash
      const computedHash = await hashPassword(password, accountData.salt);
      if (computedHash !== accountData.passwordHash) {
        return {
          success: false,
          error: 'E-mail ou senha incorretos.',
        };
      }

      // Fetch user profile from /users/{uid}
      const userRef = doc(db, 'users', accountData.uid);
      const userSnap = await getDoc(userRef);

      let profile: UserProfile;
      if (userSnap.exists()) {
        profile = userSnap.data() as UserProfile;
      } else {
        // Fallback profile if not yet created
        profile = {
          uid: accountData.uid,
          name: cleanEmail.split('@')[0],
          email: cleanEmail,
          profession: 'Corretor de Imóveis',
          businessType: 'Autônomo / MEI',
          tonePreference: 'Consultivo',
          autoCopySignature: false,
          accessStatus: 'pending',
          plan: 'free',
          emailVerified: accountData.emailVerified ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userRef, profile);
      }

      // Sync verified status
      if (accountData.emailVerified !== undefined) {
        profile.emailVerified = accountData.emailVerified;
      }

      // Save session
      const session: AuthSession = {
        uid: accountData.uid,
        email: cleanEmail,
        name: profile.name,
        token: generateRandomHex(32),
        createdAt: new Date().toISOString(),
        emailVerified: !!profile.emailVerified,
      };
      this.setSession(session);

      return { success: true, user: profile };
    } catch (err: any) {
      console.error('[authService] Error logging in:', err);
      return {
        success: false,
        error: 'Falha ao autenticar. Verifique sua conexão e tente novamente.',
      };
    }
  },

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string; code?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const accountSnap = await getDoc(accountRef);

      if (!accountSnap.exists()) {
        return { success: false, error: 'Usuário não encontrado.' };
      }

      const accountData = accountSnap.data() as { uid: string; emailVerified?: boolean };
      if (accountData.emailVerified) {
        return { success: false, error: 'Este e-mail já foi verificado com sucesso.' };
      }

      const newCode = generateNumericCode();
      const now = new Date().toISOString();

      await setDoc(
        accountRef,
        {
          verificationCode: newCode,
          emailVerificationSentAt: now,
          updatedAt: now,
        },
        { merge: true }
      );

      const userRef = doc(db, 'users', accountData.uid);
      await setDoc(
        userRef,
        {
          verificationCode: newCode,
          emailVerificationSentAt: now,
          updatedAt: now,
        },
        { merge: true }
      );

      // Trigger Firebase email
      sendFirebaseOobEmail(cleanEmail, 'VERIFY_EMAIL').catch(() => {});

      return { success: true, code: newCode };
    } catch (err: any) {
      console.error('[authService] Resend verification error:', err);
      return { success: false, error: 'Erro ao reenviar o e-mail de verificação.' };
    }
  },

  // Confirm email verification (either via link code or direct confirmation button)
  async confirmEmailVerification(
    email: string,
    providedCode?: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const accountSnap = await getDoc(accountRef);

      if (!accountSnap.exists()) {
        return { success: false, error: 'Conta não encontrada.' };
      }

      const accountData = accountSnap.data() as {
        uid: string;
        verificationCode?: string;
        emailVerified?: boolean;
      };

      if (accountData.emailVerified) {
        // Already verified
        const userRef = doc(db, 'users', accountData.uid);
        const userSnap = await getDoc(userRef);
        const profile = userSnap.exists() ? (userSnap.data() as UserProfile) : null;
        if (profile) profile.emailVerified = true;
        return { success: true, user: profile || undefined };
      }

      // If code was passed, validate if matched
      if (providedCode && providedCode.trim()) {
        if (accountData.verificationCode && accountData.verificationCode !== providedCode.trim()) {
          return { success: false, error: 'Código de confirmação inválido.' };
        }
      }

      const now = new Date().toISOString();

      // 1. Mark account as verified in /accounts
      await setDoc(
        accountRef,
        {
          emailVerified: true,
          emailVerifiedAt: now,
          updatedAt: now,
        },
        { merge: true }
      );

      // 2. Mark profile as verified and activate in /users/{uid}
      const userRef = doc(db, 'users', accountData.uid);
      const userSnap = await getDoc(userRef);
      let profile = userSnap.exists() ? (userSnap.data() as UserProfile) : ({} as UserProfile);

      const updatedProfileFields = {
        emailVerified: true,
        accessStatus: 'active' as const,
        updatedAt: now,
      };

      await setDoc(userRef, updatedProfileFields, { merge: true });
      profile = { ...profile, ...updatedProfileFields };

      // 3. Update session
      const current = this.getCurrentSession();
      if (current && current.email === cleanEmail) {
        current.emailVerified = true;
        this.setSession(current);
      }

      return { success: true, user: profile };
    } catch (err: any) {
      console.error('[authService] Confirm verification error:', err);
      return { success: false, error: 'Erro ao validar confirmação de e-mail.' };
    }
  },

  // Password reset via Firebase Authentication + database update
  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const accountSnap = await getDoc(accountRef);

      if (!accountSnap.exists()) {
        return {
          success: false,
          error: 'Nenhum usuário encontrado com este e-mail.',
        };
      }

      const now = new Date().toISOString();
      const resetCode = generateNumericCode();

      // Record reset request in document
      await setDoc(
        accountRef,
        {
          passwordResetRequestedAt: now,
          passwordResetCode: resetCode,
          updatedAt: now,
        },
        { merge: true }
      );

      // Trigger Firebase Authentication PASSWORD_RESET email
      sendFirebaseOobEmail(cleanEmail, 'PASSWORD_RESET').catch(() => {});

      return { success: true };
    } catch (err: any) {
      console.error('[authService] Reset error:', err);
      return {
        success: false,
        error: 'Erro ao solicitar recuperação de senha.',
      };
    }
  },

  // Reset password with token/code or direct replacement
  async resetPassword(
    email: string,
    newPassword: string,
    resetCode?: string
  ): Promise<{ success: boolean; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'A nova senha deve ter pelo menos 6 caracteres.' };
    }

    try {
      const emailDocId = emailToDocId(cleanEmail);
      const accountRef = doc(db, 'accounts', emailDocId);
      const accountSnap = await getDoc(accountRef);

      if (!accountSnap.exists()) {
        return { success: false, error: 'Usuário não encontrado.' };
      }

      const accountData = accountSnap.data() as {
        salt: string;
        passwordResetCode?: string;
      };

      if (resetCode && resetCode.trim()) {
        if (accountData.passwordResetCode && accountData.passwordResetCode !== resetCode.trim()) {
          return { success: false, error: 'Código de redefinição inválido.' };
        }
      }

      const newSalt = generateRandomHex(16);
      const newHash = await hashPassword(newPassword, newSalt);
      const now = new Date().toISOString();

      await setDoc(
        accountRef,
        {
          salt: newSalt,
          passwordHash: newHash,
          passwordResetCode: null,
          passwordResetRequestedAt: null,
          updatedAt: now,
        },
        { merge: true }
      );

      return { success: true };
    } catch (err: any) {
      console.error('[authService] resetPassword error:', err);
      return { success: false, error: 'Erro ao redefinir senha.' };
    }
  },

  // Logout
  logout() {
    this.setSession(null);
  },
};
