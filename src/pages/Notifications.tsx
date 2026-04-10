import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import {
  Bell,
  BellRing,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Bot,
  Check,
  Clock,
  Search
} from 'lucide-react';

// --- Bell Ringing Lottie Animation ---
const bellRingingAnimation = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 64,
  h: 64,
  nm: 'Bell Ringing',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Bell',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 10, s: [15] },
            { t: 20, s: [-15] },
            { t: 30, s: [10] },
            { t: 40, s: [-5] },
            { t: 50, s: [0] },
            { t: 60, s: [0] },
          ],
        },
        p: { a: 0, k: [32, 28, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: { a: 0, k: [0, 0, 0] },
      shapes: [
        {
          ty: 'sh',
          d: 1,
          ks: {
            a: 0,
            k: {
              i: [[0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0]],
              v: [[-16, 0], [-16, -20], [16, -20], [16, 0], [8, 0], [8, 8], [-8, 8], [-8, 0]],
              c: true,
            },
          },
          nm: 'Bell Body',
          hd: false,
        },
        {
          ty: 'fl',
          c: { a: 0, k: [0.004, 0.502, 1, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
        {
          ty: 'el',
          d: 1,
          s: { a: 0, k: [8, 8] },
          p: { a: 0, k: [0, 12] },
        },
        {
          ty: 'fl',
          c: { a: 0, k: [1, 0.2, 0.4, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
      ],
    },
  ],
};

// --- Notification Types ---
type NotificationCategory = 'all' | 'patient' | 'system' | 'payment';
type NotificationType = 'urgent' | 'normal' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: React.ReactNode;
}

// --- Mock Notifications Data ---
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'urgent',
    category: 'patient',
    title: 'High Priority AI Report',
    message: 'New AI assessment for Eleanor Pena requires immediate review. Patient shows signs of acute respiratory infection.',
    timestamp: '2 mins ago',
    read: false,
  },
  {
    id: '2',
    type: 'success',
    category: 'payment',
    title: 'Payment Confirmed',
    message: 'Consultation fee of $150.00 has been successfully processed for Robert Fox.',
    timestamp: '15 mins ago',
    read: false,
  },
  {
    id: '3',
    type: 'normal',
    category: 'system',
    title: 'System Update Complete',
    message: 'Little Nurse AI v2.4.1 has been successfully deployed. New features include enhanced symptom analysis.',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    type: 'urgent',
    category: 'patient',
    title: 'Critical Lab Results',
    message: 'Lab results for Jenny Wilson show elevated white blood cell count. AI recommends immediate follow-up.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '5',
    type: 'success',
    category: 'payment',
    title: 'Subscription Renewed',
    message: 'Your monthly premium subscription has been renewed. Next billing date: Nov 15, 2024.',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'normal',
    category: 'system',
    title: 'New Protocol Available',
    message: 'Updated hypertension treatment guidelines (JNC 9) are now available in the Medical Library.',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '7',
    type: 'urgent',
    category: 'patient',
    title: 'Emergency Consultation Request',
    message: 'Patient Cody Fisher has requested an emergency consultation for severe migraine with neurological symptoms.',
    timestamp: '6 hours ago',
    read: false,
  },
  {
    id: '8',
    type: 'success',
    category: 'payment',
    title: 'Insurance Claim Approved',
    message: 'Insurance claim #CLM-2024-8847 for Wade Warren has been approved. Amount: $320.00',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: '9',
    type: 'normal',
    category: 'system',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for Sunday, Nov 10, 2024 from 2:00 AM - 4:00 AM EST.',
    timestamp: '2 days ago',
    read: true,
  },
];

// --- Notification Item Component ---
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onClick: () => void;
}

function NotificationItem({ notification, onMarkAsRead, onClick }: NotificationItemProps) {
  const getIcon = () => {
    if (notification.type === 'urgent') {
      return (
        <div className="relative">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
        </div>
      );
    }
    if (notification.type === 'success') {
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    }
    return <BellRing className="w-5 h-5 text-sky-500" />;
  };

  const getCategoryBadge = () => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      patient: { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Patient Request' },
      system: { bg: 'bg-sky-50', text: 'text-sky-600', label: 'System Update' },
      payment: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Payment' },
    };
    const badge = badges[notification.category];
    if (!badge) return null;
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
        notification.read
          ? 'bg-white border-slate-100'
         : 'bg-sky-50/30 border-sky-200'
      } hover:border-sky-300 hover:shadow-md hover:shadow-sky-100/50`}
      onClick={() => {
        if (!notification.read) onMarkAsRead(notification.id);
        onClick();
      }}
    >
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-bold text-sm ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
              {notification.title}
            </h4>
            {getCategoryBadge()}
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mb-2">{notification.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {notification.timestamp}
            </span>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-sky-500" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Notifications Component ---
export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [showBellAnimation, setShowBellAnimation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Hide bell animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBellAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationStats = () => {
    const patientRequests = notifications.filter((n) => n.category === 'patient').length;
    const systemUpdates = notifications.filter((n) => n.category === 'system').length;
    const paymentConfirmations = notifications.filter((n) => n.category === 'payment').length;
    return { patientRequests, systemUpdates, paymentConfirmations };
  };

  const stats = getNotificationStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-offwhite py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center relative">
                  <Bell className="w-5 h-5 text-sky-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                Notifications
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Stay updated with patient requests, system alerts, and payments
              </p>
            </div>

            {/* Bell Animation Overlay */}
            <AnimatePresence>
              {showBellAnimation && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative"
                >
                  <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                    <Lottie
                      animationData={bellRingingAnimation}
                      loop={false}
                      style={{ width: 48, height: 48 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
          <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-500">Patient Requests</span>
            </div>
            <p className="text-2xl font-bold text-rose-600">{stats.patientRequests}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-3 h-3 text-sky-500" />
              <span className="text-xs font-medium text-slate-500">System Updates</span>
            </div>
            <p className="text-2xl font-bold text-sky-600">{stats.systemUpdates}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-slate-500">Payments</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.paymentConfirmations}</p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border-2 border-sky-200 shadow-lg shadow-sky-100/50 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                />
              </div>

              {/* Mark All as Read */}
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-sky-300 hover:text-sky-600 transition-colors text-sm font-medium"
                >
                  <Check className="w-4 h-4" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {[
                { key: 'all', label: 'All', count: notifications.length },
                { key: 'patient', label: 'Patient Requests', count: stats.patientRequests },
                { key: 'system', label: 'System Updates', count: stats.systemUpdates },
                { key: 'payment', label: 'Payment Confirmations', count: stats.paymentConfirmations },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as NotificationCategory)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeCategory === tab.key
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      activeCategory === tab.key
                        ? 'bg-white/20'
                        : 'bg-slate-200'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">No notifications found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : "You're all caught up!"}
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredNotifications.map((notification) => (
                  <motion.div key={notification.id} variants={itemVariants}>
                    <NotificationItem
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onClick={() => {}}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            </div>
          </motion.div>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
