'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';

interface AuthButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
}

export function AuthButton({ children, className, variant = 'default' }: AuthButtonProps) {
  const [showAuth, setShowAuth] = useState(false);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <>
      <Button 
        className={className}
        variant={variant}
        onClick={() => setShowAuth(true)}
      >
        {children}
      </Button>

      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Create your account</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Get started with LinkedUpp for free
            </DialogDescription>
          </DialogHeader>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                    brandButtonText: 'white',
                    inputBackground: 'white',
                    inputText: '#1f2937',
                    inputPlaceholder: '#9ca3af',
                    inputBorder: '#e5e7eb',
                    messageText: '#1f2937',
                    messageTextDanger: '#ef4444',
                    anchorTextColor: '#2563eb',
                    dividerBackground: '#e5e7eb',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white',
                input: 'rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900',
                label: 'text-gray-900 dark:text-white',
                message: 'text-gray-900 dark:text-white',
                anchor: 'text-blue-600 hover:text-blue-700',
              },
            }}
            view="sign_up"
            showLinks={true}
            providers={['google']}
            redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
          />
        </DialogContent>
      </Dialog>
    </>
  );
} 