import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Building2, Copy, Check, AlertCircle, Briefcase } from 'lucide-react';
import BottomNav from './BottomNav';
import { DIRECT_DEPOSITS, CHILDREN } from '../data/mockData';

export default function DirectDepositScreen() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('Layla');
  const [deposits, setDeposits] = useState(DIRECT_DEPOSITS);
  const [showSetup, setShowSetup] = useState(false);
  const [employer, setEmployer] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const childDeposit = deposits.find(d => d.childName === selectedChild);
  const childNames = Object.keys(CHILDREN);

  const handleCopy = (text: string, field: string) => {
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleActivate = () => {
    if (!employer) return;
    setDeposits(prev =>
      prev.map(d =>
        d.childName === selectedChild
          ? { ...d, status: 'pending' as const, employer }
          : d
      )
    );
    setShowSetup(false);
    setEmployer('');
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Direct Deposit</h1>
        <p className="text-sm text-slate-500 mt-1">Set up payroll deposits for working teens</p>
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

        {/* Status */}
        <section className="px-6 pb-4" aria-label="Deposit status">
          <div className={`rounded-2xl p-5 border ${
            childDeposit?.status === 'active'
              ? 'bg-green-50 border-green-200'
              : childDeposit?.status === 'pending'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                childDeposit?.status === 'active' ? 'bg-green-100' :
                childDeposit?.status === 'pending' ? 'bg-amber-100' : 'bg-slate-200'
              }`}>
                <Building2 size={20} className={
                  childDeposit?.status === 'active' ? 'text-green-600' :
                  childDeposit?.status === 'pending' ? 'text-amber-600' : 'text-slate-500'
                } />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {childDeposit?.status === 'active' ? 'Active' :
                   childDeposit?.status === 'pending' ? 'Pending Verification' : 'Not Set Up'}
                </p>
                <p className="text-sm text-slate-600">
                  {childDeposit?.status === 'active'
                    ? `Receiving from ${childDeposit.employer}`
                    : childDeposit?.status === 'pending'
                    ? 'Waiting for first deposit'
                    : 'Tap below to set up direct deposit'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account Details */}
        {childDeposit && (
          <section className="px-6 pb-4" aria-label="Account details for direct deposit">
            <h2 className="font-semibold text-slate-900 mb-3">Account Details</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {[
                { label: 'Bank Name', value: childDeposit.bankName },
                { label: 'Routing Number', value: childDeposit.routingNumber, copyable: true },
                { label: 'Account Number', value: childDeposit.accountNumber, copyable: true },
                { label: 'Account Holder', value: `${selectedChild} (Minor)` },
              ].map((item, i) => (
                <div key={item.label} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
                  <div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="font-medium text-slate-900 font-mono">{item.value}</p>
                  </div>
                  {item.copyable && (
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      aria-label={`Copy ${item.label}`}
                    >
                      {copied === item.label ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Auto-Split Settings */}
        <section className="px-6 pb-4" aria-label="Deposit split">
          <h2 className="font-semibold text-slate-900 mb-3">Auto-Split Deposits</h2>
          <div className="bg-white rounded-2xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-4">Automatically split incoming deposits into categories</p>
            <div className="space-y-3">
              {[
                { label: 'Spending', emoji: '💳', percent: 50, color: 'bg-blue-500' },
                { label: 'Savings', emoji: '🏦', percent: 30, color: 'bg-green-500' },
                { label: 'Goals', emoji: '🎯', percent: 20, color: 'bg-purple-500' },
              ].map((split) => (
                <div key={split.label} className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">{split.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{split.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{split.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${split.color} rounded-full`} style={{ width: `${split.percent}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup / Info */}
        {childDeposit?.status === 'inactive' && (
          <section className="px-6 pb-4">
            {!showSetup ? (
              <button
                onClick={() => setShowSetup(true)}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Set Up Direct Deposit
              </button>
            ) : (
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Employer Details</h3>
                <label className="block mb-4">
                  <span className="text-sm text-slate-700 mb-1 block">Employer Name</span>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={employer}
                      onChange={(e) => setEmployer(e.target.value)}
                      placeholder="e.g. Carrefour, Costa Coffee"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </label>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex gap-2">
                  <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    Share the account details above with the employer's HR/payroll department. Deposits typically take 1-2 pay cycles to start.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowSetup(false)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium">Cancel</button>
                  <button
                    onClick={handleActivate}
                    disabled={!employer}
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Activate
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
