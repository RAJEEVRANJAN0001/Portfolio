'use client';

import React from 'react';

interface FallbackBackgroundProps {
  className?: string;
}

export default function FallbackBackground({ className = '' }: FallbackBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Simple gradient background as fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
