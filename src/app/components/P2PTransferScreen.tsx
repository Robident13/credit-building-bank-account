import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, QrCode, ArrowUpRight, ArrowDownLeft, Search, UserPlus, X, Check } from 'lucide-react';
import BottomNav from './BottomNav';
import { P2P_CONTACTS, P2P_TRANSFERS, CHILDREN } from '../data/mockData';

export default function P2PTransferScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'send' | 'request' | 'history'>('send');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fromChild, setFromChild] = useState('Layla');

  const filteredContacts = P2P_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!selectedContact || !amount) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedContact(null);
      setAmount('');
      setNote('');
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Send & Receive</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Tab Navigation */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-xl p-1 flex border border-slate-200" role="tablist">
            {(['send', 'request', 'history'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                {tab === 'send' && <Send size={14} className="inline mr-1" />}
                {tab === 'request' && <ArrowDownLeft size={14} className="inline mr-1" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'history' ? (
          <section className="px-6" aria-label="Transfer history">
            <h2 className="font-semibold text-slate-900 mb-3">Recent Transfers</h2>
            <ul className="space-y-3">
              {P2P_TRANSFERS.map((transfer) => (
                <li key={transfer.id} className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transfer.from === 'Layla' || transfer.from === 'Omar'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transfer.from === 'Layla' || transfer.from === 'Omar'
                        ? <ArrowUpRight size={18} />
                        : <ArrowDownLeft size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900">{transfer.from} &rarr; {transfer.to}</p>
                          <p className="text-xs text-slate-500">{transfer.date}</p>
                        </div>
                        <p className={`font-semibold ${
                          transfer.from === 'Layla' || transfer.from === 'Omar' ? 'text-slate-900' : 'text-green-600'
                        }`}>
                          {transfer.from === 'Layla' || transfer.from === 'Omar' ? '-' : '+'}AED {transfer.amount}
                        </p>
                      </div>
                      {transfer.note && (
                        <p className="text-xs text-slate-500 mt-1 bg-slate-50 px-2 py-1 rounded-lg inline-block">{transfer.note}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <>
            {/* From Child Selector */}
            <section className="px-6 pb-4" aria-label="Send from">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                {activeTab === 'send' ? 'Send From' : 'Request For'}
              </p>
              <div className="flex gap-2">
                {Object.keys(CHILDREN).map((name) => (
                  <button
                    key={name}
                    onClick={() => setFromChild(name)}
                    aria-pressed={fromChild === name}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      fromChild === name
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span aria-hidden="true">{CHILDREN[name].emoji}</span>
                    {name} (AED {CHILDREN[name].balance})
                  </button>
                ))}
              </div>
            </section>

            {/* Contact Search */}
            <section className="px-6 pb-4" aria-label="Select contact">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                {activeTab === 'send' ? 'Send To' : 'Request From'}
              </p>
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              {/* QR Code Button */}
              <button
                onClick={() => setShowQR(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium mb-3 hover:opacity-95 transition-opacity"
              >
                <QrCode size={18} />
                {activeTab === 'send' ? 'Scan QR Code' : 'Show My QR Code'}
              </button>

              {/* Contacts */}
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      selectedContact === contact.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-white border border-slate-200 hover:border-slate-300'
                    }`}
                    aria-pressed={selectedContact === contact.id}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg" aria-hidden="true">
                      {contact.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">{contact.name}</p>
                      {contact.phone && <p className="text-xs text-slate-500">{contact.phone}</p>}
                    </div>
                    {contact.isFamily && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Family</span>
                    )}
                    {selectedContact === contact.id && <Check size={18} className="text-blue-600" />}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
                  <UserPlus size={18} />
                  <span className="text-sm font-medium">Add New Contact</span>
                </button>
              </div>
            </section>

            {/* Amount & Note */}
            {selectedContact && (
              <section className="px-6 pb-4" aria-label="Transfer details">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Amount</p>
                <div className="relative mb-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">AED</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-300 text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note (optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none mb-4"
                />
                <button
                  onClick={handleSend}
                  disabled={!amount || Number(amount) <= 0}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
                >
                  {activeTab === 'send' ? `Send AED ${amount || '0'}` : `Request AED ${amount || '0'}`}
                </button>
              </section>
            )}
          </>
        )}
      </main>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-slate-400" aria-label="Close">
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              {activeTab === 'send' ? 'Scan to Pay' : `${fromChild}'s QR Code`}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              {activeTab === 'send' ? 'Point camera at QR code' : 'Share this code to receive money'}
            </p>
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode size={64} className="text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">QR Code</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Pay Link: pay.creditbuilder.ae/{fromChild.toLowerCase()}</p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="absolute top-8 left-6 right-6 bg-green-600 text-white rounded-xl p-4 flex items-center gap-3 shadow-xl z-50 animate-in slide-in-from-top">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm">{activeTab === 'send' ? 'Money Sent!' : 'Request Sent!'}</p>
            <p className="text-xs opacity-90">AED {amount} {activeTab === 'send' ? 'sent' : 'requested'} successfully</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
