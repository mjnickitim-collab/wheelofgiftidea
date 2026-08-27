import React from 'react';
import { FilterCriteria } from '../types';

interface FilterFormProps {
  filters: FilterCriteria;
  onChange: (key: keyof FilterCriteria, value: string) => void;
  onSubmit: () => void;
  isPulsing?: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onChange,
  onSubmit,
  isPulsing = false
}) => {
  return (
    <div
      id="filter-form-card"
      className={`bg-[#2C2149] border border-[#40335F] rounded-[18px] p-6 shadow-xl sticky top-24 transition-all duration-300 ${
        isPulsing ? 'form-pulse border-[#FF6B6B]' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎯</span>
        <h3 className="font-heading text-2xl font-bold text-white tracking-wide">
          Who are you shopping for?
        </h3>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        {/* Gender */}
        <div>
          <label
            htmlFor="filter-gender"
            className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5 ml-1"
          >
            Gender
          </label>
          <div className="relative">
            <select
              id="filter-gender"
              value={filters.gender}
              onChange={(e) => onChange('gender', e.target.value)}
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#9B5DE5] focus:ring-1 focus:ring-[#9B5DE5] transition-colors cursor-pointer appearance-none"
            >
              <option value="any">Anyone (All Genders)</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Age Group */}
        <div>
          <label
            htmlFor="filter-age"
            className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5 ml-1"
          >
            Age Group
          </label>
          <div className="relative">
            <select
              id="filter-age"
              value={filters.age}
              onChange={(e) => onChange('age', e.target.value)}
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#9B5DE5] focus:ring-1 focus:ring-[#9B5DE5] transition-colors cursor-pointer appearance-none"
            >
              <option value="any">Any Age</option>
              <option value="child">Child (0–12)</option>
              <option value="teen">Teen (13–19)</option>
              <option value="twenties">20s</option>
              <option value="thirties">30s</option>
              <option value="forties">40s</option>
              <option value="fifty_plus">50+</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Relationship */}
        <div>
          <label
            htmlFor="filter-relationship"
            className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5 ml-1"
          >
            Relationship
          </label>
          <div className="relative">
            <select
              id="filter-relationship"
              value={filters.relationship}
              onChange={(e) => onChange('relationship', e.target.value)}
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#9B5DE5] focus:ring-1 focus:ring-[#9B5DE5] transition-colors cursor-pointer appearance-none"
            >
              <option value="any">Anyone / Any Relationship</option>
              <option value="partner_spouse">Partner / Spouse</option>
              <option value="parent">Parent (Mom / Dad)</option>
              <option value="child">Child / Kids</option>
              <option value="friend">Friend / Bestie</option>
              <option value="colleague">Colleague / Coworker</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Occasion */}
        <div>
          <label
            htmlFor="filter-occasion"
            className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5 ml-1"
          >
            Occasion
          </label>
          <div className="relative">
            <select
              id="filter-occasion"
              value={filters.occasion}
              onChange={(e) => onChange('occasion', e.target.value)}
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#9B5DE5] focus:ring-1 focus:ring-[#9B5DE5] transition-colors cursor-pointer appearance-none"
            >
              <option value="any">Any Occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="graduation">Graduation</option>
              <option value="housewarming">Housewarming</option>
              <option value="christmas">Christmas / Holidays</option>
              <option value="parentsday">Mother&apos;s / Father&apos;s Day</option>
              <option value="teachersday">Teacher Appreciation</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="filter-budget"
            className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5 ml-1"
          >
            Budget Band
          </label>
          <div className="relative">
            <select
              id="filter-budget"
              value={filters.budget}
              onChange={(e) => onChange('budget', e.target.value)}
              className="w-full bg-[#1A132F] border border-[#40335F] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#9B5DE5] focus:ring-1 focus:ring-[#9B5DE5] transition-colors cursor-pointer appearance-none"
            >
              <option value="any">Any Budget</option>
              <option value="under10">Under $10 (Pocket-friendly)</option>
              <option value="10to30">$10 – $30 (Sweet spot)</option>
              <option value="30to50">$30 – $50 (Thoughtful upgrade)</option>
              <option value="50to100">$50 – $100 (Premium quality)</option>
              <option value="over100">Over $100 (Luxury / Special)</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="btn-build-wheel"
          className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] hover:from-[#ff5252] hover:to-[#e03a3a] text-white font-heading font-bold text-lg py-3.5 rounded-full mt-5 transition-all shadow-lg hover:shadow-[0_0_22px_rgba(255,107,107,0.5)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="text-xl">🎡</span>
          <span>Build My Wheel &amp; Spin!</span>
        </button>

        <p className="text-xs text-center text-slate-300/80 mt-2 font-medium">
          ✨ 1-Click: Filters matching gifts and spins the wheel immediately!
        </p>
      </form>
    </div>
  );
};
