import { useState } from 'react';
import BottomNav from './BottomNav';
import { Star, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { Progress } from './ui/progress';
import { CHILD_TASKS, SAVING_GOALS, CHILDREN } from '../data/mockData';

export default function ChildDashboard() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals'>('tasks');
  const currentXP = 850;
  const nextLevelXP = 1000;
  const currentLevel = 12;
  const child = CHILDREN.Layla;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-100 to-blue-100">
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Header with Profile */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-2xl" aria-hidden="true">
                {child.emoji}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Hi, Layla!</h1>
                <p className="text-sm text-slate-600">Keep up the great work</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star size={16} fill="currentColor" aria-hidden="true" />
                <span>Level {currentLevel}</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200" role="status" aria-label={`XP Progress: ${currentXP} out of ${nextLevelXP}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">XP Progress</span>
              <span className="text-sm text-slate-600">{currentXP} / {nextLevelXP}</span>
            </div>
            <Progress value={(currentXP / nextLevelXP) * 100} className="h-3 bg-slate-100" />
            <p className="text-xs text-slate-500 mt-2">{nextLevelXP - currentXP} XP to Level {currentLevel + 1}</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="px-6 pb-4 space-y-3">
          {/* Balance Card */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 text-white" aria-label="Card balance">
            <p className="text-sm opacity-90 mb-1">My Card Balance</p>
            <p className="text-4xl font-bold mb-3">AED {child.balance}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-75 mb-1">Card Number</p>
                <p className="font-mono text-sm">**** 4521</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center" aria-hidden="true">
                💳
              </div>
            </div>
          </section>

          {/* Credit Score Card */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200" aria-label="Credit score">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-slate-600 mb-1">My Credit Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">{child.creditScore}</span>
                  <span className="text-green-600 text-sm flex items-center">
                    <TrendingUp size={14} className="mr-1" aria-hidden="true" />
                    +{child.creditScoreChange}
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl" aria-hidden="true">
                📈
              </div>
            </div>
            <Progress value={child.creditScore / 10} className="h-2 bg-slate-100" />
            <p className="text-xs text-slate-500 mt-2">{child.creditScoreRating} - You're doing great!</p>
          </section>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pb-3">
          <div className="bg-white rounded-xl p-1 flex border border-slate-200" role="tablist" aria-label="Dashboard sections">
            <button
              role="tab"
              aria-selected={activeTab === 'tasks'}
              aria-controls="tab-panel-tasks"
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                activeTab === 'tasks'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <span aria-hidden="true">✅ </span>Earn Tasks
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'goals'}
              aria-controls="tab-panel-goals"
              onClick={() => setActiveTab('goals')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                activeTab === 'goals'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <span aria-hidden="true">🎯 </span>My Goals
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 pb-4">
          {activeTab === 'tasks' ? (
            <div id="tab-panel-tasks" role="tabpanel" aria-label="Earn Tasks">
              <h2 className="font-semibold text-slate-900 mb-3">Today's Tasks</h2>
              <ul className="space-y-3 list-none p-0 m-0">
                {CHILD_TASKS.map((task) => (
                  <li
                    key={task.id}
                    className={`bg-white rounded-xl p-4 border ${
                      task.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                      }`} aria-hidden="true">
                        {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          task.completed ? 'text-slate-600 line-through' : 'text-slate-900'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-500">+{task.xp} XP</p>
                      </div>
                      {task.completed && (
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                          Done!
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div id="tab-panel-goals" role="tabpanel" aria-label="Saving Goals">
              <h2 className="font-semibold text-slate-900 mb-3">Saving Goals</h2>
              <div className="space-y-3">
                {SAVING_GOALS.map((goal) => {
                  const progress = (goal.saved / goal.target) * 100;
                  return (
                    <article key={goal.id} className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl" aria-hidden="true">
                          {goal.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{goal.title}</p>
                          <p className="text-sm text-slate-600">
                            AED {goal.saved} / AED {goal.target}
                          </p>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2 bg-slate-100 mb-2" />
                      <p className="text-xs text-slate-500">
                        {Math.round(progress)}% complete · AED {goal.target - goal.saved} to go
                      </p>
                    </article>
                  );
                })}

                {/* Add New Goal */}
                <button
                  className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-4 text-slate-600 font-medium hover:bg-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                  aria-label="Add a new saving goal"
                >
                  + Add New Goal
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
