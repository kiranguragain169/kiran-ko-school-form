import React from 'react';
import { Student } from '../types';
import { Sparkles, GraduationCap, Brain, Trash2, Briefcase, Loader2, Fingerprint, Activity, User } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onDelete }) => {
  return (
    <div className="relative group h-full">
      {/* Card Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500 will-change-opacity"></div>
      
      <div className="relative h-full bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden hover:border-indigo-500/30 transition-all duration-300 flex flex-col transform-gpu will-change-transform">
        {/* Holographic Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Fingerprint size={64} className="text-white" />
          </div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">ID: {student.id.slice(0, 8)}</p>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{student.firstName} {student.lastName}</h3>
              <p className="text-indigo-400 text-xs font-medium flex items-center gap-1.5 mt-1 uppercase tracking-wider">
                <GraduationCap size={14} />
                {student.major}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 bg-slate-950/50 px-2 py-1 rounded border border-slate-800">
                <Activity size={12} className={student.gpa >= 3.0 ? "text-emerald-400" : "text-amber-400"} />
                <span className="text-sm font-mono font-bold text-slate-200">{student.gpa.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">AGE: {student.age}</span>
            </div>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="p-5 flex-1 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/30 p-2 rounded border border-slate-800/50">
              <span className="text-slate-500 block text-[10px] uppercase mb-1">Birth Date</span>
              <span className="text-slate-300 font-mono">{student.birthDate}</span>
            </div>
             <div className="bg-slate-950/30 p-2 rounded border border-slate-800/50">
              <span className="text-slate-500 block text-[10px] uppercase mb-1">Status</span>
              <span className="text-emerald-500 font-mono">ACTIVE</span>
            </div>
          </div>

          {student.aiAnalysis ? (
            <div className="space-y-4 animate-in fade-in duration-700">
              {/* Archetype */}
              <div className="relative p-3 rounded-lg bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-lg"></div>
                 <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Archetype Detected</span>
                 </div>
                 <div className="text-sm font-bold text-white shadow-black drop-shadow-sm">{student.aiAnalysis.archetype}</div>
              </div>

              {/* Summary */}
              <div className="text-xs text-slate-400 leading-relaxed font-light border-l border-slate-700 pl-3">
                {student.aiAnalysis.summary}
              </div>

              {/* Career Matrix */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-wider">
                  <Briefcase size={12} />
                  Career Vector
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {student.aiAnalysis.careerSuggestions.map((job, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded hover:bg-slate-700 hover:text-white transition-colors cursor-default">
                      {job}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Optimization Protocols */}
              <div className="space-y-2 pt-2 border-t border-slate-800/50">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-wider">
                  <Brain size={12} />
                  Protocols
                </h4>
                <div className="space-y-1.5">
                   {student.aiAnalysis.studyTips.map((tip, idx) => (
                     <div key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-0.5">›</span>
                        <span className="text-[11px] text-slate-400">{tip}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-slate-600">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 animate-pulse"></div>
                <Loader2 className="animate-spin text-indigo-500 relative z-10" size={24} />
              </div>
              <p className="mt-3 text-xs font-mono uppercase tracking-widest">Analyzing Biometrics...</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
          <div className="text-[10px] text-slate-600 font-mono">SECURE RECORD</div>
          <button
            onClick={() => onDelete(student.id)}
            className="group/btn flex items-center justify-center p-2 rounded-md hover:bg-red-950/30 hover:text-red-400 text-slate-600 transition-all"
            aria-label="Delete student"
          >
            <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};