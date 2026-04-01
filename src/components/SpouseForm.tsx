import React from 'react';
import { 
  IndividualProfile, 
  EducationLevel, 
  EmploymentStatus, 
  IncomeCategory 
} from '../types';
import { User, Briefcase, GraduationCap, Users, ShieldCheck, Heart } from 'lucide-react';

interface SpouseFormProps {
  title: string;
  data: IndividualProfile;
  onChange: (data: IndividualProfile) => void;
}

export const SpouseForm: React.FC<SpouseFormProps> = ({ title, data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === 'name' || name === 'clanName' ? value : Number(value)
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          <User size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Clan Family Name</label>
            <input
              type="text"
              name="clanName"
              value={data.clanName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Isaaq, Darod, etc."
            />
          </div>
        </div>

        {/* Socio-Economic */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
              <GraduationCap size={16} /> Education Level
            </label>
            <select
              name="education"
              value={data.education}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value={EducationLevel.NoFormal}>No Formal Schooling</option>
              <option value={EducationLevel.Primary}>Primary School</option>
              <option value={EducationLevel.Secondary}>Secondary School</option>
              <option value={EducationLevel.Diploma}>Diploma</option>
              <option value={EducationLevel.University}>University Degree</option>
              <option value={EducationLevel.Postgraduate}>Postgraduate Degree</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Briefcase size={16} /> Employment
              </label>
              <select
                name="employment"
                value={data.employment}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value={EmploymentStatus.Employed}>Employed</option>
                <option value={EmploymentStatus.SelfEmployed}>Self-Employed</option>
                <option value={EmploymentStatus.Unemployed}>Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Income Level</label>
              <select
                name="income"
                value={data.income}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value={IncomeCategory.Low}>Low (&lt;$200)</option>
                <option value={IncomeCategory.Middle}>Middle ($200-$500)</option>
                <option value={IncomeCategory.High}>High (&gt;$500)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Expected Age at Marriage</label>
            <input
              type="number"
              name="ageAtMarriage"
              value={data.ageAtMarriage}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cultural Factors */}
      <div className="pt-4 border-t border-slate-50">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Cultural Dynamics (Scale 1-5)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
              <Heart size={16} className="text-pink-500" /> Choice Autonomy
            </label>
            <p className="text-xs text-slate-500 mb-2">I choose my spouse primarily through my own preference.</p>
            <input
              type="range"
              name="autonomy"
              min="1"
              max="5"
              value={data.autonomy}
              onChange={handleChange}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 px-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
              <Users size={16} className="text-blue-500" /> Parental Influence
            </label>
            <p className="text-xs text-slate-500 mb-2">My parents/elders have the final say in selecting my spouse.</p>
            <input
              type="range"
              name="parentalInfluence"
              min="1"
              max="5"
              value={data.parentalInfluence}
              onChange={handleChange}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 px-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" /> Clan Approval
            </label>
            <p className="text-xs text-slate-500 mb-2">Approval from specific clan elders is essential.</p>
            <input
              type="range"
              name="clanApproval"
              min="1"
              max="5"
              value={data.clanApproval}
              onChange={handleChange}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 px-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
