import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Star, Crown, Sparkles, Receipt } from 'lucide-react';
import BottomNav from './BottomNav';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export default function SubscriptionScreen() {
  const navigate = useNavigate();
  const [plans] = useState(SUBSCRIPTION_PLANS);
  const [showBilling, setShowBilling] = useState(false);

  const currentPlan = plans.find(p => p.isCurrent);

  const getPlanIcon = (id: string) => {
    if (id === 'premium') return <Crown size={24} className="text-amber-600" />;
    if (id === 'pro') return <Star size={24} className="text-blue-600" />;
    return <Sparkles size={24} className="text-slate-600" />;
  };

  const getPlanGradient = (id: string) => {
    if (id === 'premium') return 'from-amber-500 to-orange-600';
    if (id === 'pro') return 'from-blue-500 to-indigo-600';
    return 'from-slate-400 to-slate-600';
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/settings')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your family plan</p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Current Plan Banner */}
        {currentPlan && (
          <section className="px-6 py-4" aria-label="Current plan">
            <div className={`bg-gradient-to-br ${getPlanGradient(currentPlan.id)} rounded-2xl p-5 text-white relative overflow-hidden`}>
              <div className="absolute top-3 right-3 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                CURRENT PLAN
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  {getPlanIcon(currentPlan.id)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{currentPlan.name}</h2>
                  <p className="text-sm opacity-90">AED {currentPlan.price}/month</p>
                </div>
              </div>
              <p className="text-xs opacity-80">Up to {currentPlan.maxChildren} children · Renews March 23, 2026</p>
            </div>
          </section>
        )}

        {/* All Plans */}
        <section className="px-6 pb-4" aria-label="Available plans">
          <h2 className="font-semibold text-slate-900 mb-3">Compare Plans</h2>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${
                  plan.isCurrent ? 'border-blue-500' : 'border-slate-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPlanGradient(plan.id)} flex items-center justify-center text-white`}>
                        {getPlanIcon(plan.id)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                        <p className="text-xs text-slate-500">Up to {plan.maxChildren} children</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900">AED {plan.price}</p>
                      <p className="text-xs text-slate-500">/month</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check size={16} className={plan.isCurrent ? 'text-blue-600' : 'text-green-600'} />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.isCurrent ? (
                    <div className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 text-center font-medium text-sm">
                      Current Plan
                    </div>
                  ) : (
                    <button className={`w-full py-2.5 rounded-xl font-medium text-sm transition-colors ${
                      plan.price > (currentPlan?.price || 0)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}>
                      {plan.price > (currentPlan?.price || 0) ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Billing History */}
        <section className="px-6 pb-4" aria-label="Billing history">
          <button
            onClick={() => setShowBilling(!showBilling)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Receipt size={18} className="text-slate-500" />
              <span className="font-medium text-slate-900 text-sm">Billing History</span>
            </div>
            <span className="text-sm text-slate-500">{showBilling ? 'Hide' : 'Show'}</span>
          </button>

          {showBilling && (
            <div className="mt-3 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {[
                { date: 'Feb 23, 2026', amount: 49, status: 'Paid' },
                { date: 'Jan 23, 2026', amount: 49, status: 'Paid' },
                { date: 'Dec 23, 2025', amount: 49, status: 'Paid' },
                { date: 'Nov 23, 2025', amount: 49, status: 'Paid' },
              ].map((bill, i) => (
                <div key={bill.date} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{bill.date}</p>
                    <p className="text-xs text-slate-500">Family Pro</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">AED {bill.amount}</p>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{bill.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cancel */}
        <section className="px-6 pb-4">
          <button className="w-full py-3 text-center text-sm text-red-600 hover:text-red-700 font-medium">
            Cancel Subscription
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
