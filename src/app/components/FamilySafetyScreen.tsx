import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Battery, Clock, AlertTriangle, Bell, Shield, Navigation } from 'lucide-react';
import BottomNav from './BottomNav';
import { FAMILY_LOCATIONS, CHILDREN } from '../data/mockData';

export default function FamilySafetyScreen() {
  const navigate = useNavigate();
  const [sosEnabled, setSosEnabled] = useState<Record<string, boolean>>({ Layla: true, Omar: false });
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [showSosConfirm, setShowSosConfirm] = useState(false);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white">
        <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3" aria-label="Go back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Family Safety</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor and protect your family</p>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Map Placeholder */}
        <section className="px-6 py-4" aria-label="Family locations">
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-1 border border-slate-200 overflow-hidden">
            <div className="bg-slate-200 rounded-xl h-48 flex items-center justify-center relative">
              <div className="text-center">
                <Navigation size={32} className="text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">Live Map View</p>
                <p className="text-xs text-slate-500">Dubai, UAE</p>
              </div>
              {/* Location Pins */}
              {FAMILY_LOCATIONS.map((member, i) => (
                <div
                  key={member.name}
                  className="absolute"
                  style={{ top: `${30 + i * 35}%`, left: `${25 + i * 30}%` }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-lg border-2 border-blue-500">
                      {member.emoji}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Members */}
        <section className="px-6 pb-4" aria-label="Family member locations">
          <h2 className="font-semibold text-slate-900 mb-3">Family Members</h2>
          <div className="space-y-3">
            {FAMILY_LOCATIONS.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl" aria-hidden="true">
                    {member.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{member.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      <span>{member.address}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {member.lastUpdated}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    member.battery < 20 ? 'text-red-500' : member.battery < 50 ? 'text-amber-500' : 'text-green-500'
                  }`}>
                    <Battery size={12} />
                    {member.battery}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOS Settings */}
        <section className="px-6 pb-4" aria-label="SOS alert settings">
          <h2 className="font-semibold text-slate-900 mb-3">SOS Alerts</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {Object.keys(CHILDREN).map((name, i) => (
              <div key={name} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center" aria-hidden="true">
                    <AlertTriangle size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{name}'s SOS Alert</p>
                    <p className="text-xs text-slate-500">{sosEnabled[name] ? 'Enabled — triggers on shake' : 'Disabled'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSosEnabled(prev => ({ ...prev, [name]: !prev[name] }))}
                  role="switch"
                  aria-checked={sosEnabled[name]}
                  aria-label={`Toggle SOS for ${name}`}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    sosEnabled[name] ? 'bg-red-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-1 mt-1 ${
                    sosEnabled[name] ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Geofencing */}
        <section className="px-6 pb-4" aria-label="Geofence settings">
          <h2 className="font-semibold text-slate-900 mb-3">Geofencing</h2>
          <div className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center" aria-hidden="true">
                  <Shield size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">Safe Zones</p>
                  <p className="text-xs text-slate-500">Get alerts when kids leave safe areas</p>
                </div>
              </div>
              <button
                onClick={() => setGeofenceEnabled(!geofenceEnabled)}
                role="switch"
                aria-checked={geofenceEnabled}
                className={`w-12 h-7 rounded-full transition-colors ${
                  geofenceEnabled ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-1 mt-1 ${
                  geofenceEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
            {geofenceEnabled && (
              <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                {['Home - Al Barsha', 'School - Dubai International School', 'Mall - Dubai Mall'].map((zone) => (
                  <div key={zone} className="flex items-center gap-2 text-sm text-slate-700 bg-blue-50 px-3 py-2 rounded-lg">
                    <MapPin size={14} className="text-blue-500" />
                    {zone}
                  </div>
                ))}
                <button className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
                  + Add Safe Zone
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Alert Preferences */}
        <section className="px-6 pb-4" aria-label="Alert preferences">
          <h2 className="font-semibold text-slate-900 mb-3">Alert Preferences</h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {[
              { label: 'Push Notifications', desc: 'Instant alerts on your phone', enabled: true },
              { label: 'SMS Alerts', desc: 'Text message for critical alerts', enabled: true },
              { label: 'Email Reports', desc: 'Weekly safety summary', enabled: false },
            ].map((pref, i) => (
              <div key={pref.label} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <Bell size={16} className="text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{pref.label}</p>
                    <p className="text-xs text-slate-500">{pref.desc}</p>
                  </div>
                </div>
                <div className={`w-12 h-7 rounded-full ${pref.enabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-1 mt-1 ${pref.enabled ? 'translate-x-5' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SOS Test */}
      {showSosConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Test SOS Alert?</h2>
            <p className="text-sm text-slate-600 mb-6">This will send a test notification to all emergency contacts.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSosConfirm(false)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium">Cancel</button>
              <button onClick={() => setShowSosConfirm(false)} className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium">Send Test</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
