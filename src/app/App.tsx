import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';
import LearnScreen from './components/LearnScreen';
import SettingsScreen from './components/SettingsScreen';
import ManageChildScreen from './components/ManageChildScreen';
import AddFundsScreen from './components/AddFundsScreen';

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
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <BrowserRouter>
      <div className="size-full bg-gradient-to-b from-[#E8EDF5] to-[#F5F7FA] flex items-center justify-center">
        <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
          <Routes>
            <Route
              path="/onboarding"
              element={<OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />}
            />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/manage/:childName" element={<ManageChildScreen />} />
            <Route path="/parent/add-funds" element={<AddFundsScreen />} />
            <Route path="/child" element={<ChildDashboard />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route
              path="/"
              element={
                hasCompletedOnboarding ?
                  <Navigate to="/parent" replace /> :
                  <Navigate to="/onboarding" replace />
              }
            />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
