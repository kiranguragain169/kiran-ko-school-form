import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, LayoutGrid, List as ListIcon, Cpu } from 'lucide-react';
import { StudentForm } from './components/StudentForm';
import { StudentCard } from './components/StudentCard';
import { Student, StudentInput, AppStatus } from './types';
import { analyzeStudentProfile } from './services/geminiService';

const STORAGE_KEY = 'gemini-student-registry-v2';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse students", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddStudent = async (input: StudentInput) => {
    setStatus(AppStatus.PROCESSING);
    
    const newId = crypto.randomUUID();
    const age = calculateAge(input.birthDate);

    // Initial student object
    const studentData: Student = {
      ...input,
      id: newId,
      age,
      createdAt: Date.now(),
    };

    try {
      const analysis = await analyzeStudentProfile(studentData);
      
      const finalStudent: Student = {
        ...studentData,
        aiAnalysis: analysis
      };

      setStudents(prev => [finalStudent, ...prev]);
      setStatus(AppStatus.SUCCESS);
      setTimeout(() => setStatus(AppStatus.IDLE), 2000);

    } catch (error) {
      console.error("Error processing student:", error);
      setStatus(AppStatus.ERROR);
      // Still save the student even if AI fails, marked as unanalyzed
      setStudents(prev => [studentData, ...prev]);
      setTimeout(() => setStatus(AppStatus.IDLE), 3000);
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("CONFIRM DELETION: This action cannot be undone.")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-no-repeat flex flex-col relative">
      {/* Overlay to darken background image */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-0"></div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-slate-900 p-2.5 rounded-full border border-slate-700 text-indigo-400">
                <Cpu size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">NEXUS</h1>
              <p className="text-[10px] text-indigo-400 font-mono tracking-[0.2em] uppercase">Student Registry V2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:block h-8 w-px bg-slate-800"></div>
             <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
               <Users size={16} className="text-indigo-500" />
               <span className="text-slate-200 font-mono">{students.length}</span>
               <span className="text-[10px] uppercase tracking-wider ml-1">Subjects</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4 xl:col-span-3">
            <StudentForm onSubmit={handleAddStudent} status={status} />
            
            <div className="mt-8 p-5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <GraduationCap size={64} className="text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                System Info
              </h4>
              <p className="text-xs text-indigo-200/70 leading-relaxed font-mono">
                Nexus utilizes Gemini 2.5 flash architecture to process biodata and academic vectors. Ensure accurate data entry for optimal career pathing predictions.
              </p>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                Database
                <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono">LIVE</span>
              </h2>
              <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                 <button className="p-2 text-indigo-400 bg-slate-800 rounded shadow-sm transition-all" title="Grid View">
                   <LayoutGrid size={18} />
                 </button>
                 <button className="p-2 text-slate-600 hover:text-slate-300 transition-all" title="List View">
                   <ListIcon size={18} />
                 </button>
              </div>
            </div>

            {students.length === 0 ? (
              <div className="h-96 rounded-2xl border-2 border-slate-800 border-dashed bg-slate-900/30 flex flex-col items-center justify-center text-center p-8 group hover:border-indigo-500/30 transition-colors">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
                  <Users className="text-slate-700 group-hover:text-indigo-500 transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">Registry Empty</h3>
                <p className="text-slate-500 max-w-md text-sm">
                  Initialize a new student subject via the control panel. AI analysis will commence upon submission.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {students.map(student => (
                  <StudentCard 
                    key={student.id} 
                    student={student} 
                    onDelete={handleDeleteStudent} 
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;