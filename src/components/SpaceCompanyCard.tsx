import React from 'react';
import { CisLunarCompany } from '../types';

interface SpaceCompanyCardProps {
  company: CisLunarCompany;
}

const getTierStyle = (tier: number) => {
  if (tier === 1) {
    return {
      accentText: 'text-emerald-600',
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200',
      badgeText: 'text-emerald-700'
    };
  }

  if (tier === 2) {
    return {
      accentText: 'text-blue-600',
      badgeBg: 'bg-blue-50',
      badgeBorder: 'border-blue-200',
      badgeText: 'text-blue-700'
    };
  }

  return {
    accentText: 'text-violet-600',
    badgeBg: 'bg-violet-50',
    badgeBorder: 'border-violet-200',
    badgeText: 'text-violet-700'
  };
};

const SpaceCompanyCard: React.FC<SpaceCompanyCardProps> = ({ company }) => {
  const style = getTierStyle(company.tier);

  return (
    <section className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
      <div className="bg-slate-900 px-6 py-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          {company.name} <span className="text-slate-400 font-light">-</span> {company.tierName}
        </h2>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <i className="fa-solid fa-rocket mr-2"></i> Cislunar Role
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {company.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <i className="fa-solid fa-satellite mr-2 text-indigo-500"></i> Segment & Positioning
            </h3>
            <ul className="space-y-2 text-slate-700 font-semibold">
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span>Primary Segment:</span>
                <span className="text-indigo-600 text-right max-w-[60%]">{company.segment || 'N/A'}</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 py-2">
                <span>Tier:</span>
                <span className={style.accentText}>Tier {company.tier}</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Technology Maturity:</span>
                <span className="text-indigo-600">{company.trl}</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <i className="fa-solid fa-gauge-high mr-2 text-emerald-500"></i> Risk & Execution Lens
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-500">Risk Profile:</span>
                <span className="font-bold">{company.riskProfile}</span>
              </li>
              <li className="flex flex-col border-t border-slate-200 mt-2 pt-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Investment Character</span>
                <span className="font-medium text-slate-600 text-[11px] leading-tight mt-1">{company.characteristics}</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <i className="fa-solid fa-bullhorn mr-2"></i> Program Signals
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">-</span>
              <span className="text-slate-700">Mapped under {company.tierName} based on execution maturity and contract readiness in the cis-lunar value chain.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">-</span>
              <span className="text-slate-700">Core exposure theme: {company.segment || 'Cislunar Infrastructure'}.</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-slate-100 pt-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Category</span>
              <span className="text-slate-500 text-sm">Cis-Lunar Market Map</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Coverage</span>
              <span className="text-slate-500 text-sm">Company Research Framework</span>
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-center px-6 py-4 rounded-xl border ${style.badgeBg} ${style.badgeBorder}`}>
          <span className="text-slate-600 font-semibold text-sm">Tier Classification</span>
          <div className={`text-xl font-black ${style.badgeText}`}>
            Tier {company.tier} <span className="text-xs font-normal">{company.trl}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceCompanyCard;
