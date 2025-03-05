'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface ScrollObserverProps {
  children: ReactNode;  // Accept JSX elements instead of functions
  threshold?: number;
}

export function ScrollObserver({ 
  children, 
  threshold = 20 
}: ScrollObserverProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, threshold]);

  // Pass the scrolled state as a data attribute
  return (
    <div data-scrolled={scrolled} className="contents">
      {children}
    </div>
  );
} 