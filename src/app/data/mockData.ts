import type {
  Transaction,
  Task,
  SavingGoal,
  LearningModule,
  ChildProfile,
  PaymentMethod,
  AppNotification,
  DebitCard,
  P2PContact,
  P2PTransfer,
  SpendingCategory,
  MonthlySpending,
  FamilyMemberLocation,
  SubscriptionPlan,
  DirectDepositInfo,
  BillSplit,
} from './types';

export const TRANSACTIONS: Transaction[] = [
  { id: 1, name: 'Layla', type: 'Shopping', merchant: 'Dubai Mall', amount: -45, date: 'Today, 2:30 PM', category: 'shopping', child: 'Layla' },
  { id: 2, name: 'Omar', type: 'Food', merchant: "McDonald's", amount: -28, date: 'Today, 12:15 PM', category: 'food', child: 'Omar' },
  { id: 3, name: 'Layla', type: 'Allowance', merchant: 'Weekly Allowance', amount: 50, date: 'Yesterday', category: 'allowance', child: 'Layla' },
  { id: 4, name: 'Omar', type: 'Gaming', merchant: 'PlayStation Store', amount: -35, date: 'Yesterday', category: 'gaming', child: 'Omar' },
  { id: 5, name: 'Layla', type: 'Transport', merchant: 'Careem Ride', amount: -22, date: '2 days ago', category: 'transport', child: 'Layla' },
  { id: 6, name: 'Omar', type: 'Food', merchant: 'Shake Shack', amount: -38, date: '2 days ago', category: 'food', child: 'Omar' },
  { id: 7, name: 'Layla', type: 'Shopping', merchant: 'Virgin Megastore', amount: -65, date: '3 days ago', category: 'shopping', child: 'Layla' },
  { id: 8, name: 'Omar', type: 'Allowance', merchant: 'Weekly Allowance', amount: 50, date: '3 days ago', category: 'allowance', child: 'Omar' },
  { id: 9, name: 'Layla', type: 'Food', merchant: 'Starbucks', amount: -18, date: '4 days ago', category: 'food', child: 'Layla' },
  { id: 10, name: 'Omar', type: 'Transport', merchant: 'Metro Card Top-up', amount: -30, date: '5 days ago', category: 'transport', child: 'Omar' },
  { id: 11, name: 'Layla', type: 'Shopping', merchant: 'Noon.com', amount: -89, date: '1 week ago', category: 'shopping', child: 'Layla' },
  { id: 12, name: 'Omar', type: 'Gaming', merchant: 'Epic Games', amount: -42, date: '1 week ago', category: 'gaming', child: 'Omar' },
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
  {
    id: 1, title: 'What is Credit?', description: 'Learn the basics of credit and why it matters',
    duration: '5 min', xp: 50, completed: true, locked: false, icon: '💳',
    category: 'basics', ageGroup: '6-10',
    quiz: [
      { id: 1, question: 'What is credit?', options: ['Free money', 'Borrowed money you must repay', 'A gift from the bank', 'Your savings'], correctIndex: 1, explanation: 'Credit is money you borrow and promise to pay back, usually with interest.' },
      { id: 2, question: 'Why is a good credit score important?', options: ['It makes you popular', 'It helps you get better loan rates', 'It gives you free stuff', 'It is not important'], correctIndex: 1, explanation: 'A good credit score helps you get lower interest rates on loans and better financial opportunities.' },
      { id: 3, question: 'What happens if you miss a credit payment?', options: ['Nothing happens', 'Your score goes up', 'Your credit score may drop', 'You get a bonus'], correctIndex: 2, explanation: 'Missing payments can lower your credit score and result in fees.' },
    ],
  },
  {
    id: 2, title: 'Building Good Habits', description: 'How to develop smart money habits early',
    duration: '7 min', xp: 75, completed: true, locked: false, icon: '🌟',
    category: 'basics', ageGroup: '6-10',
    quiz: [
      { id: 1, question: 'What is the best way to save money?', options: ['Spend everything immediately', 'Save a portion of every income', 'Wait until you are old', 'Never spend anything'], correctIndex: 1, explanation: 'Saving a portion of every income builds wealth over time.' },
      { id: 2, question: 'How often should you check your budget?', options: ['Never', 'Once a year', 'Regularly (weekly or monthly)', 'Only when broke'], correctIndex: 2, explanation: 'Regular budget checks help you stay on track with your financial goals.' },
    ],
  },
  {
    id: 3, title: 'Saving vs Spending', description: 'Understanding when to save and when to spend',
    duration: '6 min', xp: 60, completed: false, locked: false, icon: '💰',
    category: 'saving', ageGroup: '6-10',
    quiz: [
      { id: 1, question: 'What is a "need" vs a "want"?', options: ['They are the same thing', 'Needs are essential, wants are nice to have', 'Wants are more important', 'Only adults have needs'], correctIndex: 1, explanation: 'Needs are essentials like food and shelter. Wants are things that are nice but not necessary.' },
      { id: 2, question: 'If you receive AED 100, what is a smart split?', options: ['Spend it all', 'Save 50%, Spend 50%', 'Give it all away', 'Hide it under your bed'], correctIndex: 1, explanation: 'A balanced approach helps you enjoy today while saving for tomorrow.' },
    ],
  },
  {
    id: 4, title: 'Credit Score Basics', description: 'What makes your credit score go up or down',
    duration: '8 min', xp: 80, completed: false, locked: false, icon: '📊',
    category: 'credit', ageGroup: '11-14',
    quiz: [
      { id: 1, question: 'What range are most credit scores in?', options: ['0-100', '100-500', '300-850', '1000-5000'], correctIndex: 2, explanation: 'Most credit scoring models range from 300 to 850.' },
      { id: 2, question: 'What factor most affects your credit score?', options: ['Your age', 'Payment history', 'Where you live', 'Your job title'], correctIndex: 1, explanation: 'Payment history makes up the largest portion of your credit score.' },
      { id: 3, question: 'How long does negative information stay on your credit report?', options: ['1 month', '1 year', 'Up to 7 years', 'Forever'], correctIndex: 2, explanation: 'Most negative information stays on your report for about 7 years.' },
    ],
  },
  {
    id: 5, title: 'Smart Shopping', description: 'How to make smart choices when buying things',
    duration: '6 min', xp: 60, completed: false, locked: true, icon: '🛍️',
    category: 'budgeting', ageGroup: '11-14',
    quiz: [
      { id: 1, question: 'Before buying something expensive, you should:', options: ['Buy it immediately', 'Wait 24 hours and think about it', 'Ask a friend to buy it', 'Buy two'], correctIndex: 1, explanation: 'The 24-hour rule helps you avoid impulse purchases.' },
      { id: 2, question: 'What is comparison shopping?', options: ['Buying everything', 'Checking prices at different stores', 'Always buying the cheapest', 'Shopping with friends'], correctIndex: 1, explanation: 'Comparison shopping means checking multiple sources to find the best value.' },
    ],
  },
  {
    id: 6, title: 'Budgeting Basics', description: 'Learn to plan your spending and saving',
    duration: '10 min', xp: 100, completed: false, locked: true, icon: '📝',
    category: 'budgeting', ageGroup: '11-14',
    quiz: [
      { id: 1, question: 'What is a budget?', options: ['A way to restrict fun', 'A plan for how to use your money', 'A bank account', 'A type of savings'], correctIndex: 1, explanation: 'A budget is simply a plan that helps you track where your money goes.' },
      { id: 2, question: 'What is the 50/30/20 rule?', options: ['A game rule', '50% needs, 30% wants, 20% savings', 'Save 50%, spend 30%, give 20%', 'A school rule'], correctIndex: 1, explanation: 'The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20%.' },
    ],
  },
  {
    id: 7, title: 'Understanding Debt', description: 'What is debt and how to manage it wisely',
    duration: '8 min', xp: 90, completed: false, locked: true, icon: '📋',
    category: 'advanced', ageGroup: '15-18',
    quiz: [
      { id: 1, question: 'What is interest on a loan?', options: ['Free money', 'The cost of borrowing money', 'A bank gift', 'Your salary'], correctIndex: 1, explanation: 'Interest is the fee charged for borrowing money.' },
    ],
  },
  {
    id: 8, title: 'Islamic Finance Basics', description: 'Learn about Sharia-compliant financial principles',
    duration: '7 min', xp: 75, completed: false, locked: true, icon: '🕌',
    category: 'islamic', ageGroup: '11-14',
    quiz: [
      { id: 1, question: 'What does "Riba" mean in Islamic finance?', options: ['Profit', 'Interest/Usury (prohibited)', 'Charity', 'Investment'], correctIndex: 1, explanation: 'Riba refers to interest or usury, which is prohibited in Islamic finance.' },
      { id: 2, question: 'What is "Zakat"?', options: ['A type of food', 'Obligatory charitable giving', 'A bank fee', 'A loan type'], correctIndex: 1, explanation: 'Zakat is one of the five pillars of Islam — obligatory charity based on wealth.' },
    ],
  },
  {
    id: 9, title: 'Entrepreneurship 101', description: 'Turn your ideas into a small business',
    duration: '12 min', xp: 120, completed: false, locked: true, icon: '🚀',
    category: 'advanced', ageGroup: '15-18',
  },
  {
    id: 10, title: 'Taxes & Government', description: 'How taxes work and why they matter',
    duration: '10 min', xp: 100, completed: false, locked: true, icon: '🏛️',
    category: 'advanced', ageGroup: '15-18',
  },
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
    cardNumber: '4521 8834 2210 7743',
    cardFrozen: false,
    cardColor: 'from-blue-600 to-indigo-700',
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
    cardNumber: '4521 8834 2210 9981',
    cardFrozen: false,
    cardColor: 'from-purple-600 to-pink-700',
  },
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'card', name: 'Credit/Debit Card', last4: '4242', isDefault: true },
  { id: 'bank', name: 'Bank Transfer', last4: 'ADCB', isDefault: false },
  { id: 'wallet', name: 'Digital Wallet', last4: 'Apple Pay', isDefault: false },
];

export const QUICK_AMOUNTS = [50, 100, 200, 500] as const;

export const AVAILABLE_BLOCK_CATEGORIES = ['Shopping', 'Entertainment', 'Food & Dining', 'Transportation'] as const;

// Notifications
export const NOTIFICATIONS: AppNotification[] = [
  { id: 1, type: 'transaction', title: 'Purchase Alert', message: 'Layla spent AED 45 at Dubai Mall', time: '2 min ago', read: false, icon: '🛍️', child: 'Layla' },
  { id: 2, type: 'task', title: 'Task Completed!', message: 'Omar completed "Clean your room" and earned 15 XP', time: '15 min ago', read: false, icon: '✅', child: 'Omar' },
  { id: 3, type: 'limit', title: 'Spending Limit Warning', message: "Omar has used 80% of today's spending limit", time: '1 hour ago', read: false, icon: '⚠️', child: 'Omar' },
  { id: 4, type: 'credit', title: 'Credit Score Update', message: "Layla's credit score increased by 12 points to 720", time: '2 hours ago', read: true, icon: '📈', child: 'Layla' },
  { id: 5, type: 'transaction', title: 'Purchase Alert', message: "Omar spent AED 28 at McDonald's", time: '3 hours ago', read: true, icon: '🍔', child: 'Omar' },
  { id: 6, type: 'system', title: 'Weekly Summary Ready', message: 'Your family spending report for this week is available', time: '5 hours ago', read: true, icon: '📊' },
  { id: 7, type: 'alert', title: 'Blocked Transaction', message: 'Omar tried to purchase from a blocked category (Gaming)', time: 'Yesterday', read: true, icon: '🚫', child: 'Omar' },
  { id: 8, type: 'safety', title: 'SOS Alert Enabled', message: "SOS alerts are now active for Layla's account", time: 'Yesterday', read: true, icon: '🆘', child: 'Layla' },
  { id: 9, type: 'task', title: 'New Task Available', message: 'Layla has a new task: "Read for 30 minutes"', time: '2 days ago', read: true, icon: '📚', child: 'Layla' },
  { id: 10, type: 'credit', title: 'Credit Tip', message: 'Paying on time for 3 more months could boost your score by 20 points', time: '3 days ago', read: true, icon: '💡' },
];

// Debit Cards
export const DEBIT_CARDS: Record<string, DebitCard> = {
  Layla: {
    childName: 'Layla',
    cardNumber: '4521 8834 2210 7743',
    expiryDate: '09/28',
    cvv: '***',
    isFrozen: false,
    cardDesign: 'from-blue-600 via-indigo-600 to-purple-700',
    dailySpent: 45,
    dailyLimit: 100,
  },
  Omar: {
    childName: 'Omar',
    cardNumber: '4521 8834 2210 9981',
    expiryDate: '09/28',
    cvv: '***',
    isFrozen: false,
    cardDesign: 'from-purple-600 via-pink-600 to-rose-700',
    dailySpent: 63,
    dailyLimit: 80,
  },
};

// P2P Contacts
export const P2P_CONTACTS: P2PContact[] = [
  { id: 1, name: 'Layla', emoji: '👧', isFamily: true },
  { id: 2, name: 'Omar', emoji: '👦', isFamily: true },
  { id: 3, name: 'Sara (Friend)', emoji: '👩', phone: '+971 50 123 4567', isFamily: false },
  { id: 4, name: 'Ahmed (Cousin)', emoji: '👨', phone: '+971 55 987 6543', isFamily: true },
  { id: 5, name: 'Fatima (Friend)', emoji: '👧', phone: '+971 52 456 7890', isFamily: false },
];

// P2P Transfers
export const P2P_TRANSFERS: P2PTransfer[] = [
  { id: 1, from: 'Layla', to: 'Omar', amount: 25, date: 'Today, 1:00 PM', note: 'For lunch', status: 'completed' },
  { id: 2, from: 'Ahmed (Cousin)', to: 'Layla', amount: 100, date: 'Yesterday', note: 'Birthday gift', status: 'completed' },
  { id: 3, from: 'Omar', to: 'Sara (Friend)', amount: 15, date: '2 days ago', note: 'Movie ticket', status: 'completed' },
];

// Spending Analytics
export const SPENDING_BY_CATEGORY: Record<string, SpendingCategory[]> = {
  Layla: [
    { category: 'Shopping', amount: 199, percentage: 42, color: '#3B82F6', icon: '🛍️' },
    { category: 'Food', amount: 118, percentage: 25, color: '#F59E0B', icon: '🍔' },
    { category: 'Transport', amount: 82, percentage: 17, color: '#10B981', icon: '🚗' },
    { category: 'Entertainment', amount: 52, percentage: 11, color: '#8B5CF6', icon: '🎬' },
    { category: 'Other', amount: 24, percentage: 5, color: '#6B7280', icon: '📦' },
  ],
  Omar: [
    { category: 'Gaming', amount: 177, percentage: 38, color: '#8B5CF6', icon: '🎮' },
    { category: 'Food', amount: 156, percentage: 33, color: '#F59E0B', icon: '🍔' },
    { category: 'Transport', amount: 60, percentage: 13, color: '#10B981', icon: '🚗' },
    { category: 'Shopping', amount: 48, percentage: 10, color: '#3B82F6', icon: '🛍️' },
    { category: 'Other', amount: 28, percentage: 6, color: '#6B7280', icon: '📦' },
  ],
};

export const MONTHLY_SPENDING: Record<string, MonthlySpending[]> = {
  Layla: [
    { month: 'Sep', amount: 380 },
    { month: 'Oct', amount: 420 },
    { month: 'Nov', amount: 310 },
    { month: 'Dec', amount: 520 },
    { month: 'Jan', amount: 445 },
    { month: 'Feb', amount: 475 },
  ],
  Omar: [
    { month: 'Sep', amount: 340 },
    { month: 'Oct', amount: 390 },
    { month: 'Nov', amount: 450 },
    { month: 'Dec', amount: 380 },
    { month: 'Jan', amount: 410 },
    { month: 'Feb', amount: 469 },
  ],
};

// Family Safety
export const FAMILY_LOCATIONS: FamilyMemberLocation[] = [
  { name: 'Layla', emoji: '👧', lat: 25.2048, lng: 55.2708, address: 'Dubai Mall, Downtown Dubai', lastUpdated: '2 min ago', battery: 78 },
  { name: 'Omar', emoji: '👦', lat: 25.1972, lng: 55.2744, address: 'Dubai International School', lastUpdated: '10 min ago', battery: 45 },
];

// Subscription Plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Family Basic',
    price: 19,
    features: ['1 child account', 'Basic spending controls', 'Transaction alerts', 'Learning modules'],
    maxChildren: 1,
    isCurrent: false,
  },
  {
    id: 'pro',
    name: 'Family Pro',
    price: 49,
    features: ['Up to 3 children', 'Advanced spending controls', 'Credit score tracking', 'Full learning library', 'P2P transfers', 'Spending analytics'],
    maxChildren: 3,
    isCurrent: true,
  },
  {
    id: 'premium',
    name: 'Family Premium',
    price: 79,
    features: ['Up to 5 children', 'Everything in Pro', 'Family safety & location', 'Direct deposit', 'Priority support', 'Custom card designs', 'Bill splitting'],
    maxChildren: 5,
    isCurrent: false,
  },
];

// Direct Deposit
export const DIRECT_DEPOSITS: DirectDepositInfo[] = [
  { childName: 'Layla', routingNumber: 'ENBD0012', accountNumber: '****7743', bankName: 'Emirates NBD', status: 'inactive' },
  { childName: 'Omar', routingNumber: 'ENBD0012', accountNumber: '****9981', bankName: 'Emirates NBD', status: 'inactive' },
];

// Bill Splits
export const BILL_SPLITS: BillSplit[] = [
  {
    id: 1, title: 'Pizza Night', totalAmount: 120, createdBy: 'Layla', date: 'Today',
    status: 'pending',
    participants: [
      { name: 'Layla', emoji: '👧', share: 40, paid: true },
      { name: 'Omar', emoji: '👦', share: 40, paid: false },
      { name: 'Sara', emoji: '👩', share: 40, paid: false },
    ],
  },
  {
    id: 2, title: 'Movie Tickets', totalAmount: 90, createdBy: 'Omar', date: 'Yesterday',
    status: 'settled',
    participants: [
      { name: 'Omar', emoji: '👦', share: 45, paid: true },
      { name: 'Ahmed', emoji: '👨', share: 45, paid: true },
    ],
  },
];
