import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bell,
  MessageCircleQuestion,
  User,
  Settings,
  Trash2,
  ChevronDown,
  BookOpen,
  ClipboardList,
} from 'lucide-react';
import Applogo from '../assets/logo-app.png';

// ── Nav items — Only verified lucide-react icons used ──
const navItems = [
  { name: 'Dashboard',       path: '/',                icon: LayoutDashboard,       end: true  },
  { name: 'Queue',           path: '/queue',           icon: Users,                 end: false },
  { name: 'Reports',         path: '/reports',         icon: FileText,              end: false },
  { name: 'Wallet',          path: '/wallet',          icon: Wallet,                end: false },
  { name: 'Consultation',    path: '/consultation',    icon: MessageSquare,         end: false },
  { name: 'Admin Chat',      path: '/admin-chat',      icon: MessageCircleQuestion, end: false },
];

// ── Reusable sidebar nav content (shared between mobile + desktop) ──
interface SidebarContentProps {
  onNavClick?: () => void;
  onLogout: () => void;
}

function SidebarContent({ onNavClick, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shadow-lg shadow-sky-500/30">
          <img src={Applogo} alt="Little Nurse" className="w-8 h-8" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent tracking-tight">
          Little Nurse
        </span>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-2">
          Main Menu
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-sky-50 text-sky-600 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={isActive ? 'text-sky-500' : 'text-slate-400'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sign Out */}
      <div className="shrink-0 p-4 border-t border-slate-200/50">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Main Layout ──
export default function Layout() {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Consultation uses a full-height split panel — no padding on the outlet
  const isConsultation = location.pathname === '/consultation';

  const toggleStatus = () => {
    if (user) setUser({ ...user, isOnline: !user.isOnline });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-offwhite overflow-hidden text-slate-800">

      {/* ─── Mobile backdrop ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile Sidebar (slide-over) ─── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          bg-white backdrop-blur-xl border-r border-slate-200
          shadow-xl transition-transform duration-300 ease-in-out
          lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>
        <SidebarContent
          onNavClick={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {/* ─── Desktop Sidebar (always visible, in document flow) ─── */}
      <aside className="hidden lg:block w-72 shrink-0 h-full bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-[2px_0_16px_rgba(0,0,0,0.04)]">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* ─── Main Area ─── */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-20 shrink-0 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 flex items-center justify-between px-5 lg:px-10 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-bold text-slate-800 hidden sm:block">Portal Overview</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Status toggle */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
              <span className={`text-sm font-semibold ${user?.isOnline ? 'text-emerald-500' : 'text-slate-400'}`}>
                {user?.isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={toggleStatus}
                className={`w-10 h-5 rounded-full p-0.5 flex items-center transition-colors ${user?.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: user?.isOnline ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Medical Library */}
            <button
              onClick={() => navigate('/medical-library')}
              className="p-2 text-slate-400 hover:text-sky-500 transition-colors"
              title="Medical Library"
            >
              <BookOpen size={22} />
            </button>

            {/* Bell */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-slate-400 hover:text-sky-500 transition-colors"
            >
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Profile */}
            <div className="relative">
              <div
                className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
                onClick={() => setShowDropdown((v) => !v)}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{user?.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                </div>
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150'}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-slate-200 group-hover:border-sky-400 transition-colors"
                  />
                  <ChevronDown className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <AnimatePresence>
                {showDropdown && (
                  <>
                    <motion.div
                      key="dropdown-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    />
                    <motion.div
                      key="dropdown-menu"
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-sky-600" />
                          </div>
                          <span className="font-medium text-sm">Profile</span>
                        </button>
                        <button
                          onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                            <Settings className="w-4 h-4 text-sky-600" />
                          </div>
                          <span className="font-medium text-sm">Settings</span>
                        </button>
                        <div className="my-1 border-t border-slate-100" />
                        <button
                          onClick={() => {
                            if (window.confirm('Delete your account? This cannot be undone.')) handleLogout();
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-rose-600" />
                          </div>
                          <span className="font-medium text-sm">Delete Account</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ─── Page Outlet ───
            /consultation → full-height flex container (no padding, no overflow-y-auto)
            All other pages → normal scrollable padded block
        */}
        <div
          className={
            isConsultation
              ? 'flex-1 min-h-0 overflow-hidden flex flex-col p-4 lg:p-6'
              : 'flex-1 overflow-y-auto p-5 lg:p-8'
          }
        >
          <Outlet />
        </div>

      </main>
    </div>
  );
}