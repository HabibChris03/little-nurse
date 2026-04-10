import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, DollarSign, Download, CreditCard, ChevronRight } from 'lucide-react';

const transactions = [
  { id: 'TXN-9901', date: 'Oct 12, 2026', type: 'Consultation Fee', amount: 150.00, status: 'Completed', patient: 'Eleanor Pena' },
  { id: 'TXN-9902', date: 'Oct 11, 2026', type: 'Prescription Refill', amount: 25.00, status: 'Completed', patient: 'Cameron Williamson' },
  { id: 'TXN-9903', date: 'Oct 10, 2026', type: 'Follow-up Checkup', amount: 75.00, status: 'Completed', patient: 'Esther Howard' },
  { id: 'TXN-9904', date: 'Oct 08, 2026', type: 'Platform Payout', amount: -1250.00, status: 'Processed', patient: 'Bank Transfer' },
  { id: 'TXN-9905', date: 'Oct 05, 2026', type: 'Consultation Fee', amount: 150.00, status: 'Completed', patient: 'Wade Warren' },
];

export default function Wallet() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Header Info */}
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Earnings & Wallet</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your payouts and consultation earnings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm font-semibold text-sm">
          <Download size={16} />
          Export Statement
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div variants={itemVariants} className="md:col-span-2 relative bg-gradient-to-br from-sky-500 to-sky-700 rounded-3xl p-8 overflow-hidden shadow-2xl shadow-sky-500/20 text-white flex flex-col justify-between min-h-[240px]">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <WalletIcon size={160} />
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sky-100 font-medium tracking-wide uppercase text-sm mb-1">Available Balance</p>
                <h2 className="text-5xl font-extrabold tracking-tight">$3,450.00</h2>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <DollarSign size={28} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-8 z-10">
            <button 
              onClick={handlePayout}
              disabled={isProcessing}
              className="px-8 py-3.5 bg-white text-sky-600 rounded-2xl font-bold hover:bg-sky-50 transition-colors shadow-lg flex items-center gap-2 min-w-[160px] justify-center"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-sky-600/30 border-t-sky-600 rounded-full animate-spin" />
              ) : (
                <>Withdraw Funds <ArrowUpRight size={18} /></>
              )}
            </button>
            <button className="px-6 py-3.5 bg-sky-600 border border-sky-400/50 hover:bg-sky-500 rounded-2xl font-bold transition-colors text-white">
              Bank Details
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[240px]">
          <div>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-4">Current Month</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ArrowDownLeft size={18} /></div>
                  <span className="font-semibold text-slate-700">Income</span>
                </div>
                <span className="font-bold text-slate-800">$4,850.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><ArrowUpRight size={18} /></div>
                  <span className="font-semibold text-slate-700">Payouts</span>
                </div>
                <span className="font-bold text-slate-800">-$1,400.00</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4">
            <div className="flex justify-between items-center text-sm font-semibold text-sky-600 hover:text-sky-700 cursor-pointer">
              View Analytics <ChevronRight size={16} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction List */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
          <button className="text-sky-500 font-semibold text-sm hover:text-sky-600 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold text-xs tracking-wider uppercase border-b border-slate-100">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 group-hover:text-sky-600 transition-colors">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{tx.type}</p>
                    <p className="text-xs font-medium text-slate-500">{tx.patient}</p>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        tx.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                     }`}>
                       {tx.status}
                     </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative bg-white rounded-3xl p-8 flex flex-col items-center shadow-2xl max-w-sm mx-4"
             >
               <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                 <CreditCard size={32} />
               </div>
               <h3 className="text-xl font-extrabold text-slate-800 mb-1">Payout Initiated!</h3>
               <p className="text-center text-slate-500 text-sm font-medium">Your funds are being transferred to your bank account. It typically takes 1-2 business days.</p>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
