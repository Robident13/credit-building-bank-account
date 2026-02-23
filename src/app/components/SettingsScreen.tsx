import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';
import { ChevronRight, Check, Star } from 'lucide-react';

interface SettingsItemProps {
  emoji: string;
  bg: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  onClick?: () => void;
  isLast?: boolean;
}

function SettingsItem({ emoji, bg, title, subtitle, subtitleColor = 'text-slate-500', onClick, isLast = false }: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
        !isLast ? 'border-b border-slate-100' : ''
      }`}
      aria-label={`${title}: ${subtitle}`}
    >
      <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-lg flex-shrink-0`} aria-hidden="true">
        {emoji}
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="font-medium text-slate-900">{title}</p>
        <p className={`text-sm ${subtitleColor} flex items-center gap-1`}>
          {subtitle}
          {subtitleColor === 'text-green-600' && <Check size={14} aria-hidden="true" />}
        </p>
      </div>
      <ChevronRight size={20} className="text-slate-400 flex-shrink-0" aria-hidden="true" />
    </button>
  );
}

interface SettingsSectionProps {
  label: string;
  children: React.ReactNode;
}

function SettingsSection({ label, children }: SettingsSectionProps) {
  return (
    <section className="px-6 pb-4" aria-label={label}>
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">{label}</p>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {children}
      </div>
    </section>
  );
}

export default function SettingsScreen() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-white">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Account</p>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Current Plan */}
        <section className="px-6 pt-6 pb-4" aria-label="Current plan">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Current Plan</p>
          <button
            onClick={() => navigate('/settings/subscription')}
            className="w-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-5 text-white relative overflow-hidden text-left hover:from-slate-600 hover:to-slate-700 transition-all"
          >
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star size={12} fill="currentColor" aria-hidden="true" />
              ACTIVE
            </div>
            <h2 className="text-2xl font-bold mb-1">Family Pro</h2>
            <p className="text-sm opacity-90">AED 49 / month · 2 children</p>
            <p className="text-xs opacity-60 mt-2">Tap to manage subscription &rarr;</p>
          </button>
        </section>

        {/* Account Section */}
        <SettingsSection label="Account">
          <SettingsItem emoji="👤" bg="bg-amber-100" title="Profile & KYC" subtitle="Verified" subtitleColor="text-green-600" />
          <SettingsItem emoji="🔔" bg="bg-orange-100" title="Notifications" subtitle="All alerts on" onClick={() => navigate('/notifications')} />
          <SettingsItem emoji="🌐" bg="bg-blue-100" title="Language" subtitle="English / عربي" isLast />
        </SettingsSection>

        {/* Family Section */}
        <SettingsSection label="Family">
          <SettingsItem emoji="👶" bg="bg-purple-100" title="Manage Children" subtitle="Layla, Omar" />
          <SettingsItem emoji="💳" bg="bg-blue-100" title="Linked Bank Account" subtitle="Emirates NBD ****4521" />
          <SettingsItem emoji="🎯" bg="bg-pink-100" title="Spending Rules" subtitle="2 active blocks" isLast />
        </SettingsSection>

        {/* Platform Section */}
        <SettingsSection label="Platform">
          <SettingsItem emoji="📄" bg="bg-purple-100" title="Statements & Reports" subtitle="Monthly PDF" />
          <SettingsItem emoji="🏛️" bg="bg-slate-100" title="Credit Bureau Access" subtitle="Al Etihad Credit Bureau" />
          <SettingsItem emoji="🔒" bg="bg-orange-100" title="Security & PIN" subtitle="Biometric enabled" />
          <SettingsItem emoji="💬" bg="bg-pink-100" title="Help & Support" subtitle="24/7 chat support" isLast />
        </SettingsSection>

        {/* Footer */}
        <footer className="px-6 pb-6 text-center">
          <p className="text-xs text-slate-400">
            Licensed under DIFC Innovation Testing License · v1.0.0
          </p>
        </footer>
      </main>

      <BottomNav />
    </div>
  );
}
