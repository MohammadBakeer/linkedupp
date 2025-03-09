import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | LinkedUpp',
    default: 'Console | LinkedUpp',
  },
  description: 'Manage your connections and outreach campaigns from your LinkedUpp console.',
};

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is now handled by middleware
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
} 