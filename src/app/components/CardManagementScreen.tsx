import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Snowflake, Sun, Copy, CreditCard, Palette, Shield, RefreshCw, Check } from 'lucide-react';
import BottomNav from './BottomNav';
import { Progress } from './ui/progress';
import { DEBIT_CARDS, CHILDREN } from '../data/mockData';

const CARD_DESIGNS = [
  { id: 'blue', gradient: 'from-blue-600 via-indigo-600 to-purple-700', name: 'Ocean Blue' },
  { id: 'purple', gradient: 'from-purple-600 via-pink-600 to-rose-700', name: 'Royal Purple' },
  { id: 'green', gradient: 'from-emerald-600 via-teal-600 to-cyan-700', name: 'Forest Green' },
  { id: 'gold', gradient: 'from-amber-500 via-orange-500 to-red-600', name: 'Golden Sunset' },
  { id: 'dark', gradient: 'from-slate-800 via-slate-700 to-slate-900', name: 'Midnight Black' },
];

export default function CardManagementScreen() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('Layla');
  const [cards, setCards] = useState(DEBIT_CARDS);
  const [showDesigns, setShowDesigns] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const card = cards[selectedChild];
  const child = CHILDREN[selectedChild];
  const childNames = Object.keys(CHILDREN);

  const toggleFreeze = () => {
    setCards(prev => ({
      ...prev,
      [selectedChild]: { ...prev[selectedChild], isFrozen: !prev[selectedChild].isFrozen },
    }));
  };

  const handleCopyNumber = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChangeDesign = (gradient: string) => {
    setCards(prev => ({
      ...prev,
      [selectedChild]: { ...prev[selectedChild], cardDesign: gradient },
    }));
    setShowDesigns(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Back to dashboard">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Card Management</h1>
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

        {/* Card Visual */}
        <div className="px-6 pb-4">
          <div className={`relative bg-gradient-to-br ${card.cardDesign} rounded-2xl p-6 text-white shadow-xl overflow-hidden ${card.isFrozen ? 'opacity-70' : ''}`}>
            {card.isFrozen && (
              <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Snowflake size={18} />
                  <span className="font-semibold text-sm">CARD FROZEN</span>
                </div>
              </div>
            )}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs opacity-75 mb-1">Credit Builder</p>
                <p className="text-lg font-bold">{selectedChild}'s Card</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <CreditCard size={20} />
              </div>
            </div>
            <p className="font-mono text-lg tracking-widest mb-6">{card.cardNumber}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-75">EXPIRES</p>
                <p className="font-mono text-sm">{card.expiryDate}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">CVV</p>
                <p className="font-mono text-sm">{card.cvv}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75">BALANCE</p>
                <p className="font-semibold">AED {child.balance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Spending Progress */}
        <section className="px-6 pb-4" aria-label="Daily spending">
          <div className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Today's Spending</span>
              <span className="text-sm text-slate-500">AED {card.dailySpent} / {card.dailyLimit}</span>
            </div>
            <Progress value={(card.dailySpent / card.dailyLimit) * 100} className="h-2.5 bg-slate-100" />
            <p className="text-xs text-slate-500 mt-2">AED {card.dailyLimit - card.dailySpent} remaining today</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-6 pb-4" aria-label="Card actions">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={toggleFreeze}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                card.isFrozen
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label={card.isFrozen ? 'Unfreeze card' : 'Freeze card'}
            >
              {card.isFrozen ? <Sun size={24} /> : <Snowflake size={24} />}
              <span className="text-sm font-medium">{card.isFrozen ? 'Unfreeze' : 'Freeze Card'}</span>
            </button>

            <button
              onClick={handleCopyNumber}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
              aria-label="Copy card number"
            >
              {copied ? <Check size={24} className="text-green-600" /> : <Copy size={24} />}
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Number'}</span>
            </button>

            <button
              onClick={() => setShowDesigns(!showDesigns)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
              aria-label="Change card design"
            >
              <Palette size={24} />
              <span className="text-sm font-medium">Card Design</span>
            </button>

            <button
              onClick={() => setShowPinModal(true)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
              aria-label="Change PIN"
            >
              <Shield size={24} />
              <span className="text-sm font-medium">Change PIN</span>
            </button>
          </div>
        </section>

        {/* Card Design Picker */}
        {showDesigns && (
          <section className="px-6 pb-4" aria-label="Choose card design">
            <h2 className="font-semibold text-slate-900 mb-3">Choose Design</h2>
            <div className="grid grid-cols-3 gap-2">
              {CARD_DESIGNS.map((design) => (
                <button
                  key={design.id}
                  onClick={() => handleChangeDesign(design.gradient)}
                  className={`bg-gradient-to-br ${design.gradient} rounded-xl p-3 h-16 relative ${
                    card.cardDesign === design.gradient ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  aria-label={`Select ${design.name} design`}
                >
                  <span className="text-white text-xs font-medium absolute bottom-1.5 left-2">{design.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Replace Card */}
        <section className="px-6 pb-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
            <RefreshCw size={18} />
            <span className="text-sm font-medium">Request Replacement Card</span>
          </button>
        </section>
      </main>

      {/* PIN Change Modal */}
      {showPinModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6" role="dialog" aria-modal="true" aria-label="Change PIN">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Change PIN</h2>
            <p className="text-sm text-slate-600 mb-6">Enter a new 4-digit PIN for {selectedChild}'s card</p>
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-xl focus:border-blue-500 outline-none"
                  aria-label={`New PIN digit ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Update PIN
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
