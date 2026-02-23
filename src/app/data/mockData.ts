import type {
  Transaction,
  Task,
  SavingGoal,
  LearningModule,
  ChildProfile,
  PaymentMethod,
} from './types';

export const TRANSACTIONS: Transaction[] = [
  { id: 1, name: 'Layla', type: 'Shopping', merchant: 'Dubai Mall', amount: -45, date: 'Today, 2:30 PM', category: 'shopping', child: 'Layla' },
  { id: 2, name: 'Omar', type: 'Food', merchant: "McDonald's", amount: -28, date: 'Today, 12:15 PM', category: 'food', child: 'Omar' },
  { id: 3, name: 'Layla', type: 'Allowance', merchant: 'Weekly Allowance', amount: 50, date: 'Yesterday', category: 'allowance', child: 'Layla' },
  { id: 4, name: 'Omar', type: 'Gaming', merchant: 'PlayStation Store', amount: -35, date: 'Yesterday', category: 'gaming', child: 'Omar' },
];

export const CHILD_TASKS: Task[] = [
  { id: 1, title: 'Make your bed', xp: 10, completed: true },
  { id: 2, title: 'Do homework', xp: 20, completed: true },
  { id: 3, title: 'Help with dishes', xp: 15, completed: false },
  { id: 4, title: 'Read for 30 minutes', xp: 25, completed: false },
];

export const SAVING_GOALS: SavingGoal[] = [
  { id: 1, title: 'New PlayStation Game', saved: 180, target: 250, emoji: '🎮' },
  { id: 2, title: 'Bicycle', saved: 420, target: 800, emoji: '🚲' },
];

export const LEARNING_MODULES: LearningModule[] = [
  { id: 1, title: 'What is Credit?', description: 'Learn the basics of credit and why it matters', duration: '5 min', xp: 50, completed: true, locked: false, icon: '💳' },
  { id: 2, title: 'Building Good Habits', description: 'How to develop smart money habits early', duration: '7 min', xp: 75, completed: true, locked: false, icon: '🌟' },
  { id: 3, title: 'Saving vs Spending', description: 'Understanding when to save and when to spend', duration: '6 min', xp: 60, completed: false, locked: false, icon: '💰' },
  { id: 4, title: 'Credit Score Basics', description: 'What makes your credit score go up or down', duration: '8 min', xp: 80, completed: false, locked: false, icon: '📊' },
  { id: 5, title: 'Smart Shopping', description: 'How to make smart choices when buying things', duration: '6 min', xp: 60, completed: false, locked: true, icon: '🛍️' },
  { id: 6, title: 'Budgeting Basics', description: 'Learn to plan your spending and saving', duration: '10 min', xp: 100, completed: false, locked: true, icon: '📝' },
];

export const CHILDREN: Record<string, ChildProfile> = {
  Layla: {
    emoji: '👧',
    color: 'from-blue-600 to-blue-700',
    balance: 620,
    creditScore: 720,
    creditScoreChange: 12,
    creditScoreRating: 'Good',
    tasks: [
      { id: 1, title: 'Make your bed', xp: 10, amount: 5, active: true, completed: false },
      { id: 2, title: 'Do homework', xp: 20, amount: 10, active: true, completed: false },
      { id: 3, title: 'Help with dishes', xp: 15, amount: 7, active: true, completed: false },
      { id: 4, title: 'Read for 30 minutes', xp: 25, amount: 12, active: false, completed: false },
    ],
    spendingLimits: { daily: 100, weekly: 500, monthly: 2000 },
    blockedCategories: ['Gambling', 'Adult Content'],
  },
  Omar: {
    emoji: '👦',
    color: 'from-purple-600 to-purple-700',
    balance: 627,
    creditScore: 685,
    creditScoreChange: -5,
    creditScoreRating: 'Fair',
    tasks: [
      { id: 1, title: 'Clean your room', xp: 15, amount: 7, active: true, completed: false },
      { id: 2, title: 'Practice piano', xp: 30, amount: 15, active: true, completed: false },
      { id: 3, title: 'Walk the dog', xp: 20, amount: 10, active: true, completed: false },
      { id: 4, title: 'Water plants', xp: 10, amount: 5, active: false, completed: false },
    ],
    spendingLimits: { daily: 80, weekly: 400, monthly: 1500 },
    blockedCategories: ['Gaming', 'Fast Food'],
  },
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', last4: '4242', isDefault: true },
  { id: 'bank', name: 'Bank Transfer', last4: 'ADCB', isDefault: false },
  { id: 'wallet', name: 'Digital Wallet', last4: 'Apple Pay', isDefault: false },
];

export const QUICK_AMOUNTS = [50, 100, 200, 500] as const;

export const AVAILABLE_BLOCK_CATEGORIES = ['Shopping', 'Entertainment', 'Food & Dining', 'Transportation'] as const;
