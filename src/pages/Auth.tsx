import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useAppContext } from '../contexts/AppContext';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Stethoscope, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

// --- Zod Schemas ---
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupStep1Schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupStep2Schema = z.object({
  medicalCategory: z.enum(['Cardiologist', 'Neurologist', 'Pediatrician', 'General Practitioner', 'Surgeon','Psychologist','Psychiatrist','Gynecologist','Obstetrician','Pathologist','Radiologist','Gastroenterologist','Endocrinologist','Internist'] as const, {
    error: 'Please select a valid medical category'
  }),
  whatsapp: z.string().min(10, 'Valid WhatsApp number required'),
  certificate: z.any().refine((val) => val, "Medical certificate is required"),
});

// --- Lottie Animation Data (Minimal Placeholder for Success/Pending) ---
const pendingLottieData = {
  v: "5.5.2",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Pending",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "Shape Layer 1", sr: 1, ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      }, shapes: [
        {
          ty: "el", d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, nm: "Ellipse Path 1", hd: false
        },
        {
          ty: "st", c: { a: 0, k: [0, 0.498, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 10 }, lc: 2, lj: 2, d: [{ n: "d", nm: "dash", v: { a: 0, k: 150 } }, { n: "g", nm: "gap", v: { a: 0, k: 50 } }, { n: "o", nm: "offset", v: { a: 0, k: 0 } }], nm: "Stroke 1", hd: false
        }
      ], ip: 0, op: 60, st: 0, bm: 0
    }
  ]
};

type LoginValues = z.infer<typeof loginSchema>;
type SignupStep1Values = z.infer<typeof signupStep1Schema>;
type SignupStep2Values = z.infer<typeof signupStep2Schema>;

export default function Auth() {
  const { setUser, setIsApproved } = useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [signupStep, setSignupStep] = useState<1 | 2 | 'pending'>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Forms
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const step1Form = useForm<SignupStep1Values>({
    resolver: zodResolver(signupStep1Schema),
  });

  const step2Form = useForm<SignupStep2Values>({
    resolver: zodResolver(signupStep2Schema),
    defaultValues: { medicalCategory: 'General Practitioner' }
  });

  // Handlers
  const onLoginSubmit = (data: LoginValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: 'user_dev',
        name: 'Dr. Sarah Smith',
        email: data.email,
        role: 'doctor',
        isOnline: true,
      });
      setIsApproved(true);
      navigate('/');
    }, 1500);
  };

  const onStep1Submit = () => {
    setSignupStep(2);
  };

  const onStep2Submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSignupStep('pending');
    }, 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      step2Form.setValue('certificate', file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      step2Form.setValue('certificate', file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden select-none">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200/30 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] overflow-hidden relative z-10"
      >
        {/* Custom Animated Tabs */}
        {signupStep !== 'pending' && (
          <div className="flex p-2 gap-2 bg-slate-100/50 mx-6 mt-6 rounded-2xl relative">
            {['login', 'signup'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as 'login' | 'signup');
                  setSignupStep(1);
                }}
                className={`flex-1 py-2.5 text-sm font-bold capitalize rounded-xl transition-all relative z-10 ${
                  activeTab === tab ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="auth-tab-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab}</span>
              </button>
            ))}
          </div>
        )}

        <div className="p-8">
          <AnimatePresence mode="wait" initial={false}>
            {/* LOGIN PANE */}
            {activeTab === 'login' && signupStep !== 'pending' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-extrabold text-slate-800">Welcome Back</h2>
                  <p className="text-sm text-slate-500 mt-2">Sign in to your practitioner portal</p>
                </div>

                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        {...loginForm.register('email')}
                        className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm font-medium"
                        placeholder="doctor@littlenurse.com"
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        {...loginForm.register('password')}
                        className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all text-sm font-medium"
                        placeholder="••••••••"
                      />
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center px-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500 w-4 h-4 border-slate-300" />
                      <span className="text-sm font-medium text-slate-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors">Forgot Password?</a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex justify-center items-center mt-2 group"
                  >
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </motion.div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* SIGNUP PANE (MULTIPART) */}
            {activeTab === 'signup' && signupStep !== 'pending' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-800">Apply as Doctor</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    Step {signupStep} of 2 &mdash; {signupStep === 1 ? 'Personal Details' : 'Verification'}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {signupStep === 1 && (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={step1Form.handleSubmit(onStep1Submit)}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            {...step1Form.register('fullName')}
                            className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium"
                            placeholder="Full Name (e.g. Dr. John Doe)"
                          />
                        </div>
                        {step1Form.formState.errors.fullName && <p className="text-red-500 text-xs ml-1 font-medium">{step1Form.formState.errors.fullName.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            {...step1Form.register('email')}
                            className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium"
                            placeholder="Email Address"
                          />
                        </div>
                        {step1Form.formState.errors.email && <p className="text-red-500 text-xs ml-1 font-medium">{step1Form.formState.errors.email.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="password"
                            {...step1Form.register('password')}
                            className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium"
                            placeholder="Create Password"
                          />
                        </div>
                        {step1Form.formState.errors.password && <p className="text-red-500 text-xs ml-1 font-medium">{step1Form.formState.errors.password.message}</p>}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex justify-center items-center mt-6 group"
                      >
                        Continue to Verification
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.form>
                  )}

                  {/* Step 2 */}
                  {signupStep === 2 && (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={step2Form.handleSubmit(onStep2Submit)}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Specialization</label>
                        <div className="relative">
                          <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                          <select
                            {...step2Form.register('medicalCategory')}
                            className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium appearance-none"
                          >
                            <option value="General Practitioner">General Practitioner</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Surgeon">Surgeon</option>
                          </select>
                        </div>
                        {step2Form.formState.errors.medicalCategory && <p className="text-red-500 text-xs ml-1">{step2Form.formState.errors.medicalCategory.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            {...step2Form.register('whatsapp')}
                            className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-medium"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        {step2Form.formState.errors.whatsapp && <p className="text-red-500 text-xs ml-1">{step2Form.formState.errors.whatsapp.message}</p>}
                      </div>

                      <div className="space-y-1 pt-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Medical License / Certificate</label>
                        <div 
                          className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all bg-slate-50/50 cursor-pointer ${
                            uploadedFile ? 'border-sky-500 bg-sky-50/50' : 'border-slate-300 hover:border-sky-400 hover:bg-slate-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleFileDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploadedFile ? (
                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center text-sky-600">
                              <FileCheck2 size={32} className="mb-2" />
                              <span className="text-sm font-bold w-48 truncate text-center">{uploadedFile.name}</span>
                            </motion.div>
                          ) : (
                            <>
                              <UploadCloud size={28} className="text-slate-400 mb-2" />
                              <p className="text-xs text-slate-500 font-medium">Click to upload or drag & drop</p>
                              <p className="text-[10px] text-slate-400">PDF, JPG, PNG (Max 5MB)</p>
                            </>
                          )}
                          <input 
                            type="file" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleFileSelect}
                            accept=".pdf,image/*"
                          />
                        </div>
                        {step2Form.formState.errors.certificate && <p className="text-red-500 text-xs ml-1 mt-1 font-medium">{step2Form.formState.errors.certificate.message as string}</p>}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-bold"
                        >
                          <ArrowLeft size={18} />
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex justify-center items-center"
                        >
                          {isLoading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                              <Stethoscope className="w-5 h-5 text-white" />
                            </motion.div>
                          ) : (
                            'Submit Application'
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* PENDING / SUCCESS PANE */}
            {signupStep === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-48 h-48 mx-auto mb-4 relative flex items-center justify-center">
                  {/* Using Lottie React to play the animation */}
                  <Lottie animationData={pendingLottieData} loop={true} className="w-full h-full absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
                  <CheckCircle2 size={48} className="text-emerald-500 relative z-10 animate-bounce" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Application Received</h2>
                <p className="text-sm text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                  Your credentials have been securely submitted. Our administration team is reviewing your profile.
                </p>
                <p className="text-xs font-bold text-sky-500 mt-6 bg-sky-50 py-2 rounded-lg max-w-[200px] mx-auto">
                  Awaiting Approval...
                </p>
                <button
                  onClick={() => {
                    setSignupStep(1);
                    setActiveTab('login');
                  }}
                  className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
                >
                  Return to Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
