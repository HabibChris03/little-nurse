import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { 
  Users, 
  BrainCircuit, 
  Clock, 
  CheckCircle2, 
  Stethoscope,
  Activity
} from 'lucide-react';

// --- Minimal Lottie Spinner Data ---
const spinnerLottieData = {
  v: "5.5.2",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Spinner",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "Layer 1", sr: 1, ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      }, shapes: [
        {
          ty: "el", d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] }, nm: "Ellipse 1", hd: false
        },
        {
          ty: "st", c: { a: 0, k: [0.0, 0.498, 1.0, 1.0] }, o: { a: 0, k: 100 }, w: { a: 0, k: 12 }, lc: 2, lj: 2, d: [{ n: "d", nm: "dash", v: { a: 0, k: 80 } }, { n: "g", nm: "gap", v: { a: 0, k: 120 } }], nm: "Stroke 1", hd: false
        }
      ], ip: 0, op: 60, st: 0, bm: 0
    }
  ]
};

// Mock Queue Database
const mockQueue = [
  {
    id: 'Q-001',
    patient: 'Jenny Wilson',
    age: 36,
    waitTime: '12 mins',
    urgency: 'Medium',
    avatar: 'https://i.pravatar.cc/150?u=12',
    aiSummary: 'Patient reports persistent abdominal pain localized to the lower right quadrant began 4 hours ago. Symptoms include mild nausea. No history of appendicitis. Vitals indicate slight fever (99.8°F). Recommend immediate physical assessment.',
  },
  {
    id: 'Q-002',
    patient: 'Robert Fox',
    age: 55,
    waitTime: '24 mins',
    urgency: 'High',
    avatar: 'https://i.pravatar.cc/150?u=15',
    aiSummary: 'Continuous chest pressure spanning 2 hours. Diaphoresis reported. Patient has a history of type 2 diabetes and hypertension. AI flags elevated risk of acute coronary syndrome. ECG analysis strongly recommended upon entry.',
  },
  {
    id: 'Q-003',
    patient: 'Wade Warren',
    age: 28,
    waitTime: '35 mins',
    urgency: 'Low',
    avatar: 'https://i.pravatar.cc/150?u=22',
    aiSummary: 'Dermatological complaint. Pruritic rash developed on bilateral forearms after hiking trip. No systemic symptoms. AI cross-reference suggests possible contact dermatitis (e.g., Toxicodendron radicans exposure). Routine visual exam sufficient.',
  },
  {
    id: 'Q-004',
    patient: 'Cody Fisher',
    age: 41,
    waitTime: '45 mins',
    urgency: 'Medium',
    avatar: 'https://i.pravatar.cc/150?u=28',
    aiSummary: 'Severe migraine presentation. Patient notes photophobia and phonophobia. Previous response to Sumatriptan was effective. Vital signs stable. Neurological baseline intact per AI preliminary survey.',
  }
];

export default function Queue() {
  const navigate = useNavigate();
  const [queue, setQueue] = useState(mockQueue);
  const [verifyingPatientId, setVerifyingPatientId] = useState<string | null>(null);

  const handleAccept = (patientId: string) => {
    setVerifyingPatientId(patientId);
    
    // Simulate payment verification & routing
    setTimeout(() => {
      setVerifyingPatientId(null);
      // Remove from queue locally
      setQueue(prev => prev.filter(p => p.id !== patientId));
      navigate('/consultation');
    }, 2000);
  };

  const selectedPatientName = queue.find(p => p.id === verifyingPatientId)?.patient;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <Users className="text-sky-500" size={32} />
            Patient Queue
          </h1>
          <p className="text-slate-500 mt-1">Review AI pre-assessments and accept consultations.</p>
        </div>
        <div className="bg-sky-50 text-sky-600 px-4 py-2 rounded-xl border border-sky-100 font-bold text-sm shadow-sm">
          {queue.length} Waiting
        </div>
      </div>

      {/* Styled Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6 pb-10">
          <AnimatePresence>
            {queue.map((patient, idx) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-sky-200 transition-colors group relative overflow-hidden"
              >
                {/* Visual urgency strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  patient.urgency === 'High' ? 'bg-rose-500' : 
                  patient.urgency === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Patient Info Column */}
                  <div className="md:w-1/3 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={patient.avatar} alt={patient.patient} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{patient.patient}</h3>
                        <p className="text-xs text-slate-500 font-medium">Age: {patient.age} yrs</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-600 font-medium">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> Wait Time:</span>
                        <span className="font-bold text-slate-800">{patient.waitTime}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="flex items-center gap-1.5"><Activity size={16} className="text-slate-400" /> Urgency:</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                           patient.urgency === 'High' ? 'bg-rose-50 text-rose-600' :
                           patient.urgency === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {patient.urgency}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button 
                        onClick={() => navigate('/review-report', { state: { patient } })}
                        className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold transition-colors text-sm"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleAccept(patient.id)}
                        className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-md shadow-sky-500/20 font-bold transition-all text-sm flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={16} />
                        Accept
                      </button>
                    </div>
                  </div>

                  {/* AI Overview Column */}
                  <div className="md:w-2/3 flex flex-col relative pt-2">
                    <div className="absolute top-0 right-0 -m-2 p-2 bg-sky-50 rounded-xl text-sky-500 opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity">
                      <BrainCircuit size={28} />
                    </div>
                    
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Stethoscope size={16} /> Autonomous AI Triage Summary
                    </h4>
                    
                    <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex-1 leading-relaxed text-sm text-slate-700 italic border-l-4 border-l-sky-400 shadow-inner">
                      "{patient.aiSummary}"
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {queue.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <BrainCircuit size={64} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-400">Queue is empty</h3>
                <p className="text-slate-400 text-sm mt-2">All patients have been triaged.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Payment Verification Dialog */}
      <AnimatePresence>
        {verifyingPatientId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 overflow-hidden z-10 mx-4 border border-white/20"
            >
              {/* Background gradient orb */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-200/50 rounded-full blur-[60px]" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-32 h-32 mb-2 relative">
                  <Lottie animationData={spinnerLottieData} loop={true} className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wallet size={24} className="text-sky-500 animate-pulse" />
                  </div>
                </div>
                
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                  Verifying Payment...
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                  Securing authorization hold for <span className="text-slate-800 font-bold">{selectedPatientName}</span>. Please hold.
                </p>
                
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-1/2 h-full bg-sky-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Temporary internal Wallet icon since it wasn't imported to avoid too many imports at top
function Wallet(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}
