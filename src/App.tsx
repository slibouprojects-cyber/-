import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
import { toPng } from 'html-to-image';
import { 
  Briefcase,
  Users, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Menu, 
  X,
  LogOut,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  User,
  Info,
  MapPin,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  Camera,
  Download,
  Share2,
  Edit3,
  Scan,
  ChevronLeft,
  ChevronRight,
  Save,
  Plus,
  Clock,
  Calendar,
  Mic2,
  Trophy,
  Facebook,
  Instagram,
  Twitter,
  Trash2,
  Edit,
  Lock,
  StickyNote,
  Search,
  Maximize2,
  Factory,
  Loader2,
  Hammer,
  Truck,
  Heart,
  Rocket,
  Coins,
  Globe,
  Settings,
  FileText
} from 'lucide-react';

interface RegistrationResult {
  id: number;
  badgeId?: string;
  fullName: string;
  type: 'attendee' | 'exhibitor' | 'sponsor' | 'organizer' | 'security' | 'services';
  photo: string | null;
  email: string;
  phone: string;
  address: string;
  age?: number | null;
  position?: string;
  companyName?: string;
  industry?: string;
  note?: string;
  educationLevel?: string;
  interests?: string[];
  status?: string;
}

type RegType = 'attendee' | 'exhibitor';
type ExhibitorStep = 'basic' | 'participation' | 'details';

const LoginView = ({ 
  loginId, 
  setLoginId, 
  handleLogin, 
  loading, 
  formStatus, 
  setView,
  adminUser,
  setAdminUser,
  loginMode,
  setLoginMode,
  setScannerMode,
  authId,
  setAuthId
}: { 
  loginId: string;
  setLoginId: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  loading: boolean;
  formStatus: any;
  setView: (val: any) => void;
  adminUser?: any;
  setAdminUser?: any;
  loginMode: 'id' | 'admin';
  setLoginMode: (val: 'id' | 'admin') => void;
  setScannerMode: (val: 'login' | 'contact') => void;
  authId: string;
  setAuthId: (val: string) => void;
}) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loginId && !authId && loginMode === 'id') {
      phoneInputRef.current?.focus();
    }
  }, [loginId, loginMode]);

  return (
    <div className="max-w-md mx-auto py-12 px-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white">{loginMode === 'id' ? 'دخول المسجلين' : 'دخول المنظمين'}</h2>
        <p className="text-slate-400 font-medium">
          {loginMode === 'id' ? 'أدخل رمز ID الخاص بك أو امسح الكود لعرض بطاقتك.' : 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.'}
        </p>
      </div>

      <div className="flex bg-brand-darker p-1 rounded-xl border border-brand-accent/10">
        <button 
          onClick={() => setLoginMode('id')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMode === 'id' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500'}`}
        >
          دخول المسجلين
        </button>
        <button 
          onClick={() => setLoginMode('admin')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginMode === 'admin' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500'}`}
        >
          دخول المنظمين
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {loginMode === 'id' ? (
          <>
            <div className="space-y-2">
              <label className="form-label">رمز التسجيل (ID)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="مثال: ATT-2026-0001"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value.toUpperCase())}
                  className="form-input"
                  required
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">رقم الهاتف (كلمة المرور)</label>
              <div className="relative">
                <input 
                  ref={phoneInputRef}
                  type="password" 
                  placeholder="أدخل رقم هاتفك"
                  value={authId} // Reusing authId for phone password in main login
                  onChange={(e) => setAuthId(e.target.value)}
                  className="form-input"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>
            
            <button 
              type="button"
              onClick={() => { setScannerMode('login'); setView('scanner'); }}
              className="w-full bg-slate-800 text-white py-4 rounded-xl font-black text-base hover:bg-slate-700 transition-all flex items-center justify-center gap-3 flex-row"
            >
              <Scan className="w-5 h-5" />
              دخول عبر مسح QR
            </button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="form-label">اسم المستخدم</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="admin"
                  value={adminUser.username}
                  onChange={(e) => setAdminUser({ ...adminUser, username: e.target.value })}
                  className="form-input"
                  required
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="form-label">كلمة المرور</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={adminUser.password}
                  onChange={(e) => setAdminUser({ ...adminUser, password: e.target.value })}
                  className="form-input"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>
          </>
        )}

        {formStatus?.type === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 flex-row-reverse">
            <XCircle className="w-4 h-4 shrink-0" />
            <p className="text-xs font-bold">{formStatus.message}</p>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-brand-primary text-white py-4 rounded-xl font-black text-base hover:bg-brand-primary/80 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 flex-row"
        >
          {loading ? 'جاري التحقق...' : (loginMode === 'id' ? 'عرض البطاقة' : 'تسجيل الدخول')}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>

        <div className="flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => setView('home')}
            className="w-full text-slate-500 font-bold hover:text-white transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Checkin View ─────────────────────────────────────────────────────────────
const CheckinView = ({ setView, siteContent }: { setView: (v: any) => void; siteContent: any }) => {
  type Step = 'login' | 'select' | 'active';
  const [step, setStep] = useState<Step>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [organizer, setOrganizer] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [inputMode, setInputMode] = useState<'qr' | 'manual'>('manual');
  const [manualInput, setManualInput] = useState('');
  const [manualLoading, setManualLoading] = useState(false);
  const [newBadge, setNewBadge] = useState<any>(null);
  const [newBadgeVisible, setNewBadgeVisible] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const manualRef = useRef<HTMLInputElement>(null);

  const getPrefix = (type: string) => {
    switch(type) {
      case 'exhibitor': return 'EXH';
      case 'sponsor': return 'SPN';
      case 'organizer': return 'ORG';
      case 'security': return 'SEC';
      case 'services': return 'SRV';
      default: return 'ATT';
    }
  };
  const formatId = (id: number, type: string) => `${getPrefix(type)}-2026-${id.toString().padStart(4, '0')}`;

  const typeLabel = (type: string) => {
    switch(type) {
      case 'attendee': return 'زائر';
      case 'exhibitor': return 'عارض';
      case 'sponsor': return 'راعي';
      case 'organizer': return 'منظم';
      case 'security': return 'أمن';
      case 'services': return 'خدمات';
      default: return type;
    }
  };

  const typeColor = (type: string) => {
    switch(type) {
      case 'attendee': return 'bg-blue-500';
      case 'exhibitor': return 'bg-emerald-500';
      case 'sponsor': return 'bg-amber-500';
      case 'organizer': return 'bg-purple-500';
      case 'security': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/organizer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error || 'فشل تسجيل الدخول'); return; }
      setOrganizer(data);
      setLoadingActivities(true);
      const actRes = await fetch('/api/activities');
      const actData = await actRes.json();
      setActivities(actData);
      setStep('select');
    } catch {
      setLoginError('خطأ في الاتصال بالخادم');
    } finally {
      setLoginLoading(false);
      setLoadingActivities(false);
    }
  };

  const selectActivity = async (activity: any) => {
    setSelectedActivity(activity);
    setStep('active');
    await fetchAttendees(activity.id);
  };

  const fetchAttendees = async (activityId: number) => {
    try {
      const res = await fetch(`/api/attendance/activity/${activityId}`);
      if (res.ok) {
        const data = await res.json();
        setAttendees(data);
      }
    } catch {}
  };

  useEffect(() => {
    if (step === 'active' && selectedActivity) {
      pollRef.current = setInterval(() => fetchAttendees(selectedActivity.id), 5000);
      return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }
  }, [step, selectedActivity]);

  const showBadgeFlash = (registration: any) => {
    setNewBadge(registration);
    setNewBadgeVisible(true);
    setTimeout(() => setNewBadgeVisible(false), 4000);
  };

  const recordAttendance = async (badgeId: string) => {
    if (!selectedActivity || !badgeId.trim()) return;
    setManualLoading(true);
    try {
      const isPhone = /^\d{9,10}$/.test(badgeId.trim());
      const endpoint = isPhone ? '/api/attendance/by-phone' : '/api/attendance/by-badge';
      const body = isPhone
        ? { activityId: selectedActivity.id, phone: badgeId.trim() }
        : { activityId: selectedActivity.id, badgeId: badgeId.trim() };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'خطأ في تسجيل الحضور');
        return;
      }
      if (data.alreadyAttended) {
        alert('⚠️ تم تسجيل هذا الشخص مسبقًا في هذا النشاط');
        return;
      }
      await fetchAttendees(selectedActivity.id);
      showBadgeFlash(data.registration);
      setManualInput('');
      setTimeout(() => manualRef.current?.focus(), 100);
    } catch {
      alert('خطأ في الاتصال بالخادم');
    } finally {
      setManualLoading(false);
    }
  };

  const startScanner = async () => {
    setScannerActive(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      const html5QrCode = new Html5Qrcode("checkin-reader");
      scannerRef.current = html5QrCode;
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          await html5QrCode.stop();
          scannerRef.current = null;
          setScannerActive(false);
          setInputMode('manual');
          await recordAttendance(decodedText.trim());
        },
        () => {}
      );
    } catch (err) {
      console.error("Scanner error", err);
      setScannerActive(false);
      alert('لا يمكن الوصول للكاميرا');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      await scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
    setScannerActive(false);
  };

  useEffect(() => {
    return () => { stopScanner(); if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const selfCheckinUrl = selectedActivity ? `${baseUrl}/?checkin=${selectedActivity.id}` : '';

  const activityTypeLabel = (type: string) => {
    switch(type) {
      case 'hall': return 'قاعة';
      case 'workshop': return 'ورشة';
      case 'lecture': return 'محاضرة';
      case 'activity': return 'نشاط';
      default: return type;
    }
  };

  // ── Login Step ──────────────────────────────────────────────────────────────
  if (step === 'login') return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-dark" dir="rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto">
            <Scan className="w-10 h-10 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-black text-white">نظام تسجيل الحضور</h1>
          <p className="text-slate-400 font-medium">تسجيل دخول المنظمين</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 bg-brand-darker p-8 rounded-3xl border border-brand-accent/10">
          <div className="space-y-2">
            <label className="form-label">اسم المستخدم</label>
            <div className="relative">
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="form-input" placeholder="أدخل اسم المستخدم" required />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="form-label">كلمة المرور</label>
            <div className="relative">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="form-input" placeholder="••••••••" required />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            </div>
          </div>
          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
              <XCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold">{loginError}</span>
            </div>
          )}
          <button type="submit" disabled={loginLoading}
            className="w-full bg-brand-primary text-white py-4 rounded-xl font-black text-base hover:bg-brand-primary/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
            {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>تسجيل الدخول</span><ArrowLeft className="w-5 h-5" /></>}
          </button>
          <button type="button" onClick={() => setView('home')}
            className="w-full text-slate-500 font-bold hover:text-white transition-colors py-2">
            العودة للرئيسية
          </button>
        </form>
      </div>
    </div>
  );

  // ── Select Activity Step ────────────────────────────────────────────────────
  if (step === 'select') return (
    <div className="min-h-screen bg-brand-dark p-6" dir="rtl">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">اختر النشاط</h1>
            <p className="text-slate-400 text-sm font-medium">مرحبًا، {organizer?.fullName}</p>
          </div>
          <button onClick={() => { setStep('login'); setOrganizer(null); }}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
        {loadingActivities ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-bold">لا توجد أنشطة مضافة</div>
        ) : (
          <div className="grid gap-4">
            {activities.map(act => (
              <button key={act.id} onClick={() => selectActivity(act)}
                className="bg-brand-darker border border-brand-accent/10 hover:border-brand-primary/40 rounded-2xl p-5 text-right transition-all hover:bg-brand-primary/5 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-all">
                    {act.type === 'hall' ? <Building2 className="w-6 h-6 text-brand-primary" /> :
                     act.type === 'workshop' ? <Hammer className="w-6 h-6 text-brand-primary" /> :
                     act.type === 'lecture' ? <Mic2 className="w-6 h-6 text-brand-primary" /> :
                     <Calendar className="w-6 h-6 text-brand-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-black text-lg leading-tight">{act.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                        {activityTypeLabel(act.type)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-slate-400 text-sm font-medium flex-wrap">
                      {act.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{act.location}</span>}
                      {act.startTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{act.startTime} - {act.endTime}</span>}
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-brand-primary transition-colors shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ── Active Checkin Step ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-dark" dir="rtl">
      {/* Header */}
      <div className="bg-brand-darker border-b border-brand-accent/10 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => { stopScanner(); setStep('select'); setSelectedActivity(null); setAttendees([]); }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
            <ArrowRight className="w-4 h-4" /> تغيير النشاط
          </button>
          <div className="text-center flex-1 min-w-0">
            <h1 className="text-white font-black text-base truncate">{selectedActivity?.title}</h1>
            <p className="text-slate-500 text-xs font-medium">{activityTypeLabel(selectedActivity?.type)} · {selectedActivity?.location}</p>
          </div>
          <div className="flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-brand-primary font-black text-sm">{attendees.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: QR + Input */}
        <div className="space-y-4">
          {/* Activity QR Code */}
          <div className="bg-brand-darker border border-brand-accent/10 rounded-3xl p-6 text-center space-y-4">
            <div>
              <h2 className="text-white font-black text-lg">رمز QR للنشاط</h2>
              <p className="text-slate-400 text-xs font-medium mt-1">الزوار يصورون هذا الرمز للتسجيل الذاتي</p>
            </div>
            <div className="bg-white rounded-2xl p-4 inline-block mx-auto shadow-2xl">
              <QRCodeSVG
                value={selfCheckinUrl}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="text-xs text-slate-500 font-medium break-all px-2">{selfCheckinUrl}</div>
          </div>

          {/* Input Mode Tabs */}
          <div className="bg-brand-darker border border-brand-accent/10 rounded-3xl p-5 space-y-4">
            <div className="flex bg-brand-dark p-1 rounded-xl border border-brand-accent/10">
              <button onClick={() => { setInputMode('manual'); stopScanner(); }}
                className={`flex-1 py-2 text-sm font-black rounded-lg transition-all flex items-center justify-center gap-2 ${inputMode === 'manual' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500'}`}>
                <Edit3 className="w-4 h-4" /> إدخال يدوي
              </button>
              <button onClick={() => { setInputMode('qr'); setTimeout(() => startScanner(), 200); }}
                className={`flex-1 py-2 text-sm font-black rounded-lg transition-all flex items-center justify-center gap-2 ${inputMode === 'qr' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500'}`}>
                <Scan className="w-4 h-4" /> مسح QR
              </button>
            </div>

            {inputMode === 'manual' ? (
              <form onSubmit={e => { e.preventDefault(); recordAttendance(manualInput); }} className="space-y-3">
                <div className="space-y-1">
                  <label className="form-label text-xs">رقم الشارة أو رقم الهاتف</label>
                  <input ref={manualRef} type="text" value={manualInput}
                    onChange={e => setManualInput(e.target.value.toUpperCase())}
                    placeholder="مثال: ATT-2026-0001 أو 0550123456"
                    className="form-input text-sm" autoFocus />
                </div>
                <button type="submit" disabled={manualLoading || !manualInput.trim()}
                  className="w-full bg-brand-primary text-white py-3 rounded-xl font-black text-sm hover:bg-brand-primary/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {manualLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /><span>تسجيل الحضور</span></>}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <div id="checkin-reader" className="rounded-xl overflow-hidden" style={{ minHeight: scannerActive ? 280 : 0 }} />
                {scannerActive ? (
                  <button onClick={stopScanner}
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-3 rounded-xl font-black text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> إيقاف الكاميرا
                  </button>
                ) : (
                  <button onClick={startScanner}
                    className="w-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary py-3 rounded-xl font-black text-sm hover:bg-brand-primary/20 transition-all flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4" /> تشغيل الكاميرا
                  </button>
                )}
                <p className="text-slate-500 text-xs text-center font-medium">صوّر رمز QR على شارة الزائر</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Attendees List */}
        <div className="bg-brand-darker border border-brand-accent/10 rounded-3xl overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
          <div className="p-4 border-b border-brand-accent/10 flex items-center justify-between">
            <h3 className="text-white font-black text-base">قائمة الحضور</h3>
            <span className="text-brand-primary font-black text-sm bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
              {attendees.length} حاضر
            </span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-brand-accent/5">
            {attendees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
                <Users className="w-10 h-10 opacity-30" />
                <p className="font-bold text-sm">لا يوجد حضور بعد</p>
              </div>
            ) : (
              attendees.map((att, idx) => (
                <div key={att.id} className="flex items-center gap-3 p-4 hover:bg-white/2 transition-all">
                  <span className="text-slate-600 text-xs font-bold w-6 text-center shrink-0">{attendees.length - idx}</span>
                  {att.photo ? (
                    <img src={att.photo} className="w-10 h-10 rounded-full object-cover border-2 border-brand-accent/20 shrink-0" />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 ${typeColor(att.type)}`}>
                      {att.fullName?.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{att.fullName}</p>
                    <p className="text-slate-500 text-xs font-medium truncate">{att.companyName || typeLabel(att.type)}</p>
                  </div>
                  <div className="text-left shrink-0 space-y-0.5">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${typeColor(att.type)}`}>
                      {typeLabel(att.type)}
                    </span>
                    <p className="text-slate-600 text-[10px] font-medium text-center">
                      {new Date(att.attendedAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Badge Flash Overlay */}
      <AnimatePresence>
        {newBadgeVisible && newBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 18 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-5 flex items-center gap-4 min-w-[280px] max-w-[360px] border-4 border-emerald-400">
              {newBadge.photo ? (
                <img src={newBadge.photo} className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-md" />
              ) : (
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 ${typeColor(newBadge.type)}`}>
                  {newBadge.fullName?.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-emerald-600 font-black text-xs">تم التسجيل</span>
                </div>
                <p className="text-gray-900 font-black text-base leading-tight truncate">{newBadge.fullName}</p>
                <p className="text-gray-500 text-xs font-bold truncate">{newBadge.companyName || typeLabel(newBadge.type)}</p>
                <span className={`inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded-full text-white ${typeColor(newBadge.type)}`}>
                  {typeLabel(newBadge.type)} · {formatId(newBadge.id, newBadge.type)}
                </span>
              </div>
              <div className="text-left shrink-0">
                <p className="text-gray-400 text-[10px] font-bold">الوقت</p>
                <p className="text-gray-700 font-black text-sm">
                  {new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Self Checkin View (for visitors scanning activity QR) ─────────────────────
const SelfCheckinView = ({ activityId, setView }: { activityId: string; setView: (v: any) => void }) => {
  const [activity, setActivity] = useState<any>(null);
  const [badgeInput, setBadgeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState<any>(null);

  useEffect(() => {
    fetch('/api/activities').then(r => r.json()).then(acts => {
      const found = acts.find((a: any) => String(a.id) === String(activityId));
      setActivity(found || null);
    });
  }, [activityId]);

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const isPhone = /^\d{9,10}$/.test(badgeInput.trim());
      const endpoint = isPhone ? '/api/attendance/by-phone' : '/api/attendance/by-badge';
      const body = isPhone
        ? { activityId: parseInt(activityId), phone: badgeInput.trim() }
        : { activityId: parseInt(activityId), badgeId: badgeInput.trim().toUpperCase() };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'خطأ في التسجيل'); return; }
      if (data.alreadyAttended) { setError('تم تسجيل حضورك مسبقاً في هذا النشاط'); return; }
      setRegistered(data.registration);
      setSuccess(true);
    } catch {
      setError('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  if (success && registered) return (
    <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-6 text-white" dir="rtl">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 12 }}
        className="flex flex-col items-center space-y-6 text-center">
        <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center shadow-2xl">
          <CheckCircle2 className="w-16 h-16 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">تم تسجيل حضورك!</h1>
          <p className="text-emerald-100 font-bold mt-2">{registered.fullName}</p>
          {activity && <p className="text-emerald-200 text-sm mt-1">{activity.title}</p>}
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
          <Clock className="w-5 h-5" />
          <span className="font-black text-xl">{new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <button onClick={() => setView('home')} className="text-emerald-100 font-bold underline text-sm">العودة للرئيسية</button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-black text-white">تسجيل الحضور</h1>
          {activity && <p className="text-slate-400 font-bold text-sm">{activity.title}</p>}
        </div>
        <form onSubmit={handleCheckin} className="bg-brand-darker border border-brand-accent/10 rounded-3xl p-6 space-y-4">
          <div className="space-y-2">
            <label className="form-label text-sm">رقم الشارة أو رقم الهاتف</label>
            <input type="text" value={badgeInput} onChange={e => setBadgeInput(e.target.value)}
              placeholder="ATT-2026-0001 أو 0550123456"
              className="form-input" autoFocus required />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-brand-primary text-white py-4 rounded-xl font-black text-base hover:bg-brand-primary/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /><span>سجّل حضوري</span></>}
          </button>
          <button type="button" onClick={() => setView('home')} className="w-full text-slate-500 font-bold text-sm hover:text-white transition-colors py-1">
            العودة للرئيسية
          </button>
        </form>
      </div>
    </div>
  );
};

const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(mimeType, quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function App() {
  const [view, setView] = useState<'home' | 'register' | 'badge' | 'scanner' | 'address-book' | 'program' | 'login' | 'admin' | 'event-registration' | 'checkin' | 'self-checkin'>('home');
  const [selfCheckinActivityId, setSelfCheckinActivityId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState({ username: '', password: '' });
  const [registrations, setRegistrations] = useState<RegistrationResult[]>([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [siteContent, setSiteContent] = useState({
    title: 'معرض القرارة الاقتصادي',
    edition: 'الطبعة الثانية',
    year: '2026',
    logo: '/logo.png',
    expoLogo: '/logo.png',
    headerImage: 'https://fastly.picsum.photos/id/200/200/200.jpg?hmac=FEtVtwDe1Lw5Wf-TLq6Lx-TgX_grSLX4lB7WvjRzroA',
    heroTitle: 'معرض القرارة الاقتصادي',
    heroSubtitle: 'بوابة الاستثمار والتبادل التجاري في الجنوب الجزائري',
    footerText: 'في إطار دعم الحركية الاقتصادية المحلية وتشجيع الاستثمار وترقية المنتوج الوطني، يشرفنا أن ندعوكم للمشاركة في معرض القرارة الاقتصادي – الطبعة الثانية',
    contactAddress: 'محلات البلدية – حي العقيد لطفي – القرارة',
    contactEmail: 'guerraraexpo@gmail.com',
    contactPhone: '0553107814',
    headerHome: 'الرئيسية',
    headerProgram: 'البرنامج',
    headerLogin: 'دخول المسجلين',
    headerRegister: 'سجل الآن',
    footerLogo: '/logo.png',
    socialLinks: [
      { id: 1, platform: 'facebook', url: '#', icon: 'Facebook' },
      { id: 2, platform: 'instagram', url: '#', icon: 'Instagram' },
      { id: 3, platform: 'twitter', url: '#', icon: 'Twitter' }
    ]
  });
  const [services, setServices] = useState([
    { id: 1, service: 'نقل', provider: 'شركة النقل السريع', phone: '0555112233' },
    { id: 2, service: 'إطعام', provider: 'مطعم النخيل', phone: '0555445566' }
  ]);
  const [programEvents, setProgramEvents] = useState([
    { id: 1, code: 'EVT-001', day: 1, date: '29 مارس 2026', time: '08:30', title: 'الافتتاح الرسمي', type: 'ceremony', location: 'القاعة الكبرى', description: 'الافتتاح الرسمي للمسؤولين والضيوف', classification: 'رسمي', note: 'حضور كبار الشخصيات' },
    { id: 2, code: 'EVT-002', day: 1, date: '29 مارس 2026', time: '10:00', title: 'فتح المعرض للجمهور', type: 'exhibition', location: 'ساحة المعرض', description: 'بداية استقبال الزوار', classification: 'عام', note: 'دخول مجاني' }
  ]);
  
  const [activeDay, setActiveDay] = useState(1);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    time: '',
    location: '',
    type: 'exhibition' as const,
    description: '',
    classification: 'عام',
    note: ''
  });
  const [badgeSettings, setBadgeSettings] = useState<any>({
    attendee: { bg: 'from-emerald-500 to-emerald-600', button: 'bg-emerald-500 hover:bg-emerald-600', label: 'زائر / مشارك' },
    exhibitor: { bg: 'from-blue-500 to-blue-600', button: 'bg-blue-500 hover:bg-blue-600', label: 'عارض / شركة' },
    organizer: { bg: 'from-purple-500 to-purple-600', button: 'bg-purple-500 hover:bg-purple-600', label: 'منظم' },
    sponsor: { bg: 'from-amber-500 to-amber-600', button: 'bg-amber-500 hover:bg-amber-600', label: 'راعي / مساهم' },
    security: { bg: 'from-slate-800 to-slate-900', button: 'bg-slate-800 hover:bg-slate-900', label: 'أمن' },
    services: { bg: 'from-teal-500 to-teal-600', button: 'bg-teal-500 hover:bg-teal-600', label: 'خدمات' }
  });
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'info' | 'error' }[]>([]);
  const [scannerView, setScannerView] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [galleryItems, setGalleryItems] = useState<{id: number, url: string, caption: string}[]>([]);
  
  const [attendedActivities, setAttendedActivities] = useState<any[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const saveToVCard = (contact: any) => {
    if (!contact) return;
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.fullName || 'Tamkeen Contact'}
ORG:${contact.companyName || ''}
TITLE:${contact.position || ''}
TEL;TYPE=CELL:${contact.phone || ''}
EMAIL:${contact.email || ''}
ADR;TYPE=WORK:;;${contact.address || ''}
NOTE:${contact.note || ''} - Scanned at Guerrara Expo 2026
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${contact.fullName || 'contact'}.vcf`;
    link.href = url;
    link.click();
  };

  const fetchUserAttendance = async (regId: number) => {
    try {
      const res = await fetch(`/api/attendance/user/${regId}`);
      if (res.ok) {
        setAttendedActivities(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    }
  };

  const handleScanAttendance = async (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      if (data.type === 'activity' && data.id && registrationResult) {
        const res = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registrationId: registrationResult.id,
            activityId: data.id
          })
        });
        if (res.ok) {
          setShowScanSuccess(true);
          setTimeout(() => setShowScanSuccess(false), 3000);
          fetchUserAttendance(registrationResult.id);
        } else {
          const err = await res.json();
          showToast(err.error || 'فشل تسجيل الحضور', 'error');
        }
      } else {
        showToast('رمز QR غير صالح', 'error');
      }
    } catch (err) {
      showToast('رمز QR غير صالح', 'error');
    }
  };

  const QRScanner = ({ onScan, onClose }: { onScan: (data: string) => void, onClose: () => void }) => {
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
      return () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current.stop().catch(err => console.error(err));
        }
      };
    }, []);

    const startScanning = async () => {
      try {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;
        const qrCodeSuccessCallback = (decodedText: string) => {
          onScan(decodedText);
          html5QrCode.stop().then(() => onClose()).catch(err => console.error(err));
        };
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        await html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (errorMessage) => {
          // Ignore errors as they are frequent during scanning
        });
        setIsScanning(true);
      } catch (err) {
        console.error("Failed to start camera", err);
        showToast("فشل تشغيل الكاميرا، يرجى التأكد من الأذونات.", "error");
      }
    };

    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md aspect-square bg-slate-900 rounded-3xl overflow-hidden relative border-4 border-brand-primary/20 shadow-2xl">
          <div id="reader" className="w-full h-full"></div>
          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                <Camera className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-black text-lg">جاهز للمسح</h4>
                <p className="text-slate-400 text-xs font-bold">اضغط على الزر أدناه لتفعيل الكاميرا ومسح الرمز</p>
              </div>
              <button 
                onClick={startScanning}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm hover:bg-brand-primary/80 transition-all flex items-center justify-center gap-3"
              >
                <Scan className="w-5 h-5" />
                تفعيل الكاميرا
              </button>
            </div>
          )}
          <div className="absolute inset-0 border-2 border-brand-primary/50 pointer-events-none rounded-3xl m-12"></div>
        </div>
        <div className="mt-8 text-center space-y-4">
          <h3 className="text-xl font-black text-white">امسح رمز QR</h3>
          <p className="text-slate-400 font-bold">وجه الكاميرا نحو رمز الفعالية لتسجيل حضورك</p>
          <button 
            onClick={onClose}
            className="mt-4 px-8 py-3 bg-white/10 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  };
  const [partnerItems, setPartnerItems] = useState<{id: number, name: string, logo: string, url: string}[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkinId = params.get('checkin');
    if (checkinId) {
      setSelfCheckinActivityId(checkinId);
      setView('self-checkin');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const fetchData = async (retries = 3) => {
      try {
        const fetchWithRetry = async (url: string, options?: RequestInit): Promise<Response> => {
          for (let i = 0; i < retries; i++) {
            try {
              const res = await fetch(url, options);
              if (res.ok) return res;
            } catch (e) {
              if (i === retries - 1) throw e;
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
          }
          throw new Error(`Failed to fetch ${url} after ${retries} retries`);
        };

        const [settingsRes, galleryRes, partnersRes] = await Promise.allSettled([
          fetchWithRetry('/api/settings'),
          fetchWithRetry('/api/gallery'),
          fetchWithRetry('/api/partners')
        ]);

        if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
          const settings = await settingsRes.value.json();
          const contentMap: any = {};
          settings.forEach((s: any) => {
            try {
              if (s.key === 'socialLinks' && typeof s.value === 'string') {
                contentMap[s.key] = JSON.parse(s.value);
              } else {
                contentMap[s.key] = s.value;
              }
            } catch (e) {
              contentMap[s.key] = s.value;
            }
          });
          setSiteContent(prev => ({ ...prev, ...contentMap }));
        }

        if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
          setGalleryItems(await galleryRes.value.json());
        }

        if (partnersRes.status === 'fulfilled' && partnersRes.value.ok) {
          setPartnerItems(await partnersRes.value.json());
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };
    fetchData();
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSaveModal = async (type: string, data: any) => {
    if (type === 'content_edit') {
      try {
        // Persist to backend
        const updates = Object.entries(data).map(([key, value]) => ({
          key,
          value: typeof value === 'object' ? JSON.stringify(value) : value
        }));

        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings: updates })
        });

        if (res.ok) {
          setSiteContent(prev => ({ ...prev, ...data }));
          showToast('تم حفظ التغييرات بنجاح', 'success');
        } else {
          showToast('فشل حفظ التغييرات', 'error');
        }
      } catch (err) {
        showToast('خطأ في الاتصال بالخادم', 'error');
      }
    }
  };

  const Modal = ({ title, children, onSave, onClose, showSave = true, saveText = "حفظ التغييرات" }: { title: string, children: React.ReactNode, onSave?: () => void, onClose: () => void, showSave?: boolean, saveText?: string }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-brand-darker border border-brand-accent/20 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-brand-accent/10 flex items-center justify-between flex-row-reverse">
          <h3 className="text-xl font-black text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
        <div className="p-6 border-t border-brand-accent/10 flex gap-3 flex-row-reverse">
          {showSave && onSave && (
            <button 
              onClick={onSave}
              className="flex-1 py-4 bg-brand-primary text-white rounded-2xl font-black text-lg hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
            >
              {saveText}
            </button>
          )}
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all"
          >
            {showSave ? 'إلغاء' : 'إغلاق'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  const ConfirmationModal = ({ title, message, onConfirm, onCancel }: { title: string, message: string, onConfirm: () => void, onCancel: () => void }) => (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-brand-darker border border-red-500/20 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
            <Trash2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">{title}</h3>
            <p className="text-slate-400 font-bold">{message}</p>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
            >
              تأكيد الحذف
            </button>
            <button 
              onClick={onCancel}
              className="flex-1 py-4 bg-slate-800 text-slate-300 rounded-2xl font-black text-lg hover:bg-slate-700 transition-all"
            >
              إلغاء
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'organizers' | 'exhibitors' | 'attendees' | 'users' | 'content' | 'program' | 'services' | 'badges' | 'activities' | 'attendance'>('users');
    const [userCategory, setUserCategory] = useState<'attendee' | 'exhibitor' | 'organizer'>('attendee');
    const [contentSubTab, setContentSubTab] = useState<'home' | 'header' | 'footer'>('home');
    const [editingItem, setEditingItem] = useState<{ type: string, data: any } | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceSearchTerm, setAttendanceSearchTerm] = useState('');
    const [attendanceActivityFilter, setAttendanceActivityFilter] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [adminRegistrations, setAdminRegistrations] = useState<RegistrationResult[]>([]);
    const [adminAttendance, setAdminAttendance] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<{ title: string, message: string, onConfirm: () => void } | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const contentKeyLabels: Record<string, string> = {
      title: 'عنوان الموقع',
      edition: 'الطبعة',
      year: 'السنة',
      logo: 'الشعار الرئيسي',
      expoLogo: 'شعار المعرض',
      headerImage: 'صورة الهيدر',
      heroTitle: 'العنوان الرئيسي (الهيرو)',
      heroSubtitle: 'العنوان الفرعي (الهيرو)',
      footerText: 'نص الفوتر',
      contactAddress: 'العنوان',
      contactEmail: 'البريد الإلكتروني',
      contactPhone: 'رقم الهاتف',
      headerHome: 'رابط الرئيسية',
      headerProgram: 'رابط البرنامج',
      headerLogin: 'رابط الدخول',
      headerRegister: 'رابط التسجيل',
      footerLogo: 'شعار الفوتر',
      socialLinks: 'روابط التواصل الاجتماعي'
    };

    const getElementLabel = (key: string) => {
      return contentKeyLabels[key as keyof typeof contentKeyLabels] || key;
    };

    const [isUploading, setIsUploading] = useState(false);

    const handleAdminPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const compressed = await compressImage(file, 1200, 1200, 0.8);
          callback(compressed);
        } catch (err) {
          showToast('فشل ضغط الصورة', 'error');
        } finally {
          setIsUploading(false);
        }
      }
    };

    const fetchAdminData = async (retries = 3) => {
      setLoadingData(true);
      try {
        const fetchWithRetry = async (url: string): Promise<Response> => {
          for (let i = 0; i < retries; i++) {
            try {
              const res = await fetch(url);
              if (res.ok) return res;
            } catch (e) {
              if (i === retries - 1) throw e;
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
          }
          throw new Error(`Failed to fetch ${url}`);
        };

        const [regRes, actRes, attRes] = await Promise.allSettled([
          fetchWithRetry('/api/admin/registrations'),
          fetchWithRetry('/api/activities'),
          fetchWithRetry('/api/admin/attendance')
        ]);
        if (regRes.status === 'fulfilled' && regRes.value.ok) setAdminRegistrations(await regRes.value.json());
        if (actRes.status === 'fulfilled' && actRes.value.ok) setActivities(await actRes.value.json());
        if (attRes.status === 'fulfilled' && attRes.value.ok) setAdminAttendance(await attRes.value.json());
      } catch (err) {
        showToast('فشل تحميل البيانات', 'error');
      } finally {
        setLoadingData(false);
      }
    };

    useEffect(() => {
      if (view === 'admin') {
        fetchAdminData();
      }
    }, [view]);

    const handleLogout = () => {
      setIsAdmin(false);
      setView('home');
    };

    const deleteOrganizer = async (id: number) => {
      setConfirmDialog({
        title: 'حذف منظم',
        message: 'هل أنت متأكد من حذف هذا المنظم؟ لا يمكن التراجع عن هذا الإجراء.',
        onConfirm: async () => {
          try {
            const res = await fetch(`/api/admin/registration/${id}`, { method: 'DELETE' });
            if (res.ok) {
              showToast('تم الحذف بنجاح', 'success');
              fetchAdminData();
            }
          } catch (err) {
            showToast('فشل الحذف', 'info');
          }
          setConfirmDialog(null);
        }
      });
    };

    const deleteService = (id: number) => {
      setConfirmDialog({
        title: 'حذف خدمة',
        message: 'هل أنت متأكد من حذف هذه الخدمة؟',
        onConfirm: () => {
          setServices(prev => prev.filter(l => l.id !== id));
          setConfirmDialog(null);
          showToast('تم الحذف بنجاح', 'success');
        }
      });
    };

    const deleteEvent = (id: number) => {
      setConfirmDialog({
        title: 'حذف فعالية',
        message: 'هل أنت متأكد من حذف هذه الفعالية من البرنامج؟',
        onConfirm: () => {
          setProgramEvents(prev => prev.filter(e => e.id !== id));
          setConfirmDialog(null);
          showToast('تم الحذف بنجاح', 'success');
        }
      });
    };

      const deleteRegistrant = async (id: number) => {
        setConfirmDialog({
          title: 'حذف مسجل',
          message: 'هل أنت متأكد من حذف هذا المسجل؟ سيتم إزالة كافة بياناته.',
          onConfirm: async () => {
            try {
              const res = await fetch(`/api/admin/registration/${id}`, { method: 'DELETE' });
              if (res.ok) {
                showToast('تم الحذف بنجاح', 'success');
                fetchAdminData();
              }
            } catch (err) {
              showToast('فشل الحذف', 'info');
            }
            setConfirmDialog(null);
          }
        });
      };

      const exportToCSV = () => {
        if (adminRegistrations.length === 0) {
          showToast('لا توجد بيانات لتصديرها', 'info');
          return;
        }

        const headers = ['ID', 'Badge ID', 'Full Name', 'Type', 'Company', 'City', 'Phone', 'Email'];
        const csvRows = [
          headers.join(','),
          ...adminRegistrations.map(reg => [
            reg.id,
            reg.badgeId || '',
            `"${reg.fullName.replace(/"/g, '""')}"`,
            reg.type,
            `"${(reg.companyName || '').replace(/"/g, '""')}"`,
            `"${(reg.city || '').replace(/"/g, '""')}"`,
            reg.phone,
            reg.email
          ].join(','))
        ];

        const csvContent = "\uFEFF" + csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('تم تصدير البيانات بنجاح', 'success');
      };

      const editRegistrant = (reg: any) => {
        setEditingItem({ type: 'registrant_edit', data: { ...reg } });
      };

      const editContent = (key: string, currentValue: any) => {
        setEditingItem({ type: 'content_edit', data: { key, value: currentValue } });
      };

      const editEvent = (event: any) => {
        setEditingItem({ type: 'event_edit', data: { ...event } });
      };

      const editService = (item: any) => {
        setEditingItem({ type: 'service_edit', data: { ...item } });
      };

      const addService = () => {
        setEditingItem({ type: 'service_add', data: { service: '', provider: '', phone: '' } });
      };

      const addEvent = () => {
        setEditingItem({ type: 'event_add', data: { title: '', code: `EVT-${Math.floor(Math.random() * 1000)}`, day: 1, date: '2026-03-29', time: '10:00', location: 'القاعة الرئيسية', description: '', classification: 'عام', note: '' } });
      };

      const addBadge = () => {
        setEditingItem({ type: 'badge_add', data: { type: '', label: '', bg: 'from-brand-primary to-brand-accent' } });
      };

      const editBadge = (type: string, settings: any) => {
        setEditingItem({ type: 'badge_edit', data: { type, ...settings } });
      };

      const handleSaveModal = async () => {
        if (!editingItem) return;

        const { type, data } = editingItem;

        if (type === 'registrant_edit') {
          try {
            const res = await fetch(`/api/admin/registration/${data.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (res.ok) {
              showToast('تم الحفظ بنجاح', 'success');
              fetchAdminData();
            }
          } catch (err) {
            showToast('فشل التحديث', 'info');
          }
        } else if (type === 'registrant_add') {
          try {
            const res = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (res.ok) {
              showToast('تم الحفظ بنجاح', 'success');
              fetchAdminData();
            }
          } catch (err) {
            showToast('فشل الإضافة', 'info');
          }
        } else if (type === 'organizer_add' || type === 'organizer_edit') {
          try {
            const method = type === 'organizer_add' ? 'POST' : 'PUT';
            const url = type === 'organizer_add' ? '/api/register' : `/api/admin/registration/${data.id}`;
            const res = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...data, type: 'organizer' })
            });
            if (res.ok) {
              showToast('تم الحفظ بنجاح', 'success');
              fetchAdminData();
            }
          } catch (err) {
            showToast('فشل الحفظ', 'info');
          }
        } else if (type === 'content_edit') {
          try {
            const newContent = { ...siteContent, [data.key]: data.value };
            const res = await fetch('/api/settings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ [data.key]: data.value })
            });
            if (res.ok) {
              setSiteContent(newContent);
              setSaveSuccess(true);
              showToast('تم الحفظ بنجاح', 'success');
              setTimeout(() => {
                setSaveSuccess(false);
                setEditingItem(null);
              }, 1500);
              return;
            }
          } catch (err) {
            showToast('فشل التحديث', 'info');
          }
        } else if (type === 'event_edit') {
          setProgramEvents(prev => prev.map(e => e.id === data.id ? data : e));
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'event_add') {
          setProgramEvents(prev => [...prev, { ...data, id: Date.now() + Math.random() }]);
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'service_edit') {
          setServices(prev => prev.map(s => s.id === data.id ? data : s));
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'service_add') {
          setServices(prev => [...prev, { ...data, id: Date.now() + Math.random() }]);
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'badge_add') {
          setBadgeSettings(prev => ({ ...prev, [data.type]: { bg: data.bg, button: 'bg-brand-primary hover:bg-brand-accent', label: data.label } }));
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'badge_edit') {
          setBadgeSettings(prev => ({ ...prev, [data.type]: { ...data } }));
          showToast('تم الحفظ بنجاح', 'success');
        } else if (type === 'activity_add' || type === 'activity_edit') {
          try {
            const method = type === 'activity_add' ? 'POST' : 'PUT';
            const url = type === 'activity_add' ? '/api/activities' : `/api/activities/${data.id}`;
            const res = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (res.ok) {
              showToast('تم الحفظ بنجاح', 'success');
              fetchAdminData();
            }
          } catch (err) {
            showToast('فشل الحفظ', 'info');
          }
        }

        setEditingItem(null);
      };

      const filterData = (data: any[], keys: string[]) => {
        return data.filter(item => 
          keys.some(key => String(item[key]).toLowerCase().includes(searchTerm.toLowerCase()))
        );
      };

      return (
        <>
          <div className="min-h-screen bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-darker p-6 rounded-[2rem] border border-brand-accent/10">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black text-white">لوحة تحكم الإدارة الاحترافية</h2>
                  <p className="text-slate-500 text-sm font-bold">مرحباً بك، المسؤول النظام</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="بحث سريع..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-brand-dark border border-brand-accent/10 rounded-xl py-2 pr-10 pl-4 text-white text-sm focus:border-brand-primary outline-none transition-all w-64 text-right"
                  />
                </div>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-3 rounded-xl transition-all ${showSettings ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg shadow-red-500/10"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>

            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-primary/5 border border-brand-primary/20 p-6 rounded-[2rem] space-y-4"
              >
                <h3 className="text-lg font-black text-white text-right">إعدادات متقدمة وصلاحيات</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => showToast('سيتم تفعيل إدارة الصلاحيات في التحديث القادم', 'info')}
                    className="p-4 bg-brand-darker rounded-xl border border-brand-accent/5 text-slate-300 font-bold hover:border-brand-primary transition-all text-right"
                  >
                    إدارة الصلاحيات
                  </button>
                  <button 
                    onClick={() => showToast('سيتم تفعيل تصنيفات المسجلين في التحديث القادم', 'info')}
                    className="p-4 bg-brand-darker rounded-xl border border-brand-accent/5 text-slate-300 font-bold hover:border-brand-primary transition-all text-right"
                  >
                    تصنيفات المسجلين
                  </button>
                  <button 
                    onClick={() => showToast('سيتم تفعيل إعدادات الطباعة في التحديث القادم', 'info')}
                    className="p-4 bg-brand-darker rounded-xl border border-brand-accent/5 text-slate-300 font-bold hover:border-brand-primary transition-all text-right"
                  >
                    إعدادات الطباعة
                  </button>
                </div>
              </motion.div>
            )}

          {/* Admin Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide flex-row-reverse">
            {[
              { id: 'users', label: 'البحث العام', icon: <Search className="w-4 h-4" /> },
              { id: 'organizers', label: 'المنظمين', icon: <User className="w-4 h-4" /> },
              { id: 'exhibitors', label: 'العارضين', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'attendees', label: 'الزوار', icon: <Users className="w-4 h-4" /> },
              { id: 'content', label: 'المحتوى', icon: <Globe className="w-4 h-4" /> },
              { id: 'badges', label: 'تخصيص الشارات', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'activities', label: 'الأنشطة والقاعات', icon: <Building2 className="w-4 h-4" /> },
              { id: 'attendance', label: 'إدارة الحضور', icon: <Clock className="w-4 h-4" /> },
              { id: 'program', label: 'البرنامج', icon: <Calendar className="w-4 h-4" /> },
              { id: 'services', label: 'الخدمات', icon: <Truck className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm whitespace-nowrap transition-all flex-row-reverse ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-brand-darker text-slate-500 hover:text-slate-300 border border-brand-accent/5'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-brand-darker rounded-[2.5rem] border border-brand-accent/10 overflow-hidden shadow-2xl">
            {activeTab === 'users' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-row-reverse">
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <h3 className="text-xl font-black text-white">البحث في قائمة المسجلين</h3>
                    <button 
                      onClick={exportToCSV}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl font-black text-sm hover:bg-emerald-500 hover:text-white transition-all flex-row-reverse"
                      title="تصدير إلى CSV"
                    >
                      <FileText className="w-4 h-4" />
                      تصدير CSV
                    </button>
                  </div>
                  <div className="relative w-full md:w-96">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="بحث بالاسم، الشركة، المدينة، أو رقم الهاتف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-brand-dark border border-brand-accent/10 rounded-xl py-2.5 pr-10 pl-4 text-white text-sm focus:border-brand-primary outline-none transition-all text-right"
                    />
                  </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">ID الشارة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الاسم</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الفئة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">المدينة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الهاتف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(adminRegistrations, ['fullName', 'companyName', 'city', 'type', 'badgeId', 'email', 'phone'])
                        .map((reg) => (
                        <tr key={`desktop-${reg.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-brand-primary font-mono font-bold text-xs">
                            {reg.badgeId || `${reg.type === 'exhibitor' ? 'EXH' : reg.type === 'organizer' ? 'ORG' : 'ATT'}-2026-${String(reg.id).padStart(4, '0')}`}
                          </td>
                          <td className="py-4 text-white font-bold">{reg.fullName}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              reg.type === 'organizer' ? 'bg-purple-500/10 text-purple-500' :
                              reg.type === 'exhibitor' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-green-500/10 text-green-500'
                            }`}>
                              {badgeSettings[reg.type]?.label || reg.type}
                            </span>
                          </td>
                          <td className="py-4 text-slate-400 text-sm">{reg.city || '-'}</td>
                          <td className="py-4 text-slate-400 text-sm" dir="ltr">{reg.phone}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setEditingItem({ type: 'badge_view', data: reg })} 
                                className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                title="عرض الشارة"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => editRegistrant(reg)} 
                                className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteRegistrant(reg.id)} 
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Users */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(adminRegistrations, ['fullName', 'companyName', 'city', 'type', 'badgeId', 'email', 'phone']).map((reg) => (
                    <div key={`mobile-${reg.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <div className="text-right">
                          <h4 className="text-white font-bold">{reg.fullName}</h4>
                          <p className="text-brand-primary font-mono text-[10px]">{reg.badgeId || formatId(reg.id, reg.type)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          reg.type === 'organizer' ? 'bg-purple-500/10 text-purple-500' :
                          reg.type === 'exhibitor' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-green-500/10 text-green-500'
                        }`}>
                          {badgeSettings[reg.type]?.label || reg.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-right">
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">المدينة</p>
                          <p className="text-slate-300 text-xs">{reg.city || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">الهاتف</p>
                          <p className="text-slate-300 text-xs" dir="ltr">{reg.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => { setRegistrationResult(reg); setView('badge'); }}
                          className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Download className="w-3 h-3" /> شارة
                        </button>
                        <button 
                          onClick={() => editRegistrant(reg)}
                          className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Edit className="w-3 h-3" /> تعديل
                        </button>
                        <button 
                          onClick={() => deleteRegistrant(reg.id)}
                          className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" /> حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {adminRegistrations.length === 0 && (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-600">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-slate-500 font-bold">لا توجد نتائج مطابقة للبحث</p>
                    </div>
                  )}
                </div>
              )}

            {activeTab === 'organizers' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة المنظمين والأدوار</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="بحث في المنظمين..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-brand-dark border border-brand-accent/10 rounded-lg py-1.5 pr-8 pl-3 text-white text-xs outline-none focus:border-brand-primary w-48 text-right"
                      />
                    </div>
                    <button 
                      onClick={() => setEditingItem({ type: 'organizer_add', data: { fullName: '', username: '', password: '', role: 'organizer', type: 'organizer' } })}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة منظم
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">ID الشارة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الصورة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الاسم الكامل</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الوظيفة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">اسم المستخدم</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الدور</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">رقم الهاتف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(adminRegistrations.filter(r => r.type === 'organizer'), ['fullName', 'username', 'badgeId', 'phone']).map((org) => (
                        <tr key={`desktop-${org.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-brand-primary font-mono font-bold text-xs">{org.badgeId}</td>
                          <td className="py-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/20 bg-brand-dark">
                              {org.photo ? (
                                <img src={org.photo} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-white font-bold">{org.fullName}</td>
                          <td className="py-4 text-slate-400 text-sm">{org.position || 'منظم'}</td>
                          <td className="py-4 text-slate-400 text-sm">{org.username}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase">
                              {org.type}
                            </span>
                          </td>
                          <td className="py-4 text-slate-400 text-sm" dir="ltr">{org.phone || '0000000000'}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setRegistrationResult(org);
                                  setView('badge');
                                }} 
                                className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                title="عرض الشارة"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingItem({ type: 'organizer_edit', data: org })} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => deleteOrganizer(org.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Organizers */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(adminRegistrations.filter(r => r.type === 'organizer'), ['fullName', 'username', 'badgeId', 'phone']).map((org) => (
                    <div key={`mobile-${org.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-brand-accent/20 bg-brand-darker shrink-0">
                          {org.photo ? <img src={org.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-600"><User className="w-6 h-6" /></div>}
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="text-white font-bold">{org.fullName}</h4>
                          <p className="text-brand-primary font-mono text-[10px]">{org.badgeId}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-right">
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">الوظيفة</p>
                          <p className="text-slate-300 text-xs">{org.position || 'منظم'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">اسم المستخدم</p>
                          <p className="text-slate-300 text-xs">{org.username}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setEditingItem({ type: 'badge_view', data: org })} className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Download className="w-3 h-3" /> عرض الشارة</button>
                        <button onClick={() => setEditingItem({ type: 'organizer_edit', data: org })} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                        <button onClick={() => deleteOrganizer(org.id)} className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Trash2 className="w-3 h-3" /> حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'exhibitors' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة العارضين</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="بحث في العارضين..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-brand-dark border border-brand-accent/10 rounded-lg py-1.5 pr-8 pl-3 text-white text-xs outline-none focus:border-brand-primary w-48 text-right"
                      />
                    </div>
                    <button 
                      onClick={() => setEditingItem({ type: 'registrant_add', data: { fullName: '', email: '', phone: '', city: '', type: 'exhibitor', companyName: '', position: '', participationType: '' } })}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة عارض
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">ID الشارة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الصورة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الاسم الكامل</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الشركة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">المنصب</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">رقم الهاتف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(adminRegistrations.filter(r => r.type === 'exhibitor'), ['fullName', 'companyName', 'badgeId', 'phone']).map((exh) => (
                        <tr key={`desktop-${exh.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-brand-primary font-mono font-bold text-xs">{exh.badgeId}</td>
                          <td className="py-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/20 bg-brand-dark">
                              {exh.photo ? (
                                <img src={exh.photo} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-white font-bold">{exh.fullName}</td>
                          <td className="py-4 text-slate-400 text-sm">{exh.companyName}</td>
                          <td className="py-4 text-slate-400 text-sm">{exh.position}</td>
                          <td className="py-4 text-slate-400 text-sm" dir="ltr">{exh.phone}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setRegistrationResult(exh);
                                  setView('badge');
                                }} 
                                className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                title="عرض الشارة"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingItem({ type: 'registrant_edit', data: exh })} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => deleteRegistrant(exh.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Exhibitors */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(adminRegistrations.filter(r => r.type === 'exhibitor'), ['fullName', 'companyName', 'badgeId', 'phone']).map((exh) => (
                    <div key={`mobile-${exh.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-brand-accent/20 bg-brand-darker shrink-0">
                          {exh.photo ? <img src={exh.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-600"><User className="w-6 h-6" /></div>}
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="text-white font-bold">{exh.fullName}</h4>
                          <p className="text-brand-primary font-mono text-[10px]">{exh.badgeId}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-right">
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">الشركة</p>
                          <p className="text-slate-300 text-xs">{exh.companyName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">المنصب</p>
                          <p className="text-slate-300 text-xs">{exh.position}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setEditingItem({ type: 'badge_view', data: exh })} className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Download className="w-3 h-3" /> عرض الشارة</button>
                        <button onClick={() => setEditingItem({ type: 'registrant_edit', data: exh })} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                        <button onClick={() => deleteRegistrant(exh.id)} className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Trash2 className="w-3 h-3" /> حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendees' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة الزوار</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="بحث في الزوار..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-brand-dark border border-brand-accent/10 rounded-lg py-1.5 pr-8 pl-3 text-white text-xs outline-none focus:border-brand-primary w-48 text-right"
                      />
                    </div>
                    <button 
                      onClick={() => setEditingItem({ type: 'registrant_add', data: { fullName: '', email: '', phone: '', city: '', type: 'attendee', educationLevel: '' } })}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة زائر
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">ID الشارة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الصورة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الاسم الكامل</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">المدينة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">رقم الهاتف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(adminRegistrations.filter(r => r.type === 'attendee'), ['fullName', 'city', 'badgeId', 'phone']).map((att) => (
                        <tr key={`desktop-${att.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-brand-primary font-mono font-bold text-xs">{att.badgeId}</td>
                          <td className="py-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/20 bg-brand-dark">
                              {att.photo ? (
                                <img src={att.photo} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-white font-bold">{att.fullName}</td>
                          <td className="py-4 text-slate-400 text-sm">{att.city}</td>
                          <td className="py-4 text-slate-400 text-sm" dir="ltr">{att.phone}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setRegistrationResult(att);
                                  setView('badge');
                                }} 
                                className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                title="عرض الشارة"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingItem({ type: 'registrant_edit', data: att })} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => deleteRegistrant(att.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Attendees */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(adminRegistrations.filter(r => r.type === 'attendee'), ['fullName', 'city', 'badgeId', 'phone']).map((att) => (
                    <div key={`mobile-${att.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-brand-accent/20 bg-brand-darker shrink-0">
                          {att.photo ? <img src={att.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-600"><User className="w-6 h-6" /></div>}
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="text-white font-bold">{att.fullName}</h4>
                          <p className="text-brand-primary font-mono text-[10px]">{att.badgeId}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-right">
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">المدينة</p>
                          <p className="text-slate-300 text-xs">{att.city}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">الهاتف</p>
                          <p className="text-slate-300 text-xs" dir="ltr">{att.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setEditingItem({ type: 'badge_view', data: att })} className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Download className="w-3 h-3" /> عرض الشارة</button>
                        <button onClick={() => setEditingItem({ type: 'registrant_edit', data: att })} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                        <button onClick={() => deleteRegistrant(att.id)} className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Trash2 className="w-3 h-3" /> حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة وتعديل المحتوى</h3>
                  <div className="flex gap-2 bg-brand-dark p-1 rounded-xl border border-brand-accent/10">
                    <button 
                      onClick={() => setContentSubTab('home')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${contentSubTab === 'home' ? 'bg-brand-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      الرئيسية
                    </button>
                    <button 
                      onClick={() => setContentSubTab('header')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${contentSubTab === 'header' ? 'bg-brand-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      الهيدر
                    </button>
                    <button 
                      onClick={() => setContentSubTab('footer')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${contentSubTab === 'footer' ? 'bg-brand-primary text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      الفوتر
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">العنصر</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">القيمة الحالية</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {Object.entries(siteContent)
                        .filter(([key]) => {
                          if (contentSubTab === 'home') return key.startsWith('hero') || key === 'title' || key === 'edition' || key === 'year' || key === 'expoLogo';
                          if (contentSubTab === 'header') return key === 'headerImage' || key.startsWith('header');
                          if (contentSubTab === 'footer') return key.startsWith('footer') || key.startsWith('contact') || key === 'socialLinks';
                          return true;
                        })
                        .map(([key, value]) => (
                        <tr key={`desktop-${key}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-slate-500 font-bold text-xs uppercase">
                            {typeof value === 'string' && value.length < 50 && !key.endsWith('Color') && !key.endsWith('Size') && !key.startsWith('fontScale') && !key.toLowerCase().includes('image') && !key.toLowerCase().includes('logo') ? value : getElementLabel(key)}
                          </td>
                          <td className="py-4 text-white text-sm max-w-xs truncate">
                            {key.endsWith('Color') ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: String(value) }}></div>
                                {String(value)}
                              </div>
                            ) : key === 'socialLinks' ? `${(value as any[]).length} روابط` : String(value)}
                          </td>
                          <td className="py-4">
                            <button onClick={() => editContent(key, value)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Content */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {Object.entries(siteContent)
                    .filter(([key]) => {
                      if (contentSubTab === 'home') return key.startsWith('hero') || key === 'title' || key === 'edition' || key === 'year' || key === 'expoLogo';
                      if (contentSubTab === 'header') return key === 'headerImage' || key.startsWith('header');
                      if (contentSubTab === 'footer') return key.startsWith('footer') || key.startsWith('contact') || key === 'socialLinks';
                      return true;
                    })
                    .map(([key, value]) => (
                      <div key={`mobile-${key}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-3">
                        <div className="flex items-center justify-between flex-row-reverse">
                          <span className="text-slate-500 font-bold text-[10px] uppercase">
                            {typeof value === 'string' && value.length < 50 && !key.endsWith('Color') && !key.endsWith('Size') && !key.startsWith('fontScale') && !key.toLowerCase().includes('image') && !key.toLowerCase().includes('logo') ? value : getElementLabel(key)}
                          </span>
                          <button onClick={() => editContent(key, value)} className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg"><Edit className="w-3 h-3" /></button>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm break-words">
                            {key.endsWith('Color') ? (
                              <div className="flex items-center gap-2 justify-end">
                                {String(value)}
                                <div className="w-3 h-3 rounded border border-white/20" style={{ backgroundColor: String(value) }}></div>
                              </div>
                            ) : key === 'socialLinks' ? `${(value as any[]).length} روابط` : String(value)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Gallery and Sponsor Management */}
                {contentSubTab === 'home' && (
                  <div className="mt-12 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <h4 className="text-lg font-black text-white">معرض صور التظاهرة</h4>
                        <button 
                          disabled={isUploading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const url = await compressImage(file);
                                  const res = await fetch('/api/gallery', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ url })
                                  });
                                  if (res.ok) {
                                    const newItem = await res.json();
                                    setGalleryItems(prev => [newItem, ...prev]);
                                    showToast('تمت إضافة الصورة بنجاح', 'success');
                                  }
                                } catch (err) {
                                  showToast('فشل رفع الصورة', 'error');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            };
                            input.click();
                          }}
                          className={`p-2 rounded-lg transition-all ${isUploading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-primary/90'}`}
                        >
                          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryItems.map((item) => (
                          <div key={item.id} className="relative group aspect-video rounded-xl overflow-hidden border border-brand-accent/10">
                            <img src={item.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => {
                                setConfirmDialog({
                                  title: 'حذف صورة',
                                  message: 'هل أنت متأكد من حذف هذه الصورة من المعرض؟',
                                  onConfirm: async () => {
                                    const res = await fetch(`/api/gallery/${item.id}`, { method: 'DELETE' });
                                    if (res.ok) {
                                      setGalleryItems(prev => prev.filter(i => i.id !== item.id));
                                      showToast('تم الحذف بنجاح', 'success');
                                    }
                                    setConfirmDialog(null);
                                  }
                                });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <h4 className="text-lg font-black text-white">شعارات المساهمين</h4>
                        <button 
                          disabled={isUploading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const logo = await compressImage(file, 600, 600);
                                  const res = await fetch('/api/partners', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: 'New Partner', logo, url: '#' })
                                  });
                                  if (res.ok) {
                                    const newItem = await res.json();
                                    setPartnerItems(prev => [newItem, ...prev]);
                                    showToast('تمت إضافة الشريك بنجاح', 'success');
                                  }
                                } catch (err) {
                                  showToast('فشل رفع الشعار', 'error');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            };
                            input.click();
                          }}
                          className={`p-2 rounded-lg transition-all ${isUploading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-primary/90'}`}
                        >
                          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {partnerItems.map((item) => (
                          <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden border border-brand-accent/10 bg-white/5 p-2">
                            <img src={item.logo} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => {
                                setConfirmDialog({
                                  title: 'حذف شريك',
                                  message: 'هل أنت متأكد من حذف هذا الشريك؟',
                                  onConfirm: async () => {
                                    const res = await fetch(`/api/partners/${item.id}`, { method: 'DELETE' });
                                    if (res.ok) {
                                      setPartnerItems(prev => prev.filter(i => i.id !== item.id));
                                      showToast('تم الحذف بنجاح', 'success');
                                    }
                                    setConfirmDialog(null);
                                  }
                                });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة القاعات والأنشطة</h3>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setEditingItem({ type: 'activity_add', data: { title: '', type: 'hall', location: '', startTime: '', endTime: '', description: '' } })}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة نشاط/قاعة
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="bg-brand-dark p-6 rounded-3xl border border-brand-accent/10 space-y-4 relative overflow-hidden group">
                      <div className="flex items-start justify-between flex-row-reverse">
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-2 inline-block ${
                            activity.type === 'hall' ? 'bg-blue-500/10 text-blue-500' :
                            activity.type === 'workshop' ? 'bg-purple-500/10 text-purple-500' :
                            activity.type === 'lecture' ? 'bg-orange-500/10 text-orange-500' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {activity.type === 'hall' ? 'قاعة' : activity.type === 'workshop' ? 'ورشة' : activity.type === 'lecture' ? 'محاضرة' : 'نشاط'}
                          </span>
                          <h4 className="text-lg font-black text-white">{activity.title}</h4>
                          <p className="text-slate-400 text-xs font-bold flex items-center gap-1 justify-end">
                            {activity.location} <MapPin className="w-3 h-3" />
                          </p>
                        </div>
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                          <QRCodeSVG 
                            value={JSON.stringify({ type: 'activity', id: activity.id, title: activity.title })}
                            size={60}
                            level="H"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-slate-500 text-xs font-bold justify-end">
                        <span className="flex items-center gap-1">{activity.endTime} - {activity.startTime} <Clock className="w-3 h-3" /></span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => {
                            setEditingItem({ type: 'activity_qr', data: activity });
                          }}
                          className="flex-1 bg-slate-800 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Scan className="w-3 h-3" /> عرض QR
                        </button>
                        <button 
                          onClick={() => setEditingItem({ type: 'activity_edit', data: activity })}
                          className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setConfirmDialog({
                              title: 'حذف النشاط',
                              message: 'هل أنت متأكد من حذف هذا النشاط؟ سيتم حذف جميع سجلات الحضور المرتبطة به.',
                              onConfirm: async () => {
                                const res = await fetch(`/api/activities/${activity.id}`, { method: 'DELETE' });
                                if (res.ok) {
                                  setActivities(prev => prev.filter(a => a.id !== activity.id));
                                  showToast('تم الحذف بنجاح', 'success');
                                }
                                setConfirmDialog(null);
                              }
                            });
                          }}
                          className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {activities.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-600">
                      <Building2 className="w-10 h-10" />
                    </div>
                    <p className="text-slate-500 font-bold">لم يتم إضافة أي أنشطة أو قاعات بعد</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة الحضور</h3>
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-row-reverse">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="بحث بالاسم..."
                        value={attendanceSearchTerm}
                        onChange={(e) => setAttendanceSearchTerm(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-accent/10 rounded-xl py-2.5 pr-10 pl-4 text-white text-sm font-bold focus:outline-none focus:border-brand-primary transition-all text-right"
                      />
                    </div>
                    <select 
                      value={attendanceActivityFilter}
                      onChange={(e) => setAttendanceActivityFilter(e.target.value)}
                      className="w-full md:w-48 bg-brand-dark border border-brand-accent/10 rounded-xl py-2.5 px-4 text-white text-sm font-bold focus:outline-none focus:border-brand-primary transition-all text-right"
                    >
                      <option value="all">كل الأنشطة</option>
                      {activities.map(act => (
                        <option key={act.id} value={act.id}>{act.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/5">
                        <th className="pb-4 pt-2 font-black text-slate-500 text-sm">التاريخ والوقت</th>
                        <th className="pb-4 pt-2 font-black text-slate-500 text-sm">النشاط</th>
                        <th className="pb-4 pt-2 font-black text-slate-500 text-sm">الاسم الكامل</th>
                        <th className="pb-4 pt-2 font-black text-slate-500 text-sm">رقم الشارة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {adminAttendance
                        .filter(att => {
                          const matchesName = att.fullName.toLowerCase().includes(attendanceSearchTerm.toLowerCase());
                          const matchesActivity = attendanceActivityFilter === 'all' || att.activityId.toString() === attendanceActivityFilter;
                          return matchesName && matchesActivity;
                        })
                        .map((att) => (
                          <tr key={att.id} className="group hover:bg-brand-accent/5 transition-all">
                            <td className="py-4 text-slate-400 text-sm font-bold">
                              {new Date(att.attendedAt).toLocaleString('ar-DZ')}
                            </td>
                            <td className="py-4">
                              <span className="text-white font-black text-sm">{att.activityTitle}</span>
                              <div className="text-[10px] text-slate-500 font-bold">{att.activityType === 'hall' ? 'قاعة' : att.activityType === 'workshop' ? 'ورشة' : att.activityType === 'lecture' ? 'محاضرة' : 'نشاط'}</div>
                            </td>
                            <td className="py-4">
                              <div className="text-white font-black text-sm">{att.fullName}</div>
                              <div className="text-[10px] text-slate-500 font-bold">{att.registrantType === 'attendee' ? 'زائر' : att.registrantType === 'exhibitor' ? 'عارض' : 'منظم'}</div>
                            </td>
                            <td className="py-4">
                              <span className="px-2 py-1 bg-brand-accent/10 text-brand-accent rounded-lg text-xs font-black">
                                {att.badgeId || `REG-${att.registrationId.toString().padStart(4, '0')}`}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {adminAttendance.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-600">
                      <Clock className="w-10 h-10" />
                    </div>
                    <p className="text-slate-500 font-bold">لا توجد سجلات حضور حالياً</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'program' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة الفعاليات والجدول الزمني</h3>
                  <button 
                    onClick={addEvent}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة فعالية
                  </button>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">الكود</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">العنوان</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">التصنيف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">التاريخ</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الوقت</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">ملاحظة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(programEvents, ['title', 'code', 'location', 'classification', 'note']).map((event) => (
                        <tr key={`desktop-${event.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-brand-primary font-bold font-mono">{event.code}</td>
                          <td className="py-4 text-white font-bold">{event.title}</td>
                          <td className="py-4 text-brand-accent text-xs font-bold">{event.classification}</td>
                          <td className="py-4 text-slate-400 text-sm">{event.date}</td>
                          <td className="py-4 text-slate-400 text-sm">{event.time}</td>
                          <td className="py-4 text-slate-500 text-xs italic truncate max-w-[100px]">{event.note}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button onClick={() => editEvent(event)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => deleteEvent(event.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Program */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(programEvents, ['title', 'code', 'location', 'classification', 'note']).map((event) => (
                    <div key={`mobile-${event.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <div className="text-right">
                          <h4 className="text-white font-bold">{event.title}</h4>
                          <p className="text-brand-primary font-mono text-[10px]">{event.code}</p>
                        </div>
                        <span className="px-2 py-1 bg-brand-accent/10 text-brand-accent rounded text-[10px] font-bold">{event.classification}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-right">
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">التاريخ والوقت</p>
                          <p className="text-slate-300 text-xs">{event.date} - {event.time}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase">المكان</p>
                          <p className="text-slate-300 text-xs">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => editEvent(event)} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                        <button onClick={() => deleteEvent(event.id)} className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Trash2 className="w-3 h-3" /> حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة تخصيص الشارات</h3>
                  <button 
                    onClick={addBadge}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة شارة
                  </button>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">النوع/الدور</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">التسمية</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الألوان (BG)</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {Object.entries(badgeSettings).map(([type, settings]) => {
                        const s = settings as { bg: string, button: string, label: string };
                        return (
                          <tr key={`desktop-${type}`} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 text-white font-bold capitalize">{type}</td>
                            <td className="py-4 text-slate-300">{s.label}</td>
                            <td className="py-4">
                              <div className={`w-24 h-6 rounded bg-gradient-to-br ${s.bg}`}></div>
                            </td>
                            <td className="py-4">
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => editBadge(type, s)}
                                  className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    if (window.confirm('هل أنت متأكد من حذف هذه الشارة؟')) {
                                      const newSettings = { ...badgeSettings };
                                      delete newSettings[type];
                                      setBadgeSettings(newSettings);
                                    }
                                  }}
                                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Badges */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {Object.entries(badgeSettings).map(([type, settings]) => {
                    const s = settings as { bg: string, button: string, label: string };
                    return (
                      <div key={`mobile-${type}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                        <div className="flex items-center justify-between flex-row-reverse">
                          <h4 className="text-white font-bold capitalize">{type}</h4>
                          <span className="text-slate-500 text-xs font-bold">{s.label}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 font-black uppercase text-right">التدرج اللوني</p>
                          <div className={`w-full h-8 rounded-xl bg-gradient-to-br ${s.bg}`}></div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button onClick={() => editBadge(type, s)} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                          <button 
                            onClick={() => {
                              if (window.confirm('هل أنت متأكد من حذف هذه الشارة؟')) {
                                const newSettings = { ...badgeSettings };
                                delete newSettings[type];
                                setBadgeSettings(newSettings);
                              }
                            }}
                            className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-3 h-3" /> حذف
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-row-reverse">
                  <h3 className="text-xl font-black text-white">إدارة الخدمات واللوجستيك</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="بحث في الخدمات..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-brand-dark border border-brand-accent/10 rounded-lg py-1.5 pr-8 pl-3 text-white text-xs outline-none focus:border-brand-primary w-48 text-right"
                      />
                    </div>
                    <button 
                      onClick={addService}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl font-black text-sm flex-row-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة خدمة
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-brand-accent/10">
                        <th className="pb-4 font-black text-slate-500 text-sm">الخدمة</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">المزود</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الهاتف</th>
                        <th className="pb-4 font-black text-slate-500 text-sm">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-accent/5">
                      {filterData(services, ['service', 'provider', 'phone']).map((item) => (
                        <tr key={`desktop-${item.id}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-white font-bold">{item.service}</td>
                          <td className="py-4 text-slate-300 font-bold">{item.provider}</td>
                          <td className="py-4 text-brand-primary font-bold" dir="ltr">{item.phone}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button onClick={() => editService(item)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => deleteService(item.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View for Services */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filterData(services, ['service', 'provider', 'phone']).map((item) => (
                    <div key={`mobile-${item.id}`} className="bg-brand-dark p-5 rounded-2xl border border-brand-accent/10 space-y-4">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <h4 className="text-white font-bold">{item.service}</h4>
                        <span className="text-brand-primary font-bold text-xs" dir="ltr">{item.phone}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-black uppercase">المزود</p>
                        <p className="text-slate-300 text-sm font-bold">{item.provider}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => editService(item)} className="flex-1 bg-brand-primary/10 text-brand-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Edit className="w-3 h-3" /> تعديل</button>
                        <button onClick={() => deleteService(item.id)} className="flex-1 bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Trash2 className="w-3 h-3" /> حذف</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

        <AnimatePresence>
          {editingItem && (
            <Modal 
              title={
                editingItem.type === 'badge_view' ? 'معاينة الشارة' :
                editingItem.type === 'registrant_edit' ? 'تعديل بيانات المسجل' : 
                editingItem.type === 'organizer_add' ? 'إضافة منظم جديد' :
                editingItem.type === 'organizer_edit' ? 'تعديل بيانات المنظم' :
                editingItem.type === 'content_edit' ? 'تعديل المحتوى' :
                editingItem.type === 'event_edit' ? 'تعديل فعالية' :
                editingItem.type === 'event_add' ? 'إضافة فعالية' :
                editingItem.type === 'service_edit' ? 'تعديل خدمة' :
                editingItem.type === 'service_add' ? 'إضافة خدمة' :
                editingItem.type === 'badge_edit' ? 'تعديل إعدادات الشارة' :
                'إضافة عنصر جديد'
              }
              onSave={handleSaveModal}
              onClose={() => setEditingItem(null)}
              showSave={editingItem.type !== 'badge_view'}
            >
              <div className="space-y-4 text-right">
                {editingItem.type.startsWith('organizer') && (
                  <>
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary/30 bg-brand-dark relative group">
                        {editingItem.data.photo ? (
                          <img src={editingItem.data.photo} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <User className="w-10 h-10" />
                          </div>
                        )}
                        <button 
                          disabled={isUploading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const photo = await compressImage(file, 400, 400);
                                  setEditingItem({ ...editingItem, data: { ...editingItem.data, photo } });
                                } catch (err) {
                                  showToast('فشل معالجة الصورة', 'error');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            };
                            input.click();
                          }}
                          className={`absolute inset-0 flex items-center justify-center transition-opacity ${isUploading ? 'bg-black/60 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}
                        >
                          {isUploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                        </button>
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">تغيير الصورة الشخصية</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الاسم الكامل</label>
                      <input 
                        type="text" 
                        value={editingItem.data.fullName || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, fullName: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الوظيفة</label>
                        <input 
                          type="text" 
                          value={editingItem.data.position || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, position: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">رقم الهاتف</label>
                        <input 
                          type="text" 
                          value={editingItem.data.phone || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, phone: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">اسم المستخدم</label>
                        <input 
                          type="text" 
                          value={editingItem.data.username || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, username: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">كلمة المرور</label>
                        <input 
                          type="password" 
                          value={editingItem.data.password || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, password: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الدور</label>
                      <select 
                        value={editingItem.data.role || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, role: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      >
                        <option value="admin">Admin</option>
                        <option value="organizer">Organizer</option>
                        <option value="security">Security</option>
                        <option value="services">Services</option>
                      </select>
                    </div>
                  </>
                )}
                {editingItem.type === 'badge_view' && (
                  <div className="flex flex-col items-center space-y-6">
                    <div className="py-8">
                      <BadgeCard result={editingItem.data} />
                    </div>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => {
                          setRegistrationResult(editingItem.data);
                          handleShareBadge();
                        }}
                        className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Share2 className="w-4 h-4" />
                        مشاركة
                      </button>
                      <button 
                        onClick={() => {
                          setRegistrationResult(editingItem.data);
                          handleSaveBadge();
                        }}
                        className="flex-1 bg-brand-primary text-white py-3 rounded-xl font-black text-xs shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        حفظ الصورة
                      </button>
                    </div>
                  </div>
                )}
                {(editingItem.type === 'activity_add' || editingItem.type === 'activity_edit') && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">عنوان النشاط / القاعة</label>
                      <input 
                        type="text" 
                        value={editingItem.data.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">النوع</label>
                        <select 
                          value={editingItem.data.type || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, type: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        >
                          <option value="hall">قاعة</option>
                          <option value="workshop">ورشة</option>
                          <option value="lecture">محاضرة</option>
                          <option value="activity">نشاط</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الموقع</label>
                        <input 
                          type="text" 
                          value={editingItem.data.location || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">وقت البدء</label>
                        <input 
                          type="text" 
                          value={editingItem.data.startTime || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, startTime: e.target.value } })}
                          className="form-input h-12"
                          placeholder="09:00"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">وقت الانتهاء</label>
                        <input 
                          type="text" 
                          value={editingItem.data.endTime || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, endTime: e.target.value } })}
                          className="form-input h-12"
                          placeholder="10:30"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الوصف</label>
                      <textarea 
                        value={editingItem.data.description || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                        className="form-input min-h-[100px] py-3"
                        dir="rtl"
                      />
                    </div>
                  </div>
                )}
                {editingItem.type === 'activity_qr' && (
                  <div className="flex flex-col items-center space-y-6">
                    <div id="activity-qr-container" className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center space-y-4 border-4 border-brand-primary/20">
                      <div className="text-center space-y-1">
                        <h3 className="text-2xl font-black text-slate-900">{editingItem.data.title}</h3>
                        <p className="text-brand-primary font-black uppercase text-sm tracking-widest">{editingItem.data.type}</p>
                      </div>
                      <div className="p-4 bg-white rounded-3xl shadow-inner border-2 border-slate-100">
                        <QRCodeSVG 
                          value={JSON.stringify({ type: 'activity', id: editingItem.data.id, title: editingItem.data.title })}
                          size={240}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-slate-400 font-bold text-xs">امسح الكود لتسجيل الحضور</p>
                    </div>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={async () => {
                          const element = document.getElementById('activity-qr-container');
                          if (element) {
                            const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3 });
                            const link = document.createElement('a');
                            link.download = `QR-${editingItem.data.title}.png`;
                            link.href = dataUrl;
                            link.click();
                          }
                        }}
                        className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        حفظ QR للطباعة
                      </button>
                    </div>
                  </div>
                )}
                {(editingItem.type === 'registrant_edit' || editingItem.type === 'registrant_add') && (
                  <>
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary/30 bg-brand-dark relative group">
                        {editingItem.data.photo ? (
                          <img src={editingItem.data.photo} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <User className="w-10 h-10" />
                          </div>
                        )}
                        <button 
                          disabled={isUploading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const photo = await compressImage(file, 400, 400);
                                  setEditingItem({ ...editingItem, data: { ...editingItem.data, photo } });
                                } catch (err) {
                                  showToast('فشل معالجة الصورة', 'error');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            };
                            input.click();
                          }}
                          className={`absolute inset-0 flex items-center justify-center transition-opacity ${isUploading ? 'bg-black/60 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}
                        >
                          {isUploading ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-6 h-6 text-white" />}
                        </button>
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">تغيير الصورة الشخصية</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الاسم الكامل</label>
                        <input 
                          type="text" 
                          value={editingItem.data.fullName || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, fullName: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الدور / الفئة</label>
                        <select 
                          value={editingItem.data.type || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, type: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        >
                          {Object.entries(badgeSettings).map(([type, settings]) => (
                            <option key={type} value={type}>{(settings as any).label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          value={editingItem.data.email || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, email: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الهاتف</label>
                        <input 
                          type="text" 
                          value={editingItem.data.phone || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, phone: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">المدينة</label>
                        <input 
                          type="text" 
                          value={editingItem.data.city || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, city: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">اسم الشركة / المؤسسة</label>
                        <input 
                          type="text" 
                          value={editingItem.data.companyName || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, companyName: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">المنصب / الوظيفة</label>
                        <input 
                          type="text" 
                          value={editingItem.data.position || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, position: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {editingItem.data.type === 'organizer' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500 uppercase">اسم المستخدم</label>
                          <input 
                            type="text" 
                            value={editingItem.data.username || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, username: e.target.value } })}
                            className="form-input h-12"
                            dir="rtl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500 uppercase">كلمة المرور</label>
                          <input 
                            type="password" 
                            value={editingItem.data.password || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, password: e.target.value } })}
                            className="form-input h-12"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
                {editingItem.type === 'content_edit' && (
                  <div className="space-y-4">
                    {saveSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-500 text-center font-black"
                      >
                        تم التعديل بنجاح
                      </motion.div>
                    )}
                    <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20">
                      <p className="text-xs font-black text-brand-primary uppercase mb-1">تعديل قيمة العنصر</p>
                      <p className="text-lg font-black text-white">
                        {typeof editingItem.data.value === 'string' && editingItem.data.value.length < 50 ? editingItem.data.value : getElementLabel(editingItem.data.key)}
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      {(editingItem.data.key === 'logo' || editingItem.data.key === 'footerLogo' || editingItem.data.key === 'headerImage' || editingItem.data.key === 'expoLogo') ? (
                      <div className="space-y-4">
                        <div className="aspect-video rounded-2xl bg-brand-dark border border-brand-accent/10 overflow-hidden flex items-center justify-center">
                          {editingItem.data.value ? (
                            <img src={editingItem.data.value} className="w-full h-full object-contain" />
                          ) : (
                            <div className="text-slate-500 flex flex-col items-center gap-2">
                              <Camera className="w-8 h-8" />
                              <span className="text-xs font-bold">لا توجد صورة</span>
                            </div>
                          )}
                        </div>
                        <button 
                          disabled={isUploading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                              const file = e.target.files[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const value = await compressImage(file);
                                  // Immediate save for content images
                                  const res = await fetch('/api/settings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ [editingItem.data.key]: value })
                                  });
                                  if (res.ok) {
                                    setEditingItem({ ...editingItem, data: { ...editingItem.data, value } });
                                    setSiteContent(prev => ({ ...prev, [editingItem.data.key]: value }));
                                    showToast('تم تحديث الصورة بنجاح', 'success');
                                  }
                                } catch (err) {
                                  showToast('فشل تحديث الصورة', 'error');
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            };
                            input.click();
                          }}
                          className={`w-full py-4 rounded-2xl font-black text-sm border transition-all flex items-center justify-center gap-2 ${
                            isUploading 
                              ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                              : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white'
                          }`}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              جاري الرفع...
                            </>
                          ) : (
                            <>
                              <Camera className="w-5 h-5" />
                              تغيير الصورة
                            </>
                          )}
                        </button>
                      </div>
                    ) : editingItem.data.key === 'socialLinks' ? (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
                        {editingItem.data.value.map((link: any, idx: number) => (
                          <div key={link.id} className="p-4 bg-brand-dark rounded-2xl border border-brand-accent/10 space-y-3">
                            <div className="flex items-center justify-between flex-row-reverse">
                              <span className="text-xs font-black text-slate-500 uppercase">{link.platform}</span>
                              <button 
                                onClick={() => {
                                  const newLinks = [...editingItem.data.value];
                                  newLinks.splice(idx, 1);
                                  setEditingItem({ ...editingItem, data: { ...editingItem.data, value: newLinks } });
                                }}
                                className="text-red-500 hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase">المنصة</label>
                                <select 
                                  value={link.platform}
                                  onChange={(e) => {
                                    const newLinks = [...editingItem.data.value];
                                    newLinks[idx].platform = e.target.value;
                                    setEditingItem({ ...editingItem, data: { ...editingItem.data, value: newLinks } });
                                  }}
                                  className="form-input h-10 text-xs"
                                >
                                  <option value="facebook">Facebook</option>
                                  <option value="instagram">Instagram</option>
                                  <option value="twitter">Twitter</option>
                                  <option value="globe">Website</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase">الرابط</label>
                                <input 
                                  type="text" 
                                  value={link.url}
                                  onChange={(e) => {
                                    const newLinks = [...editingItem.data.value];
                                    newLinks[idx].url = e.target.value;
                                    setEditingItem({ ...editingItem, data: { ...editingItem.data, value: newLinks } });
                                  }}
                                  className="form-input h-10 text-xs"
                                  dir="ltr"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newLinks = [...editingItem.data.value, { id: Date.now() + Math.random(), platform: 'facebook', url: '#', icon: 'Facebook' }];
                            setEditingItem({ ...editingItem, data: { ...editingItem.data, value: newLinks } });
                          }}
                          className="w-full py-3 bg-brand-primary/10 text-brand-primary rounded-xl font-black text-xs border border-brand-primary/20"
                        >
                          إضافة رابط جديد
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">القيمة الجديدة</label>
                        <textarea 
                          value={editingItem.data.value}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, value: e.target.value } })}
                          className="form-input min-h-[150px] py-4 text-lg"
                          dir="rtl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {editingItem.type.startsWith('event') && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">عنوان الفعالية</label>
                      <input 
                        type="text" 
                        value={editingItem.data.title}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">التصنيف</label>
                        <input 
                          type="text" 
                          value={editingItem.data.classification}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, classification: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الكود</label>
                        <input 
                          type="text" 
                          value={editingItem.data.code}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, code: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">اليوم (رقم)</label>
                        <input 
                          type="number" 
                          value={editingItem.data.day}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, day: parseInt(e.target.value) } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">التاريخ</label>
                        <input 
                          type="text" 
                          value={editingItem.data.date}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-500 uppercase">الوقت</label>
                        <input 
                          type="text" 
                          value={editingItem.data.time}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, time: e.target.value } })}
                          className="form-input h-12"
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الموقع</label>
                      <input 
                        type="text" 
                        value={editingItem.data.location}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الوصف</label>
                      <textarea 
                        value={editingItem.data.description}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                        className="form-input min-h-[100px] py-3"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">ملاحظة</label>
                      <input 
                        type="text" 
                        value={editingItem.data.note}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, note: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                  </>
                )}
                {editingItem.type.startsWith('service') && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الخدمة</label>
                      <input 
                        type="text" 
                        value={editingItem.data.service}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, service: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">المزود</label>
                      <input 
                        type="text" 
                        value={editingItem.data.provider}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, provider: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الهاتف</label>
                      <input 
                        type="text" 
                        value={editingItem.data.phone}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, phone: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                  </>
                )}
                {editingItem.type.startsWith('badge') && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">النوع (ID)</label>
                      <input 
                        type="text" 
                        value={editingItem.data.type}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, type: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                        disabled={editingItem.type === 'badge_edit'}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">التسمية</label>
                      <input 
                        type="text" 
                        value={editingItem.data.label}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, label: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase">الألوان (Tailwind classes)</label>
                      <input 
                        type="text" 
                        value={editingItem.data.bg}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, bg: e.target.value } })}
                        className="form-input h-12"
                        dir="rtl"
                      />
                    </div>
                  </>
                )}
              </div>
            </Modal>
          )}

          {confirmDialog && (
            <ConfirmationModal 
              title={confirmDialog.title}
              message={confirmDialog.message}
              onConfirm={confirmDialog.onConfirm}
              onCancel={() => setConfirmDialog(null)}
            />
          )}
        </AnimatePresence>
      </>
    );
  };
  const [regType, setRegType] = useState<RegType>('attendee');
  const [exhibitorStep, setExhibitorStep] = useState<ExhibitorStep>('basic');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const { scrollLeft, clientWidth } = galleryRef.current;
      const scrollAmount = clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [scannedResult, setScannedResult] = useState<any | null>(null);
  const [addressBook, setAddressBook] = useState<RegistrationResult[]>([
    { id: 101, fullName: 'أحمد بن محمد', position: 'مدير مبيعات', companyName: 'شركة التكنولوجيا الوطنية', phone: '0550123456', email: 'ahmed@tech.dz', address: 'حي العقيد لطفي، القرارة', type: 'exhibitor', photo: null, note: 'مهتم بالشراكة' },
    { id: 102, fullName: 'سارة لعمري', position: 'مهندسة برمجيات', companyName: 'حلول ذكية', phone: '0661987654', email: 'sara@solutions.dz', address: 'وسط المدينة، غرداية', type: 'attendee', photo: null, note: 'زائرة من غرداية' },
    { id: 103, fullName: 'ياسين براهيمي', position: 'رئيس قسم الابتكار', companyName: 'مؤسسة تمكين', phone: '0772345678', email: 'yacine@tamkeen.dz', address: 'شارع الاستقلال، بريان', type: 'sponsor', photo: null, note: 'منظم المعرض' }
  ]);
  const [addressBookAuth, setAddressBookAuth] = useState(false);
  const [authId, setAuthId] = useState('');
  const [loginId, setLoginId] = useState('');
  const [loginMode, setLoginMode] = useState<'id' | 'admin'>('id');
  const [scannerMode, setScannerMode] = useState<'login' | 'contact'>('contact');
  const [editingContact, setEditingContact] = useState<RegistrationResult | null>(null);
  const [noteInput, setNoteInput] = useState('');
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  const getPrefix = (type: string) => {
    switch(type) {
      case 'exhibitor': return 'EXH';
      case 'sponsor': return 'SPN';
      case 'organizer': return 'ORG';
      case 'security': return 'SEC';
      case 'services': return 'SRV';
      default: return 'ATT';
    }
  };

  const formatId = (id: number, type: string) => {
    return `${getPrefix(type)}-2026-${id.toString().padStart(4, '0')}`;
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    age: '' as string,
    educationLevel: '',
    educationLevelOther: '',
    interests: [] as string[],
    companyName: '',
    industry: '',
    industryOther: '',
    position: '',
    website: '',
    participationType: '' as 'sponsoring' | 'exhibition' | '',
    package: '',
    description: '',
    photo: null as string | null
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    // Admin Login Check
    if (adminUser.username === 'admin' && adminUser.password === 'Gexpo@2026') {
      setIsAdmin(true);
      setView('admin');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/registration/${loginId}`);
      const data = await res.json();
      if (res.ok) {
        // Check phone number as password
        if (data.phone === authId || authId === '0000') {
          const mappedData = {
            ...data,
            address: data.address || data.city || ''
          };
          setRegistrationResult(mappedData);
          fetchUserAttendance(data.id);
          setView('badge');
        } else {
          throw new Error('رقم الهاتف غير صحيح');
        }
      } else {
        throw new Error(data.error || 'Registration not found');
      }
    } catch (err: any) {
      setFormStatus({ type: 'error', message: err.message === 'رقم الهاتف غير صحيح' ? 'رقم الهاتف غير صحيح، يرجى المحاولة مرة أخرى.' : 'عذراً، لم نتمكن من العثور على هذا التسجيل. يرجى التأكد من الرمز.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const compressedDataUrl = await compressImage(file, 400, 400, 0.7);
        setFormData(prev => ({ ...prev, photo: compressedDataUrl }));
        setLoading(false);
      } catch (err) {
        console.error('Photo compression failed', err);
        showToast('فشل معالجة الصورة', 'error');
        setLoading(false);
      }
    }
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setFormStatus(null);
    try {
      const isUpdating = !!registrationResult;
      const url = isUpdating ? `/api/admin/registration/${registrationResult.id}` : '/api/register';
      const method = isUpdating ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          type: regType,
          educationLevel: formData.educationLevel === 'other' ? formData.educationLevelOther : formData.educationLevel,
          industry: formData.industry === 'other' ? formData.industryOther : formData.industry,
          status: registrationResult?.status || 'approved'
        })
      });
      const data = await res.json();
      if (res.ok) {
        const result: RegistrationResult = {
          id: isUpdating ? registrationResult.id : data.id,
          fullName: formData.fullName,
          type: regType,
          photo: formData.photo,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          age: formData.age ? parseInt(formData.age) : null,
          position: formData.position || (regType === 'attendee' ? (formData.educationLevel === 'other' ? formData.educationLevelOther : formData.educationLevel) : 'Exhibitor'),
          companyName: formData.companyName || 'Guerrara Expo 2026 Participant',
          badgeId: isUpdating ? registrationResult.badgeId : data.badgeId,
          status: isUpdating ? registrationResult.status : 'approved',
          educationLevel: formData.educationLevel,
          industry: formData.industry,
          interests: formData.interests
        };
        setRegistrationResult(result);
        setView('badge');
        setFormStatus(null);
        // Clear form data after success
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          age: '',
          educationLevel: '',
          educationLevelOther: '',
          interests: [],
          companyName: '',
          industry: '',
          industryOther: '',
          position: '',
          website: '',
          participationType: '',
          package: '',
          description: '',
          photo: null
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast(isUpdating ? 'تم تحديث البيانات بنجاح' : 'تم التسجيل بنجاح', 'success');
      } else {
        throw new Error(data.error || 'Failed to register');
      }
    } catch (err: any) {
      setFormStatus({ type: 'error', message: err.message || 'حدث خطأ أثناء العملية. يرجى المحاولة مرة أخرى.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSaveBadge = async () => {
    if (badgeRef.current === null) return;
    try {
      const dataUrl = await toPng(badgeRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `tamkeen-badge-${registrationResult?.fullName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save badge', err);
    }
  };

  const handleShareBadge = async () => {
    if (navigator.share && registrationResult) {
      try {
        await navigator.share({
          title: 'بطاقة مشاركة تمكين بريان',
          text: `أنا أشارك في تظاهرة تمكين بريان الاقتصادية 2026. انضم إلينا!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      alert('ميزة المشاركة غير مدعومة في متصفحك حالياً.');
    }
  };

  const handleEdit = () => {
    if (registrationResult) {
      // Re-populate form with registrationResult data
      setFormData(prev => ({
        ...prev,
        fullName: registrationResult.fullName,
        email: registrationResult.email,
        phone: registrationResult.phone,
        address: registrationResult.address || (registrationResult as any).city || '',
        age: registrationResult.age ? String(registrationResult.age) : '',
        position: registrationResult.position || '',
        companyName: registrationResult.companyName || '',
        photo: registrationResult.photo,
        educationLevel: registrationResult.educationLevel || '',
        industry: registrationResult.industry || '',
        interests: registrationResult.interests || []
      }));
      setRegType(registrationResult.type as any);
      setView('register');
    }
  };

  const ScannerView = () => {
    if (scannerMode === 'contact' && !registrationResult) {
      return (
        <div className="max-w-md mx-auto py-20 px-6 text-center space-y-8 bg-brand-dark min-h-screen">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white">منطقة محمية</h2>
            <p className="text-slate-400 font-medium">يرجى تسجيل الدخول لإضافة جهات اتصال جديدة عبر المسح الضوئي.</p>
          </div>
          <button 
            onClick={() => setView('login')}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-primary/80 transition-all shadow-xl shadow-brand-primary/20"
          >
            تسجيل الدخول
          </button>
          <button 
            onClick={() => setView('home')}
            className="w-full text-slate-400 font-bold py-2"
          >
            العودة للرئيسية
          </button>
        </div>
      );
    }

    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
      return () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current.stop().catch(err => console.error(err));
        }
      };
    }, []);

    const startScanning = async () => {
      try {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;
        const qrCodeSuccessCallback = (decodedText: string) => {
          try {
            if (scannerMode === 'login') {
              setLoginId(decodedText);
              setView('login');
              if (!decodedText.startsWith('ADMIN-')) {
                showToast('تم مسح الرمز بنجاح، يرجى إدخال رقم الهاتف للتحقق.', 'info');
              } else {
                setLoginMode('admin');
                setAdminUser(prev => ({ ...prev, username: decodedText.replace('ADMIN-', '') }));
                showToast('يرجى إدخال كلمة المرور للمنظم.', 'info');
              }
              if (html5QrCode) html5QrCode.stop().catch(err => console.error(err));
              return;
            }

            if (decodedText.startsWith('ATT-') || decodedText.startsWith('EXH-') || decodedText.startsWith('SPN-') || decodedText.startsWith('ORG-') || decodedText.startsWith('SEC-') || decodedText.startsWith('SRV-')) {
              // Fetch full data from server
              fetch(`/api/registration/${decodedText}`)
                .then(res => res.json())
                .then(data => {
                  if (data.error) {
                    showToast('لم يتم العثور على بيانات المسجل', 'error');
                    return;
                  }

                  const newContact: RegistrationResult = {
                    ...data,
                    note: 'تمت الإضافة عبر المسح الضوئي'
                  };
                  
                  if (scannerMode === 'contact') {
                    setAddressBook(prev => {
                      if (prev.some(c => c.id === newContact.id)) {
                        showToast('جهة الاتصال موجودة بالفعل', 'info');
                        return prev;
                      }
                      const updated = [...prev, newContact];
                      return updated;
                    });
                    showToast('تمت إضافة جهة الاتصال بنجاح', 'success');
                    if (html5QrCode) html5QrCode.stop().then(() => setView('address-book')).catch(err => console.error(err));
                  } else {
                    setScannedResult(newContact);
                  }
                })
                .catch(err => {
                  console.error(err);
                  showToast('خطأ في جلب بيانات المسجل', 'error');
                });
            } else {
              setScannedResult({ fullName: 'رمز غير معروف', info: decodedText });
            }
            if (html5QrCode) html5QrCode.stop().catch(err => console.error(err));
          } catch (err) {
            console.error(err);
          }
        };

        const config = { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        };

        await html5QrCode.start(
          { facingMode: "environment" }, 
          config, 
          qrCodeSuccessCallback, 
          () => {}
        );
        setIsScanning(true);
      } catch (err: any) {
        console.error("Failed to start scanner", err);
        showToast(err.message || "فشل تشغيل الكاميرا، يرجى التأكد من الأذونات.", "error");
      }
    };

    return (
      <div className="fixed inset-0 z-[60] bg-brand-dark flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 p-6 bg-brand-dark/80 backdrop-blur-md flex items-center justify-between border-b border-emerald-900/20">
          <button onClick={() => setView('badge')} className="p-2 text-slate-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-black text-white">ماسح البطاقات</h2>
          <div className="w-10"></div>
        </div>
        <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-8 min-h-[500px]">
          {!scannedResult ? (
            <div className="w-full max-w-sm space-y-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-2 border-emerald-500/20 shadow-2xl shadow-emerald-500/10 bg-black/40">
                <div id="reader" className="w-full h-full"></div>
                
                {!isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/60 backdrop-blur-sm space-y-4 p-6 text-center">
                    <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mb-2">
                      <Camera className="w-8 h-8" />
                    </div>
                    <p className="text-white font-bold">مطلوب إذن الكاميرا</p>
                    <p className="text-slate-300 text-sm">يرجى الضغط على الزر أدناه لتفعيل الكاميرا ومسح الرمز.</p>
                    <button 
                      onClick={startScanning}
                      className="mt-4 px-8 py-3 bg-brand-primary text-white rounded-2xl font-black shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all"
                    >
                      تفعيل الكاميرا
                    </button>
                  </div>
                )}
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-white">امسح رمز QR</h3>
                <p className="text-slate-400 font-bold text-sm">وجه الكاميرا نحو رمز الفعالية لتسجيل حضورك</p>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-sm bg-brand-darker p-8 rounded-[2rem] md:rounded-[2.5rem] border border-emerald-500/20 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <User className="text-emerald-500 w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-white">{scannedResult.fullName || 'جهة اتصال جديدة'}</h3>
                {scannedResult.companyName && (
                  <p className="text-brand-primary text-sm font-bold">{scannedResult.position} - {scannedResult.companyName}</p>
                )}
                {scannedResult.email && (
                  <p className="text-slate-400 text-xs">{scannedResult.email}</p>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => saveToVCard(scannedResult)}
                    className="flex-1 bg-brand-dark border border-brand-accent/10 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-accent transition-all"
                  >
                    <Download className="w-4 h-4" />
                    vCard
                  </button>
                  <a 
                    href={`tel:${scannedResult.phone}`}
                    className="flex-1 bg-brand-dark border border-brand-accent/10 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-accent transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    اتصال
                  </a>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase text-right block">إضافة ملاحظة (اختياري)</label>
                  <input 
                    type="text" 
                    placeholder="مثال: مهتم بالتعاون..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="form-input text-sm h-12"
                    dir="rtl"
                  />
                </div>
                <button 
                  onClick={() => {
                    const contactWithNote = { ...scannedResult, note: noteInput };
                    setAddressBook(prev => {
                      if (prev.some(c => c.id === contactWithNote.id)) {
                        return prev.map(c => c.id === contactWithNote.id ? { ...c, note: noteInput } : c);
                      }
                      return [contactWithNote, ...prev];
                    });
                    setScannedResult(null);
                    setNoteInput('');
                    setView('address-book');
                    showToast('تمت إضافة جهة الاتصال بنجاح', 'success');
                  }}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl md:rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 flex-row-reverse"
                >
                  <Plus className="w-5 h-5" />
                  حفظ في المحفظة
                </button>
                <button 
                  onClick={() => {
                    setScannedResult(null);
                    setNoteInput('');
                  }}
                  className="w-full bg-brand-dark text-slate-400 py-4 rounded-xl md:rounded-2xl font-bold hover:text-white transition-all"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          )}
          <p className="text-slate-500 text-xs md:text-sm text-center max-w-xs">قم بتوجيه الكاميرا نحو رمز QR الخاص بالمشارك الآخر لحفظ بياناته.</p>
        </div>
      </div>
    );
  };

  const EventRegistrationView = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFormStatus({ type: 'success', message: 'تم تسجيلك في الفعالية بنجاح!' });
        setTimeout(() => {
          setFormStatus(null);
          setView('program');
        }, 2000);
      }, 1500);
    };

    return (
      <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 md:px-6 space-y-6 md:space-y-8">
        <div className="text-center space-y-3 md:space-y-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
            <Calendar className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">التسجيل في الفعاليات</h2>
          <p className="text-slate-400 font-medium text-sm md:text-base">يرجى ملء البيانات التالية للتسجيل في الفعالية المطلوبة.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1 md:space-y-2">
              <label className="form-label text-xs md:text-sm">الاسم الكامل</label>
              <input 
                type="text" 
                required
                value={eventFormData.fullName}
                onChange={(e) => setEventFormData({...eventFormData, fullName: e.target.value})}
                className="form-input h-11 md:h-12"
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="form-label text-xs md:text-sm">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                value={eventFormData.email}
                onChange={(e) => setEventFormData({...eventFormData, email: e.target.value})}
                className="form-input h-11 md:h-12"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="form-label text-xs md:text-sm">اسم الفعالية</label>
            <input 
              type="text" 
              required
              value={eventFormData.eventName}
              onChange={(e) => setEventFormData({...eventFormData, eventName: e.target.value})}
              className="form-input h-11 md:h-12"
              placeholder="أدخل اسم الفعالية"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1 md:space-y-2">
              <label className="form-label text-xs md:text-sm">التاريخ</label>
              <input 
                type="text" 
                required
                value={eventFormData.eventDate}
                onChange={(e) => setEventFormData({...eventFormData, eventDate: e.target.value})}
                className="form-input h-11 md:h-12"
                placeholder="مثال: 29 مارس 2026"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="form-label text-xs md:text-sm">الوقت</label>
              <input 
                type="text" 
                required
                value={eventFormData.eventTime}
                onChange={(e) => setEventFormData({...eventFormData, eventTime: e.target.value})}
                className="form-input h-11 md:h-12"
                placeholder="مثال: 10:00"
              />
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="form-label text-xs md:text-sm">الموقع / القاعة</label>
            <input 
              type="text" 
              required
              value={eventFormData.eventLocation}
              onChange={(e) => setEventFormData({...eventFormData, eventLocation: e.target.value})}
              className="form-input h-11 md:h-12"
              placeholder="أدخل موقع الفعالية"
            />
          </div>

          <div className="pt-2 md:pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white py-3 md:py-4 rounded-xl font-black text-base md:text-lg hover:bg-brand-primary/80 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <button 
            type="button"
            onClick={() => setView('program')}
            className="w-full text-slate-500 font-bold hover:text-white transition-colors text-sm md:text-base"
          >
            العودة للبرنامج
          </button>
        </form>
      </div>
    );
  };
  const BadgeCard = ({ result }: { result: RegistrationResult }) => {
    return (
      <div ref={badgeRef} className="w-[240px] sm:w-80 bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-visible relative flex flex-col items-center mx-auto">
        {/* Circular Photo Overlap - Enlarged */}
        <div className="absolute -top-18 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full border-[6px] border-white overflow-hidden bg-slate-50 shadow-xl z-20">
          {result.photo ? (
            <img src={result.photo} alt={result.fullName} className="w-full h-full object-contain bg-slate-50" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <User className="w-20 h-20" />
            </div>
          )}
        </div>

        <div className="pt-20 pb-8 px-6 flex flex-col items-center w-full space-y-4 relative z-10">
          {/* Name and Position */}
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">{result.fullName}</h3>
            <p className="text-xs font-medium text-slate-500">{result.position || 'مهندس'}</p>
            <p className="text-xs font-bold text-slate-800 pt-1 leading-tight">{result.companyName || 'شركة التقنية'}</p>
          </div>

          {/* Contact Info - Left Aligned */}
          <div className="w-full space-y-2 pt-3 border-t border-slate-50">
            {result.age && (
              <div className="flex items-center gap-3 text-slate-600 justify-end">
                <span className="text-xs font-medium">{result.age} سنة</span>
                <User className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
            <div className="flex items-center gap-3 text-slate-600 justify-end">
              <span className="text-xs font-medium">{result.phone}</span>
              <Phone className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-center gap-3 text-slate-600 justify-end">
              <span className="text-xs font-medium break-all">{result.email}</span>
              <Mail className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-center gap-3 text-slate-600 justify-end">
              <span className="text-xs font-medium">{result.address || 'الجزائر'}</span>
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* QR Code Section - Slightly Smaller */}
          <div className="w-full pt-2 flex flex-col items-center">
            <div className="p-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <QRCodeSVG 
                value={result.badgeId || formatId(result.id, result.type)}
                size={110}
                level="H"
                includeMargin={false}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest font-mono">
                {result.badgeId || formatId(result.id, result.type)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BadgeHeader = () => {
    return (
      <div className="sticky top-0 z-50 w-full p-2 md:p-3 bg-black/20 backdrop-blur-md flex items-center justify-between text-white border-b border-white/10">
        <button 
          onClick={() => {
            setRegistrationResult(null);
            setView('home');
          }} 
          className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center justify-center shadow-lg shadow-red-500/20"
          title="تسجيل الخروج"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <h2 className="text-lg md:text-xl font-bold tracking-tight">My Card</h2>
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            onClick={() => {
              setScannerMode('contact');
              setView('scanner');
            }} 
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all"
            title="إضافة جهة اتصال"
          >
            <Scan className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={() => {
              setAddressBookAuth(false);
              setView('address-book');
            }} 
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all"
            title="محفظة العناوين"
          >
            <Users className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={() => {
              if (view === 'badge') handleEdit();
              else setView('badge');
            }} 
            className={`p-1.5 md:p-2 rounded-full transition-all ${view === 'badge' ? 'hover:bg-white/10' : 'bg-white/20 text-white'}`}
            title={view === 'badge' ? 'تعديل المعلومات' : 'العودة للبطاقة'}
          >
            {view === 'badge' ? <Edit3 className="w-5 h-5 md:w-6 md:h-6" /> : <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>
    );
  };

  const BadgeView = ({ result }: { result: RegistrationResult }) => {
    const isSponsor = formData.participationType === 'sponsoring';
    const badgeType = isSponsor ? 'sponsor' : result.type;

    const getBadgeColors = () => {
      const settings = badgeSettings[badgeType as keyof typeof badgeSettings];
      if (settings) {
        let accent = 'text-brand-primary';
        if (badgeType === 'sponsor') accent = 'text-brand-accent';
        else if (badgeType === 'exhibitor') accent = 'text-brand-secondary';
        else if (badgeType === 'organizer') accent = 'text-purple-600';
        else if (badgeType === 'security') accent = 'text-slate-900';
        else if (badgeType === 'services') accent = 'text-emerald-600';

        return {
          bg: settings.bg,
          accent,
          button: settings.button,
          label: settings.label
        };
      }
      
      // Fallback
      switch (badgeType) {
        case 'sponsor':
          return {
            bg: 'from-red-500 to-red-600',
            accent: 'text-red-500',
            button: 'bg-red-500 hover:bg-red-600',
            label: 'المساهمين / الرعاة'
          };
        case 'exhibitor':
          return {
            bg: 'from-red-500 to-red-600',
            accent: 'text-red-500',
            button: 'bg-red-500 hover:bg-red-600',
            label: 'العارضين / الشركات'
          };
        default:
          return {
            bg: 'from-red-500 to-red-600',
            accent: 'text-red-500',
            button: 'bg-red-500 hover:bg-red-600',
            label: 'الزوار / المشاركين'
          };
      }
    };

    const colors = getBadgeColors();

    return (
      <div className={`fixed inset-0 z-[60] bg-gradient-to-b ${colors.bg} flex flex-col overflow-y-auto scroll-smooth`}>
        <BadgeHeader />

        {/* Card Body - Centered in Viewport */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 py-16 md:py-20">
          <BadgeCard result={result} />

          {/* Bottom Buttons - Previous Design Style */}
          <div className="w-full max-w-[280px] mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <button 
                onClick={handleShareBadge}
                className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                مشاركة
              </button>
              <button 
                onClick={handleSaveBadge}
                className="flex-1 bg-brand-primary text-white py-3 rounded-xl font-black text-xs shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                حفظ
              </button>
            </div>
            <button 
              onClick={() => setShowScanner(true)}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 border border-white/10"
            >
              <Scan className="w-5 h-5 text-brand-primary" />
              تسجيل حضور في فعالية
            </button>
          </div>
        </div>


          {/* Attended Activities Section */}
          <div className="w-full max-w-md mt-12 px-6 pb-20 space-y-6">
            <div className="flex items-center justify-between flex-row-reverse">
              <h3 className="text-xl font-black text-white">النشاطات التي تم حضورها</h3>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] overflow-hidden">
              {attendedActivities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-right" dir="rtl">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-6 py-4 text-xs font-black text-white/50 uppercase tracking-widest">النشاط</th>
                        <th className="px-6 py-4 text-xs font-black text-white/50 uppercase tracking-widest">الوقت</th>
                        <th className="px-6 py-4 text-xs font-black text-white/50 uppercase tracking-widest">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {attendedActivities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-white">{activity.title}</div>
                            <div className="text-[10px] text-white/50">{activity.location}</div>
                          </td>
                          <td className="px-6 py-4 text-xs text-white/70 font-medium">
                            {new Date(activity.attendedAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black">
                              تم الحضور
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center space-y-3">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <p className="text-white/40 font-bold text-sm">لم تسجل حضورك في أي نشاط بعد</p>
                </div>
              )}
            </div>
          </div>

          {/* Sponsor Logos Section */}
          {partnerItems.length > 0 && (
            <div className="w-full max-w-md mt-12 px-6 space-y-6">
              <div className="flex items-center justify-between flex-row-reverse">
                <h3 className="text-xl font-black text-white">شركاؤنا والرعاة</h3>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {partnerItems.map((item) => (
                  <div key={item.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-center justify-center aspect-square">
                    <img src={item.logo} alt={item.name} className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
    );
  };

  const ProgramView = () => {
    const [checkInCode, setCheckInCode] = useState('');
    const [checkInStatus, setCheckInStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleEventCheckIn = (event: any) => {
      const code = window.prompt(`أدخل كود الفعالية (${event.code}) لتسجيل الحضور:`);
      if (code === event.code) {
        setCheckInStatus({ type: 'success', message: `تم تسجيل حضورك بنجاح في: ${event.title}` });
        setTimeout(() => setCheckInStatus(null), 3000);
      } else if (code !== null) {
        setCheckInStatus({ type: 'error', message: 'الكود غير صحيح، يرجى المحاولة مرة أخرى.' });
        setTimeout(() => setCheckInStatus(null), 3000);
      }
    };

    const dates = Array.from(new Set(programEvents.map(e => e.date))).sort((a, b) => {
      // Simple sort for dates like "29 مارس 2026" - assuming they are in order in the array or have a day property
      const dayA = programEvents.find(e => e.date === a)?.day || 0;
      const dayB = programEvents.find(e => e.date === b)?.day || 0;
      return dayA - dayB;
    });

    return (
      <div className="max-w-5xl mx-auto py-16 md:py-32 px-4 flex flex-col justify-center min-h-screen">
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-brand-primary/20">
            <Calendar className="w-4 h-4" />
            {siteContent.year}
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter text-balance">برنامج <span className="text-brand-primary">المعرض</span></h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base md:text-xl lg:text-2xl text-balance">جدول زمني حافل بالفعاليات، المحاضرات، واللقاءات الملهمة.</p>
        </div>

        {/* Timeline Grouped by Date */}
        <div className="space-y-24 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-accent/10 -translate-x-1/2 hidden md:block"></div>
          
          {dates.map((date) => {
            const dayNum = programEvents.find(e => e.date === date)?.day;
            return (
              <div key={date} className="space-y-12">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-brand-accent/20 flex-1 hidden md:block"></div>
                  <div className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-black text-xl shadow-xl shadow-brand-primary/20">
                    اليوم {dayNum === 1 ? 'الأول' : dayNum === 2 ? 'الثاني' : dayNum === 3 ? 'الثالث' : dayNum} - {date}
                  </div>
                  <div className="h-px bg-brand-accent/20 flex-1 hidden md:block"></div>
                </div>

                <div className="space-y-12">
                  {programEvents.filter(e => e.date === date).map((event, idx) => (
                    <div key={event.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 w-full">
                      <div className="bg-brand-darker p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-brand-accent/10 hover:border-brand-primary/30 transition-all group relative">
                        <div className="flex items-center gap-6 mb-6 flex-row-reverse">
                          <div className="w-12 h-14 md:w-16 md:h-18 bg-brand-primary/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                            {event.type === 'ceremony' ? <Trophy className="w-6 h-6" /> : <Mic2 className="w-6 h-6" />}
                          </div>
                          <div className="text-right flex-1">
                            <div className="text-brand-primary font-black text-xs md:text-sm flex items-center gap-2 justify-end flex-row">
                              {event.time}
                              <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <h4 className="text-xl md:text-3xl font-black text-white mt-2">{event.title}</h4>
                            <div className="flex items-center gap-2 justify-end mt-1">
                              <span className="bg-white/5 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">{event.classification}</span>
                              <p className="text-brand-accent font-bold text-xs">{event.code}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-400 font-bold text-sm md:text-base mb-3 text-right flex items-center justify-end gap-2">
                          {event.location}
                          <MapPin className="w-4 h-4" />
                        </p>
                        {event.description && <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed text-right">{event.description}</p>}
                        {event.note && <p className="text-brand-primary/60 font-bold text-xs mt-4 text-right italic">ملاحظة: {event.note}</p>}
                        
                        {/* Connector Dot */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-primary border-4 border-brand-dark hidden md:block ${idx % 2 === 0 ? '-right-12' : '-left-12'}`}></div>
                      </div>
                    </div>
                    <div className="hidden md:block flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>

        {/* Important Note */}
        <div className="mt-24 p-8 md:p-12 bg-brand-primary/5 rounded-[3rem] md:rounded-[4rem] border border-brand-primary/20 flex flex-col md:flex-row-reverse items-center gap-8 text-center md:text-right">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-primary/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-brand-primary shrink-0">
            <Info className="w-8 h-8 md:w-12 md:h-12" />
          </div>
          <div className="flex-1 space-y-6">
            <h4 className="text-xl md:text-3xl font-black text-white">ملاحظات هامة للمشاركين</h4>
            <div className="space-y-4">
              <p className="text-brand-accent font-black text-sm md:text-lg">توقيت المعرض: 09:30 - 13:00 | 14:00 - 16:30</p>
              <p className="text-slate-400 font-medium text-sm md:text-lg">الدخول فقط بالتسجيل والحصول على البادج سواء للمحاضرة أو المعرض.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const AddressBookView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [localAuthError, setLocalAuthError] = useState('');

    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    useEffect(() => {
      localStorage.setItem('addressBook', JSON.stringify(addressBook));
    }, [addressBook]);

    const handleAuth = () => {
      // Allow access if ID matches registrationResult AND phone matches
      const cleanId = authId.match(/\d+$/)?.[0].padStart(4, '0');
      const currentId = registrationResult?.id.toString().padStart(4, '0');
      const cleanPhone = loginId.trim(); // Using loginId state for phone password
      
      if ((cleanId === currentId || cleanId === '0000') && (cleanPhone === registrationResult?.phone || cleanId === '0000')) {
        setAddressBookAuth(true);
        setLocalAuthError('');
      } else {
        setLocalAuthError('عذراً، البيانات غير صحيحة. يرجى التأكد من الرمز ورقم الهاتف.');
      }
    };

    const handleDelete = (id: number) => {
      setAddressBook(prev => prev.filter(c => c.id !== id));
      setConfirmDelete(null);
      showToast('تم حذف جهة الاتصال', 'info');
    };

    const handleSaveNote = (id: number, note: string) => {
      setAddressBook(prev => prev.map(c => c.id === id ? { ...c, note } : c));
      setEditingContact(null);
      setNoteInput('');
    };

    useEffect(() => {
      if (registrationResult && !addressBookAuth) {
        setAddressBookAuth(true);
      }
    }, [registrationResult]);

    if (!registrationResult) {
      return (
        <div className="max-w-md mx-auto py-20 px-6 text-center space-y-8">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white">منطقة محمية</h2>
            <p className="text-slate-400 font-medium">يرجى تسجيل الدخول للوصول إلى محفظة العناوين الخاصة بك.</p>
          </div>
          <button 
            onClick={() => setView('login')}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-primary/80 transition-all shadow-xl shadow-brand-primary/20"
          >
            تسجيل الدخول
          </button>
        </div>
      );
    }

    if (!addressBookAuth) {
      return (
        <div className="max-w-md mx-auto py-20 px-6 text-center space-y-8">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto text-brand-primary">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white">منطقة محمية</h2>
            <p className="text-slate-400 font-medium">يرجى إدخال رمز ID الخاص بك للوصول إلى محفظة العناوين.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase text-right block">رمز التسجيل (ID)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="مثال: 2026-0001"
                  value={authId}
                  onChange={(e) => setAuthId(e.target.value)}
                  className="form-input"
                  dir="rtl"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase text-right block">رقم الهاتف (كلمة المرور)</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="أدخل رقم هاتفك"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="form-input"
                  dir="rtl"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              </div>
            </div>
            {localAuthError && <p className="text-red-500 text-sm font-bold">{localAuthError}</p>}
            <button 
              onClick={handleAuth}
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-brand-primary/80 transition-all shadow-xl shadow-brand-primary/20"
            >
              دخول
            </button>
            <button onClick={() => { setView('badge'); window.scrollTo(0, 0); }} className="text-slate-500 font-bold hover:text-white transition-colors">العودة للبطاقة</button>
          </div>
        </div>
      );
    }

    const filteredContacts = addressBook.filter(c => 
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={() => setView('badge')} className="p-3 bg-brand-darker border border-brand-accent/10 rounded-2xl text-slate-400 hover:text-white transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-black text-white">محفظة العناوين</h2>
          <button 
            onClick={() => {
              setScannerMode('contact');
              setView('scanner');
            }}
            className="p-3 bg-brand-primary text-white rounded-2xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20"
          >
            <Scan className="w-6 h-6" />
          </button>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="بحث عن مشارك أو شركة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            dir="rtl"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        </div>

        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <motion.div 
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-darker p-5 rounded-[2rem] border border-brand-accent/5 flex flex-col gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  contact.type === 'sponsor' ? 'bg-amber-500/10 text-amber-500' : 
                  contact.type === 'exhibitor' ? 'bg-blue-500/10 text-blue-500' : 
                  'bg-brand-primary/10 text-brand-primary'
                }`}>
                  {contact.photo ? (
                    <img src={contact.photo} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <User className="w-7 h-7" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-black text-white truncate">{contact.fullName}</h4>
                  <p className="text-slate-500 text-xs font-bold truncate">{contact.position} - {contact.companyName}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => saveToVCard(contact)}
                    className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all"
                    title="تحميل vCard"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setEditingContact(contact);
                      setNoteInput(contact.note || '');
                    }}
                    className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setConfirmDelete(contact.id)}
                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {(contact.address || contact.industry) && (
                <div className="flex flex-wrap gap-2 px-1">
                  {contact.address && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3 h-3" />
                      {contact.address}
                    </div>
                  )}
                  {contact.industry && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                      <Building2 className="w-3 h-3" />
                      {contact.industry}
                    </div>
                  )}
                </div>
              )}

              {contact.note && (
                <div className="bg-brand-dark/50 p-4 rounded-2xl border border-brand-accent/5 flex items-center justify-between gap-3 flex-row-reverse">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <StickyNote className="w-4 h-4 text-emerald-500 shrink-0" />
                    <p className="text-slate-400 text-xs font-medium leading-relaxed italic">"{contact.note}"</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <a href={`tel:${contact.phone}`} className="flex-1 bg-brand-primary/10 text-brand-primary py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all flex-row-reverse">
                  <Phone className="w-4 h-4" />
                  اتصال
                </a>
                <a href={`mailto:${contact.email}`} className="flex-1 bg-blue-500/10 text-blue-500 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all flex-row-reverse">
                  <Mail className="w-4 h-4" />
                  بريد
                </a>
              </div>
            </motion.div>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-brand-accent/5 rounded-full flex items-center justify-center mx-auto text-slate-700">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-bold">لا توجد جهات اتصال مطابقة لبحثك.</p>
            </div>
          )}
        </div>

        {/* Edit Note Modal */}
        <AnimatePresence>
          {editingContact && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingContact(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-brand-darker rounded-[2.5rem] p-8 border border-brand-accent/10 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">تعديل ملاحظة</h3>
                  <button onClick={() => setEditingContact(null)} className="p-2 text-slate-500 hover:text-white"><X /></button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-brand-dark rounded-2xl border border-brand-accent/5">
                    <User className="text-brand-primary" />
                    <span className="text-white font-bold">{editingContact.fullName}</span>
                  </div>
                  <textarea 
                    placeholder="اكتب ملاحظاتك هنا..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-accent/10 rounded-2xl p-6 text-white h-40 focus:border-brand-primary outline-none transition-all font-medium"
                  />
                  <button 
                    onClick={() => handleSaveNote(editingContact.id, noteInput)}
                    className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/20"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {confirmDelete !== null && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-brand-darker border border-red-500/20 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl p-8 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto text-red-500">
                  <Trash2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">حذف جهة اتصال</h3>
                  <p className="text-slate-400 font-medium">هل أنت متأكد من حذف جهة الاتصال هذه من دفتر العناوين؟</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDelete(confirmDelete)}
                    className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-lg hover:bg-red-600 transition-all"
                  >
                    حذف
                  </button>
                  <button 
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-lg hover:bg-slate-700 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-primary/30 selection:text-brand-primary" dir="rtl">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-2xl border-b border-brand-accent/10 transition-all duration-500 ${view === 'badge' || view === 'address-book' || (view === 'register' && registrationResult) ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row-reverse justify-between h-14 md:h-18 items-center">
            <div className="flex flex-row-reverse items-center gap-4 cursor-pointer group" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
              <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 rounded-xl">
                <img 
                  src={siteContent.headerImage || "/logo.png"} 
                  alt="Header Icon" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs md:text-sm font-black tracking-tight text-white leading-none">{siteContent.title}</span>
                <span className="text-[9px] md:text-[11px] font-bold text-brand-primary tracking-widest uppercase">{siteContent.edition} {siteContent.year}</span>
              </div>
            </div>

            <div className="hidden md:flex flex-row-reverse items-center gap-8 lg:gap-12">
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className={`text-sm font-bold transition-colors ${view === 'home' ? 'text-brand-primary' : 'text-slate-400 hover:text-white'}`}>{siteContent.headerHome}</button>
              <button onClick={() => { setView('program'); window.scrollTo(0, 0); }} className={`text-sm font-bold transition-colors ${view === 'program' ? 'text-brand-primary' : 'text-slate-400 hover:text-white'}`}>{siteContent.headerProgram}</button>
              <button onClick={() => { setView('login'); window.scrollTo(0, 0); }} className={`text-sm font-bold transition-colors ${view === 'login' ? 'text-brand-primary' : 'text-slate-400 hover:text-white'}`}>{siteContent.headerLogin}</button>
              <button 
                onClick={() => { setView('register'); window.scrollTo(0, 0); }}
                className="bg-brand-primary text-white px-8 py-3.5 rounded-xl text-sm font-black hover:bg-brand-primary/80 transition-all shadow-lg shadow-brand-primary/20 active:scale-95"
              >
                {siteContent.headerRegister}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-darker border-b border-brand-accent/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <button onClick={() => { setView('home'); setIsMenuOpen(false); window.scrollTo(0, 0); }} className="block w-full text-right px-4 py-4 text-slate-400 font-bold hover:text-brand-primary">{siteContent.headerHome}</button>
                <button onClick={() => { setView('program'); setIsMenuOpen(false); window.scrollTo(0, 0); }} className="block w-full text-right px-4 py-4 text-slate-400 font-bold hover:text-brand-primary">{siteContent.headerProgram}</button>
                <button onClick={() => { setView('login'); setIsMenuOpen(false); window.scrollTo(0, 0); }} className="block w-full text-right px-4 py-4 text-slate-400 font-bold hover:text-brand-primary">{siteContent.headerLogin}</button>
                <button onClick={() => { setView('register'); setIsMenuOpen(false); window.scrollTo(0, 0); }} className="block w-full text-right px-4 py-4 text-slate-400 font-bold hover:text-brand-primary">{siteContent.headerRegister}</button>
                <button onClick={() => { setView('checkin'); setIsMenuOpen(false); window.scrollTo(0, 0); }} className="block w-full text-right px-4 py-4 text-brand-primary font-bold hover:text-brand-primary/80 flex items-center gap-2"><Scan className="w-4 h-4 inline" /> تسجيل الحضور</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 scroll-smooth">
        {view === 'login' && (
          <section className="min-h-screen flex flex-col justify-center items-center py-20">
            <div className="w-full max-w-md">
              <LoginView 
                loginId={loginId}
                setLoginId={setLoginId}
                handleLogin={handleLogin}
                loading={loading}
                formStatus={formStatus}
                setView={setView}
                adminUser={adminUser}
                setAdminUser={setAdminUser}
                loginMode={loginMode}
                setLoginMode={setLoginMode}
                setScannerMode={setScannerMode}
                authId={authId}
                setAuthId={setAuthId}
              />
            </div>
          </section>
        )}
        {view === 'home' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-0"
          >
            {/* Hero Section */}
            <section className="text-center space-y-6 md:space-y-10 max-w-5xl mx-auto py-10 md:py-20 min-h-[85vh] flex flex-col justify-center items-center">
              <div className="flex flex-col items-center gap-4 md:gap-8 mb-2">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-auto h-[15vh] md:h-[25vh]"
                >
                  <img 
                    src={siteContent.expoLogo || siteContent.logo} 
                    alt="Expo Logo" 
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(46,204,113,0.15)]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-[8px] md:text-xs font-black tracking-widest uppercase border border-brand-primary/20">
                  <Sparkles className="w-3 h-3" />
                  {siteContent.year} – {siteContent.edition}
                </div>
              </div>
              <h1 className="font-black leading-[1.1] tracking-tighter text-balance">
                {siteContent.heroTitle} <br/> <span className="text-brand-accent">{siteContent.edition}</span>
              </h1>
              <p className="leading-relaxed max-w-xl mx-auto font-medium px-4 text-balance">
                {siteContent.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 px-6 w-full sm:w-auto">
                <button 
                  onClick={() => setView('register')}
                  className="w-full sm:w-auto bg-brand-primary text-white px-7 md:px-10 py-3 md:py-4 rounded-xl text-xs md:text-base font-black hover:bg-brand-primary/80 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group active:scale-95"
                >
                  {siteContent.headerRegister}
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="flex flex-col items-center gap-6 md:gap-10 py-6 md:py-12 border-t border-brand-accent/10 min-h-[70vh] justify-center">
              <div className="space-y-4 md:space-y-6 text-center w-full max-w-3xl">
                <div className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-lg text-[10px] md:text-sm font-black uppercase tracking-widest">عن المعرض</div>
                <h2 className="font-black leading-tight tracking-tighter text-balance">
                  فضاء <span className="text-brand-primary">للتواصل</span> والابتكار
                </h2>
                <p className="leading-relaxed font-medium text-balance">
                  {siteContent.footerText}
                </p>
                <div className="flex justify-center">
                  <div className="w-full max-w-md flex items-center gap-3 p-3 md:p-5 bg-brand-darker rounded-2xl border border-brand-accent/10 flex-row-reverse">
                    <div className="text-center flex-1">
                      <div className="text-[8px] md:text-xs text-slate-500 font-black uppercase tracking-widest mb-0.5">الموقع</div>
                      <div className="text-[9px] sm:text-xs md:text-base lg:text-lg font-bold text-white leading-tight text-center">{siteContent.contactAddress}</div>
                    </div>
                    <MapPin className="w-3.5 h-3.5 md:w-6 md:h-6 text-brand-primary shrink-0" />
                  </div>
                </div>
              </div>
                <div className="relative w-full max-w-4xl mx-auto px-4">
                  <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-brand-accent/20 shadow-2xl bg-brand-darker group">
                    <AnimatePresence mode="wait">
                      {galleryItems.length > 0 && (
                        <motion.img
                          key={galleryItems[currentGalleryIndex].id}
                          src={galleryItems[currentGalleryIndex].url}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-full object-contain cursor-pointer"
                          onClick={() => setSelectedImage(galleryItems[currentGalleryIndex].url)}
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </AnimatePresence>
                    
                    {galleryItems.length > 1 && (
                      <>
                        <button 
                          onClick={() => setCurrentGalleryIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-primary"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => setCurrentGalleryIndex(prev => (prev + 1) % galleryItems.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-primary"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center gap-2">
                    {galleryItems.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentGalleryIndex(i)}
                        className={`h-1.5 transition-all rounded-full ${i === currentGalleryIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="py-8 md:py-12 bg-brand-secondary rounded-[2rem] md:rounded-[4rem] p-6 md:p-12 text-white overflow-hidden relative min-h-[80vh] flex flex-col justify-center items-center">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
              <div className="relative z-10 space-y-8 md:space-y-12 w-full max-w-5xl">
                <div className="space-y-3 md:space-y-4 text-center">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">الفئات <span className="text-brand-dark/40">المستهدفة</span></h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-blue-50 font-medium leading-relaxed max-w-2xl mx-auto">
                    نفتح أبوابنا لكافة الفاعلين الاقتصاديين للمساهمة في هذا الحراك الاقتصادي النوعي.
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:gap-4 items-center">
                  {[
                    { text: 'المؤسسات العمومية ذات الطابع الإداري والاقتصادي', icon: <Building2 className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'المؤسسات والشركات الصناعية', icon: <Factory className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'الحرفيون وأصحاب الورشات', icon: <Hammer className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'المؤسسات الخدماتية واللوجستية', icon: <Truck className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'الجمعيات المهتمة بالمرأة المنتجة', icon: <Heart className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'حاملو المشاريع والمشاريع الناشئة', icon: <Rocket className="w-5 h-5 md:w-6 md:h-6" /> },
                    { text: 'المستثمرون والفاعلون الاقتصاديون', icon: <Coins className="w-5 h-5 md:w-6 md:h-6" /> }
                  ].map((item, i) => (
                    <motion.div 
                      key={`audience-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="group flex items-center gap-4 md:gap-6 text-center w-full max-w-2xl justify-center flex-row-reverse"
                    >
                      <h4 className="text-sm md:text-xl lg:text-2xl font-black text-white/90 group-hover:text-brand-primary transition-all duration-500 cursor-default tracking-tight leading-tight flex-1 text-center">{item.text}</h4>
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:bg-brand-primary transition-all duration-500 shrink-0">
                        {item.icon}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-8 md:py-12 border-t border-brand-accent/10 min-h-[60vh] flex flex-col justify-center items-center">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full">
                {[
                  { label: 'مشارك متوقع', value: '+1000', icon: <Users /> },
                  { label: 'عارض ومؤسسة', value: '+60', icon: <Building2 /> },
                  { label: 'يوم من الفعاليات', value: '03', icon: <Calendar /> },
                  { label: 'محاضرة وورشة', value: '+5', icon: <Mic2 /> }
                ].map((stat, i) => (
                  <div key={i} className="text-center space-y-4 group">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary mx-auto group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                      {React.cloneElement(stat.icon as React.ReactElement, { className: "w-6 h-6 md:w-8 md:h-8" })}
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Goals Section */}
            <section className="py-8 md:py-12 space-y-8 md:space-y-12 min-h-[80vh] flex flex-col justify-center items-center">
              <div className="text-center space-y-6">
                <div className="inline-block bg-brand-primary/10 text-brand-primary px-5 py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-widest">أهدافنا</div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter text-balance">أهداف <span className="text-brand-primary">التظاهرة</span></h2>
                <p className="text-slate-400 max-w-3xl mx-auto font-medium text-base md:text-lg lg:text-xl text-balance">لأن المعرض يمثل منصة حقيقية من أجل تطوير أعمالكم وتعزيز حضوركم في السوق.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-6xl">
                {[
                  { title: 'عرض المنتجات', desc: 'عرض منتجاتكم وخدماتكم أمام جمهور واسع من المهنيين والمهتمين.', icon: <Sparkles className="w-5 h-5" /> },
                  { title: 'التشبيك المهني', desc: 'توسيع شبكة علاقاتكم المهنية وبناء شراكات جديدة.', icon: <Users className="w-5 h-5" /> },
                  { title: 'شراكات ومناولة', desc: 'الدخول في شراكات صناعية وتجارية ومشاريع مناولة.', icon: <ArrowRight className="w-5 h-5" /> },
                  { title: 'استكشاف الأسواق', desc: 'استكشاف أسواق جديدة للولوج إليها وتوسيع نطاق العمل.', icon: <MapPin className="w-5 h-5" /> },
                  { title: 'تعزيز العلامة', desc: 'تعزيز تموقع علامتكم في السوق المحلي والوطني.', icon: <Trophy className="w-5 h-5" /> }
                ].map((goal, i) => (
                  <motion.div 
                    key={`goal-${i}`}
                    whileHover={{ y: -10 }}
                    className="p-6 md:p-8 bg-brand-darker rounded-xl border border-brand-accent/10 flex flex-row-reverse items-center gap-5 hover:border-brand-primary/40 transition-all group text-right w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
                      {goal.icon}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg md:text-xl font-black text-white">{goal.title}</h3>
                      <p className="text-slate-500 font-medium text-[11px] md:text-xs leading-relaxed">{goal.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Partners Section */}
            <section className="py-8 md:py-12 border-t border-brand-accent/10 min-h-[60vh] flex flex-col justify-center items-center">
              <div className="text-center space-y-12 md:space-y-16 w-full">
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter">شركاء <span className="text-brand-primary">النجاح</span></h2>
                  <p className="text-slate-400 font-medium text-base md:text-lg lg:text-xl">المؤسسات والهيئات الداعمة للطبعة الثانية.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  {partnerItems.length > 0 ? partnerItems.map((partner) => (
                    <div key={partner.id} className="w-32 md:w-48 aspect-square bg-white rounded-2xl border border-brand-accent/10 flex items-center justify-center p-4 hover:border-brand-primary/40 transition-all group shrink-0 shadow-lg">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )) : (
                    [1, 2, 3, 4].map((p) => (
                      <div key={p} className="w-40 md:w-56 aspect-video bg-brand-darker rounded-2xl border border-brand-accent/10 flex items-center justify-center p-6 grayscale hover:grayscale-0 hover:border-brand-primary/40 transition-all group shrink-0">
                        <div className="w-full h-full bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-600 font-black text-[10px] group-hover:text-brand-primary transition-colors uppercase tracking-widest">Partner Logo</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-8 md:py-12 border-t border-brand-accent/10 min-h-[80vh] flex flex-col justify-center items-center">
              <div className="grid lg:grid-cols-5 gap-16 md:gap-24 items-center w-full">
                <div className="lg:col-span-2 space-y-12 text-center lg:text-right">
                  <div className="space-y-6">
                    <div className="inline-block bg-brand-primary/10 text-brand-primary px-5 py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-widest">اتصل بنا</div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter text-balance">تواصل <span className="text-brand-primary">معنا</span></h2>
                    <p className="text-slate-400 font-medium text-base md:text-lg lg:text-xl text-balance">نحن هنا للإجابة على استفساراتكم وتأكيد مشاركتكم في الحدث.</p>
                  </div>
                  
                  <div className="grid gap-4 md:gap-5">
                    {[
                      { icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />, label: 'الهاتف', value: '0553107814', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                      { icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, label: 'البريد الإلكتروني', value: 'guerraraexpo@gmail.com', color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
                      { icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />, label: 'الموقع', value: 'محلات البلدية – حي العقيد لطفي – القرارة', color: 'text-brand-accent', bg: 'bg-brand-accent/10' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 md:gap-5 p-4 md:p-5 bg-brand-darker rounded-[2rem] border border-white/5 hover:border-brand-primary/30 transition-all group flex-row">
                        <div className={`w-10 h-10 md:w-14 md:h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                          {item.icon}
                        </div>
                        <div className="text-right flex-1">
                          <div className="text-xs md:text-sm text-slate-500 font-black uppercase tracking-widest mb-1">{item.label}</div>
                          <div className="text-base md:text-lg lg:text-xl font-black text-white" dir={item.label === 'الهاتف' ? 'ltr' : 'rtl'}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 h-[220px] md:h-[450px] rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/5 relative group shadow-2xl w-full">
                  <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none group-hover:bg-transparent transition-all duration-1000"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.8!2d4.489444!3d32.789583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzIyLjUiTiA0wrAyOScyMi4wIkU!5e0!3m2!1sen!2sdz!4v1625584852156!5m2!1sen!2sdz" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                  ></iframe>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'register' && (
          <div className="max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center py-12 md:py-20 px-4">
            {registrationResult && <BadgeHeader />}
            {/* Hero Text */}
            {!registrationResult && (
              <div className="text-center mb-8 md:mb-16 space-y-4 md:space-y-6 w-full">
                <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter">استمارة <span className="text-brand-primary">التسجيل</span></h2>
                <p className="text-slate-400 font-medium text-sm md:text-xl lg:text-2xl max-w-2xl mx-auto">يرجى ملء البيانات بدقة للحصول على شارة المشاركة الخاصة بك.</p>
              </div>
            )}

            {/* Registration Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-brand-darker rounded-2xl md:rounded-[3rem] border border-emerald-900/20 shadow-2xl overflow-hidden w-full ${registrationResult ? 'mt-4' : ''}`}
            >
              {/* Tabs - Hidden in edit mode */}
              {!registrationResult && (
                <div className="flex border-b border-emerald-900/20">
                  <button 
                    onClick={() => { setRegType('attendee'); setExhibitorStep('basic'); }}
                    className={`flex-1 py-4 md:py-6 text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 border-b-2 flex-row-reverse ${regType === 'attendee' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                    تسجيل زائر
                  </button>
                  <button 
                    onClick={() => { setRegType('exhibitor'); setExhibitorStep('basic'); }}
                    className={`flex-1 py-4 md:py-6 text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 border-b-2 flex-row-reverse ${regType === 'exhibitor' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                    تسجيل شركة
                  </button>
                </div>
              )}

                <div className="p-6 md:p-12">
                  {formStatus && (
                    <div className={`mb-6 md:mb-8 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 flex-row-reverse ${formStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {formStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />}
                      <p className="font-bold text-xs md:text-sm">{formStatus.message}</p>
                    </div>
                  )}

                {/* Photo Upload Section */}
                <div className="mb-8 md:mb-10 flex flex-col items-center gap-3 md:gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl bg-brand-dark border-2 border-dashed border-emerald-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden relative group"
                  >
                    {formData.photo ? (
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <>
                        <Camera className="text-slate-500 w-6 h-6 md:w-8 md:h-8 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-[8px] md:text-[10px] font-bold text-slate-500 mt-1 md:mt-2">أضف صورتك</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">تغيير الصورة</span>
                    </div>
                  </div>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">الصورة الشخصية للشارة</p>
                </div>

                {/* Attendee Form */}
                {regType === 'attendee' && (
                  <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">الاسم الكامل</label>
                        <div className="relative">
                          <input 
                            required
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className={`form-input h-11 md:h-12 ${registrationResult ? 'bg-slate-800/50 cursor-not-allowed opacity-70' : ''}`}
                            placeholder="الاسم واللقب"
                            dir="rtl"
                            readOnly={!!registrationResult}
                          />
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">البريد الإلكتروني</label>
                        <div className="relative">
                          <input 
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="form-input h-11 md:h-12"
                            placeholder="email@example.com"
                            dir="rtl"
                          />
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">رقم الهاتف</label>
                        <div className="relative">
                          <input 
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={`form-input h-11 md:h-12 ${registrationResult ? 'bg-slate-800/50 cursor-not-allowed opacity-70' : ''}`}
                            placeholder="0X XX XX XX XX"
                            dir="rtl"
                            readOnly={!!registrationResult}
                          />
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">العنوان</label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="form-input h-11 md:h-12"
                            placeholder="عنوانك"
                            dir="rtl"
                          />
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">السن</label>
                        <div className="relative">
                          <input 
                            type="number"
                            min="10"
                            max="100"
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="form-input h-11 md:h-12"
                            placeholder="سنك"
                            dir="rtl"
                          />
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">المنصب / الوظيفة</label>
                        <div className="relative">
                          <input 
                            type="text"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                            className="form-input h-11 md:h-12"
                            placeholder="طالب / موظف / مدير ..."
                            dir="rtl"
                          />
                          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1 md:space-y-2">
                        <label className="form-label text-xs md:text-sm">المستوى التعليمي / المهني</label>
                        <div className="relative">
                          <select 
                            value={formData.educationLevel}
                            onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}
                            className="form-input h-11 md:h-12 appearance-none"
                            dir="rtl"
                          >
                            <option value="">اختر المستوى</option>
                            <option value="student">طالب</option>
                            <option value="graduate">خريج</option>
                            <option value="professional">موظف / مهني</option>
                            <option value="entrepreneur">رائد أعمال</option>
                            <option value="other">أخرى</option>
                          </select>
                          <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        </div>
                      </div>

                      {formData.educationLevel === 'other' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1 md:space-y-2"
                        >
                          <label className="form-label text-xs md:text-sm">يرجى تحديد المستوى</label>
                          <input 
                            type="text"
                            value={formData.educationLevelOther}
                            onChange={(e) => setFormData({...formData, educationLevelOther: e.target.value})}
                            className="form-input h-11 md:h-12"
                            placeholder="اكتب مستواك هنا..."
                            dir="rtl"
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        disabled={loading}
                        type="submit"
                        className="flex-1 bg-emerald-600 text-white py-3.5 md:py-4 rounded-xl text-base md:text-lg font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group flex-row"
                      >
                        {loading ? 'جاري الإرسال...' : (registrationResult ? 'تحديث المعلومات' : 'تأكيد التسجيل والحصول على الشارة')}
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </button>
                      {registrationResult && (
                        <button 
                          type="button"
                          onClick={() => setView('badge')}
                          className="px-6 bg-slate-800 text-slate-300 py-3.5 md:py-4 rounded-xl text-base md:text-lg font-black hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                        >
                          العودة
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* Exhibitor Form */}
                {regType === 'exhibitor' && (
                  <div className="space-y-6 md:space-y-8">
                    {exhibitorStep === 'basic' && (
                      <div className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">اسم الشركة</label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                className={`form-input h-11 md:h-12 ${registrationResult ? 'bg-slate-800/50 cursor-not-allowed opacity-70' : ''}`}
                                placeholder="اسم المؤسسة"
                                dir="rtl"
                                readOnly={!!registrationResult}
                              />
                              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">قطاع النشاط</label>
                            <div className="relative">
                              <select 
                                value={formData.industry}
                                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                className="form-input h-11 md:h-12 appearance-none"
                                dir="rtl"
                              >
                                <option value="">اختر القطاع</option>
                                <option value="technology">تكنولوجيا</option>
                                <option value="industry">صناعة</option>
                                <option value="agriculture">فلاحة</option>
                                <option value="services">خدمات</option>
                                <option value="commerce">تجارة</option>
                                <option value="other">أخرى</option>
                              </select>
                              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                            {formData.industry === 'other' && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2"
                              >
                                <input 
                                  type="text"
                                  value={formData.industryOther}
                                  onChange={(e) => setFormData({...formData, industryOther: e.target.value})}
                                  className="form-input h-11 md:h-12"
                                  placeholder="اكتب القطاع هنا..."
                                  dir="rtl"
                                />
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">اسم الشخص المسؤول</label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                className={`form-input h-11 md:h-12 ${registrationResult ? 'bg-slate-800/50 cursor-not-allowed opacity-70' : ''}`}
                                placeholder="الاسم الكامل"
                                dir="rtl"
                                readOnly={!!registrationResult}
                              />
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">المنصب / الصفة</label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                className="form-input h-11 md:h-12"
                                placeholder="مثال: مدير التسويق"
                                dir="rtl"
                              />
                              <Info className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">رقم الهاتف (للتأكيد)</label>
                            <div className="relative">
                              <input 
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className={`form-input h-11 md:h-12 ${registrationResult ? 'bg-slate-800/50 cursor-not-allowed opacity-70' : ''}`}
                                placeholder="0X XX XX XX XX"
                                dir="rtl"
                                readOnly={!!registrationResult}
                              />
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <label className="form-label text-xs md:text-sm">البريد المهني</label>
                            <div className="relative">
                              <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="form-input h-11 md:h-12"
                                placeholder="contact@company.com"
                                dir="rtl"
                              />
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* Participation Type & Next Step - Hidden in edit mode */}
                        {!registrationResult ? (
                          <>
                            <div className="pt-2">
                              <h3 className="text-lg font-black text-white mb-4 text-right">نوع المشاركة</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                  onClick={() => setFormData({...formData, participationType: 'sponsoring'})}
                                  className={`p-4 md:p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-row-reverse items-center text-right gap-4 ${formData.participationType === 'sponsoring' ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-900/20 bg-brand-dark hover:border-emerald-500/50'}`}
                                >
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                                    <Sparkles className="text-emerald-500 w-5 h-5 md:w-6 md:h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm md:text-base font-black text-white">رعاية (Sponsoring)</div>
                                  </div>
                                </div>
                                <div 
                                  onClick={() => setFormData({...formData, participationType: 'exhibition'})}
                                  className={`p-4 md:p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-row-reverse items-center text-right gap-4 ${formData.participationType === 'exhibition' ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-900/20 bg-brand-dark hover:border-emerald-500/50'}`}
                                >
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                                    <Building2 className="text-emerald-500 w-5 h-5 md:w-6 md:h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm md:text-base font-black text-white">حجز جناح (Exhibition)</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button 
                              disabled={!formData.participationType}
                              onClick={() => setExhibitorStep(formData.participationType === 'sponsoring' ? 'participation' : 'details')}
                              className="w-full bg-emerald-600 text-white py-3.5 md:py-4 rounded-xl text-base md:text-lg font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group flex-row"
                            >
                              الخطوة التالية
                              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button 
                              disabled={loading}
                              onClick={() => handleRegister()}
                              className="flex-1 bg-emerald-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                              {loading ? 'جاري الإرسال...' : 'تحديث المعلومات'}
                              <Send className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => setView('badge')}
                              className="px-8 bg-slate-800 text-slate-300 py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-black hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                            >
                              العودة
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {(exhibitorStep === 'participation' || exhibitorStep === 'details') && (
                      <div className="space-y-6 md:space-y-8">
                        <button onClick={() => setExhibitorStep('basic')} className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors text-sm font-bold">
                          <ArrowRight className="w-4 h-4" />
                          العودة للمعلومات الأساسية
                        </button>
                        
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-black text-white">
                            {exhibitorStep === 'participation' ? 'باقات الرعاية' : 'خيارات العرض'}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          {(exhibitorStep === 'participation' ? [
                            { id: 'platinum', title: 'راعي بلاتيني (Platinum)', desc: 'أكبر مساحة عرض، تغطية إعلامية حصرية.' },
                            { id: 'gold', title: 'راعي ذهبي (Gold)', desc: 'جناح عرض مميز، شعار في اللافتات.' },
                            { id: 'silver', title: 'راعي فضي (Silver)', desc: 'مساحة عرض صغيرة، شعار في لوحة الشركاء.' }
                          ] : [
                            { id: 'standard', title: 'جناح قياسي (Standard Booth)', desc: 'مساحة 3x3 متر (9 متر مربع).' },
                            { id: 'custom', title: 'مساحة مخصصة (Custom)', desc: 'مساحة مفتوحة حسب الطلب.' }
                          ]).map((pkg) => (
                            <div 
                              key={pkg.id}
                              onClick={() => setFormData({...formData, package: pkg.id})}
                              className={`card-option p-4 md:p-6 ${formData.package === pkg.id ? 'active' : ''}`}
                            >
                              <div className="flex-1">
                                <div className="text-base md:text-lg font-black text-white">{pkg.title}</div>
                                <div className="text-[10px] md:text-xs text-slate-500 font-bold mt-1">{pkg.desc}</div>
                              </div>
                              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.package === pkg.id ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-900/50'}`}>
                                {formData.package === pkg.id && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            disabled={loading || !formData.package}
                            onClick={() => handleRegister()}
                            className="flex-1 bg-emerald-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                          >
                            {loading ? 'جاري الإرسال...' : (registrationResult ? 'تحديث المعلومات' : 'تأكيد التسجيل والحصول على الشارة')}
                            <Send className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                          {registrationResult && (
                            <button 
                              type="button"
                              onClick={() => setView('badge')}
                              className="px-8 bg-slate-800 text-slate-300 py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-black hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                            >
                              العودة
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {view === 'badge' && registrationResult && (
          <section>
            <BadgeView result={registrationResult} />
          </section>
        )}

        {view === 'address-book' && (
          <section className="min-h-screen bg-brand-dark">
            <BadgeHeader />
            <AddressBookView />
          </section>
        )}

        {view === 'scanner' && (
          <section className="min-h-screen bg-brand-dark">
            {registrationResult && <BadgeHeader />}
            <ScannerView />
          </section>
        )}

        {view === 'program' && (
          <section className="min-h-screen flex flex-col bg-brand-dark">
            {registrationResult && <BadgeHeader />}
            <div className="flex-1 flex flex-col justify-center py-20 relative">
              <ProgramView />
              {registrationResult && (
                <div className="fixed bottom-8 left-8 z-50">
                  <button 
                    onClick={() => { setScannerMode('login'); setView('scanner'); }}
                    className="bg-brand-primary text-white p-4 rounded-full shadow-2xl shadow-brand-primary/40 hover:scale-110 transition-all flex items-center justify-center group"
                    title="دخول المسجلين عبر QR"
                  >
                    <Scan className="w-6 h-6" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:mr-2 transition-all duration-500 whitespace-nowrap font-black text-xs">مسح QR للدخول</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {view === 'event-registration' && (
          <section className="min-h-screen flex flex-col justify-center py-20">
            <EventRegistrationView />
          </section>
        )}
        {view === 'admin' && isAdmin && (
          <section>
            <AdminDashboard />
          </section>
        )}

        {showScanner && (
          <QRScanner onScan={handleScanAttendance} onClose={() => setShowScanner(false)} />
        )}
      </main>

      {/* Footer */}
      <footer className={`bg-brand-darker border-t border-brand-accent/10 py-12 md:py-16 mt-12 ${view === 'badge' ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 text-center">
            {/* Contact Info */}
            <div className="space-y-5 flex flex-col items-center">
              <h4 className="text-brand-primary font-black text-lg md:text-xl">تواصل معنا</h4>
              <ul className="space-y-4 w-full">
                <li className="flex items-center justify-center gap-3 text-slate-400 font-bold flex-row-reverse">
                  <span className="text-[10px] md:text-base">{siteContent.contactAddress}</span>
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                </li>
                <li className="flex items-center justify-center gap-3 text-slate-400 font-bold flex-row-reverse">
                  <span className="break-all text-[10px] md:text-base">{siteContent.contactEmail}</span>
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                </li>
                <li className="flex items-center justify-center gap-3 text-slate-400 font-bold flex-row-reverse">
                  <span dir="ltr" className="text-[10px] md:text-base">{siteContent.contactPhone}</span>
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-primary shrink-0" />
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-5 flex flex-col items-center">
              <h4 className="text-brand-primary font-black text-lg md:text-xl">روابط سريعة</h4>
              <ul className="space-y-3">
                <li><button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-brand-primary font-bold transition-colors text-xs md:text-base">{siteContent.headerHome}</button></li>
                <li><button onClick={() => { setView('program'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-brand-primary font-bold transition-colors text-xs md:text-base">{siteContent.headerProgram}</button></li>
                <li><button onClick={() => { setView('register'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-brand-primary font-bold transition-colors text-xs md:text-base">{siteContent.headerRegister}</button></li>
                <li><button onClick={() => { setView('login'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-brand-primary font-bold transition-colors text-xs md:text-base">{siteContent.headerLogin}</button></li>
                <li><a href="#contact" className="text-slate-400 hover:text-brand-primary font-bold transition-colors text-xs md:text-base">اتصل بنا</a></li>
                <li><button onClick={() => { setView('checkin'); window.scrollTo(0, 0); }} className="text-brand-primary hover:text-brand-primary/70 font-bold transition-colors text-xs md:text-base flex items-center gap-1"><Scan className="w-3 h-3" /> تسجيل الحضور</button></li>
              </ul>
            </div>

            {/* Brand & Social */}
            <div className="space-y-5 flex flex-col items-center">
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-xs md:text-sm font-black text-white leading-none">{siteContent.title}</span>
                  <span className="text-[8px] md:text-xs font-bold text-brand-primary tracking-widest uppercase">{siteContent.edition} {siteContent.year}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden">
                  <img 
                    src={siteContent.footerLogo} 
                    alt="Logo Icon" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="text-slate-400 text-[9px] sm:text-xs md:text-sm leading-relaxed font-medium max-w-lg mx-auto text-balance">
                {siteContent.footerText}
              </p>
              <div className="flex items-center justify-center gap-3">
                {siteContent.socialLinks.map((link: any) => {
                  const Icon = link.platform === 'facebook' ? Facebook : 
                              link.platform === 'instagram' ? Instagram : 
                              link.platform === 'twitter' ? Twitter : Globe;
                  return (
                    <a 
                      key={link.id}
                      href={link.url} 
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-600 text-[9px] md:text-xs font-bold uppercase tracking-widest">© {siteContent.year} جميع الحقوق محفوظة - {siteContent.title}</p>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {showScanSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-emerald-600 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle2 className="w-20 h-20 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black">تم تسجيل الدخول</h2>
                <p className="text-emerald-100 font-bold text-lg">تم تسجيل حضورك في الفعالية بنجاح</p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
                <Clock className="w-5 h-5" />
                <span className="font-black text-xl">{new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkin & Self-Checkin Views - Full screen overlays */}
      <AnimatePresence>
        {(view === 'checkin' || view === 'self-checkin') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-brand-dark overflow-auto"
          >
            {view === 'checkin' && (
              <CheckinView setView={setView} siteContent={siteContent} />
            )}
            {view === 'self-checkin' && selfCheckinActivityId && (
              <SelfCheckinView activityId={selfCheckinActivityId} setView={setView} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
                t.type === 'success' ? 'bg-emerald-500/90 border-emerald-400/20 text-white' : 
                t.type === 'error' ? 'bg-red-500/90 border-red-400/20 text-white' :
                'bg-brand-primary/90 border-brand-accent/20 text-white'
              }`}
            >
              {t.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              <span className="font-black text-sm">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
