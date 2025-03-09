import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sheet Manager | LinkedUpp',
  description: 'Create, import, and manage your contact sheets for email campaigns',
  openGraph: {
    title: 'Sheet Manager | LinkedUpp',
    description: 'Create, import, and manage your contact sheets for email campaigns',
    type: 'website',
  },
};

export default function SheetManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 