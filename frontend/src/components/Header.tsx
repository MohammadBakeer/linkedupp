import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollObserver } from '@/components/ui/ScrollObserver';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <ScrollObserver>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 backdrop-blur-md",
          "[data-scrolled=true]_&:bg-white/80 [data-scrolled=true]_&:shadow-sm",
          "[data-scrolled=false]_&:bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="LinkedUpp Home">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 text-blue-600"
              aria-hidden="true"
            >
              <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className="text-xl font-semibold">LinkedUpp</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Results
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" passHref>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900"
                aria-label="Log in to your account"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2"
                aria-label="Sign up for an account"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </ScrollObserver>
  );
}