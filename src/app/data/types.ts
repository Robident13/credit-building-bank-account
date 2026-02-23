// Shared types for the Credit Building Bank Account app

export interface Transaction {
  id: number;
  name: string;
  type: string;
  merchant: string;
  amount: number;
  date: string;
  category: 'shopping' | 'food' | 'gaming' | 'allowance';
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
