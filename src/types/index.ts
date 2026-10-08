export type ScreenType =
  | 'login'
  | 'dashboard'
  | 'library'
  | 'message-detail'
  | 'method'
  | 'search'
  | 'favorites'
  | 'profile'
  | 'professions'
  | 'challenge'
  | 'ai-prompts'
  | 'settings';

export type CategoryId =
  | 'primeiro-contato'
  | 'entender-cliente'
  | 'apresentar-preco'
  | 'objecoes'
  | 'follow-up'
  | 'recuperacao'
  | 'fechamento'
  | 'pos-venda';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  badgeCount: number;
  color: string;
}

export interface MessageItem {
  id: string;
  title: string;
  situation: string;
  content: string;
  explanation: string;
  category: CategoryId;
  methodStage: 1 | 2 | 3 | 4 | 5 | 6; // 1: Atrair, 2: Entender, 3: Conectar, 4: Apresentar, 5: Contornar, 6: Fechar
  tone: 'Direto' | 'Consultivo' | 'Empático' | 'Persuasivo' | 'Descontraído';
  professionTags?: string[];
  viewsCount: number;
  tips?: string[];
  doNotSay?: string;
  suggestedFollowUp?: string;
}

export interface MethodStageInfo {
  number: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  subtitle: string;
  description: string;
  objective: string;
  keyRule: string;
  relatedCategory: CategoryId;
  messagesCount: number;
  badge: string;
}

export interface AttendanceOption {
  id: string;
  title: string;
  tone: 'Consultivo' | 'Direto' | 'Persuasivo' | 'Empático' | 'Descontraído';
  text: string;
  whenToUse: string;
  whyItWorks: string;
  faoPillar?: 'Filtro (F)' | 'Alinhamento (A)' | 'Objeção & Agendamento (O)';
}

export interface AttendanceSituation {
  id: string;
  number: number;
  title: string;
  stageName: string;
  description: string;
  faoPillar: 'Filtro (F)' | 'Alinhamento (A)' | 'Objeção & Agendamento (O)';
  iconName: string;
  options: AttendanceOption[];
}

export interface ProfessionNiche {
  id: string;
  name: string;
  icon: string;
  description: string;
  commonObjection: string;
  typicalTicket: string;
  sampleMessages: {
    title: string;
    situation: string;
    text: string;
    tip: string;
  }[];
  attendanceSituations?: AttendanceSituation[];
}

export interface ChallengeDayItem {
  day: number;
  title: string;
  stageName: string;
  objective: string;
  task: string;
  readyMessage: string;
  proTip: string;
  completed: boolean;
}

export interface AIPromptTemplate {
  id: string;
  title: string;
  category: 'criar' | 'melhorar' | 'objecoes' | 'followup' | 'profissao';
  description: string;
  variables: { key: string; label: string; placeholder: string; defaultValue?: string }[];
  template: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  profession: string;
  businessType: string;
  tonePreference: 'Direto' | 'Consultivo' | 'Empático' | 'Persuasivo';
  autoCopySignature: boolean;
  businessSignature?: string;
  avatarUrl?: string;

  // SaaS subscription & access fields (preparado para Cakto / webhook)
  accessStatus: 'active' | 'pending' | 'inactive';
  plan: 'free' | 'paid';
  emailVerified?: boolean;
  verificationCode?: string;
  emailVerificationSentAt?: string;
  purchaseId?: string;
  purchaseDate?: string;
  accessExpiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
