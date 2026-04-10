import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import { 
  CheckCircle2, 
  BrainCircuit, 
  BadgeDollarSign, 
  Bell, 
  Activity, 
  Clock,
  ArrowUpRight,
  Stethoscope,
  XCircle
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

const recentActivity = [
  { id: 1, type: 'accepted', title: 'Consultation Accepted', patient: 'Brooklyn Simmons', time: '10 mins ago', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 2, type: 'ai_report', title: 'AI Report Generated', patient: 'Cameron Williamson', time: '45 mins ago', icon: BrainCircuit, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 3, type: 'earnings', title: 'Payment Received', amount: '$150.00', time: '2 hours ago', icon: BadgeDollarSign, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 4, type: 'declined', title: 'Consultation Declined', patient: 'Esther Howard', time: '3 hours ago', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
];

export default function Dashboard() {
  const { user } = useAppContext();
  const [liveAlerts, setLiveAlerts] = useState<any[]>([]);

  // Simulate incoming Live AI Alerts from mobile app
  useEffect(() => {
    const timer = setTimeout(() => {
      setLiveAlerts([{
        id: Date.now(),
        patient: 'Eleanor Pena',
        condition: 'Hypertension Spike Detected',
        severity: 'high'
      }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismissAlert = (id: number) => {
    setLiveAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'Dr. Smith'}
        </h1>
        <p className="text-slate-500 mt-1">Here's your comprehensive snapshot for today.</p>
      </motion.div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={14} /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-semibold">Accepted Requests</h3>
            <p className="text-3xl font-black text-slate-800 mt-1 tracking-tight">48</p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-sky-50 rounded-xl">
              <BrainCircuit size={24} className="text-sky-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              3 Requires Action
            </span>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-semibold">Pending AI Reports</h3>
            <p className="text-3xl font-black text-slate-800 mt-1 tracking-tight">14</p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <BadgeDollarSign size={24} className="text-violet-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={14} /> Today
            </span>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-semibold">Daily Earnings</h3>
            <p className="text-3xl font-black text-slate-800 mt-1 tracking-tight">$840.00</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Activity size={20} className="text-sky-500" /> Recent Activity
              </h2>
              <button className="text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors">
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Dot icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${activity.bg} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10`}>
                      <activity.icon size={16} className={activity.color} />
                    </div>
                    
                    {/* Activity Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-sky-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-slate-800 text-sm">{activity.title}</h3>
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                          <Clock size={12} /> {activity.time}
                        </div>
                      </div>
                      {activity.patient && (
                        <p className="text-xs text-slate-500 font-medium">Patient: <span className="text-slate-700">{activity.patient}</span></p>
                      )}
                      {activity.amount && (
                        <p className="text-xs text-slate-500 font-medium">Amount: <span className="text-emerald-600 font-bold">{activity.amount}</span></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live AI Alerts */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl" />
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <Bell size={20} className="text-sky-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">Live AI Alerts</h2>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {liveAlerts.length === 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="text-sm text-slate-400 font-medium text-center py-8"
                  >
                    Standing by. Monitoring active patient vitals...
                  </motion.p>
                )}

                {liveAlerts.map(alert => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="relative bg-slate-800 border border-rose-500/30 p-4 rounded-xl shadow-lg"
                  >
                    {/* Pulse effect wrapper */}
                    <div className="absolute inset-0 rounded-xl ring-2 ring-rose-500/50 animate-pulse pointer-events-none" />
                    
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                          <Stethoscope size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Urgent Review</p>
                          <h3 className="text-sm font-bold text-white">{alert.patient}</h3>
                        </div>
                      </div>
                      <button 
                        onClick={() => dismissAlert(alert.id)}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                    
                    <p className="text-rose-400 text-sm font-medium mt-2 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                      {alert.condition}
                    </p>
                    
                    <button className="w-full mt-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                      Open Medical Report
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
