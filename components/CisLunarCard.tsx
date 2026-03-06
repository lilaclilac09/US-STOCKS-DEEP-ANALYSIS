import React from 'react';
import { CisLunarCompany } from '../types';

interface CisLunarCardProps {
  company: CisLunarCompany;
}

const CisLunarCard: React.FC<CisLunarCardProps> = ({ company }) => {
  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return 'from-emerald-500/20 to-green-500/20 border-emerald-500/50';
      case 2:
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
      case 3:
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/50';
      default:
        return 'from-gray-500/20 to-gray-500/20 border-gray-500/50';
    }
  };

  const getTierBadgeColor = (tier: number) => {
    switch (tier) {
      case 1:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      case 2:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 3:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${getTierColor(company.tier)} border-2 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{company.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTierBadgeColor(company.tier)}`}>
              Tier {company.tier}: {company.tierName}
            </span>
            {company.segment && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-200 border border-slate-500/50">
                {company.segment}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-300 leading-relaxed mb-4">{company.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
          <div className="bg-black/20 p-3 rounded-lg">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Risk Profile</div>
            <div className="text-sm font-semibold text-white">{company.riskProfile}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-lg">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Technology Level</div>
            <div className="text-sm font-semibold text-white">{company.trl}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-lg sm:col-span-1">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Characteristics</div>
            <div className="text-sm font-semibold text-white">{company.characteristics}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CisLunarCard;
