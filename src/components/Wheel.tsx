import React, { useRef, useState, useEffect } from 'react';
import { Gift } from '../types';
import { PALETTE } from '../data/seedData';
import { pickWinningIndex } from '../utils/wheelLogic';

interface WheelProps {
  items: Gift[];
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (winningGift: Gift) => void;
  lastWinningId: string | null;
  spinTrigger?: number;
}

export const Wheel: React.FC<WheelProps> = ({
  items,
  isSpinning,
  onSpinStart,
  onSpinEnd,
  lastWinningId,
  spinTrigger
}) => {
  const currentRotationRef = useRef<number>(0);
  const [visualRotation, setVisualRotation] = useState<number>(0);
  const [wheelRadius, setWheelRadius] = useState<number>(180);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastHandledTriggerRef = useRef<number>(spinTrigger || 0);

  // Measure container width to dynamically scale translation radius
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // The center to emoji distance should be ~36-38% of container width
        setWheelRadius(Math.max(90, Math.floor(width * 0.355)));
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const N = items.length;
  const anglePerSlice = N > 0 ? 360 / N : 360;

  // Build Conic Gradient string
  const gradientStops = items.map((_, i) => {
    const color = PALETTE[i % PALETTE.length];
    const start = i * anglePerSlice;
    const end = (i + 1) * anglePerSlice;
    return `${color} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
  });

  const conicBackground =
    N > 0
      ? `conic-gradient(${gradientStops.join(', ')})`
      : '#2C2149';

  const handleSpinClick = () => {
    if (isSpinning || items.length === 0) return;

    onSpinStart();

    // 1. Pick winning index with anti-repeat
    const winIndex = pickWinningIndex(items, lastWinningId);
    const winningItem = items[winIndex];

    // 2. Math for rotation:
    const targetSliceMidAngle = winIndex * anglePerSlice + anglePerSlice / 2;
    const targetRelative = (360 - targetSliceMidAngle) % 360;
    const extraSpins = 6 * 360;
    const currentRot = currentRotationRef.current;
    const normalizedCurrent = currentRot % 360;
    const jitter = (Math.random() * (anglePerSlice * 0.6)) - (anglePerSlice * 0.3);

    let delta = extraSpins + (targetRelative - normalizedCurrent) + jitter;
    if (delta < extraSpins) {
      delta += 360;
    }

    const nextTotalRotation = currentRot + delta;
    currentRotationRef.current = nextTotalRotation;
    setVisualRotation(nextTotalRotation);

    // Transition time is 4.6 seconds
    setTimeout(() => {
      onSpinEnd(winningItem);
    }, 4600);
  };

  // Listen for programmatic external spin trigger (e.g. from "Build Wheel & Spin" button)
  useEffect(() => {
    if (spinTrigger && spinTrigger > (lastHandledTriggerRef.current || 0)) {
      lastHandledTriggerRef.current = spinTrigger;
      // Allow slight tick for items state to reconcile
      const timer = setTimeout(() => {
        handleSpinClick();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [spinTrigger, items]);

  return (
    <div id="wheel-section" className="flex flex-col items-center w-full">
      {/* Outer Wheel Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[480px] sm:max-w-[510px] aspect-square flex items-center justify-center select-none"
      >
        {/* Top Gold Pointer at 12 o'clock */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-30 drop-shadow-xl pointer-events-none">
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="#FFD166"
            className="filter drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22L2 2L22 2L12 22Z"
              fill="#FFD166"
              stroke="#40335F"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* The Rotating Wheel */}
        <div
          id="wheel-visual"
          className="w-full h-full rounded-full border-[7px] border-[#2C2149] shadow-2xl relative overflow-hidden bg-[#101530] wheel-transition"
          style={{
            transform: `rotate(${visualRotation}deg)`,
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px 3px rgba(155, 93, 229, 0.2)'
          }}
        >
          {/* Conic Gradient Slices */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: conicBackground }}
          />

          {/* Upright Emoji Badges */}
          <div className="absolute inset-0 pointer-events-none">
            {items.map((item, idx) => {
              const sliceMid = idx * anglePerSlice + anglePerSlice / 2;
              // outer rotate & translate
              const outerTransform = `rotate(${sliceMid - 90}deg) translateX(${wheelRadius}px)`;
              // inner counter-rotate to stay upright
              const innerTransform = `rotate(${-(sliceMid - 90)}deg)`;

              return (
                <div
                  key={item.id + '-' + idx}
                  className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
                  style={{ transform: outerTransform }}
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg border-2 border-[#2C2149]/20"
                    style={{ transform: innerTransform }}
                  >
                    <span>{item.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Hub SPIN Button with prominent visual affordance */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <div className="relative flex items-center justify-center">
            {/* Animated Radar Pulse Rings when Idle */}
            {!isSpinning && items.length > 0 && (
              <>
                <span className="absolute -inset-3.5 sm:-inset-4 rounded-full bg-[#FFD166]/30 animate-pulse pointer-events-none blur-sm" />
                <span className="absolute -inset-2.5 sm:-inset-3 rounded-full border-2 border-[#FFD166]/60 animate-ping pointer-events-none opacity-40 duration-1000" />
              </>
            )}

            {/* Tap cue banner floating right above button */}
            {!isSpinning && items.length > 0 && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#101530] text-[#FFD166] text-[10px] sm:text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full border border-[#FFD166] shadow-lg whitespace-nowrap animate-bounce flex items-center gap-1 pointer-events-none z-50">
                <span>👉</span>
                <span>TAP TO SPIN</span>
              </div>
            )}

            <button
              id="wheel-hub-button"
              onClick={handleSpinClick}
              disabled={isSpinning || items.length === 0}
              className={`pointer-events-auto relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FFE45E] via-[#FFD166] to-[#FF9F1C] text-[#101530] font-heading font-black text-2xl sm:text-3xl shadow-[0_0_25px_rgba(255,209,102,0.5),0_10px_25px_rgba(0,0,0,0.5)] border-[3.5px] border-white flex flex-col items-center justify-center leading-none transition-all duration-200 cursor-pointer ${
                isSpinning
                  ? 'opacity-90 grayscale-[20%] cursor-not-allowed scale-95'
                  : 'hover:scale-108 active:scale-95 hover:shadow-[0_0_35px_rgba(255,209,102,0.9)]'
              }`}
              title="Click or Tap to spin the Wheel of Gift Idea!"
              aria-label="Spin the wheel"
            >
              {isSpinning ? (
                <>
                  <span className="text-3xl animate-spin mb-1">🌀</span>
                  <span className="text-[11px] font-mono font-extrabold tracking-widest uppercase text-[#101530]">
                    SPINNING
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl sm:text-3xl filter drop-shadow mb-0.5 animate-pulse">🎁</span>
                  <span className="tracking-wide text-xl sm:text-2xl font-extrabold">SPIN!</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#101530]/80 mt-0.5">
                    CLICK HERE
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
