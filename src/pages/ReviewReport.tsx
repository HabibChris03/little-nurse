import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Thermometer,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  User,
  Bot,
  Sparkles
} from 'lucide-react';

// --- Pulsing Heart Lottie Animation ---
const pulsingHeartAnimation = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 64,
  h: 64,
  nm: 'Pulsing Heart',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Heart',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100] },
            { t: 15, s: [120, 120, 100] },
            { t: 30, s: [100, 100, 100] },
            { t: 45, s: [115, 115, 100] },
            { t: 60, s: [100, 100, 100] },
          ],
        },
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
              v: [[-20, 0], [-5, 15], [30, -20]],
              c: false,
            },
          },
          nm: 'Heart Path',
          hd: false,
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

// --- Success Checkmark Lottie Animation ---
const successCheckmarkAnimation = {
  v: '5.5.2',
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Success',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Check',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0, 0, 100] },
            { t: 30, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              d: 1,
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-20, 0], [-5, 15], [30, -20]],
                  c: false,
                },
              },
              nm: 'Path 1',
              hd: false,
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.133, 0.772, 0.368, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 12 },
              lc: 2,
              lj: 2,
              d: [
                { n: 'd', nm: 'dash', v: { a: 0, k: 200 } },
                { n: 'o', nm: 'offset', v: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [200] }, { t: 45, s: [0] }] } },
              ],
              nm: 'Stroke 1',
              hd: false,
            },
          ],
          nm: 'Check Shape',
          np: 2,
          cix: 2,
          bm: 0,
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

// --- Types ---
type SenderType = 'ai' | 'patient';

interface TranscriptMessage {
  id: number;
  sender: SenderType;
  text: string;
  timestamp: string;
}

// --- Mock AI Transcript Data ---
const aiTranscript: TranscriptMessage[] = [
  { id: 1, sender: 'ai', text: "Hello! I'm Little Nurse, your AI health assistant. I'm here to help assess your symptoms. How are you feeling today?", timestamp: '10:30 AM' },
  { id: 2, sender: 'patient', text: "I've been feeling really unwell for the past two days. I have a high fever and my body aches all over.", timestamp: '10:31 AM' },
  { id: 3, sender: 'ai', text: "I'm sorry to hear you're not feeling well. A fever with body aches can indicate several conditions. Let me ask you a few questions to help assess your situation. What's your current temperature?", timestamp: '10:31 AM' },
  { id: 4, sender: 'patient', text: "It's around 101.5°F. I also have a really bad headache and my throat hurts when I swallow.", timestamp: '10:32 AM' },
  { id: 5, sender: 'ai', text: "Thank you for that information. A temperature of 101.5°F is definitely a fever. The combination of fever, body aches, headache, and sore throat suggests you may have a viral or bacterial infection. Have you noticed any other symptoms like cough, runny nose, or difficulty breathing?", timestamp: '10:33 AM' },
  { id: 6, sender: 'patient', text: "Yes, I have a dry cough and I feel very tired. I can barely get out of bed.", timestamp: '10:34 AM' },
  { id: 7, sender: 'ai', text: "I understand. Based on your symptoms - fever, body aches, headache, sore throat, dry cough, and fatigue - this appears to be a significant respiratory infection. I'm going to flag this for immediate review by one of our doctors. In the meantime, please stay hydrated and rest.", timestamp: '10:35 AM' },
  { id: 8, sender: 'patient', text: "Should I be worried? This feels worse than a regular cold.", timestamp: '10:36 AM' },
  { id: 9, sender: 'ai', text: "Your symptoms do suggest something more serious than a common cold. While many respiratory infections are viral and resolve on their own, some may require medical treatment. A doctor will review your case shortly and may want to see you for an examination. Please monitor your temperature and seek immediate care if you develop difficulty breathing.", timestamp: '10:37 AM' },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: string;
}

function AccordionItem({ title, icon, isOpen, onToggle, children, badge }: AccordionItemProps) {
  return (
    <div className="border border-sky-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-sky-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-800">{title}</h3>
            {badge && (
              <span className="text-xs font-medium text-sky-600">{badge}</span>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 pt-2 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Chat Message Component ---
interface ChatMessageProps {
  sender: SenderType;
  text: string;
  timestamp: string;
}

function ChatMessage({ sender, text, timestamp }: ChatMessageProps) {
  const isAI = sender === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAI ? 'bg-sky-100' : 'bg-slate-200'
        }`}
      >
        {isAI ? (
          <Bot className="w-4 h-4 text-sky-600" />
        ) : (
          <User className="w-4 h-4 text-slate-600" />
        )}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isAI ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isAI
              ? 'bg-sky-50 text-slate-700 rounded-tl-md'
              : 'bg-slate-100 text-slate-700 rounded-tr-md'
          }`}
        >
          {text}
        </div>
        <span className="text-[10px] text-slate-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
}

// --- Main ReviewReport Component ---
export default function ReviewReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState<string | null>('summary');
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Get patient data from navigation state or use fallback
  const passedPatient = location.state?.patient;
  const patientData = {
    caseId: passedPatient?.id || 'CASE-2024-7842',
    initials: passedPatient?.patient?.split(' ').map(n => n[0]).join('') || 'EP',
    name: passedPatient?.patient || 'Eleanor Pena',
    age: passedPatient?.age || 45,
    distressLevel: passedPatient?.urgency || 'High',
  };

  // Mock vitals
  const vitals = {
    temperature: '101.5°F',
    painLevel: 7,
    duration: '48 hours',
    heartRate: '92 bpm',
  };

  // Symptoms list
  const symptoms = [
    'High fever (101.5°F)',
    'Severe body aches',
    'Persistent headache',
    'Sore throat',
    'Dry cough',
    'Extreme fatigue',
  ];

  // AI Summary
  const aiSummary = passedPatient?.aiSummary || `Patient presents with acute respiratory symptoms including high fever, body aches, and fatigue lasting 48 hours. AI assessment indicates a probable viral or bacterial respiratory infection requiring immediate physician evaluation. Self-reported vitals show elevated temperature and moderate pain levels.`;

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleAcceptConsultation = () => {
    setIsVerifying(true);
    setProgress(0);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setShowSuccess(true);

          // Navigate to consultation after success animation
          setTimeout(() => {
            navigate('/consultation');
          }, 2500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
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
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-sky-600" />
            </div>
            AI Assessment Report
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review the AI-generated analysis before starting the consultation
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-sky-50 to-white p-6 border-b border-sky-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Case ID Badge */}
                <div className="px-4 py-2 bg-sky-100 rounded-xl">
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                    {patientData.caseId}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                    {patientData.initials}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">{patientData.name}</h2>
                    <p className="text-sm text-slate-500">
                      {patientData.age} years • Distress Level:{' '}
                      <span className="text-rose-500 font-semibold">
                        {patientData.distressLevel}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Pulsing Heart Animation */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                  <Lottie
                    animationData={pulsingHeartAnimation}
                    loop={true}
                    style={{ width: 32, height: 32 }}
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-rose-500 flex items-center justify-end gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Active Request
                  </p>
                  <p className="text-[10px] text-slate-400">AI Assessment Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              AI Analysis
            </h3>

            {/* Summary Accordion */}
            <AccordionItem
              title="AI Summary"
              icon={<AlertCircle className="w-4 h-4" />}
              isOpen={openAccordion === 'summary'}
              onToggle={() => toggleAccordion('summary')}
              badge="High Priority"
            >
              <p className="text-sm text-slate-600 leading-relaxed">{aiSummary}</p>
            </AccordionItem>

            {/* Symptom Log Accordion */}
            <AccordionItem
              title="Symptom Log"
              icon={<Activity className="w-4 h-4" />}
              isOpen={openAccordion === 'symptoms'}
              onToggle={() => toggleAccordion('symptoms')}
              badge={`${symptoms.length} symptoms reported`}
            >
              <ul className="space-y-2">
                {symptoms.map((symptom, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            {/* AI Transcript Accordion */}
            <AccordionItem
              title="AI Transcript"
              icon={<MessageCircle className="w-4 h-4" />}
              isOpen={openAccordion === 'transcript'}
              onToggle={() => toggleAccordion('transcript')}
              badge={`${aiTranscript.length} messages`}
            >
              <div
                ref={transcriptRef}
                className="max-h-80 overflow-y-auto space-y-4 p-2 custom-scrollbar"
              >
                {aiTranscript.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    sender={msg.sender}
                    text={msg.text}
                    timestamp={msg.timestamp}
                  />
                ))}
              </div>
            </AccordionItem>

            {/* Vitals Mock-up */}
            <AccordionItem
              title="Self-Reported Vitals"
              icon={<Thermometer className="w-4 h-4" />}
              isOpen={openAccordion === 'vitals'}
              onToggle={() => toggleAccordion('vitals')}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-medium text-slate-500">Temp</span>
                  </div>
                  <p className="text-xl font-bold text-rose-600">{vitals.temperature}</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-slate-500">Pain</span>
                  </div>
                  <p className="text-xl font-bold text-amber-600">{vitals.painLevel}/10</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-medium text-slate-500">Duration</span>
                  </div>
                  <p className="text-xl font-bold text-sky-600">{vitals.duration}</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-slate-500">Heart Rate</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-600">{vitals.heartRate}</p>
                </div>
              </div>
            </AccordionItem>
          </div>

          {/* Action Button */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleAcceptConsultation}
              disabled={isVerifying}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Consultation Fee...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Accept & Start Consultation
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              By accepting, you agree to begin the video consultation with this patient
            </p>
          </div>
        </motion.div>
      </div>

      {/* Verification Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-100 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Verifying Consultation Fee...
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Please wait while we process the payment verification
                </p>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-right">
                    {Math.round(Math.min(progress, 100))}%
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-10 max-w-sm mx-4 shadow-2xl text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4">
                <Lottie animationData={successCheckmarkAnimation} loop={false} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Consultation Approved!
              </h3>
              <p className="text-slate-500 text-sm">
                Connecting you to the video consultation...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
