import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sheet Editor | LinkedUpp',
  description: 'Create and edit your contact sheets',
  openGraph: {
    title: 'Sheet Editor | LinkedUpp',
    description: 'Create and edit your contact sheets',
    type: 'website',
  },
};

export default function SheetEditorPage() {
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
            <Link href="/console/sheetmanager" className="flex items-center gap-2 text-foreground/80 hover:text-foreground p-2 rounded-md">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">
              <span className="text-[hsl(var(--cyan))]">Sheet</span> Editor
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-10 flex-1">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Create New Sheet
          </h2>
          <p className="text-muted-foreground">
            Enter your sheet details below. You'll be able to add contacts in the next step.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1e293b] rounded-xl border border-white/10 p-6">
            <form>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="sheet-name" className="block text-sm font-medium">
                    Sheet Name
                  </label>
                  <input
                    type="text"
                    id="sheet-name"
                    className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cyan))]"
                    placeholder="Enter a name for your sheet"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="sheet-description" className="block text-sm font-medium">
                    Description (Optional)
                  </label>
                  <textarea
                    id="sheet-description"
                    rows={3}
                    className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cyan))]"
                    placeholder="Add a description for your sheet"
                  ></textarea>
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Link href="/console/sheetmanager" className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/5">
                    Cancel
                  </Link>
                  <Link href="/console/sheet-editor/contacts" className="px-4 py-2 rounded-md bg-[hsl(var(--cyan))/20] text-[hsl(var(--cyan))] border border-[hsl(var(--cyan))/30] hover:bg-[hsl(var(--cyan))/30]">
                    Continue
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 