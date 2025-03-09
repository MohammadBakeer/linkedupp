'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Settings, LogOut, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/Badge';  
import { useAuth } from '@/context/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  initials: string;
}

interface AppHeaderProps {
  user?: UserProfile;
}

export function AppHeader({ user }: AppHeaderProps) {
  const { signOut } = useAuth();
  
  // If no user is provided, use a default (for demo/development)
  const userProfile = user || {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatarUrl: '',
    initials: 'SJ',
  };

  const handleSignOut = async () => {
    await signOut();
    // Next.js will handle the redirect after sign out via middleware
  };

  return (
    <header className="border-b border-white/10 backdrop-blur-md bg-[#020817] sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between py-4 px-8">
        <div className="flex items-center gap-4 pl-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--green))] to-[hsl(var(--cyan))]">Linked</span>
              <span className="text-white">Upp</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <Button size="icon" variant="ghost" className="relative text-foreground/80 hover:text-foreground h-10 w-10">
            <Bell className="h-6 w-6" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-[hsl(var(--green))] text-white rounded-full p-0 flex items-center justify-center text-[10px]">3</Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 ring-2 ring-[hsl(var(--green))] ring-offset-2 ring-offset-background">
                  {/* Generic person avatar SVG */}
                  <svg
                    className="h-full w-full text-[hsl(var(--green))] bg-[hsl(var(--green))]/10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-secondary border-white/10">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-base font-medium leading-none">{userProfile.name}</p>
                  <p className="text-sm leading-none text-muted-foreground">{userProfile.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="hover:bg-white/5 text-base py-2">
                <User className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5 text-base py-2">
                <Settings className="mr-2 h-5 w-5" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5 text-base py-2">
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="text-[hsl(var(--pink))] hover:bg-white/5 text-base py-2"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 