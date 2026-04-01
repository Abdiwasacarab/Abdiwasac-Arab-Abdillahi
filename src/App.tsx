import { useState } from 'react';
import { SpouseForm } from './components/SpouseForm';
import { CompatibilityDashboard } from './components/CompatibilityDashboard';
import { createSyntheticProfile, calculateCompatibility } from './lib/engine';
import { IndividualProfile, CompatibilityResult, EducationLevel, EmploymentStatus, IncomeCategory } from './types';
import { Heart, Sparkles, LayoutDashboard, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialProfile = (name: string): IndividualProfile => ({
  name: '',
  gender: name === 'Person A' ? 0 : 1,
  age: 25,
  ageAtMarriage: 25,
  education: EducationLevel.Secondary,
  employment: EmploymentStatus.Employed,
  income: IncomeCategory.Middle,
  clanName: '',
  autonomy: 3,
  parentalInfluence: 3,
  clanApproval: 3,
});

export default function App() {
  const [personA, setPersonA] = useState<IndividualProfile>(initialProfile('Person A'));
  const [personB, setPersonB] = useState<IndividualProfile>(initialProfile('Person B'));
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      const syntheticProfile = createSyntheticProfile(personA, personB);
      const compatibility = calculateCompatibility(syntheticProfile, personA, personB);
      setResult(compatibility);
      setIsCalculating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setPersonA(initialProfile('Person A'));
    setPersonB(initialProfile('Person B'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-lg tracking-tight">MaritalCompatibility</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Research Basis</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Methodology</a>
            <a href="#" className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg">Hargeisa Context</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                  Predicting Marital Stability in <span className="text-indigo-600">Somaliland</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  A data-driven decision-support tool based on MSc research in Hargeisa. 
                  Understand compatibility through the lens of socio-cultural and economic factors.
                </p>
              </div>

              {/* Forms Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-2">
                    <Sparkles className="text-indigo-500" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">First Individual</span>
                  </div>
                  <SpouseForm 
                    title="Profile A" 
                    data={personA} 
                    onChange={setPersonA} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-2">
                    <Sparkles className="text-indigo-500" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Second Individual</span>
                  </div>
                  <SpouseForm 
                    title="Profile B" 
                    data={personB} 
                    onChange={setPersonB} 
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col items-center gap-4 pt-8">
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="group relative px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-3">
                      <RefreshCw className="animate-spin" size={20} />
                      Analyzing Dynamics...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      Calculate Compatibility
                      <LayoutDashboard size={20} className="group-hover:rotate-12 transition-transform" />
                    </span>
                  )}
                </button>
                <p className="text-xs text-slate-400 italic text-center max-w-md">
                  By clicking, you process individual traits through a Gradient Boosting model 
                  trained on Hargeisa marital outcome data.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900">Assessment Results</h2>
                <p className="text-slate-500 mt-2">Based on the profiles of {personA.name || 'Person A'} and {personB.name || 'Person B'}</p>
              </div>
              <CompatibilityDashboard result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-white">
                <Heart size={12} fill="currentColor" />
              </div>
              <span className="font-bold text-sm">MaritalCompatibility</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Implementation of the MSc Thesis: "Application of Machine Learning Algorithms in Predicting Divorce and Recommending an Appropriate Spouse in Hargeisa, Somaliland" (2026).
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Research Team</h4>
            <p className="text-xs text-slate-600">Abdiwasac Arab Abdillahi</p>
            <p className="text-xs text-slate-600">Haramaya University</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">Key Findings</h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li>• Cultural factors account for 53.2% of predictive power</li>
              <li>• Autonomy is the strongest predictor of stability</li>
              <li>• Gradient Boosting achieved 90% accuracy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
