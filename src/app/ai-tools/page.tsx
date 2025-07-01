'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefGeneratorForm } from './brief-generator-form';
import { ExpertiseGeneratorForm } from './expertise-generator-form';
import { ChatForm } from './chat-form';
import { ContentGeneratorForm } from './content-generator-form';
import { ColorPaletteGeneratorForm } from './color-palette-generator-form';
import { SeoOptimizerForm } from './seo-optimizer-form';
import { LayoutSuggestionForm } from './layout-suggestion-form';
import { CompetitorAnalysisForm } from './competitor-analysis-form';
import { ImageOptimizerForm } from './image-optimizer-form';
import { PerformanceOptimizerForm } from './performance-optimizer-form';
import { AccessibilityCheckerForm } from './accessibility-checker-form';

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
          <ContentGeneratorForm />
        </TabsContent>
        <TabsContent value={tabs[4]} className="mt-0">
          <ColorPaletteGeneratorForm />
        </TabsContent>
        <TabsContent value={tabs[5]} className="mt-0">
          <SeoOptimizerForm />
        </TabsContent>
        <TabsContent value={tabs[6]} className="mt-0">
          <LayoutSuggestionForm />
        </TabsContent>
        <TabsContent value={tabs[7]} className="mt-0">
          <CompetitorAnalysisForm />
        </TabsContent>
        <TabsContent value={tabs[8]} className="mt-0">
          <PerformanceOptimizerForm />
        </TabsContent>
        <TabsContent value={tabs[9]} className="mt-0">
          <ImageOptimizerForm />
        </TabsContent>
        <TabsContent value={tabs[10]} className="mt-0">
          <AccessibilityCheckerForm />
        </TabsContent>
        <TabsContent value={tabs[11]} className="mt-0">
          <h2 className="text-2xl font-bold mb-4">{tabs[11]}</h2>
          <p>Content for {tabs[11]}</p>
        </TabsContent>
      </div>
    </Tabs>
  );
}
