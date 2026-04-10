import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Search, FileText, X, ChevronRight, Pill, BookOpen, Stethoscope } from 'lucide-react';

type Dosage = {
  drug: string;
  dose: string;
  frequency: string;
};

type MedicalCondition = {
  id: number;
  name: string;
  category: string;
  description: string;
  standardProtocol: string;
  dosages: Dosage[];
  icon: 'search' | 'document';
};

type CommandModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: MedicalCondition) => void;
};

type MedicalCardProps = {
  condition: MedicalCondition;
  onClick: (condition: MedicalCondition) => void;
};

// Medical conditions data
const medicalConditions: MedicalCondition[] = [
  {
    id: 1,
    name: 'Malaria',
    category: 'Infectious Disease',
    description: 'A mosquito-borne infectious disease affecting the liver and red blood cells.',
    standardProtocol: 'WHO Guidelines 2024',
    dosages: [
      { drug: 'Artemether-Lumefantrine', dose: '80mg/480mg', frequency: 'Twice daily for 3 days' },
      { drug: 'Chloroquine', dose: '600mg base', frequency: 'Weekly prophylaxis' },
    ],
    icon: 'search',
  },
  {
    id: 2,
    name: 'Hypertension',
    category: 'Cardiovascular',
    description: 'A condition where the force of blood against artery walls is too high.',
    standardProtocol: 'JNC 8 Guidelines',
    dosages: [
      { drug: 'Amlodipine', dose: '5-10mg', frequency: 'Once daily' },
      { drug: 'Lisinopril', dose: '10-40mg', frequency: 'Once daily' },
    ],
    icon: 'document',
  },
  {
    id: 3,
    name: 'Respiratory Infections',
    category: 'Respiratory',
    description: 'Infections affecting the respiratory tract including throat, sinuses, and lungs.',
    standardProtocol: 'IDSA Guidelines 2024',
    dosages: [
      { drug: 'Amoxicillin', dose: '500mg', frequency: 'Three times daily' },
      { drug: 'Azithromycin', dose: '250-500mg', frequency: 'Once daily for 5 days' },
    ],
    icon: 'search',
  },
  {
    id: 4,
    name: 'Type 2 Diabetes',
    category: 'Endocrine',
    description: 'A chronic condition affecting how the body processes blood sugar.',
    standardProtocol: 'ADA Standards 2024',
    dosages: [
      { drug: 'Metformin', dose: '500-2000mg', frequency: 'Twice daily with meals' },
      { drug: 'Glipizide', dose: '5-20mg', frequency: 'Once daily before breakfast' },
    ],
    icon: 'document',
  },
  {
    id: 5,
    name: 'Asthma',
    category: 'Respiratory',
    description: 'A condition where airways narrow and swell, producing extra mucus.',
    standardProtocol: 'GINA Guidelines 2024',
    dosages: [
      { drug: 'Albuterol', dose: '90mcg/puff', frequency: '2 puffs every 4-6 hours PRN' },
      { drug: 'Fluticasone', dose: '88-440mcg', frequency: 'Twice daily' },
    ],
    icon: 'search',
  },
  {
    id: 6,
    name: 'Peptic Ulcer',
    category: 'Gastrointestinal',
    description: 'Open sores that develop on the inner lining of the stomach or upper small intestine.',
    standardProtocol: 'ACG Guidelines 2024',
    dosages: [
      { drug: 'Omeprazole', dose: '20-40mg', frequency: 'Once daily before meals' },
      { drug: 'Amoxicillin', dose: '1000mg', frequency: 'Twice daily for H. pylori' },
    ],
    icon: 'document',
  },
  {
    id: 7,
    name: 'Migraine',
    category: 'Neurological',
    description: 'A headache of varying intensity, often accompanied by nausea and light sensitivity.',
    standardProtocol: 'AAN Guidelines 2024',
    dosages: [
      { drug: 'Sumatriptan', dose: '50-100mg', frequency: 'At onset, may repeat after 2 hours' },
      { drug: 'Topiramate', dose: '25-100mg', frequency: 'Twice daily for prevention' },
    ],
    icon: 'search',
  },
  {
    id: 8,
    name: 'Hypothyroidism',
    category: 'Endocrine',
    description: 'A condition where the thyroid gland does not produce enough thyroid hormone.',
    standardProtocol: 'ATA Guidelines 2024',
    dosages: [
      { drug: 'Levothyroxine', dose: '25-200mcg', frequency: 'Once daily on empty stomach' },
    ],
    icon: 'document',
  },
  {
    id: 9,
    name: 'Urinary Tract Infection',
    category: 'Infectious Disease',
    description: 'An infection in any part of the urinary system, most commonly the bladder and urethra.',
    standardProtocol: 'IDSA UTI Guidelines 2024',
    dosages: [
      { drug: 'Nitrofurantoin', dose: '100mg', frequency: 'Twice daily for 5-7 days' },
      { drug: 'Ciprofloxacin', dose: '250-500mg', frequency: 'Twice daily for 3 days' },
    ],
    icon: 'search',
  },
];

// Simple Lottie animation data for search icon
const searchAnimation = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 64,
  h: 64,
  nm: 'Search Animation',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Search Icon',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 30, s: [360] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: { a: 0, k: [0, 0, 0] },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [20, 20] },
              p: { a: 0, k: [-14, -14] },
              r: { a: 0, k: 4 },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.004, 0.502, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
              lc: 2,
              lj: 2,
              ml: 4,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
        },
        {
          ty: 'el',
          d: 1,
          s: { a: 0, k: [16, 16] },
          p: { a: 0, k: [14, 14] },
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.004, 0.502, 1, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
          lc: 2,
          lj: 2,
          ml: 4,
        },
        {
          ty: 'fl',
          c: { a: 0, k: [0.91, 0.957, 1, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
      ],
    },
  ],
};

// Simple Lottie animation data for document icon
const documentAnimation = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 64,
  h: 64,
  nm: 'Document Animation',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Document Icon',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [80, 80, 100] }, { t: 30, s: [110, 110, 100] }, { t: 60, s: [100, 100, 100] }] },
      },
      ao: { a: 0, k: [0, 0, 0] },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [32, 40] },
              p: { a: 0, k: [0, 2] },
              r: { a: 0, k: 4 },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.004, 0.502, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2.5 },
              lc: 2,
              lj: 2,
              ml: 4,
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0.91, 0.957, 1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
            },
          ],
        },
        {
          ty: 'gm',
          nm: 'Lines',
          p: { a: 0, k: 1 },
          o: { a: 0, k: 100 },
          r: 1,
          s: { a: 0, k: [0, 0] },
          e: { a: 0, k: [32, 0] },
        },
      ],
    },
  ],
};

// Command Modal Component
function CommandModal({ isOpen, onClose, onSelect }: CommandModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredConditions = medicalConditions.filter(
    (condition) =>
      condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condition.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condition.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredConditions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredConditions.length > 0) {
        e.preventDefault();
        onSelect(filteredConditions[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [filteredConditions, selectedIndex, onSelect, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-sky-200"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-4 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medical conditions, protocols, or symptoms..."
              className="flex-1 outline-none text-slate-700 placeholder-slate-400 text-base"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 ml-3 text-xs font-semibold text-slate-500 bg-slate-100 rounded-md border border-slate-200">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {filteredConditions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-sky-400" />
                </div>
                <p className="text-slate-500 font-medium">No conditions found</p>
                <p className="text-slate-400 text-sm mt-1">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Medical Conditions ({filteredConditions.length})
                </div>
                {filteredConditions.map((condition, index) => (
                  <button
                    key={condition.id}
                    onClick={() => onSelect(condition)}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left ${
                      index === selectedIndex
                        ? 'bg-sky-50 border-l-4 border-sky-500'
                        : 'hover:bg-slate-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      {condition.icon === 'search' ? (
                        <Search className="w-5 h-5 text-sky-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-sky-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-800 truncate">{condition.name}</div>
                      <div className="text-sm text-slate-500 truncate">{condition.description}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">↵</kbd>
                to select
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {filteredConditions.length} condition{filteredConditions.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Medical Condition Card Component
function MedicalCard({ condition, onClick }: MedicalCardProps) {
  const animationData = condition.icon === 'search' ? searchAnimation : documentAnimation;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onClick(condition)}
    >
      {/* Card Header with Animation */}
      <div className="relative p-5 bg-gradient-to-br from-sky-50 to-white">
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700">
            <BookOpen className="w-3 h-3 mr-1" />
            Standard Protocol
          </span>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white border border-sky-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: 40, height: 40 }}
          />
        </div>
        <div className="mt-4">
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">
            {condition.category}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-sky-600 transition-colors">
            {condition.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {condition.description}
        </p>

        {/* Protocol Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs font-medium text-slate-400">
            {condition.standardProtocol}
          </span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Dosages */}
        <div className="space-y-2">
          {condition.dosages.map((dosage, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 group-hover:bg-sky-50 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Pill className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-700">{dosage.drug}</div>
                <div className="text-xs text-slate-500">
                  {dosage.dose} • {dosage.frequency}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Protocol Button */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-50 text-sky-600 font-semibold text-sm hover:bg-sky-100 transition-colors group/btn">
            <Stethoscope className="w-4 h-4" />
            View Full Protocol
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Main MedicalLibrary Component
export default function MedicalLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<MedicalCondition | null>(null);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCondition = (condition: MedicalCondition) => {
    setSelectedCondition(condition);
    setIsModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
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
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                </div>
                Medical Library
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Evidence-based protocols and treatment guidelines
              </p>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:border-sky-300 hover:bg-sky-50 transition-colors group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span className="text-sm font-medium">Search conditions...</span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white rounded-lg border border-slate-200 group-hover:border-sky-200 group-hover:text-sky-500 transition-colors">
                ⌘K
              </kbd>
            </button>
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
        {/* Category Filter Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {['All', 'Infectious Disease', 'Cardiovascular', 'Respiratory', 'Endocrine', 'Gastrointestinal', 'Neurological'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Conditions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {medicalConditions.map((condition) => (
            <motion.div key={condition.id} variants={itemVariants}>
              <MedicalCard
                condition={condition}
                onClick={handleSelectCondition}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Condition Detail (shown when a card is clicked) */}
        <AnimatePresence>
          {selectedCondition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 max-w-md bg-white rounded-2xl shadow-2xl border border-sky-200 p-6 z-40"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-sky-600 uppercase">
                    {selectedCondition.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-1">
                    {selectedCondition.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCondition(null)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                {selectedCondition.description}
              </p>
              <div className="space-y-2">
                {selectedCondition.dosages.map((dosage, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Pill className="w-4 h-4 text-sky-500" />
                    <span className="font-medium text-slate-700">{dosage.drug}</span>
                    <span className="text-slate-400">—</span>
                    <span className="text-slate-500">{dosage.dose}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Command Search Modal */}
      <CommandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectCondition}
      />
    </div>
  );
}
