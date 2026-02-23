import { useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { TrendingUp, TrendingDown, DollarSign, ChevronRight, ShoppingBag, Utensils, Gamepad2, Car, Bell, CreditCard, Send, BarChart3, Shield, Briefcase, Scissors } from 'lucide-react';
import { Progress } from './ui/progress';
import { TRANSACTIONS, CHILDREN, NOTIFICATIONS } from '../data/mockData';

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState('all');
  const navigate = useNavigate();

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      shopping: <ShoppingBag size={18} aria-hidden="true" />,
      food: <Utensils size={18} aria-hidden="true" />,
      gaming: <Gamepad2 size={18} aria-hidden="true" />,
      allowance: <DollarSign size={18} aria-hidden="true" />,
      transport: <Car size={18} aria-hidden="true" />,
    };
    return icons[category] || <DollarSign size={18} aria-hidden="true" />;
  };

  const combinedBalance = Object.values(CHILDREN).reduce((sum, c) => sum + c.balance, 0);
  const childNames = Object.keys(CHILDREN);
  const unreadNotifications = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="h-full flex flex-col bg-slate-100">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Parent Dashboard</p>
            <h1 className="text-3xl font-bold text-slate-900">Family Overview</h1>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label={`Notifications${unreadNotifications > 0 ? `, ${unreadNotifications} unread` : ''}`}
          >
            <Bell size={24} className="text-slate-700" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Credit Score Cards */}
        <div className="px-6 py-4 space-y-3">
          {childNames.map((name) => {
            const child = CHILDREN[name];
            const isPositive = child.creditScoreChange > 0;
            return (
              <button
                key={name}
                onClick={() => navigate(`/parent/manage/${name}`)}
                aria-label={`Manage ${name}'s account. Credit score: ${child.creditScore}, ${isPositive ? 'up' : 'down'} ${Math.abs(child.creditScoreChange)} points`}
                className={`w-full bg-gradient-to-br ${child.color} rounded-2xl p-5 text-white text-left hover:opacity-95 transition-all active:scale-[0.98]`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm opacity-90 mb-1">{name}'s Credit Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{child.creditScore}</span>
                      <span className={`text-sm flex items-center ${isPositive ? 'text-green-300' : 'text-orange-300'}`}>
                        {isPositive ? <TrendingUp size={14} className="mr-1" aria-hidden="true" /> : <TrendingDown size={14} className="mr-1" aria-hidden="true" />}
                        {isPositive ? '+' : ''}{child.creditScoreChange}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Al Etihad</p>
                    <p className="text-xs opacity-75">Credit Bureau</p>
                  </div>
                </div>
                <Progress value={child.creditScore / 10} className="h-2 bg-white/20" />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs opacity-90">{child.creditScoreRating} - {isPositive ? 'Keep it up!' : 'Room to improve'}</p>
                  <ChevronRight size={18} className="opacity-75" aria-hidden="true" />
                </div>
              </button>
            );
          })}

          {/* Add Funds Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => navigate('/parent/add-funds')}
              aria-label="Add funds to child account"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all active:scale-95 shadow-lg"
            >
              Add Funds
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="px-6 py-2" aria-label="Quick actions">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Cards', icon: <CreditCard size={20} />, path: '/parent/cards', color: 'bg-blue-50 text-blue-600' },
              { label: 'Transfer', icon: <Send size={20} />, path: '/parent/transfers', color: 'bg-purple-50 text-purple-600' },
              { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/parent/analytics', color: 'bg-green-50 text-green-600' },
              { label: 'Safety', icon: <Shield size={20} />, path: '/parent/safety', color: 'bg-rose-50 text-rose-600' },
              { label: 'Deposit', icon: <Briefcase size={20} />, path: '/parent/direct-deposit', color: 'bg-amber-50 text-amber-600' },
              { label: 'Split Bill', icon: <Scissors size={20} />, path: '/parent/bill-split', color: 'bg-teal-50 text-teal-600' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${action.color} hover:opacity-80 transition-all active:scale-95`}
                aria-label={action.label}
              >
                {action.icon}
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Balance Overview */}
        <section className="px-6 py-2" aria-label="Balance overview">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Combined Balance</p>
            <p className="text-3xl font-bold text-slate-900">AED {combinedBalance.toLocaleString()}</p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
              {childNames.map((name) => (
                <div key={name} className="flex-1">
                  <p className="text-xs text-slate-500">{name}</p>
                  <p className="text-lg font-semibold text-slate-900">AED {CHILDREN[name].balance}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spending Controls */}
        <section className="px-6 py-2" aria-label="Spending controls">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-slate-900">Spending Controls</h2>
              <ChevronRight size={20} className="text-slate-400" aria-hidden="true" />
            </div>
            <dl className="space-y-3">
              <div className="flex justify-between items-center">
                <dt className="text-sm text-slate-600">Daily Limit</dt>
                <dd className="text-sm font-medium text-slate-900">AED 100</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-slate-600">Active Blocks</dt>
                <dd className="text-sm font-medium text-red-600">2 categories</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="px-6 py-4" aria-label="Recent transactions">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-slate-900">Recent Transactions</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">View All</button>
          </div>

          {/* Child Filter */}
          <div className="flex gap-2 mb-4" role="group" aria-label="Filter by child">
            {['all', ...childNames].map((child) => (
              <button
                key={child}
                onClick={() => setSelectedChild(child)}
                aria-pressed={selectedChild === child}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                  selectedChild === child
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {child === 'all' ? 'All' : child}
              </button>
            ))}
          </div>

          <ul className="space-y-3 list-none p-0 m-0">
            {TRANSACTIONS
              .filter(t => selectedChild === 'all' || t.child === selectedChild)
              .map((transaction) => (
                <li key={transaction.id} className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getCategoryIcon(transaction.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900">{transaction.merchant}</p>
                          <p className="text-xs text-slate-500">{transaction.name} · {transaction.date}</p>
                        </div>
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}AED {Math.abs(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
