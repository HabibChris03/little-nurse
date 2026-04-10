import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useAppContext, type Report } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Mic, 
  MicOff,
  VideoOff,
  PhoneOff, 
  Image as ImageIcon, 
  MoreVertical,
  Plus,
  Trash2,
  FileCheck2,
  Stethoscope,
  TestTube2,
  ClipboardList
} from 'lucide-react';

// --- Minimal Success Lottie Data ---
const successLottieData = {
  v: "5.5.2",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Success",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "Check", sr: 1, ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0, 0, 100] }, { t: 30, s: [100, 100, 100] }] }
      }, shapes: [
        {
          ty: "gr", it: [
            { ty: "sh", d: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0]], v: [[-20, 0], [-5, 15], [30, -20]], c: false } }, nm: "Path 1", hd: false },
            { ty: "st", c: { a: 0, k: [0.133, 0.772, 0.368, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 12 }, lc: 2, lj: 2, d: [{ n: "d", nm: "dash", v: { a: 0, k: 200 } }, { n: "o", nm: "offset", v: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [200] }, { t: 45, s: [0] }] } }], nm: "Stroke 1", hd: false }
          ], nm: "Check Shape", np: 2, cix: 2, bm: 0, hd: false
        }
      ], ip: 0, op: 60, st: 0, bm: 0
    }
  ]
};

interface Medication {
  id: string;
  name: string;
  dose: string;
  timing: { morning: boolean; afternoon: boolean; evening: boolean };
}

interface MedicalTest {
  id: string;
  name: string;
  priority: 'routine' | 'urgent' | 'stat';
  notes: string;
}

// Common medical tests options
const commonMedicalTests = [
  'Complete Blood Count (CBC)',
  'Basic Metabolic Panel (BMP)',
  'Comprehensive Metabolic Panel (CMP)',
  'Lipid Panel',
  'Liver Function Test (LFT)',
  'Thyroid Panel (TSH, T3, T4)',
  'Hemoglobin A1C',
  'Urinalysis',
  'Chest X-Ray',
  'ECG/EKG',
  'Blood Culture',
  'COVID-19 PCR Test',
  'Influenza A/B Test',
  'Streptococcus Test',
  'Pregnancy Test (hCG)',
  'Vitamin D Level',
  'Iron Studies',
  'Coagulation Panel (PT/INR, PTT)',
  'HIV Test',
  'Hepatitis B/C Panel',
  'Prostate-Specific Antigen (PSA)',
  'D-dimer',
  'C-reactive Protein (CRP)',
  'Erythrocyte Sedimentation Rate (ESR)',
  'Allergy Testing',
  'Autoimmune Panel',
  'Genetic Testing',
  'Bone Density Scan (DEXA)',
  'Mammogram',
  'Pap Smear',
  'Colonoscopy',
  'Electrolyte Panel',
  'Arterial Blood Gas (ABG)',
  'Coombs Test',
  'Glycated Hemoglobin (HbA1c)',
  'Lactate Dehydrogenase (LDH)',
  'Amylase and Lipase',
  'Rheumatoid Factor (RF)',
  'Antinuclear Antibody (ANA)',
  'Creatine Kinase (CK)',
  'Prothrombin Time (PT)',
  'Partial Thromboplastin Time (PTT)',
  'Vitamin B12 Level',
  'Folate Level',
  'Cortisol Level',
  'Procalcitonin',
  'Full Blood Count (FBC)',
  'Serum Protein Electrophoresis (SPEP)',
  'Beta-hCG Quantitative',
  'Erythropoietin Level',
  'Serum Osmolality',
  'Lipid Panel with Direct LDL',
  'Renal Function Panel',
  'Liver Panel with GGT',
  'Thyroid Function Panel with Antibodies',
  'Infectious Disease Panel',
  'Autoimmune Disease Panel',
  'Genetic Mutation Panel',
  'Bone Metabolism Panel',
  'Cardiac Enzyme Panel',
  'Neurological Panel',
  'Blood Glucose Test',
];

export default function Consultation() {
  const { setReports } = useAppContext();
  const navigate = useNavigate();

  // Video State
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [blurBg, setBlurBg] = useState(false);

  // Prescription State
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: '', dose: '', timing: { morning: false, afternoon: false, evening: false } }
  ]);
  const [medicalTests, setMedicalTests] = useState<MedicalTest[]>([]);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [filteredTests, setFilteredTests] = useState<string[]>(commonMedicalTests);
  const [testSearchQuery, setTestSearchQuery] = useState('');
  const [notes, setNotes] = useState('');
  
  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addMedication = () => {
    setMedications([...medications, { id: crypto.randomUUID(), name: '', dose: '', timing: { morning: false, afternoon: false, evening: false } }]);
  };

  const removeMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(m => m.id !== id));
    }
  };

  const updateMedication = (id: string, field: string, value: any) => {
    setMedications(meds => meds.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const updateTiming = (id: string, time: 'morning' | 'afternoon' | 'evening') => {
    setMedications(meds => meds.map(m => {
      if (m.id === id) {
        return { ...m, timing: { ...m.timing, [time]: !m.timing[time] } };
      }
      return m;
    }));
  };

  // Medical Tests handlers
  const addMedicalTest = (testName: string) => {
    if (!medicalTests.find(t => t.name === testName)) {
      setMedicalTests([...medicalTests, { 
        id: crypto.randomUUID(), 
        name: testName, 
        priority: 'routine', 
        notes: '' 
      }]);
    }
    setShowTestDropdown(false);
    setTestSearchQuery('');
    setFilteredTests(commonMedicalTests);
  };

  const removeMedicalTest = (id: string) => {
    setMedicalTests(medicalTests.filter(t => t.id !== id));
  };

  const updateMedicalTest = (id: string, field: keyof MedicalTest, value: any) => {
    setMedicalTests(tests => tests.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const handleTestSearch = (query: string) => {
    setTestSearchQuery(query);
    if (query.trim() === '') {
      setFilteredTests(commonMedicalTests);
    } else {
      setFilteredTests(
        commonMedicalTests.filter(test => 
          test.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const endConsultation = () => {
    navigate('/');
  };

  const handleSubmitPrescription = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Mock global update
      const newReport: Report = {
        id: `REP-${Math.floor(Math.random() * 10000)}`,
        patientId: 'Eleanor Pena', // Mock currently loaded patient
        date: new Date().toLocaleDateString(),
        summary: `Prescription issued: ${medications.map(m => m.name).join(', ')}. Notes: ${notes}`,
        type: 'General Consultation',
      };
      
      setReports((prev: Report[]) => [newReport, ...prev]);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        endConsultation();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 min-h-0 w-full flex bg-slate-50 border border-slate-200/50 rounded-3xl overflow-hidden shadow-inner m-4 lg:m-6" style={{height: 'calc(100% - 2rem)'}}>
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:flex-row h-full w-full">
        
        {/* Left Panel: High-Fidelity Video Call */}
        <div className="relative bg-slate-900 lg:rounded-l-3xl overflow-hidden flex flex-col h-[45vh] lg:h-full lg:flex-1 lg:min-w-0" style={{minHeight: '260px'}}>

          {/* Main Video Area */}
          <div className="flex-1 relative">
            {videoOn ? (
              // Fake High-Fidelity Video Stream
              <div className={`absolute inset-0 transition-all duration-700 ${blurBg ? 'backdrop-blur-xl bg-slate-900/50' : ''}`}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" 
                  alt="Patient Stream" 
                  className={`w-full h-full object-cover transition-all duration-700 ${blurBg ? 'scale-110 blur-sm opacity-60' : 'opacity-90'}`}
                />
                {!blurBg && <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />}
              </div>
            ) : (
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center text-4xl text-slate-500 font-bold border-4 border-slate-600">
                  EP
                </div>
              </div>
            )}

            {/* Doctor Picture-in-Picture */}
            <motion.div 
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              className="absolute bottom-20 right-4 lg:bottom-24 lg:right-6 w-28 h-36 lg:w-48 lg:h-64 bg-slate-800 rounded-xl lg:rounded-2xl border-2 border-slate-700/50 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" 
                alt="Doctor Self View" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:gap-4 bg-slate-900/60 backdrop-blur-xl px-3 lg:px-6 py-2 lg:py-3 rounded-full border border-white/10 z-20">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`p-2 lg:p-3 rounded-full transition-colors ${micOn ? 'bg-slate-700/50 text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              
              <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`p-2 lg:p-3 rounded-full transition-colors ${videoOn ? 'bg-slate-700/50 text-white hover:bg-slate-700' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
              >
                {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>
              
              <button 
                onClick={() => setBlurBg(!blurBg)}
                className={`hidden sm:block p-2 lg:p-3 rounded-full transition-colors ${blurBg ? 'bg-sky-500 text-white' : 'bg-slate-700/50 text-white hover:bg-slate-700'}`}
                title="Blur Background"
              >
                <ImageIcon size={18} />
              </button>

              <div className="w-px h-6 lg:h-8 bg-white/20 mx-1 lg:mx-2" />

              <button 
                onClick={endConsultation}
                className="px-3 lg:px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold transition-colors flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
              >
                <PhoneOff size={16} className="lg:size-18" />
                <span className="hidden sm:inline">End</span>
              </button>
            </div>
            
            {/* Top Bar Call Info */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center gap-2 lg:gap-3 bg-slate-900/60 backdrop-blur-xl px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl border border-white/10 z-20">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-white font-medium text-xs lg:text-sm tracking-wide">04:22</span>
              <div className="w-px h-3 lg:h-4 bg-white/20" />
              <span className="text-slate-300 text-xs lg:text-sm font-bold">Eleanor Pena</span>
            </div>
          </div>
        </div>

        {/* Desktop Resizer Handle - Hidden on mobile */}
        <div className="hidden lg:flex w-2 bg-slate-200/50 hover:bg-sky-400/50 transition-colors cursor-col-resize flex flex-col justify-center items-center">
          <div className="w-1 h-8 bg-slate-400 rounded-full" />
        </div>

        {/* Right Panel: Prescription Builder */}
        <div className="bg-white flex flex-col relative z-0 flex-1 lg:flex-1 lg:min-w-0 border-t lg:border-t-0 lg:border-l border-slate-200 min-h-0">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                <Stethoscope className="text-sky-500" size={24} />
                Prescription Builder
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Secure Document Generation</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            {/* Medications List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700">Medications</h3>
              
              <AnimatePresence>
                {medications.map((med) => (
                  <motion.div 
                    key={med.id}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm relative group"
                  >
                    <button 
                      onClick={() => removeMedication(med.id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-slate-400 rounded-full hover:text-rose-500 hover:border-rose-200 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Drug Name</label>
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                          placeholder="e.g. Amoxicillin"
                          className="w-full mt-1 bg-white border border-slate-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Dosage</label>
                        <input
                          type="text"
                          value={med.dose}
                          onChange={(e) => updateMedication(med.id, 'dose', e.target.value)}
                          placeholder="e.g. 500mg"
                          className="w-full mt-1 bg-white border border-slate-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 mb-2 block">Timing</label>
                      <div className="flex gap-2">
                        {(['morning', 'afternoon', 'evening'] as const).map(time => (
                          <button
                            key={time}
                            onClick={() => updateTiming(med.id, time)}
                            className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-lg transition-colors border ${
                              med.timing[time] 
                                ? 'bg-sky-100 text-sky-700 border-sky-200' 
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button 
                onClick={addMedication}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold text-sm hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Medication
              </button>
            </div>

            {/* Medical Tests */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-sky-500" />
                Medical Tests Ordered
              </h3>

              {/* Add Test Button/Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowTestDropdown(!showTestDropdown)}
                  className="w-full py-3 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold text-sm hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50/50 transition-all flex items-center justify-center gap-2"
                >
                  <TestTube2 size={16} />
                  Add Medical Test
                </button>

                {/* Test Selection Dropdown */}
                <AnimatePresence>
                  {showTestDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-lg z-20 max-h-64 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-100">
                        <input
                          type="text"
                          value={testSearchQuery}
                          onChange={(e) => handleTestSearch(e.target.value)}
                          placeholder="Search tests..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto max-h-48">
                        {filteredTests.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-500">
                            No tests found
                          </div>
                        ) : (
                          filteredTests.map((test) => (
                            <button
                              key={test}
                              onClick={() => addMedicalTest(test)}
                              className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-sky-50 transition-colors flex items-center gap-2"
                            >
                              <Plus size={14} className="text-sky-500" />
                              {test}
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Added Tests List */}
              <AnimatePresence>
                {medicalTests.map((test) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm relative group"
                  >
                    <button
                      onClick={() => removeMedicalTest(test.id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-slate-400 rounded-full hover:text-rose-500 hover:border-rose-200 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex items-center gap-2 mb-3">
                      <TestTube2 className="w-4 h-4 text-sky-500" />
                      <span className="font-semibold text-slate-800 text-sm">{test.name}</span>
                    </div>

                    <div className="space-y-3">
                      {/* Priority Selection */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Priority</label>
                        <div className="flex gap-2 mt-1">
                          {(['routine', 'urgent', 'stat'] as const).map(priority => (
                            <button
                              key={priority}
                              onClick={() => updateMedicalTest(test.id, 'priority', priority)}
                              className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-lg transition-colors border ${
                                test.priority === priority
                                  ? priority === 'stat'
                                    ? 'bg-rose-100 text-rose-700 border-rose-200'
                                    : priority === 'urgent'
                                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                                    : 'bg-sky-100 text-sky-700 border-sky-200'
                                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {priority}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Special Instructions</label>
                        <input
                          type="text"
                          value={test.notes}
                          onChange={(e) => updateMedicalTest(test.id, 'notes', e.target.value)}
                          placeholder="e.g. Fasting required"
                          className="w-full mt-1 bg-white border border-slate-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Doctor Notes */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-700 mb-2">Physician's Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add special instructions, dietary restrictions, or follow-up timelines..."
                className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none text-sm resize-none transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Submit Footer */}
          <div className="p-6 border-t border-slate-100 bg-white shrink-0">
            <button 
              onClick={handleSubmitPrescription}
              disabled={isSubmitting}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FileCheck2 size={20} />
                  Complete & Issue Prescription
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl max-w-sm mx-4 z-10"
            >
              <div className="w-32 h-32 mb-4">
                <Lottie animationData={successLottieData} loop={false} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Prescription Issued!</h2>
              <p className="text-slate-500 mt-2 text-sm font-medium">The medical report has been finalized and globally saved to patient records.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
