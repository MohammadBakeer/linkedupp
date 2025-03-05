import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LinkedUpp - AI-Powered Outreach for Students',
  description: 'Generate personalized outreach messages to connect with hiring managers, medical professionals, recruiters, and more.',
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
