import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';
import LearnScreen from './components/LearnScreen';
import SettingsScreen from './components/SettingsScreen';
import ManageChildScreen from './components/ManageChildScreen';
import AddFundsScreen from './components/AddFundsScreen';
import CardManagementScreen from './components/CardManagementScreen';
import NotificationsScreen from './components/NotificationsScreen';
import P2PTransferScreen from './components/P2PTransferScreen';
import MoneyMissionScreen from './components/MoneyMissionScreen';
import SpendingAnalyticsScreen from './components/SpendingAnalyticsScreen';
import FamilySafetyScreen from './components/FamilySafetyScreen';
import DirectDepositScreen from './components/DirectDepositScreen';
import BillSplitScreen from './components/BillSplitScreen';
import SubscriptionScreen from './components/SubscriptionScreen';

function NotFoundScreen() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="text-7xl mb-4" aria-hidden="true">🔍</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-600 text-center mb-6">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div className="size-full bg-gradient-to-b from-[#E8EDF5] to-[#F5F7FA] flex items-center justify-center">
        <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
          <Routes>
            {/* Auth */}
            <Route
              path="/login"
              element={
                isAuthenticated ?
                  <Navigate to="/" replace /> :
                  <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />
              }
            />

            {/* Onboarding */}
            <Route
              path="/onboarding"
              element={<OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />}
            />

            {/* Parent Routes */}
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/manage/:childName" element={<ManageChildScreen />} />
            <Route path="/parent/add-funds" element={<AddFundsScreen />} />
            <Route path="/parent/cards" element={<CardManagementScreen />} />
            <Route path="/parent/transfers" element={<P2PTransferScreen />} />
            <Route path="/parent/analytics" element={<SpendingAnalyticsScreen />} />
            <Route path="/parent/safety" element={<FamilySafetyScreen />} />
            <Route path="/parent/direct-deposit" element={<DirectDepositScreen />} />
            <Route path="/parent/bill-split" element={<BillSplitScreen />} />

            {/* Child Routes */}
            <Route path="/child" element={<ChildDashboard />} />

            {/* Learn Routes */}
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/learn/mission/:moduleId" element={<MoneyMissionScreen />} />

            {/* Settings Routes */}
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/settings/subscription" element={<SubscriptionScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />

            {/* Root redirect */}
            <Route
              path="/"
              element={
                !isAuthenticated ?
                  <Navigate to="/login" replace /> :
                  !hasCompletedOnboarding ?
                    <Navigate to="/onboarding" replace /> :
                    <Navigate to="/parent" replace />
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
