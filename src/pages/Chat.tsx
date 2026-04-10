import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function Chat() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]"
    >
      <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-6">
        <MessageSquare size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Active Consultation</h2>
      <p className="text-slate-500 max-w-md mx-auto mt-2">
        You have successfully accepted the patient. The secure chat relay is being established...
      </p>
    </motion.div>
  );
}
