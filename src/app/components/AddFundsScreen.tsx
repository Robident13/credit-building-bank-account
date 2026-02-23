import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Building2, Wallet, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef, type ElementType } from 'react';
import { CHILDREN, QUICK_AMOUNTS } from '../data/mockData';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, last4: '4242', isDefault: true },
  { id: 'bank', name: 'Bank Transfer', icon: Building2, last4: 'ADCB', isDefault: false },
  { id: 'wallet', name: 'Digital Wallet', icon: Wallet, last4: 'Apple Pay', isDefault: false },
];

export default function AddFundsScreen() {
  const navigate = useNavigate();
  const childNames = Object.keys(CHILDREN);
  const [selectedChild, setSelectedChild] = useState(childNames[0]);
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleAddFunds = () => {
    if (amount && parseInt(amount) > 0) {
      setShowSuccess(true);
    }
  };

  // Focus trap and auto-dismiss for success modal
  useEffect(() => {
    if (showSuccess) {
      successRef.current?.focus();
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate('/parent');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  return (
    <div className="h-full flex flex-col bg-slate-100">
      {/* Back Button */}
      <div className="px-6 pt-6 pb-2 bg-white flex-shrink-0">
        <button
          onClick={() => navigate('/parent')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
          aria-label="Back to parent dashboard"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <header className="px-6 pt-4 pb-4 bg-white flex-shrink-0 border-b border-slate-200">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Transfer Funds</p>
        <h1 className="text-2xl font-bold text-slate-900">Add Funds to Child</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-6">
        {/* Select Child */}
        <fieldset className="px-6 pt-6 pb-4 border-0">
          <legend className="block text-sm font-semibold text-slate-900 mb-3">Select Child</legend>
          <div className="flex gap-3">
            {childNames.map((name) => {
              const child = CHILDREN[name];
              const isSelected = selectedChild === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedChild(name)}
                  aria-pressed={isSelected}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-3xl mb-2" aria-hidden="true">{child.emoji}</div>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-500">AED {child.balance}</p>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Enter Amount */}
        <div className="px-6 pb-4">
          <label htmlFor="fund-amount" className="block text-sm font-semibold text-slate-900 mb-3">Enter Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-slate-600" aria-hidden="true">
              AED
            </span>
            <input
              id="fund-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              aria-label="Amount in AED"
              className="w-full bg-white border-2 border-slate-200 rounded-xl pl-20 pr-4 py-4 text-3xl font-bold text-slate-900 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-3" role="group" aria-label="Quick amount options">
            {QUICK_AMOUNTS.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                aria-label={`Set amount to AED ${value}`}
                className="bg-white border border-slate-200 rounded-lg py-2 text-sm font-medium text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                +{value}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <fieldset className="px-6 pb-4 border-0">
          <legend className="block text-sm font-semibold text-slate-900 mb-3">Payment Method</legend>
          <div className="space-y-2" role="radiogroup">
            {paymentMethods.map((method) => {
              const Icon: ElementType = method.icon;
              const isSelected = selectedPayment === method.id;
              return (
                <button
                  key={method.id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full bg-white rounded-xl p-4 border-2 transition-all flex items-center justify-between focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      <Icon size={18} className={isSelected ? 'text-blue-600' : 'text-slate-600'} aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-900">{method.name}</p>
                      <p className="text-xs text-slate-500">**** {method.last4}</p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Summary */}
        <section className="px-6 pb-4" aria-label="Transfer summary">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Transfer Summary</p>
            <dl className="space-y-2">
              <div className="flex justify-between items-center">
                <dt className="text-sm text-slate-600">Recipient</dt>
                <dd className="font-semibold text-slate-900">{selectedChild}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-slate-600">Amount</dt>
                <dd className="font-semibold text-slate-900">AED {amount || '0'}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm text-slate-600">Processing Fee</dt>
                <dd className="font-semibold text-green-600">Free</dd>
              </div>
              <div className="h-px bg-slate-200 my-2" role="separator"></div>
              <div className="flex justify-between items-center">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd className="text-xl font-bold text-slate-900">AED {amount || '0'}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Add Funds Button */}
        <div className="px-6">
          <button
            onClick={handleAddFunds}
            disabled={!amount || parseInt(amount) <= 0}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all focus-visible:outline-2 focus-visible:outline-green-600 ${
              !amount || parseInt(amount) <= 0
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg active:scale-[0.98]'
            }`}
          >
            Confirm & Add Funds
          </button>
        </div>

        {/* Security Notice */}
        <div className="px-6 pt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4" role="note">
            <p className="text-xs text-blue-800 leading-relaxed">
              <span aria-hidden="true">🔒 </span>
              <strong>Secure Transfer:</strong> All transactions are encrypted and secured by UAE banking standards. Funds will be available instantly in {selectedChild}'s account.
            </p>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Transfer successful"
        >
          <div
            ref={successRef}
            tabIndex={-1}
            className="bg-white rounded-2xl p-8 mx-6 text-center animate-in fade-in zoom-in duration-300"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Funds Added Successfully!</h2>
            <p className="text-slate-600">
              AED {amount} has been transferred to {selectedChild}'s account
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
