import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Check, 
  X, 
  Smartphone, 
  Shield, 
  Users, 
  TrendingUp, 
  Linkedin, 
  Edit,
  Leaf,
  Info,
  Lock,
  School,
  AlertTriangle,
  Heart,
  ChevronDown,
  PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

type VoteStatus = 'pending' | 'for' | 'against';

interface Student {
  id: string;
  name: string;
  classId: string; // 'a1', 'a2', 'a3'
  vote: VoteStatus;
}

// --- Real Data ---

const A1_STUDENT_NAMES = [
  'איטח נגה הדס',
  'בלומנברג יובל',
  'בן עמי דורי',
  'בק בארי',
  'בק רומי',
  'גהורזם מילי',
  'דדון נהוראי',
  'דובצקי אלה',
  'הס יובל',
  'וינר גאיה',
  'ויס שפי יובל',
  'חרדון אריאה',
  'טקצ\'יוב אדם',
  'יהודה שי-לי',
  'יעקבי נועם',
  'ירקוני ינאי',
  'כהן עידו',
  'לבנר לייה',
  'ללום מיילי',
  'מני אמה רחל',
  'מרקוס מיה',
  'נמדר בארי',
  'עזרא נועה',
  'פורת אביב איתן',
  'פנקס נגה',
  'פרידמן אלה',
  'פרידמן אלון',
  'שמש יאן'
];

const A2_STUDENT_NAMES = [
  'אבני איימי רבקה',
  'אלעד יונתן',
  'אקשטיין דניאל',
  'ביינה מלודי',
  'בנימינוב שי-לי אור',
  'גלמן הופשטטר טל',
  'גלעדי אורי',
  'דדון רומי',
  'דהאן טומי',
  'הולצר ליב',
  'הרן רוי',
  'חיות אלדר',
  'חקים סורד',
  'טאובליב יהלי',
  'טופליאן תהל',
  'טקץ\' אביב',
  'כהן עופרי',
  'מדר מיקה',
  'מורלי יובל',
  'מושקוביץ רומי',
  'משעלי עלמה',
  'סלינס גל',
  'פקטור אילאי',
  'צליק אריאל',
  'רון דניאל',
  'שהרבני ליב',
  'שמש נדב',
  'ששון נועם'
];

const A3_STUDENT_NAMES = [
  "אורי אמיתי",
  "איילה דרויש",
  "אלון בן רעי",
  "אליס יצחקיאן",
  "בן אביב",
  "בניה אלון",
  "גרגורי שוקרב",
  "וסילי קירפיצניקוב",
  "יהלי אסרף",
  "יובל בורלו",
  "יונתן פוקס",
  "לוקה כורש",
  "ליאן חזום",
  "ליאן שילדהוז",
  "ליב רויזמן",
  "ליבי קויפמן הן",
  "ליה נחום",
  "מאי זמר",
  "נגה בירן דותן",
  "נגה כהן",
  "ניל שגב",
  "ניקול ממדוב",
  "סשה בינשטוק",
  "עמית סמסון",
  "קארין הלר",
  "רוני קושינסקי",
  "שחר מיכאל",
  "שחר קריאף"
];

const generateStudents = (): Student[] => {
  const students: Student[] = [];
  
  A1_STUDENT_NAMES.forEach((name, index) => {
    students.push({
      id: `a1-${index + 1}`,
      name: name,
      classId: 'a1',
      vote: 'pending'
    });
  });

  A2_STUDENT_NAMES.forEach((name, index) => {
    students.push({
      id: `a2-${index + 1}`,
      name: name,
      classId: 'a2',
      vote: 'pending'
    });
  });

  A3_STUDENT_NAMES.forEach((name, index) => {
    students.push({
      id: `a3-${index + 1}`,
      name: name,
      classId: 'a3',
      vote: 'pending'
    });
  });

  return students;
};

// --- Components ---

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12 mt-12 border-t-8 border-emerald-500">
    <div className="container mx-auto px-4 text-center">
      <div className="flex justify-center mb-6">
          <div className="p-3 bg-white/10 rounded-full">
            <School size={32} className="text-emerald-400" />
          </div>
      </div>
      <p className="opacity-90 mb-6 text-lg font-light tracking-wide">© כל הזכויות שמורות ליוזמי האמנה - הורי שכבת א' בית ספר גבעולים</p>
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Powered By</span>
        <div className="flex items-center gap-3">
            <span className="text-base font-medium">אוהד שגב AI EXPERT</span>
            <a 
            href="https://www.linkedin.com/in/ohad-segev-segevo/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0077b5] hover:bg-[#006396] text-white p-2 rounded-full transition-transform hover:scale-110 shadow-lg"
            >
            <Linkedin size={20} />
            </a>
        </div>
      </div>
    </div>
  </footer>
);

// 2. Election Graphs Component
const ElectionStats = ({ students }: { students: Student[] }) => {
  const totalStudents = students.length;
  const votesFor = students.filter(s => s.vote === 'for').length;
  const percentage = totalStudents > 0 ? Math.round((votesFor / totalStudents) * 100) : 0;
  
  const classes = [
    { id: 'a1', label: "א'1" },
    { id: 'a2', label: "א'2" },
    { id: 'a3', label: "א'3" },
  ];

  const getClassData = (clsId: string) => {
    const clsStudents = students.filter(s => s.classId === clsId);
    const clsFor = clsStudents.filter(s => s.vote === 'for').length;
    return {
      total: clsStudents.length,
      for: clsFor,
      percent: clsStudents.length > 0 ? Math.round((clsFor / clsStudents.length) * 100) : 0
    };
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-xl border border-emerald-100 p-5 md:p-10 mb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 md:mb-10 flex items-center justify-center gap-3 relative z-10">
        <TrendingUp className="text-emerald-600 w-6 h-6 md:w-8 md:h-8" />
        <span>מצב ההצבעה בזמן אמת</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Main Gauge */}
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 w-full max-w-xs text-center">
             <h3 className="text-lg font-bold text-slate-600 flex items-center justify-center gap-2">
                 יעד שכבתי: <span className="text-emerald-600 text-2xl font-black">70%</span>
             </h3>
          </div>
          
          <div className="scale-90 md:scale-100 origin-center">
            <div className="relative w-80 h-40 overflow-hidden">
              {/* Background Arch */}
              <div className="absolute top-0 left-0 w-full h-full bg-slate-200 rounded-t-full"></div>
              {/* Fill Arch */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 origin-bottom rounded-t-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                initial={{ rotate: '180deg' }}
                animate={{ rotate: `${180 + (180 * percentage / 100)}deg` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: 'bottom center' }}
              />
              {/* Inner White Circle */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 w-64 h-32 bg-gradient-to-b from-emerald-50 to-white rounded-t-full flex items-end justify-center pb-4 z-10 shadow-inner">
                <span className="text-7xl font-black text-slate-800 tracking-tighter drop-shadow-sm">{percentage}<span className="text-4xl text-slate-400">%</span></span>
              </div>
            </div>
            
            {/* 70% Marker Line */}
            <div className="absolute w-80 h-40 bottom-0 pointer-events-none z-20">
               <div 
                 className="absolute bottom-0 left-1/2 w-0.5 h-full bg-red-500 origin-bottom"
                 style={{ transform: `rotate(${180 + (180 * 0.7)}deg) translateX(-50%)`, height: '110%' }}
               >
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white">יעד 70%</div>
               </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-medium text-lg">
              <span className="font-bold text-slate-900">{votesFor}</span> הורים הצביעו בעד
              <span className="mx-2 text-slate-300">|</span>
              מתוך <span className="font-bold text-slate-900">{totalStudents}</span>
            </p>
            {percentage >= 70 && (
                <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 border border-emerald-200 shadow-sm"
                >
                <Check size={20} strokeWidth={3} />
                היעד הושג! כל הכבוד!
                </motion.div>
            )}
          </div>
        </div>

        {/* Class Breakdown Bars */}
        <div className="space-y-6 md:space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">פילוח לפי כיתות</h3>
          {classes.map(cls => {
            const data = getClassData(cls.id);
            return (
              <div key={cls.id} className="relative group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-slate-700">{cls.label}</span>
                  <div className="text-right">
                      <span className="text-2xl font-black text-slate-800">{data.percent}%</span>
                      <span className="text-xs text-slate-400 mr-2 font-medium">הצבעה</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                   {/* Target Line inside bar */}
                   <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-red-400 z-10 opacity-40 group-hover:opacity-100 transition-opacity" title="יעד 70%"></div>
                   
                   <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percent}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                   />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 3. Pledge Text Component (New Community Agreement Text)
const PledgeDocument = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden mb-12 relative">
       {/* Decorative top bar */}
      <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
      
      <div className="p-6 md:p-14 space-y-8 md:space-y-10 text-slate-800 leading-relaxed">
        
        {/* Header inside the document */}
        <div className="text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-6 md:mt-8 mb-3 font-heading tracking-tight">אמנה קהילתית של הורי כיתה א׳</h2>
          <p className="text-lg md:text-2xl text-emerald-700 font-light">לשמירה על ילדות בריאה והתפתחות מותאמת גיל</p>
        </div>

        <section className="space-y-6 md:space-y-8">
          <p className="text-lg md:text-2xl font-medium leading-relaxed text-center text-slate-700 max-w-4xl mx-auto">
            אנו, הורי ילדות וילדי כיתה א׳,<br/>
            מתוך אחריות משותפת, כבוד הדדי ודאגה כנה לרווחת ילדינו,<br/>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 rounded">בוחרים לפעול כקהילה תומכת ומסכימה</span> סביב נושא השימוש בטלפונים ניידים.
          </p>

          <div className="bg-gradient-to-br from-orange-50 to-white p-6 md:p-8 rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
             <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start relative z-10">
               <div className="bg-orange-100 p-3 rounded-full shrink-0">
                  <Heart className="text-orange-500 w-8 h-8" fill="currentColor" fillOpacity={0.2} />
               </div>
               <div>
                <p className="text-lg leading-relaxed mb-4">
                    אנו מאמינים כי שנות הילדות הראשונות הן זמן יקר להתפתחות רגשית, חברתית ולימודית וכי משחק, קשר אנושי, דמיון, תנועה וחברות – הם הבסיס שעליו נבנה העתיד של ילדינו.
                </p>
                <p className="font-bold text-orange-900 text-lg border-t border-orange-200 pt-4 mt-2">
                    אנו מבינים שהאתגר איננו של הורה יחיד, אלא של סביבה שלמה ושל דינמיקה כיתתית, ולכן בוחרים להסכים יחד – כדי להקל על כולנו ועל ילדינו.
                </p>
               </div>
             </div>
          </div>
        </section>

        <section className="bg-[#f0fdf4] p-6 md:p-10 rounded-3xl border border-emerald-100 relative">
          <div className="absolute -top-6 right-8 bg-white p-2 rounded-xl shadow-md border border-emerald-100">
             <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-emerald-900 mb-6 md:mb-8 mt-2">
            לפיכך אנו מסכימים על העקרונות הבאים:
          </h3>
          <ul className="grid gap-4 md:gap-6">
            <li className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-white p-6 rounded-2xl shadow-sm border border-emerald-50/50 hover:shadow-md transition-shadow">
              <span className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-lg whitespace-nowrap shadow-emerald-200 shadow-lg text-center">כיתות א׳–ב׳</span>
              <span className="font-medium text-lg text-slate-700">לא ייעשה שימוש בטלפונים חכמים אישיים בקרב ילדי הכיתה.</span>
            </li>
            <li className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-white p-6 rounded-2xl shadow-sm border border-emerald-50/50 hover:shadow-md transition-shadow">
              <span className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-lg whitespace-nowrap shadow-emerald-200 shadow-lg text-center">כיתה ג׳</span>
              <span className="font-medium text-lg text-slate-700">שימוש בטלפון פשוט בלבד (שיחות והודעות), ללא גישה לאינטרנט, רשתות חברתיות או אפליקציות.</span>
            </li>
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
               <h3 className="text-lg md:text-xl font-bold text-[#2C5282] mb-4 flex items-center gap-2">
                 <Info size={24} className="text-blue-600" />
                 אנו מדגישים כי הסכמה זו:
               </h3>
               <ul className="space-y-4 text-base">
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400"/> אינה נובעת מחוסר אמון בילדים</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400"/> אינה התנגדות לטכנולוגיה</li>
                 <li className="flex items-center gap-3 font-bold text-blue-900 bg-white p-2 rounded-lg shadow-sm"><div className="w-2 h-2 rounded-full bg-blue-600"/> אלא התאמה מודעת לגיל ולשלב ההתפתחותי</li>
               </ul>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
               <h3 className="text-lg md:text-xl font-bold text-[#2C5282] mb-4 flex items-center gap-2">
                 <Users size={24} className="text-blue-600" />
                 אנו מתחייבים לפעול ברוח של:
               </h3>
               <ul className="space-y-4 text-base">
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400"/> שיח פתוח ומכבד</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400"/> הימנעות משיפוטיות או לחץ חברתי</li>
                 <li className="flex items-center gap-3 font-bold text-blue-900 bg-white p-2 rounded-lg shadow-sm"><div className="w-2 h-2 rounded-full bg-blue-600"/> רגישות למצבים מיוחדים וחריגים</li>
               </ul>
            </div>
        </section>
        
        <section className="text-center text-slate-500 italic text-base border-t border-slate-100 pt-8">
           <p className="flex justify-center items-center gap-2">
             <Edit size={16} />
             אנו מסכימים לבחון את ההסכמה מחדש בעתיד, בהתאם להתפתחות הילדים, לצורכי הכיתה ולשיח בין ההורים.
           </p>
        </section>

        <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden group">
             {/* Background decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-1000"></div>

            <h3 className="text-2xl md:text-3xl font-black mb-6 text-emerald-400 tracking-wide uppercase">ברית הורית</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-8 font-light max-w-2xl mx-auto">
             אנו רואים באמנה זו ברית הורית,<br/>
             שמטרתה להעניק לילדינו <span className="text-white font-medium border-b border-emerald-500/50">עוד זמן של ילדות</span>,<br/>
             ולנו ההורים: גב קהילתי ותמיכה הדדית.
            </p>
            <div className="inline-block relative">
                <p className="text-xl md:text-2xl font-bold text-white relative z-10 px-6 py-2">
                מתוך בחירה משותפת, אחריות ואמון.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-emerald-600/50 -skew-x-12"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

// 4. Voting Modal (Same logic)
const VotingModal = ({ 
  isOpen, 
  onClose, 
  student, 
  onVote 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  student: Student | null; 
  onVote: (id: string, vote: VoteStatus) => void 
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex justify-between items-center text-white">
          <h3 className="text-xl font-bold">הצבעת הורים</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={24} /></button>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full text-emerald-600 mb-4 border-4 border-emerald-100 shadow-inner">
               <span className="text-3xl font-black">{student.name.charAt(0)}</span>
             </div>
            <h2 className="text-3xl font-black text-slate-800 mb-1">{student.name}</h2>
            <p className="text-sm text-slate-500 font-medium bg-slate-100 inline-block px-3 py-1 rounded-full">הצבעה עבור התלמיד/ה</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => { onVote(student.id, 'for'); onClose(); }}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${student.vote === 'for' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md transform scale-105' : 'border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-lg'}`}
            >
              <div className={`p-3 rounded-full ${student.vote === 'for' ? 'bg-emerald-200' : 'bg-slate-100'}`}>
                <Check className={`w-6 h-6 ${student.vote === 'for' ? 'text-emerald-700' : 'text-slate-400'}`} />
              </div>
              <span className="font-bold text-lg">אני תומך/ת</span>
            </button>

            <button 
              onClick={() => { onVote(student.id, 'against'); onClose(); }}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300 ${student.vote === 'against' ? 'border-red-500 bg-red-50 text-red-700 shadow-md transform scale-105' : 'border-slate-100 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50/50 hover:shadow-lg'}`}
            >
              <div className={`p-3 rounded-full ${student.vote === 'against' ? 'bg-red-200' : 'bg-slate-100'}`}>
                <X className={`w-6 h-6 ${student.vote === 'against' ? 'text-red-700' : 'text-slate-400'}`} />
              </div>
              <span className="font-bold text-lg">לא תומך/ת</span>
            </button>
          </div>
          <div className="text-center mt-8 pt-6 border-t border-slate-100">
             <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
               <Lock size={12} />
               ההצבעה היא דיסקרטית ומאובטחת
             </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 5. Main App Component
const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState('a1');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    // Initial load
    setStudents(generateStudents());
  }, []);

  const handleVote = (id: string, vote: VoteStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, vote } : s));
  };

  const openVote = (student: Student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const filteredStudents = useMemo(() => 
    students.filter(s => s.classId === selectedClass), 
  [students, selectedClass]);

  return (
    <div className="min-h-screen pb-10 font-sans bg-[#F8FAFC] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Logo Container */}
             <div className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-lg shadow-sm border border-slate-100 p-1 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src="https://scontent.ftlv19-1.fna.fbcdn.net/v/t39.30808-6/306856130_460231302807079_4471520344842137525_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0hFdi4eC_kcQ7kNvwEiQ_E1&_nc_oc=AdntmvpmmgSIOUCRqm-Egsq0PshxNc4Yy30NQN7nu9ziAxtbgeNzsiZuhyQr7pTk_3l1V0Tk-W_IC9lURRx2pq5A&_nc_zt=23&_nc_ht=scontent.ftlv19-1.fna&_nc_gid=1KU5zuhhUezk7d6CuNN_Ow&oh=00_Afo0P-eRxyYLx3oWJhSRlslbMe1cYkFWnRY7C58Udk05Sg&oe=6963D376" 
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/100x100/white/2F855A?text=Givolim";
                  }}
                  alt="לוגו בית ספר גבעולים" 
                  className="w-full h-full object-contain" 
                />
             </div>
            <div>
              <h1 className="font-black text-slate-800 text-lg md:text-xl leading-none mb-1">בית ספר גבעולים</h1>
              <p className="text-xs md:text-sm text-emerald-600 font-bold tracking-wide">אמנת הורים – שכבת א'</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-[#276749] bg-emerald-50 px-4 py-2 rounded-full font-bold border border-emerald-100 shadow-sm">
            <Shield size={16} className="fill-emerald-100" />
            <span>יוזמה מוגנת ובטוחה</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 md:mt-12 max-w-5xl">
        
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="max-w-3xl mx-auto mb-8 md:mb-10">
            <h1 className="text-3xl md:text-6xl font-black text-slate-800 mb-4 md:mb-6 leading-tight tracking-tight">
                משאירים את הילדות <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">מחוץ למסכים</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                הצטרפו לרוב ההורים בשכבה א' שבחרו לתת לילדים לגדול בשקט,<br className="hidden md:block"/> בלי סמארטפונים עד כיתה ג'.
            </p>
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8 aspect-video md:aspect-[21/9] max-h-[450px] group"
          >
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

             {/* Text Overlay on Image - UPDATED */}
             <div className="absolute top-4 right-4 md:top-6 md:right-8 bg-white/95 backdrop-blur-md pl-4 pr-3 py-2 md:pl-6 md:pr-4 md:py-3 rounded-2xl shadow-xl z-10 flex items-center gap-3 md:gap-4 max-w-max mx-auto md:mx-0 border border-slate-100 border-r-4 border-r-red-500">
                <div className="bg-red-50 p-2 md:p-3 rounded-full shadow-inner">
                    <Smartphone className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-right">
                    <p className="font-black text-slate-800 text-base md:text-lg leading-tight">סמארטפון בבית ספר</p>
                    <p className="text-[10px] md:text-xs text-red-500 font-bold uppercase tracking-wide">פגיעה בקשב ובחברות</p>
                </div>
             </div>
             
             {/* Main Image */}
             <img 
               src="https://i.ibb.co/kgYP7y1C/Gemini-Generated-Image-5bi6jj5bi6jj5bi6.png"
               alt="ילדים משחקים ללא מסכים" 
               className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-[2s]"
             />
          </motion.div>
        </div>

        {/* The Pledge Content */}
        <PledgeDocument />

        {/* Live Stats */}
        <ElectionStats students={students} />

        {/* Voting Section */}
        <div id="voting-area" className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-5 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                    <Users size={20} className="md:w-6 md:h-6" />
                </div>
                רשימת תלמידים והצבעה
              </h3>
              <p className="text-sm md:text-base text-slate-500 mt-1 mr-10 md:mr-12">לחצו על שם הילד/ה כדי להצביע (דיסקרטי)</p>
            </div>
            
            {/* Class Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-full md:w-auto">
              {['a1', 'a2', 'a3'].map((clsId) => (
                <button
                  key={clsId}
                  onClick={() => setSelectedClass(clsId)}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-bold transition-all duration-300 ${
                    selectedClass === clsId 
                      ? 'bg-white text-emerald-700 shadow-md transform scale-100' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {clsId === 'a1' ? "א'1" : clsId === 'a2' ? "א'2" : "א'3"}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-8 bg-[#F8FAFC] min-h-[400px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {filteredStudents.map((student) => (
                <motion.button
                  key={student.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openVote(student)}
                  className={`relative p-4 md:p-5 rounded-2xl border text-right transition-all group overflow-hidden flex flex-col justify-between h-28 md:h-32 ${
                    student.vote !== 'pending' 
                      ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200 shadow-emerald-100 shadow-md' 
                      : 'bg-white border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start relative z-10 w-full">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${student.vote !== 'pending' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                      {student.vote === 'for' ? <Check size={16} className="md:w-[18px] md:h-[18px]" /> : student.vote === 'against' ? <X size={16} className="md:w-[18px] md:h-[18px]" /> : <Users size={16} className="md:w-[18px] md:h-[18px]" />}
                    </div>
                    {student.vote !== 'pending' && (
                      <div className="bg-emerald-100 text-emerald-800 text-[10px] md:text-[11px] px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold">
                        הצביע/ה
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className={`font-bold text-base md:text-lg leading-tight ${student.vote !== 'pending' ? 'text-emerald-900' : 'text-slate-700'}`}>{student.name}</h4>
                    <div className={`text-[10px] md:text-xs mt-1 md:mt-1.5 flex items-center gap-1 font-medium ${student.vote !== 'pending' ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`}>
                        <Edit size={10} className="md:w-3 md:h-3" />
                        {student.vote === 'pending' ? 'לחץ להצבעה' : 'שינוי הצבעה'}
                    </div>
                  </div>
                  
                  {/* Decorative background element */}
                  <div className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full z-0 transition-opacity duration-500 ${student.vote !== 'pending' ? 'bg-emerald-100/50 opacity-100' : 'bg-slate-50 opacity-0 group-hover:opacity-100'}`}></div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
      
      <VotingModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        student={selectedStudent}
        onVote={handleVote}
      />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
