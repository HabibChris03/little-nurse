import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../contexts/AppContext';
import {
  User,
  Shield,
  Calendar,
  Camera,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Lock,
  Smartphone,
  Clock,
  Check,
  Save
} from 'lucide-react';

type TabType = 'bio' | 'security' | 'availability';

interface DaySchedule {
  [key: string]: {
    enabled: boolean;
    slots: { start: string; end: string }[];
  };
}

export default function Profile() {
  const { user, setUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>('bio');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Bio State
  const profileImage = user?.avatar || '';
  const [specialization, setSpecialization] = useState('Cardiologist');
  const [bio, setBio] = useState('Experienced medical professional with over 15 years of practice in cardiovascular medicine. Committed to providing exceptional patient care through evidence-based treatment and compassionate communication.');
  const [education, setEducation] = useState('MD, Harvard Medical School');
  const [experience, setExperience] = useState('15 years');
  const [location, setLocation] = useState('Boston, MA');
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('+1 (555) 123-4567');

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Availability State
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [schedule, setSchedule] = useState<DaySchedule>({
    Monday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    Tuesday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    Wednesday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    Thursday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    Friday: { enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    Saturday: { enabled: false, slots: [] },
    Sunday: { enabled: false, slots: [] },
  });

  const [breakTime, setBreakTime] = useState({ start: '12:00', end: '13:00' });
  const [maxDailyConsultations, setMaxDailyConsultations] = useState('8');
  const [consultationDuration, setConsultationDuration] = useState('30');
  const [bufferTime, setBufferTime] = useState('15');

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveBio = () => {
    if (user) {
      setUser({ ...user });
    }
    showNotification('Professional bio updated successfully');
  };

  const handleSaveSecurity = () => {
    if (newPassword && newPassword === confirmPassword) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showNotification('Security settings updated successfully');
    } else if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match');
    } else {
      showNotification('Security settings updated successfully');
    }
  };

  const handleSaveAvailability = () => {
    showNotification('Availability schedule saved successfully');
  };

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const updateSlot = (day: string, slotIndex: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, idx) =>
          idx === slotIndex ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const tabs = [
    { id: 'bio' as TabType, label: 'Professional Bio', icon: User },
    { id: 'security' as TabType, label: 'Security', icon: Shield },
    { id: 'availability' as TabType, label: 'Availability', icon: Calendar },
  ];

  const specializations = [
    'General Practitioner',
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Dermatologist',
    'Orthopedic Surgeon',
    'Psychiatrist',
    'Oncologist',
    'Endocrinologist',
    'Gastroenterologist',
  ];

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
              <User className="w-5 h-5 text-sky-600" />
            </div>
            Profile Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your professional information and preferences
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-sky-600 bg-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-sky-500' : ''}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Professional Bio Tab */}
            {activeTab === 'bio' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={profileImage || user?.avatar || 'https://i.pravatar.cc/150'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-sky-100 shadow-md"
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sky-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{user?.name}</h3>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                    <p className="text-sm text-sky-600 font-medium mt-1 capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Specialization */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      Specialization
                    </label>
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    >
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      <Award className="w-4 h-4 inline mr-1" />
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-1" />
                      Education
                    </label>
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Practice Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium resize-none transition-all"
                    placeholder="Tell patients about your experience and approach to care..."
                  />
                </div>

                {/* WhatsApp Connectivity */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">WhatsApp Connectivity</h4>
                        <p className="text-sm text-slate-500">Allow patients to reach you via WhatsApp for non-urgent matters</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                      className="relative w-12 h-7 rounded-full transition-colors"
                    >
                      {whatsappEnabled ? (
                        <div className="absolute inset-0 bg-emerald-500 rounded-full">
                          <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-slate-300 rounded-full">
                          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                        </div>
                      )}
                    </button>
                  </div>
                  {whatsappEnabled && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-medium transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveBio}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 max-w-2xl"
              >
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-sky-500" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-sky-500" />
                    Two-Factor Authentication
                  </h3>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-800">2FA Protection</h4>
                        <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className="relative w-12 h-7 rounded-full transition-colors"
                      >
                        {twoFactorEnabled ? (
                          <div className="absolute inset-0 bg-emerald-500 rounded-full">
                            <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-slate-300 rounded-full">
                            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                          </div>
                        )}
                      </button>
                    </div>
                    {twoFactorEnabled && (
                      <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-xl">
                        <Check className="w-4 h-4" />
                        Two-factor authentication is enabled
                      </div>
                    )}
                  </div>
                </div>

                {/* Login Alerts */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Login Alerts</h4>
                      <p className="text-sm text-slate-500">Get notified of new login activity</p>
                    </div>
                    <button
                      onClick={() => setLoginAlerts(!loginAlerts)}
                      className="relative w-12 h-7 rounded-full transition-colors"
                    >
                      {loginAlerts ? (
                        <div className="absolute inset-0 bg-emerald-500 rounded-full">
                          <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-slate-300 rounded-full">
                          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Session Timeout */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Auto Logout (Session Timeout)
                  </label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="480">8 hours</option>
                  </select>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSecurity}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Update Security
                  </button>
                </div>
              </motion.div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100">
                    <div className="text-2xl font-bold text-sky-600">
                      {Object.values(schedule).filter(d => d.enabled).length}
                    </div>
                    <div className="text-xs text-sky-500 font-medium">Active Days</div>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-600">
                      {Object.values(schedule).filter(d => d.enabled).reduce((acc, day) => {
                        day.slots.forEach(slot => {
                          const start = parseInt(slot.start.split(':')[0]);
                          const end = parseInt(slot.end.split(':')[0]);
                          acc += end - start;
                        });
                        return acc;
                      }, 0)}h
                    </div>
                    <div className="text-xs text-emerald-500 font-medium">Weekly Hours</div>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <div className="text-2xl font-bold text-amber-600">{maxDailyConsultations}</div>
                    <div className="text-xs text-amber-500 font-medium">Daily Limit</div>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky-500" />
                    Weekly Schedule
                  </h3>
                  <div className="space-y-3">
                    {daysOfWeek.map((day) => (
                      <div
                        key={day}
                        className={`rounded-2xl border transition-all ${
                          schedule[day].enabled
                            ? 'bg-white border-sky-200'
                            : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleDay(day)}
                              className="relative w-12 h-7 rounded-full transition-colors"
                            >
                              {schedule[day].enabled ? (
                                <div className="absolute inset-0 bg-sky-500 rounded-full">
                                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                                </div>
                              ) : (
                                <div className="absolute inset-0 bg-slate-300 rounded-full">
                                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
                                </div>
                              )}
                            </button>
                            <span className={`font-bold ${schedule[day].enabled ? 'text-slate-800' : 'text-slate-400'}`}>
                              {day}
                            </span>
                          </div>
                          {schedule[day].enabled && schedule[day].slots.length > 0 && (
                            <span className="text-sm text-slate-500">
                              {schedule[day].slots.map(s => `${s.start} - ${s.end}`).join(', ')}
                            </span>
                          )}
                        </div>
                        {schedule[day].enabled && (
                          <div className="px-4 pb-4 pl-16 space-y-3">
                            {schedule[day].slots.map((slot, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <input
                                  type="time"
                                  value={slot.start}
                                  onChange={(e) => updateSlot(day, idx, 'start', e.target.value)}
                                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                                <span className="text-slate-400">to</span>
                                <input
                                  type="time"
                                  value={slot.end}
                                  onChange={(e) => updateSlot(day, idx, 'end', e.target.value)}
                                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Break Time */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4">Break Time</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">From</label>
                      <input
                        type="time"
                        value={breakTime.start}
                        onChange={(e) => setBreakTime({ ...breakTime, start: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">To</label>
                      <input
                        type="time"
                        value={breakTime.end}
                        onChange={(e) => setBreakTime({ ...breakTime, end: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Consultation Settings */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Max Daily Consultations
                    </label>
                    <select
                      value={maxDailyConsultations}
                      onChange={(e) => setMaxDailyConsultations(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    >
                      {[4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                        <option key={n} value={n}>{n} consultations</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Consultation Duration (minutes)
                    </label>
                    <select
                      value={consultationDuration}
                      onChange={(e) => setConsultationDuration(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    >
                      {[15, 20, 30, 45, 60].map(n => (
                        <option key={n} value={n}>{n} minutes</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Buffer Time Between Appointments (minutes)
                    </label>
                    <select
                      value={bufferTime}
                      onChange={(e) => setBufferTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
                    >
                      {[0, 5, 10, 15, 20, 30].map(n => (
                        <option key={n} value={n}>{n} minutes</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAvailability}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Schedule
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}