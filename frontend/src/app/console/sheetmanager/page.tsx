import { Metadata } from 'next';
import { Plus, FileSpreadsheet, Check, Upload, ArrowLeft, Edit, Pencil } from 'lucide-react';
import Link from 'next/link';
import { SheetImportDialog } from '@/components/SheetImportDialog';
import SheetImportButton from '@/components/SheetImportButton';

export const metadata: Metadata = {
  title: 'Sheet Manager | LinkedUpp',
  description: 'Create, import, and manage your contact sheets for email campaigns',
  openGraph: {
    title: 'Sheet Manager | LinkedUpp',
    description: 'Create, import, and manage your contact sheets for email campaigns',
    type: 'website',
  },
};

// This is a server component
export default function SheetManager() {
  return (
    <div className="min-h-screen bg-[#020817] flex flex-col">
      {/* Gradient blurs for background effect */}
      <div className="gradient-blur gradient-blur-purple absolute top-20 left-20 opacity-70"></div>
      <div className="gradient-blur gradient-blur-cyan absolute bottom-20 right-20 opacity-70"></div>
      <div className="gradient-blur gradient-blur-pink absolute top-1/2 left-1/3 opacity-50"></div>

      {/* Top navigation bar */}
      <header className="border-b border-white/10 backdrop-blur-md bg-[#020817] sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/console" className="flex items-center gap-2 text-foreground/80 hover:text-foreground p-2 rounded-md">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">
              <span className="text-[hsl(var(--purple))]">Sheet</span> Manager
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-10 flex-1">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Your Sheets
          </h2>
          <p className="text-muted-foreground">
            Create, import, or manage your contact sheets here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* "Add Sheet" card */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1e293b] p-6 hover:bg-[#1e293b]/80 transition-all">
            <div className="flex flex-col h-full">
              <h3 className="mb-4 text-xl font-semibold text-white">Add New Sheet</h3>
              <div className="flex flex-col gap-4 mt-4">
                <Link href="/console/sheet-editor" className="flex justify-between items-center px-4 py-2 rounded-md bg-[hsl(var(--cyan))/20] hover:bg-[hsl(var(--cyan))/30] text-[hsl(var(--cyan))] border border-[hsl(var(--cyan))/30]">
                  Create New Sheet
                  <Plus className="h-4 w-4 ml-2" />
                </Link>
                <SheetImportButton />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-lg mx-auto mt-16 text-center">
          <h3 className="text-xl font-semibold text-[hsl(var(--cyan))]">How It Works</h3>
          <p className="text-muted-foreground">
            You can create up to 3 contact sheets. Select one sheet to be active at a time. 
            The active sheet will be used for your email campaigns.
          </p>
        </div>
      </main>
    </div>
  );
} 