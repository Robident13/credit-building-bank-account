import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowUpRight, Download } from 'lucide-react';
import BottomNav from './BottomNav';
import { Progress } from './ui/progress';
import { SPENDING_BY_CATEGORY, MONTHLY_SPENDING, CHILDREN, TRANSACTIONS } from '../data/mockData';

export default function SpendingAnalyticsScreen() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('Layla');
  const childNames = Object.keys(CHILDREN);

  const categories = SPENDING_BY_CATEGORY[selectedChild] || [];
  const monthlyData = MONTHLY_SPENDING[selectedChild] || [];
  const totalSpending = categories.reduce((sum, c) => sum + c.amount, 0);

  const childTransactions = TRANSACTIONS.filter(t => t.child === selectedChild && t.amount < 0);
  const lastMonthTotal = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 2].amount : 0;
  const currentMonthTotal = monthlyData.length >= 1 ? monthlyData[monthlyData.length - 1].amount : 0;
  const spendingChange = lastMonthTotal > 0
    ? Math.round(((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
    : 0;
  const maxMonthly = Math.max(...monthlyData.map(m => m.amount));

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Spending Insights</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Child Selector */}
        <div className="px-6 py-4 flex gap-2" role="group" aria-label="Select child">
          {childNames.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedChild(name)}
              aria-pressed={selectedChild === name}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedChild === name
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <span aria-hidden="true">{CHILDREN[name].emoji}</span>
              {name}
            </button>
          ))}
        </div>

        {/* Summary Card */}
        <section className="px-6 pb-4" aria-label="Spending summary">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-5 text-white">
            <p className="text-sm opacity-90 mb-1">This Month's Spending</p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl font-bold">AED {currentMonthTotal}</span>
              <span className={`flex items-center text-sm ${
                spendingChange > 0 ? 'text-orange-300' : 'text-green-300'
              }`}>
                {spendingChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {spendingChange > 0 ? '+' : ''}{spendingChange}%
              </span>
            </div>
            <p className="text-xs opacity-75">
              {spendingChange > 0
                ? `AED ${currentMonthTotal - lastMonthTotal} more than last month`
                : `AED ${lastMonthTotal - currentMonthTotal} less than last month`}
            </p>
          </div>
        </section>

        {/* Monthly Trend (Bar Chart) */}
        <section className="px-6 pb-4" aria-label="Monthly spending trend">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h2 className="font-semibold text-slate-900 mb-4">Monthly Trend</h2>
            <div className="flex items-end gap-2 h-32">
              {monthlyData.map((month, i) => {
                const height = maxMonthly > 0 ? (month.amount / maxMonthly) * 100 : 0;
                const isLast = i === monthlyData.length - 1;
                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {month.amount}
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isLast ? 'bg-blue-500' : 'bg-blue-200'
                      }`}
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    />
                    <span className={`text-xs font-medium ${
                      isLast ? 'text-blue-600' : 'text-slate-500'
                    }`}>
                      {month.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="px-6 pb-4" aria-label="Spending by category">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-slate-900">By Category</h2>
              <span className="text-sm text-slate-500">Total: AED {totalSpending}</span>
            </div>

            {/* Visual Ring Summary */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    return categories.map((cat) => {
                      const dash = cat.percentage;
                      const gap = 100 - dash;
                      const currentOffset = offset;
                      offset += dash;
                      return (
                        <circle
                          key={cat.category}
                          cx="18" cy="18" r="15.9155"
                          fill="none"
                          stroke={cat.color}
                          strokeWidth="3"
                          strokeDasharray={`${dash} ${gap}`}
                          strokeDashoffset={-currentOffset}
                          className="transition-all"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-slate-900">AED</span>
                  <span className="text-xl font-bold text-slate-900">{totalSpending}</span>
                </div>
              </div>
            </div>

            {/* Category List */}
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.category} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: cat.color + '20' }}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-800">{cat.category}</span>
                      <span className="text-sm font-semibold text-slate-900">AED {cat.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 w-8 text-right">{cat.percentage}%</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Smart Insights */}
        <section className="px-6 pb-4" aria-label="Smart insights">
          <h2 className="font-semibold text-slate-900 mb-3">Insights</h2>
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <ArrowUpRight size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {categories[0]?.category || 'Shopping'} is your top spending category
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Consider setting a budget limit for {categories[0]?.category.toLowerCase() || 'this category'}
                </p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <TrendingDown size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">
                  {spendingChange <= 0 ? 'Great job! Spending is down this month' : 'Spending increased this month'}
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  {spendingChange <= 0
                    ? 'Keep up the healthy spending habits!'
                    : `Try to reduce spending by AED ${currentMonthTotal - lastMonthTotal} next month`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="px-6 pb-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
            <Download size={18} />
            <span className="text-sm font-medium">Export Monthly Report (PDF)</span>
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
