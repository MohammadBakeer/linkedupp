'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClientSideSupabaseClient } from '@/lib/supabase';

interface AuthButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
}

export function AuthButton({ children, className, variant = 'default' }: AuthButtonProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [view, setView] = useState<'sign_up' | 'sign_in'>('sign_up');
  const router = useRouter();
  
  const supabase = createClientSideSupabaseClient();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        console.log('Auth state changed:', event, session);
        
        // Close the auth modal
        setShowAuth(false);
        
        // Redirect to console page
        router.push('/console');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Sign up the user with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: fullName, // Store the full name in user metadata
          },
        }
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
        return;
      }

      // Check if the user already exists
      if (data.user && !data.user.identities?.length) {
        setMessage({ 
          type: 'error', 
          text: 'An account already exists with this email. Please sign in instead.' 
        });
        // Optionally switch to sign-in view
        setView('sign_in');
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Check your email for a confirmation link to complete your sign up.' 
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setView(view === 'sign_up' ? 'sign_in' : 'sign_up');
    setMessage(null);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Sign in with Supabase Auth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Sign out with Supabase Auth
      await supabase.auth.signOut();
      
      // Refresh the page to update UI
      router.refresh();
      
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        className={className}
        variant={variant}
        onClick={() => setShowAuth(true)}
      >
        {children}
      </Button>

      <Dialog open={showAuth} onOpenChange={(open) => {
        setShowAuth(open);
        if (!open) {
          setMessage(null);
          setEmail('');
          setPassword('');
          setFullName('');
        }
      }}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              {view === 'sign_up' ? 'Create your account' : 'Sign in to your account'}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {view === 'sign_up' 
                ? 'Get started with LinkedUpp for free' 
                : 'Welcome back! Enter your credentials to continue'}
            </DialogDescription>
          </DialogHeader>
          
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message.type === 'error' 
                ? 'bg-red-100 border border-red-300 text-red-700' 
                : 'bg-green-100 border border-green-300 text-green-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={view === 'sign_up' ? handleSignUp : handleSignIn} className="space-y-4">
            {view === 'sign_up' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={view === 'sign_up' ? 'Create a password' : 'Your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading 
                ? (view === 'sign_up' ? 'Signing up...' : 'Signing in...') 
                : (view === 'sign_up' ? 'Sign up' : 'Sign in')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={toggleView}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {view === 'sign_up'
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
          
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}