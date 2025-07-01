'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AIToolsPage() {
  const tabs = [
    'AI-powered chat',
    'AI Powered Brief',
    'AI Expertise',
    'AI Content Generator',
    'AI Color Palette Generator',
    'AI SEO Optimizer',
    'AI Layout Suggestions',
    'AI Competitor Analysis',
    'AI Performance Optimizer',
    'AI Image Optimizer',
    'AI Accessibility Checker',
    'AI Code Generator',
  ];

  return (
    <Tabs defaultValue={tabs[0]} orientation="vertical" className="flex min-h-screen">
      <TabsList className="flex flex-col h-full w-1/4 p-4 border-r bg-transparent rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="w-full justify-start">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-3/4 p-4">
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <h2 className="text-2xl font-bold mb-4">{tab}</h2>
            <p>Content for {tab}</p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
