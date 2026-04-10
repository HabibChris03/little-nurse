import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Share2, 
  ChevronRight,
  Stethoscope,
  Activity,
  HeartPulse
} from 'lucide-react';

// Mock DB of reports
const mockReports = [
  {
    id: 'REP-001',
    patient: 'Eleanor Pena',
    age: 42,
    date: 'Oct 12, 2026',
    author: 'Dr. Sarah Smith',
    type: 'Cardiology Review',
    status: 'Finalized',
    icon: HeartPulse,
    content: `PATIENT DEMOGRAPHICS:
Name: Eleanor Pena
Age: 42
Gender: Female
Date of Birth: 05/14/1984

CHIEF COMPLAINT:
Patient presents with periodic chest tightness accompanied by shortness of breath during moderate physical exertion over the past three weeks.

HISTORY OF PRESENT ILLNESS:
The patient is a 42-year-old female with a known history of mild hypertension, controlled via Lisinopril. She reports that episodes of chest tightness occur primarily during her morning jogging routine. Symptoms generally subside after 10-15 minutes of rest. No history of palpitations, syncope, or severe resting chest pain.

PHYSICAL EXAMINATION:
- Blood Pressure: 135/85 mmHg
- Heart Rate: 78 bpm, regular rhythm
- Respiratory Rate: 16 breaths/min
- Oxygen Saturation: 98% on room air
Cardiovascular exam reveals a regular rate and rhythm. No murmurs, rubs, or gallops identified.

IMAGING & DIAGNOSTICS:
ECG performed in the clinic shows normal sinus rhythm with no acute ST-T wave changes.
Stress Echocardiogram has been scheduled to rule out exercise-induced ischemia.

ASSESSMENT & PLAN:
1. Atypical chest pain. Given the exertional nature, ischemic etiology needs to be ruled out.
2. Schedule Stress Echocardiogram for next week.
3. Patient advised to avoid strenuous physical activities until the stress test results are reviewed.
4. Continue current dosage of Lisinopril. Follow up in 2 weeks.`,
  },
  {
    id: 'REP-002',
    patient: 'Esther Howard',
    age: 29,
    date: 'Oct 10, 2026',
    author: 'Dr. Sarah Smith',
    type: 'General Checkup',
    status: 'Pending Review',
    icon: Stethoscope,
    content: `PATIENT DEMOGRAPHICS:
Name: Esther Howard
Age: 29
Gender: Female

CHIEF COMPLAINT:
Annual routine physical examination.

HISTORY OF PRESENT ILLNESS:
Patient feels generally well. Reports occasional fatigue due to work-related stress but denies any acute medical issues, recent illnesses, or chronic pain.

PHYSICAL EXAMINATION:
- Blood Pressure: 118/75 mmHg
- Heart Rate: 68 bpm
- BMI: 22.4
Lungs are clear to auscultation bilaterally. Heart is regular rate and rhythm. Abdomen is soft, non-tender.

ASSESSMENT & PLAN:
1. Healthy 29-year-old female.
2. Routine blood work (CBC, CMP, Lipid panel, TSH) ordered.
3. Advised to maintain a balanced diet and incorporate 30 minutes of daily exercise to combat stress.
4. Next routine follow-up in 1 year unless symptoms arise.`,
  },
  {
    id: 'REP-003',
    patient: 'Cameron Williamson',
    age: 64,
    date: 'Oct 08, 2026',
    author: 'Dr. Sarah Smith',
    type: 'Post-Op Report',
    status: 'Finalized',
    icon: Activity,
    content: `PATIENT DEMOGRAPHICS:
Name: Cameron Williamson
Age: 64
Gender: Male

CHIEF COMPLAINT:
Two-week postoperative checkup following arthroscopic knee surgery (Left).

HISTORY OF PRESENT ILLNESS:
Patient underwent successful meniscectomy two weeks ago. He reports significant improvement in pain and states he has been compliant with the initial physical therapy protocols. Mild swelling is still present at the end of the day.

PHYSICAL EXAMINATION:
Left knee shows clean, well-healing arthroscopic port sites. No signs of erythema or purulent discharge. Mild effusion present. Range of motion is 0 to 95 degrees. Good quad contraction. 

ASSESSMENT & PLAN:
1. Normal postoperative healing course for left knee arthroscopy.
2. Continue physical therapy 2x a week for the next month to improve ROM and strength.
3. NSAIDs as needed for pain and end-of-day swelling.
4. Cleared to begin stationary cycling. Follow up in 6 weeks.`,
  }
];

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(mockReports[0].id);

  const filteredReports = mockReports.filter(report => 
    report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedReport = mockReports.find(r => r.id === selectedReportId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      
      {/* Left Sidebar: Document List */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full md:w-1/3 flex flex-col bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-slate-200/60 bg-white/40">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-4">Medical Reports</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reports or patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm transition-all bg-white"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{filteredReports.length} Documents</span>
            <button className="text-sky-500 hover:bg-sky-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium">
              <Filter size={14} /> Sort
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              onClick={() => setSelectedReportId(report.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                selectedReportId === report.id 
                  ? 'bg-sky-50 border-sky-200 shadow-sm' 
                  : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${selectedReportId === report.id ? 'bg-sky-200/50 text-sky-700' : 'bg-slate-100 text-slate-500'}`}>
                    <report.icon size={16} />
                  </div>
                  <h3 className={`font-bold text-sm ${selectedReportId === report.id ? 'text-sky-900' : 'text-slate-800'}`}>
                    {report.patient}
                  </h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  report.status === 'Finalized' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                    : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  {report.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{report.type}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                <span>{report.date}</span>
                <span className="font-semibold">{report.id}</span>
              </div>
            </motion.div>
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No reports found matching your criteria.
            </div>
          )}
        </div>
      </motion.div>

      {/* Right Content: Document Viewer */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
        className="hidden md:flex flex-1 flex-col bg-slate-100/50 rounded-2xl border border-slate-200/50 overflow-hidden relative shadow-inner"
      >
        {selectedReport ? (
          <>
            {/* Viewer Toolbar */}
            <div className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <FileText size={18} className="text-sky-500" />
                <span>Document Center</span>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="text-slate-800 font-bold">{selectedReport.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors tooltip-wrapper">
                  <Share2 size={18} />
                </button>
                <button className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                  <Printer size={18} />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors shadow-sm shadow-sky-500/20">
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Document Sheet Container */}
            <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedReport.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full max-w-3xl bg-white shadow-[0_4px_40px_rgb(0,0,0,0.06)] rounded-sm border border-slate-200 p-10 md:p-14 min-h-full"
                >
                  {/* Official Header */}
                  <div className="border-b-2 border-sky-500 pb-6 mb-8 flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center text-white text-sm shadow-sm">LN</div>
                        Little Nurse Doc
                      </h1>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Official Medical Evaluation Record</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{selectedReport.id}</p>
                      <p className="text-xs text-slate-500 mt-1">Date: {selectedReport.date}</p>
                      <p className="text-xs text-slate-500">Author: {selectedReport.author}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="prose prose-slate prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-headings:text-sky-900 prose-headings:text-sm prose-p:leading-relaxed text-slate-700">
                    {selectedReport.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.toUpperCase() === paragraph) {
                         // Section Headers
                         return <h2 key={idx} className="mt-8 mb-4 border-b border-slate-100 pb-2">{paragraph}</h2>
                      }
                      if (paragraph.includes('\n- ') || paragraph.includes('\n1. ')) {
                        // Handle Lists (basic naive approach for mock)
                        const lines = paragraph.split('\n');
                        const isOrdered = lines.some(l => l.match(/^\d+\./));
                        
                        return (
                          <div key={idx} className="my-4">
                            {isOrdered ? (
                              <ol className="list-decimal pl-5 space-y-2">
                                {lines.map((line, i) => <li key={i}>{line.replace(/^\d+\.\s*/, '')}</li>)}
                              </ol>
                            ) : (
                              <ul className="list-disc pl-5 space-y-2">
                                {lines.map((line, i) => {
                                  if (line.startsWith('- ')) return <li key={i}>{line.replace(/^- /, '')}</li>;
                                  return <div key={i} className="mb-2">{line}</div>;
                                })}
                              </ul>
                            )}
                          </div>
                        )
                      }
                      return (
                        <p key={idx} className="my-4 whitespace-pre-wrap">{paragraph}</p>
                      );
                    })}
                  </div>

                  {/* Doctor Signature Block */}
                  <div className="mt-16 pt-8 border-t border-slate-200 flex justify-end">
                    <div className="text-center w-48">
                      <div className="font-yesteryear text-3xl text-slate-800 opacity-80 border-b border-slate-200 pb-2 mb-2 italic">
                        Sarah Smith
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedReport.author}, MD</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Electronic Signature Validated</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
            <FileText size={64} className="opacity-20" />
            <p>Select a report to view details</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
