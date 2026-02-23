import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Check, Clock, Users, X, DollarSign } from 'lucide-react';
import BottomNav from './BottomNav';
import { BILL_SPLITS, P2P_CONTACTS } from '../data/mockData';
import type { BillSplit } from '../data/types';

export default function BillSplitScreen() {
  const navigate = useNavigate();
  const [bills, setBills] = useState<BillSplit[]>(BILL_SPLITS);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'settled'>('active');

  const activeBills = bills.filter(b => b.status === 'pending');
  const settledBills = bills.filter(b => b.status === 'settled');

  const toggleParticipant = (id: number) => {
    setSelectedParticipants(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleCreateSplit = () => {
    if (!newTitle || !newAmount || selectedParticipants.length === 0) return;
    const total = Number(newAmount);
    const share = Math.ceil(total / (selectedParticipants.length + 1));
    const participants = [
      { name: 'Layla', emoji: '👧', share, paid: true },
      ...selectedParticipants.map(id => {
        const contact = P2P_CONTACTS.find(c => c.id === id);
        return { name: contact?.name || '', emoji: contact?.emoji || '👤', share, paid: false };
      }),
    ];

    const newBill: BillSplit = {
      id: bills.length + 1,
      title: newTitle,
      totalAmount: total,
      createdBy: 'Layla',
      date: 'Just now',
      status: 'pending',
      participants,
    };

    setBills(prev => [newBill, ...prev]);
    setShowCreate(false);
    setNewTitle('');
    setNewAmount('');
    setSelectedParticipants([]);
  };

  const markAsPaid = (billId: number, participantName: string) => {
    setBills(prev => prev.map(bill => {
      if (bill.id !== billId) return bill;
      const updated = {
        ...bill,
        participants: bill.participants.map(p =>
          p.name === participantName ? { ...p, paid: true } : p
        ),
      };
      const allPaid = updated.participants.every(p => p.paid);
      return { ...updated, status: allPaid ? 'settled' as const : 'pending' as const };
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Split Bills</h1>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            New Split
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Create New Split */}
        {showCreate && (
          <section className="px-6 py-4" aria-label="Create new split">
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <h2 className="font-semibold text-slate-900 mb-4">New Split</h2>
              <label className="block mb-3">
                <span className="text-sm text-slate-700 mb-1 block">What's it for?</span>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pizza, Movie tickets"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm text-slate-700 mb-1 block">Total Amount (AED)</span>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </label>

              <p className="text-sm text-slate-700 mb-2">Split with:</p>
              <div className="space-y-2 mb-4">
                {P2P_CONTACTS.filter(c => c.name !== 'Layla').map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => toggleParticipant(contact.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      selectedParticipants.includes(contact.id)
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span className="text-lg" aria-hidden="true">{contact.emoji}</span>
                    <span className="flex-1 text-sm font-medium text-slate-800">{contact.name}</span>
                    {selectedParticipants.includes(contact.id) && <Check size={16} className="text-blue-600" />}
                  </button>
                ))}
              </div>

              {newAmount && selectedParticipants.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-3 mb-4 text-center">
                  <p className="text-sm text-blue-800">
                    Each person pays <span className="font-bold">AED {Math.ceil(Number(newAmount) / (selectedParticipants.length + 1))}</span>
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium text-sm">Cancel</button>
                <button
                  onClick={handleCreateSplit}
                  disabled={!newTitle || !newAmount || selectedParticipants.length === 0}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Create Split
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-xl p-1 flex border border-slate-200" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'active'}
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'active' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              <Clock size={14} className="inline mr-1" />
              Active ({activeBills.length})
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'settled'}
              onClick={() => setActiveTab('settled')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settled' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              <Check size={14} className="inline mr-1" />
              Settled ({settledBills.length})
            </button>
          </div>
        </div>

        {/* Bills List */}
        <div className="px-6 space-y-3">
          {(activeTab === 'active' ? activeBills : settledBills).length === 0 ? (
            <div className="text-center py-12">
              <Users size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No {activeTab} splits</p>
            </div>
          ) : (
            (activeTab === 'active' ? activeBills : settledBills).map((bill) => {
              const paidCount = bill.participants.filter(p => p.paid).length;
              return (
                <div key={bill.id} className="bg-white rounded-2xl p-4 border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{bill.title}</h3>
                      <p className="text-xs text-slate-500">{bill.date} · Created by {bill.createdBy}</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">AED {bill.totalAmount}</span>
                  </div>

                  <div className="space-y-2">
                    {bill.participants.map((participant) => (
                      <div key={participant.name} className="flex items-center gap-2">
                        <span className="text-sm" aria-hidden="true">{participant.emoji}</span>
                        <span className="flex-1 text-sm text-slate-700">{participant.name}</span>
                        <span className="text-sm text-slate-500">AED {participant.share}</span>
                        {participant.paid ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Paid</span>
                        ) : (
                          <button
                            onClick={() => markAsPaid(bill.id, participant.name)}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium hover:bg-blue-200"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{paidCount}/{bill.participants.length} paid</span>
                    <div className="flex gap-1">
                      {bill.participants.map((p, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${p.paid ? 'bg-green-500' : 'bg-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
