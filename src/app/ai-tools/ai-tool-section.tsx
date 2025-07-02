"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ToolContent } from './tool-content';

const sections = [
  { 
    id: 'web-consultancy', 
    name: 'Web Consultancy', 
    tools: [
      { id: 'ai-powered-chat', name: 'AI-powered chat' },
      { id: 'ai-powered-brief', name: 'AI Powered Brief' },
      { id: 'ai-expertise', name: 'AI Expertise' },
      { id: 'ai-content-generator', name: 'AI Content Generator' },
      { id: 'ai-color-palette-generator', name: 'AI Color Palette Generator' },
      { id: 'ai-seo-optimizer', name: 'AI SEO Optimizer' },
      { id: 'ai-layout-suggestions', name: 'AI Layout Suggestions' },
      { id: 'ai-competitor-analysis', name: 'AI Competitor Analysis' },
      { id: 'ai-performance-optimizer', name: 'AI Performance Optimizer' },
      { id: 'ai-image-optimizer', name: 'AI Image Optimizer' },
      { id: 'ai-accessibility-checker', name: 'AI Accessibility Checker' },
      { id: 'ai-code-generator', name: 'AI Code Generator' },
    ], 
    defaultTab: 'ai-powered-chat', 
    gap: 'mb-2.5' // 10px
  },
  { 
    id: 'accountancy', 
    name: 'Accountancy', 
    tools: [
      { id: 'chatbot', name: 'ChatBot' },
      { id: 'expense-categorization', name: 'Expense Categorization', component: 'ExpenseCategorization' },
      { id: 'ai-financial-reports', name: 'AI Financial Reports' },
      { id: 'client-qa', name: 'Client Q&A' },
      { id: 'tax-compliance', name: 'Tax Compliance' },
      { id: 'invoice-processing', name: 'Invoice Processing' },
      { id: 'cash-flow-forecast', name: 'Cash Flow Forecast' },
      { id: 'anomaly-detection', name: 'Anomaly Detection' },
      { id: 'predictive-analysis', name: 'Predictive Analysis' },
    ], 
    defaultTab: 'expense-categorization', 
    gap: 'mb-2.5' // 10px
  },
  { 
    id: 'fast-food-shop', 
    name: 'Fast Food Shop', 
    tools: [
      { id: 'recommendations-ai', name: 'Recommendatons AI' },
      { id: 'special-recommender-ai', name: 'Special Recommender AI' },
      { id: 'menu-optimizer-ai', name: 'Menu Optimizer AI' },
      { id: '24-7-customer-chatbot-ai', name: '24/7 Customer Chatbot AI' },
      { id: 'marketing-assistant-ai', name: 'Marketing Assistant AI' },
      { id: 'review-analyzer-ai', name: 'Review Analyzer AI' },
      { id: 'inventory-management-ai', name: 'Inventory Management AI' },
    ], 
    defaultTab: 'recommendations-ai', 
    gap: 'mb-5' // 20px
  },
  { 
    id: 'dental-practice', 
    name: 'Dental Practice', 
    tools: [
      { id: 'ai-powered-chat', name: 'AI-powered chat' },
      { id: 'ai-powered-brief', name: 'AI Powered Brief' },
    ], 
    defaultTab: 'ai-powered-chat', 
    gap: 'mb-2.5' // 10px
  },
  { 
    id: 'personal-trainer', 
    name: 'Personal Trainer', 
    tools: [
      { id: 'ai-powered-chat', name: 'AI-powered chat' },
      { id: 'ai-powered-brief', name: 'AI Powered Brief' },
    ], 
    defaultTab: 'ai-powered-chat', 
    gap: 'mb-2.5' // 10px
  },
  { 
    id: 'life-coach', 
    name: 'Life Coach', 
    tools: [
      { id: 'ai-powered-chat', name: 'AI-powered chat' },
      { id: 'ai-powered-brief', name: 'AI Powered Brief' },
    ], 
    defaultTab: 'ai-powered-chat', 
    gap: 'mb-5' // 20px
  },
];

const topButtons = [
  { name: 'Web Consultancy', href: '#web-consultancy' },
  { name: 'Fast Food Shop', href: '#fast-food-shop' },
  { name: 'Dental Practice', href: '#dental-practice' },
];

export function AiToolSection() {
  return (
    <>
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {topButtons.map(button => (
          <Button key={button.name} asChild variant="outline" className="px-[5px]">
            <a href={button.href}>{button.name}</a>
          </Button>
        ))}
      </div>

      <div className="space-y-16">
        {sections.map(section => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-3xl font-headline font-bold mb-6 text-center">{section.name}</h2>
            <ToolContent 
              tools={section.tools} 
              defaultTab={section.defaultTab} 
              gapClass={section.gap} 
            />
          </section>
        ))}
      </div>
    </>
  );
}
