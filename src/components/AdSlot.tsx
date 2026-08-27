import React from 'react';
import { AdSettings } from '../types';

interface AdSlotProps {
  settings: AdSettings;
}

export const AdSlot: React.FC<AdSlotProps> = ({ settings }) => {
  if (!settings.enabled) {
    return null;
  }

  return (
    <div
      id="ad-slot-container"
      className="w-full max-w-4xl mx-auto my-8 border-2 border-dashed border-slate-600 rounded-xl p-4 bg-[#1A132F]/40 flex flex-col items-center justify-center text-center text-slate-400"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
        Advertisement
      </span>
      {settings.clientCode ? (
        <div
          className="w-full overflow-hidden text-xs font-mono text-slate-400"
          dangerouslySetInnerHTML={{ __html: settings.clientCode }}
        />
      ) : (
        <div className="text-sm font-mono text-slate-500 py-4">
          Google AdSense Responsive Unit (Placeholder Slot)
        </div>
      )}
    </div>
  );
};
