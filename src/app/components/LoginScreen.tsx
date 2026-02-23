import { useState } from 'react';
import { Eye, EyeOff, Fingerprint, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'pin' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinStep, setPinStep] = useState<'enter' | 'confirm'>('enter');
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handlePinInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = pinStep === 'enter' ? [...pin] : [...confirmPin];
    newPin[index] = value;
    if (pinStep === 'enter') setPin(newPin);
    else setConfirmPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`);
      next?.focus();
    }

    // Auto-submit when all filled
    if (index === 3 && value) {
      if (pinStep === 'enter') {
        setPinStep('confirm');
        setConfirmPin(['', '', '', '']);
        setTimeout(() => document.getElementById('pin-0')?.focus(), 100);
      } else {
        const enteredPin = pin.join('');
        const confirmed = [...newPin].join('');
        if (enteredPin === confirmed) {
          onLogin();
        } else {
          setError('PINs do not match. Try again.');
          setPin(['', '', '', '']);
          setConfirmPin(['', '', '', '']);
          setPinStep('enter');
          setTimeout(() => document.getElementById('pin-0')?.focus(), 100);
        }
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setMode('pin');
    setError('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }
    onRegister();
  };

  const handleBiometric = () => {
    onLogin();
  };

  if (mode === 'pin') {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-blue-900 text-white">
        <main className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
            <Shield size={32} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {pinStep === 'enter' ? 'Enter PIN' : 'Confirm PIN'}
          </h1>
          <p className="text-sm text-blue-200 mb-8 text-center">
            {pinStep === 'enter' ? 'Enter your 4-digit security PIN' : 'Re-enter your PIN to confirm'}
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 mb-6 w-full">
              <p className="text-sm text-red-300 text-center">{error}</p>
            </div>
          )}

          <div className="flex gap-4 mb-8" role="group" aria-label="PIN entry">
            {(pinStep === 'enter' ? pin : confirmPin).map((digit, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinInput(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && i > 0) {
                    document.getElementById(`pin-${i - 1}`)?.focus();
                  }
                }}
                className="w-14 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-xl focus:border-blue-400 focus:bg-white/15 outline-none transition-all text-white"
                aria-label={`PIN digit ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleBiometric}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors mb-4"
            aria-label="Use biometric authentication"
          >
            <Fingerprint size={24} className="text-blue-400" />
            <span className="text-sm font-medium">Use Biometric Login</span>
          </button>

          <button
            onClick={() => { setMode('login'); setError(''); }}
            className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
          >
            Back to Login
          </button>
        </main>
      </div>
    );
  }

  if (mode === 'forgot') {
    return (
      <div className="h-full flex flex-col bg-white">
        <header className="px-6 pt-12 pb-6">
          <button onClick={() => setMode('login')} className="text-blue-600 text-sm font-medium mb-4">&larr; Back to Login</button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-600">Enter your email to receive a reset link</p>
        </header>
        <main className="flex-1 px-6">
          <form onSubmit={(e) => { e.preventDefault(); setMode('login'); }}>
            <label className="block mb-4">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Logo / Brand */}
      <div className="px-6 pt-12 pb-2 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">🏦</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Credit Builder</h1>
        <p className="text-sm text-slate-500 mt-1">Build your family's financial future</p>
      </div>

      {/* Tab Switcher */}
      <div className="px-6 pt-6 pb-4">
        <div className="bg-slate-100 rounded-xl p-1 flex" role="tablist">
          <button
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Sign In
          </button>
          <button
            role="tab"
            aria-selected={mode === 'register'}
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Register
          </button>
        </div>
      </div>

      {/* Forms */}
      <main className="flex-1 overflow-y-auto px-6 pb-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>
            <div className="flex justify-end">
              <button type="button" onClick={() => setMode('forgot')} className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleBiometric}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3.5 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              <Fingerprint size={20} className="text-blue-600" />
              Sign in with Biometrics
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmed Al Maktoum"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">UAE Phone Number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>
            <p className="text-xs text-slate-500">
              By registering, you agree to our Terms of Service and Privacy Policy. KYC verification will be required.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Create Account
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
