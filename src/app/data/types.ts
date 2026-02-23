// Shared types for the Credit Building Bank Account app

export interface Transaction {
  id: number;
  name: string;
  type: string;
  merchant: string;
  amount: number;
  date: string;
  category: 'shopping' | 'food' | 'gaming' | 'allowance' | 'transfer' | 'transport';
  child: string;
}

export interface Task {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
}

export interface ManagedTask extends Task {
  amount: number;
  active: boolean;
}

export interface SavingGoal {
  id: number;
  title: string;
  saved: number;
  target: number;
  emoji: string;
}

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  icon: string;
  category: 'basics' | 'credit' | 'saving' | 'budgeting' | 'advanced' | 'islamic';
  ageGroup: '6-10' | '11-14' | '15-18';
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpendingLimits {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface ChildProfile {
  emoji: string;
  color: string;
  balance: number;
  creditScore: number;
  creditScoreChange: number;
  creditScoreRating: string;
  tasks: ManagedTask[];
  spendingLimits: SpendingLimits;
  blockedCategories: string[];
  cardNumber: string;
  cardFrozen: boolean;
  cardColor: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  last4: string;
  isDefault: boolean;
}

export interface OnboardingSlide {
  title: string;
  description: string;
  color: string;
  iconName: 'sparkles' | 'trending-up' | 'shield' | 'wallet';
}

// Notification types
export interface AppNotification {
  id: number;
  type: 'transaction' | 'task' | 'alert' | 'limit' | 'credit' | 'safety' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  child?: string;
}

// Card management
export interface DebitCard {
  childName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isFrozen: boolean;
  cardDesign: string;
  dailySpent: number;
  dailyLimit: number;
}

// P2P Transfer
export interface P2PContact {
  id: number;
  name: string;
  emoji: string;
  phone?: string;
  isFamily: boolean;
}

export interface P2PTransfer {
  id: number;
  from: string;
  to: string;
  amount: number;
  date: string;
  note?: string;
  status: 'completed' | 'pending' | 'failed';
}

// Spending Analytics
export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

// Family Safety
export interface FamilyMemberLocation {
  name: string;
  emoji: string;
  lat: number;
  lng: number;
  address: string;
  lastUpdated: string;
  battery: number;
}

// Subscription Plan
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxChildren: number;
  isCurrent: boolean;
}

// Direct Deposit
export interface DirectDepositInfo {
  childName: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  status: 'active' | 'pending' | 'inactive';
  employer?: string;
}

// Bill Split
export interface BillSplit {
  id: number;
  title: string;
  totalAmount: number;
  participants: BillParticipant[];
  createdBy: string;
  date: string;
  status: 'pending' | 'settled';
}

export interface BillParticipant {
  name: string;
  emoji: string;
  share: number;
  paid: boolean;
}
