import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export const metadata: Metadata = {
  title: 'LinkedUpp Console',
  description: 'Manage your connections and outreach campaigns from your LinkedUpp console.',
  openGraph: {
    title: 'LinkedUpp Console',
    description: 'Manage your connections and outreach campaigns from your LinkedUpp console.',
    type: 'website',
  },
};

export default function ConsolePage() {
  // Fetch name, email, avatar, 
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatarUrl: '',
    initials: 'SJ',
  };

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col">
      {/* Gradient blurs for background effect */}
      <div className="gradient-blur gradient-blur-green absolute top-20 left-20 opacity-70"></div>
      <div className="gradient-blur gradient-blur-cyan absolute bottom-20 right-20 opacity-70"></div>
      <div className="gradient-blur gradient-blur-pink absolute top-1/2 left-1/3 opacity-50"></div>

      {/* Reusable header component */}
      <AppHeader user={user} />

      {/* Main content */}
      <main className="container mx-auto py-10 flex-1">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--green))] to-[hsl(var(--cyan))]">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Manage your connections and outreach campaigns from your console.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Sheet Manager Card */}
          <div className="group card-glow glow-green relative overflow-hidden rounded-xl border border-white/10 bg-[#1e293b] p-6 hover:bg-[#1e293b]/80 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--green))/15] mb-4">
              <svg className="h-6 w-6 text-[hsl(var(--green))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Sheet Manager</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload and manage your contact sheets. Create targeted segments for your outreach campaigns.
            </p>
            <div className="mt-6">
              <Link href="/console/sheetmanager" className="flex w-full justify-center items-center px-4 py-2 rounded-md bg-[hsl(var(--green))/20] hover:bg-[hsl(var(--green))/30] text-[hsl(var(--green))] border border-[hsl(var(--green))/30]">
                Open Sheet Manager
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
          
          {/* Email Center Card */}
          <div className="group card-glow glow-cyan relative overflow-hidden rounded-xl border border-white/10 bg-[#1e293b] p-6 hover:bg-[#1e293b]/80 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--cyan))/15] mb-4">
              <svg className="h-6 w-6 text-[hsl(var(--cyan))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Email Center</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage your email campaigns. Track performance and optimize your outreach.
            </p>
            <div className="mt-6">
              <Link href="/console/email" className="flex w-full justify-center items-center px-4 py-2 rounded-md bg-[hsl(var(--cyan))/20] hover:bg-[hsl(var(--cyan))/30] text-[hsl(var(--cyan))] border border-[hsl(var(--cyan))/30]">
                Open Email Center
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats and activity section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick stats cards */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#1e293b] p-4 hover:bg-[#1e293b]/80 transition-all overflow-hidden relative">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Contacts</h4>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1e293b] p-4 hover:bg-[#1e293b]/80 transition-all overflow-hidden relative">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Emails Sent</h4>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1e293b] p-4 hover:bg-[#1e293b]/80 transition-all overflow-hidden relative">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Response Rate</h4>
              <p className="text-2xl font-bold">0%</p>
            </div>
          </div>

          {/* Quick actions card */}
          <div className="col-span-1 rounded-xl border border-white/10 bg-[#1e293b] p-4 hover:bg-[#1e293b]/80 transition-all">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Link href="/console/sheetmanager" className="flex items-center text-sm p-2 hover:bg-white/5 rounded-md">
                <ArrowRight className="h-4 w-4 mr-2 text-[hsl(var(--green))]" />
                <span>Upload new contacts</span>
              </Link>
              <Link href="/console/email" className="flex items-center text-sm p-2 hover:bg-white/5 rounded-md">
                <ArrowRight className="h-4 w-4 mr-2 text-[hsl(var(--cyan))]" />
                <span>Create email campaign</span>
              </Link>
              <Link href="/console/settings" className="flex items-center text-sm p-2 hover:bg-white/5 rounded-md">
                <ArrowRight className="h-4 w-4 mr-2 text-[hsl(var(--purple))]" />
                <span>Update profile</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 