'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefGeneratorForm } from './brief-generator-form';
import { ExpertiseGeneratorForm } from './expertise-generator-form';
import { ChatForm } from './chat-form';

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
      <TabsList className="flex flex-col h-auto w-1/4 p-4 border-r bg-transparent rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="w-full justify-start">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-3/4 p-4">
        <TabsContent value={tabs[0]} className="mt-0 h-full">
          <ChatForm />
        </TabsContent>
        <TabsContent value={tabs[1]} className="mt-0">
          <BriefGeneratorForm />
        </TabsContent>
        <TabsContent value={tabs[2]} className="mt-0">
          <ExpertiseGeneratorForm />
        </TabsContent>
        <TabsContent value={tabs[3]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[3]}</h2>
          <p>Content for {tabs[3]}</p>
        </TabsContent>
        <TabsContent value={tabs[4]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[4]}</h2>
          <p>Content for {tabs[4]}</p>
        </TabsContent>
        <TabsContent value={tabs[5]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[5]}</h2>
          <p>Content for {tabs[5]}</p>
        </TabsContent>
        <TabsContent value={tabs[6]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[6]}</h2>
          <p>Content for {tabs[6]}</p>
        </TabsContent>
        <TabsContent value={tabs[7]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[7]}</h2>
          <p>Content for {tabs[7]}</p>
        </TabsContent>
        <TabsContent value={tabs[8]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[8]}</h2>
          <p>Content for {tabs[8]}</p>
        </TabsContent>
        <TabsContent value={tabs[9]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[9]}</h2>
          <p>Content for {tabs[9]}</p>
        </TabsContent>
        <TabsContent value={tabs[10]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[10]}</h2>
          <p>Content for {tabs[10]}</p>
        </TabsContent>
        <TabsContent value={tabs[11]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[11]}</h2>
          <p>Content for {tabs[11]}</p>
        </TabsContent>
      </div>
    </Tabs>
  );
}
