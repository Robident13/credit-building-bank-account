import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Edit2, DollarSign, Lock, Unlock } from 'lucide-react';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { CHILDREN, AVAILABLE_BLOCK_CATEGORIES } from '../data/mockData';

export default function ManageChildScreen() {
  const { childName } = useParams<{ childName: string }>();
  const navigate = useNavigate();

  const child = childName ? CHILDREN[childName] : undefined;
  const [tasks, setTasks] = useState(child?.tasks || []);

  // Redirect if child not found
  if (!childName || !child) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-100 p-8">
        <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Child Not Found</h1>
        <p className="text-slate-600 text-center mb-6">We couldn't find a profile for that child.</p>
        <button
          onClick={() => navigate('/parent')}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, active: !task.active } : task
    ));
  };

  const spendingLimitItems = [
    { label: 'Daily Limit', sublabel: 'Maximum per day', value: child.spendingLimits.daily, color: 'bg-blue-100 text-blue-600' },
    { label: 'Weekly Limit', sublabel: 'Maximum per week', value: child.spendingLimits.weekly, color: 'bg-purple-100 text-purple-600' },
    { label: 'Monthly Limit', sublabel: 'Maximum per month', value: child.spendingLimits.monthly, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-100">
      {/* Back Button */}
      <div className="px-6 pt-6 pb-2 bg-white flex-shrink-0">
        <button
          onClick={() => navigate('/parent')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
          aria-label="Back to parent dashboard"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <header className="px-6 pt-4 pb-4 bg-white flex-shrink-0 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${child.color} flex items-center justify-center text-3xl`} aria-hidden="true">
            {child.emoji}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Manage Child</p>
            <h1 className="text-2xl font-bold text-slate-900">{childName}</h1>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Tasks Management */}
        <section className="px-6 pt-6 pb-4" aria-label="Tasks and rewards">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Tasks & Rewards</h2>
            <button
              className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label="Add a new task"
            >
              <Plus size={16} aria-hidden="true" />
              Add Task
            </button>
          </div>

          <ul className="space-y-3 list-none p-0 m-0">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-900">{task.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        task.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {task.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>+{task.xp} XP</span>
                      <span>AED {task.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                      aria-label={`Edit task: ${task.title}`}
                    >
                      <Edit2 size={16} className="text-slate-600" />
                    </button>
                    <button
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-red-600"
                      aria-label={`Delete task: ${task.title}`}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <label htmlFor={`task-toggle-${task.id}`} className="text-sm text-slate-600">Enable Task</label>
                  <Switch
                    id={`task-toggle-${task.id}`}
                    checked={task.active}
                    onCheckedChange={() => toggleTask(task.id)}
                    aria-label={`Toggle ${task.title}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Spending Limits */}
        <section className="px-6 pb-4" aria-label="Spending limits">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Spending Limits</h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {spendingLimitItems.map((item, index) => (
              <div
                key={item.label}
                className={`p-4 flex justify-between items-center ${
                  index < spendingLimitItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                    <DollarSign size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.sublabel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">AED {item.value}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors" aria-label={`Edit ${item.label}`}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blocked Categories */}
        <section className="px-6 pb-6" aria-label="Blocked categories">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Blocked Categories</h2>
            <button
              className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label="Add a new block"
            >
              <Plus size={16} aria-hidden="true" />
              Add Block
            </button>
          </div>

          <ul className="space-y-2 list-none p-0 m-0">
            {child.blockedCategories.map((category, index) => (
              <li key={index} className="bg-white rounded-xl p-4 border border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center" aria-hidden="true">
                    <Lock size={18} className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{category}</p>
                    <p className="text-xs text-red-600">Blocked</p>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-red-600"
                  aria-label={`Unblock ${category}`}
                >
                  <Unlock size={16} className="text-red-600" />
                </button>
              </li>
            ))}
          </ul>

          {/* Available Categories */}
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 mb-2">Available to Block</p>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BLOCK_CATEGORIES.map((category) => (
                <button
                  key={category}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                  aria-label={`Block ${category}`}
                >
                  + {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
