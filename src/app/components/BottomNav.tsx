import { useNavigate, useLocation } from 'react-router';

const navItems = [
  { path: '/parent', label: 'Parent', emoji: '👨‍👩‍👧' },
  { path: '/child', label: 'Child', emoji: '😊' },
  { path: '/learn', label: 'Learn', emoji: '📚' },
  { path: '/settings', label: 'Settings', emoji: '⚙️' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      aria-label="Main navigation"
      className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pb-6 pt-3 z-10"
    >
      <ul className="flex justify-around items-center list-none m-0 p-0">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                aria-label={`Go to ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 min-w-[60px] py-1 rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                  isActive ? 'scale-110' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
