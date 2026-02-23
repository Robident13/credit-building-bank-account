import BottomNav from './BottomNav';
import { CheckCircle2, Lock, PlayCircle, Trophy } from 'lucide-react';
import { Progress } from './ui/progress';
import { LEARNING_MODULES } from '../data/mockData';

export default function LearnScreen() {
  const completedModules = LEARNING_MODULES.filter(m => m.completed).length;
  const totalModules = LEARNING_MODULES.length;
  const progressPercent = (completedModules / totalModules) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-100 to-blue-100">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Financial Learning</p>
        <h1 className="text-3xl font-bold text-slate-900">Learn & Earn</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Progress Card */}
        <section className="px-6 pb-4" aria-label="Learning progress">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Progress</p>
                <p className="text-3xl font-bold">{completedModules} / {totalModules}</p>
                <p className="text-sm opacity-90">modules completed</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center" aria-hidden="true">
                <Trophy size={32} />
              </div>
            </div>
            <Progress value={progressPercent} className="h-2 bg-green-500" />
            <p className="text-xs mt-2 opacity-90">Keep learning to unlock more rewards!</p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 pb-4" aria-label="Learning stats">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <p className="text-2xl font-bold text-blue-600">125</p>
              <p className="text-xs text-slate-600 mt-1">XP Earned</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <p className="text-2xl font-bold text-purple-600">4</p>
              <p className="text-xs text-slate-600 mt-1">Streak Days</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-xs text-slate-600 mt-1">Certificates</p>
            </div>
          </div>
        </section>

        {/* Learning Modules */}
        <section className="px-6" aria-label="Learning modules">
          <h2 className="font-semibold text-slate-900 mb-3">All Modules</h2>
          <ul className="space-y-3 pb-4 list-none p-0 m-0">
            {LEARNING_MODULES.map((module) => (
              <li
                key={module.id}
                className={`rounded-xl p-4 border transition-all ${
                  module.locked
                    ? 'bg-slate-100 border-slate-200 opacity-60'
                    : module.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    module.locked
                      ? 'bg-slate-200'
                      : module.completed
                      ? 'bg-green-100'
                      : 'bg-blue-50'
                  }`} aria-hidden="true">
                    {module.locked ? <Lock size={20} className="text-slate-400" /> : module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold ${
                        module.locked ? 'text-slate-500' : 'text-slate-900'
                      }`}>
                        {module.title}
                      </h3>
                      {module.completed && (
                        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 ml-2" aria-label="Completed" />
                      )}
                      {module.locked && (
                        <Lock size={18} className="text-slate-400 flex-shrink-0 ml-2" aria-label="Locked" />
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${
                      module.locked ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {module.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <PlayCircle size={14} aria-hidden="true" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy size={14} aria-hidden="true" />
                        +{module.xp} XP
                      </span>
                    </div>
                  </div>
                </div>
                {!module.locked && !module.completed && (
                  <button
                    className="w-full mt-3 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                    aria-label={`Start learning: ${module.title}`}
                  >
                    Start Learning
                  </button>
                )}
                {module.completed && (
                  <div className="w-full mt-3 bg-green-100 text-green-700 py-2.5 rounded-lg font-medium text-center" aria-label={`${module.title} completed`}>
                    ✓ Completed
                  </div>
                )}
                {module.locked && (
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Complete previous modules to unlock
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
