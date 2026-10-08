/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/Toast';
import { AdaptMessageModal } from './components/common/AdaptMessageModal';
import { OnboardingModal } from './components/common/OnboardingModal';
import { Loader2 } from 'lucide-react';

// Screens
import { LoginScreen } from './components/screens/LoginScreen';
import { VerifyEmailScreen } from './components/screens/VerifyEmailScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { LibraryScreen } from './components/screens/LibraryScreen';
import { MessageDetailScreen } from './components/screens/MessageDetailScreen';
import { MethodScreen } from './components/screens/MethodScreen';
import { SmartSearchScreen } from './components/screens/SmartSearchScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ProfessionsScreen } from './components/screens/ProfessionsScreen';
import { ChallengeScreen } from './components/screens/ChallengeScreen';
import { AIPromptsScreen } from './components/screens/AIPromptsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const MainAppContent: React.FC = () => {
  const {
    screen,
    isLoggedIn,
    isEmailVerified,
    authLoading,
    isNewUserOnboarding,
    adaptModalMessage,
    closeAdaptModal,
  } = useApp();

  // Loading state while Firebase auth checks initial credentials
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070B0E] flex flex-col items-center justify-center text-slate-300">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-[#0A1014] font-black text-2xl shadow-xl shadow-[#25D366]/20 mb-4 animate-pulse">
          W
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin text-[#25D366]" />
          <span>Carregando ambiente seguro...</span>
        </div>
      </div>
    );
  }

  // If user is not authenticated or explicitly on login screen, render Login Screen
  if (!isLoggedIn || screen === 'login') {
    return (
      <div className="min-h-screen bg-[#070B0E] text-[#E2E8F0]">
        <LoginScreen />
        <ToastContainer />
      </div>
    );
  }

  // Email Verification Gate:
  // If user is logged in but hasn't verified their email yet, block access to protected content
  if (!isEmailVerified) {
    return (
      <div className="min-h-screen bg-[#070B0E] text-[#E2E8F0]">
        <VerifyEmailScreen />
        <ToastContainer />
      </div>
    );
  }

  // Active Screen renderer for verified users
  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'message-detail':
        return <MessageDetailScreen />;
      case 'method':
        return <MethodScreen />;
      case 'search':
        return <SmartSearchScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'professions':
        return <ProfessionsScreen />;
      case 'challenge':
        return <ChallengeScreen />;
      case 'ai-prompts':
        return <AIPromptsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D10] text-[#E2E8F0] flex flex-col antialiased">
      {/* Top Bar (One-row 3-zone contract) */}
      <Navbar />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 min-w-0 overflow-y-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* First access onboarding modal */}
      {isNewUserOnboarding && <OnboardingModal />}

      {/* Adapt Message Interactive Modal */}
      {adaptModalMessage && (
        <AdaptMessageModal
          message={adaptModalMessage}
          onClose={closeAdaptModal}
        />
      )}

      {/* Toast Feedback notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
