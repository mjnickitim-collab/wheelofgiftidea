import React from 'react';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="bg-blobs" aria-hidden="true">
      {/* 5 signature floating blurred colorful circles */}
      <div
        className="blob w-96 h-96 -top-20 -left-24 bg-[#FF6B6B]"
        style={{ animationDelay: '0s', animationDuration: '18s' }}
      />
      <div
        className="blob w-80 h-80 top-10 right-16 bg-[#9B5DE5]"
        style={{ animationDelay: '2.5s', animationDuration: '16s' }}
      />
      <div
        className="blob w-72 h-72 top-36 left-1/3 bg-[#06D6A0]"
        style={{ animationDelay: '5s', animationDuration: '20s' }}
      />
      <div
        className="blob w-64 h-64 -top-12 left-2/3 bg-[#F72585]"
        style={{ animationDelay: '1.2s', animationDuration: '15s' }}
      />
      <div
        className="blob w-80 h-80 top-48 right-[-5%] bg-[#4CC9F0]"
        style={{ animationDelay: '3.8s', animationDuration: '19s' }}
      />
    </div>
  );
};
