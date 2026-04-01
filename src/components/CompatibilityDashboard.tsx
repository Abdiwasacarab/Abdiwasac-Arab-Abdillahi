import React from 'react';
import { CompatibilityResult } from '../types';
import { CheckCircle2, AlertTriangle, Info, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface CompatibilityDashboardProps {
  result: CompatibilityResult;
  onReset: () => void;
}

export const CompatibilityDashboard: React.FC<CompatibilityDashboardProps> = ({ result, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-100';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const scoreColorClass = getScoreColor(result.score);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Score Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center space-y-4">
        <h2 className="text-slate-500 font-medium uppercase tracking-widest text-sm">Compatibility Score</h2>
        <div className="flex justify-center">
          <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center text-4xl font-bold ${scoreColorClass}`}>
            {result.score}%
          </div>
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${scoreColorClass.split(' ')[0]}`}>{result.category}</h3>
          <p className="text-slate-600 mt-1">{result.interpretation}</p>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-emerald-600 mb-4">
            <CheckCircle2 size={20} />
            <h4 className="font-bold uppercase tracking-wider text-sm">Key Strengths</h4>
          </div>
          <ul className="space-y-3">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
            {result.strengths.length === 0 && (
              <li className="text-slate-400 italic text-sm">No specific strengths identified.</li>
            )}
          </ul>
        </div>

        {/* Concerns */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <AlertTriangle size={20} />
            <h4 className="font-bold uppercase tracking-wider text-sm">Potential Concerns</h4>
          </div>
          <ul className="space-y-3">
            {result.concerns.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {c}
              </li>
            ))}
            {result.concerns.length === 0 && (
              <li className="text-slate-400 italic text-sm">No major concerns identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex gap-4">
        <Info className="text-indigo-600 shrink-0" size={24} />
        <div className="space-y-2">
          <h4 className="font-bold text-indigo-900 text-sm">Decision-Support Notice</h4>
          <p className="text-indigo-800/80 text-xs leading-relaxed">
            This score is a statistical probability based on research data from Hargeisa. 
            It is intended to support, not replace, traditional family discussions, religious guidance, and personal judgment. 
            Factors like attraction, spiritual connection, and personal growth are not captured by this model.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-medium"
        >
          <RefreshCw size={18} />
          Start New Assessment
        </button>
      </div>
    </motion.div>
  );
};
