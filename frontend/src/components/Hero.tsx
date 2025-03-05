import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden"
      id="hero"
      aria-label="Hero Section"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge className="px-4 py-1.5 text-xs font-semibold" aria-label="Marketing tagline">
            Stop Sending Applications Into The Void
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center max-w-3xl mx-auto">
            AI Cold Outreach for Students That Gets <span className="text-blue-600">Responses</span>
          </h1>
          
          <p className="text-gray-500 max-w-2xl text-lg md:text-xl leading-relaxed text-center mx-auto">
            Generate personalized outreach messages to hiring managers, recruiters, and professionals. 
            Get internships and jobs by connecting with the right people.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-12 px-6"
              aria-label="Start for free"
            >
              Start for Free
              <span className="ml-1" aria-hidden="true">→</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-12 px-6 bg-white/50"
              aria-label="See how it works"
            >
              See How It Works
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-8 flex-wrap">
            <div className="flex items-center gap-1.5" aria-label="Email feature">
              <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium">Email</span>
            </div>
            <div className="flex items-center gap-1.5" aria-label="LinkedIn feature">
              <Linkedin className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium">LinkedIn</span>
            </div>
            <div className="flex items-center gap-1.5" aria-label="SMS feature">
              <MessageSquare className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium">SMS</span>
            </div>
            <div className="flex items-center gap-1.5" aria-label="Call script feature">
              <PhoneCall className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium">Call Script</span>
            </div>
          </div>
          
          <div className="mt-12 relative w-full max-w-4xl mx-auto">
            <div className="rounded-xl border bg-white/70 shadow-lg overflow-hidden">
              <div className="p-1 bg-gray-100/30">
                <div className="flex items-center gap-1 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">Email to: Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Engineering Manager at TechCorp</p>
                    </div>
                  </div>
                  <div className="bg-gray-100/30 p-4 rounded-lg text-left">
                    <p className="text-sm">
                      Subject: Computer Science Student Interested in Summer Internship Program
                    </p>
                    <div className="mt-2 text-sm space-y-2">
                      <p>Dear Ms. Johnson,</p>
                      <p>I hope this email finds you well. My name is Alex Chen, a junior Computer Science student at Stanford University. I recently came across TechCorp's innovative work on cloud infrastructure solutions and was particularly impressed by your team's recent deployment of containerized microservices that reduced latency by 40%.</p>
                      <p>With experience in full-stack development and a recent project involving similar technologies to those used at TechCorp (details in my attached resume), I'd love the opportunity to contribute to your team this summer...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}