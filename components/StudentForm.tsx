import React, { useState } from 'react';
import { Plus, Loader2, Save, Calendar } from 'lucide-react';
import { StudentInput, AppStatus } from '../types';

interface StudentFormProps {
  onSubmit: (data: StudentInput) => void;
  status: AppStatus;
}

const INITIAL_STATE: StudentInput = {
  firstName: '',
  lastName: '',
  birthDate: '',
  major: '',
  gpa: 3.0,
  bio: '',
};

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, status }) => {
  const [formData, setFormData] = useState<StudentInput>(INITIAL_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gpa' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isProcessing = status === AppStatus.PROCESSING;

  return (
    <div className="relative group">
      {/* Glow effect behind the form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-800 p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Plus size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">New Entry</h2>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Secure Protocol</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-slate-950/50 text-slate-200 px-4 py-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="Ex: Kai"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-slate-950/50 text-slate-200 px-4 py-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="Ex: Tanaka"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="major" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Major</label>
              <input
                required
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full bg-slate-950/50 text-slate-200 px-4 py-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="Ex: Cybernetics"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="birthDate" className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={12} /> Birth Date
              </label>
              <input
                required
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full bg-slate-950/50 text-slate-200 px-4 py-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all [color-scheme:dark]"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="gpa" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Performance Index (GPA)</label>
              <span className="text-lg font-bold text-indigo-400 font-mono shadow-[0_0_10px_rgba(129,140,248,0.3)] px-2 rounded bg-indigo-500/10 border border-indigo-500/20">
                {formData.gpa.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              disabled={isProcessing}
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono uppercase">
              <span>Critical</span>
              <span>Optimal</span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="bio" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio-Data & Traits</label>
            <textarea
              required
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-slate-950/50 text-slate-200 px-4 py-3 rounded-lg border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-slate-700"
              placeholder="Enter subject analysis..."
              disabled={isProcessing}
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all relative overflow-hidden group ${
              isProcessing 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/30'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Save size={18} />
                <span>Initialize Student</span>
              </>
            )}
          </button>

          {status === AppStatus.ERROR && (
            <div className="text-red-400 text-xs text-center bg-red-950/30 p-3 rounded border border-red-500/30">
              [ERROR]: Connection Failed. Retry Protocol.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};