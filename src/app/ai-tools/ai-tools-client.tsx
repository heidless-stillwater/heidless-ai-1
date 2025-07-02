"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderTool } from '@/components/ai/placeholder';
import { ExpenseCategorizer } from '@/components/ai/expense-categorizer';
import { Building, UtensilsCrossed, HeartPulse, Dumbbell, UserCheck } from 'lucide-react';

const webConsultancyTools = [
    'AI-powered chat', 'AI Powered Brief', 'AI Expertise', 'AI Content Generator', 'AI Color Palette Generator', 'AI SEO Optimizer', 'AI Layout Suggestions', 'AI Competitor Analysis', 'AI Performance Optimizer', 'AI Image Optimizer', 'AI Accessibility Checker', 'AI Code Generator'
];
const accountancyTools = [
    'ChatBot', 'Expense Categorization', 'AI Financial Reports', 'Client Q&A', 'Tax Compliance', 'Invoice Processing', 'Cash Flow Forecast', 'Anomaly Detection', 'Predictive Analysis'
];
const fastFoodTools = [
    '24/7 Customer Chatbot', 'Customer Service', 'Order Management', 'Special Recommender', 'Personalized Recommendations', 'Menu Optimizer', 'Marketing Assistant', 'Review Analyzer', 'Inventory Management', 'Order Prediction', 'Customer Sentiment Analysis', 'Drive-Thru Optimization', 'Automated Quality Control', 'Voice Order Taking', 'Predictive Maintenance', 'Dynamic Pricing', 'Waste Reduction Management', 'Employee Scheduling Optimization'
];
const dentalTools = [
    'Diagnostic Assistance', 'Automated Appointment Scheduling', 'Patient Communication Bots', 'Predictive Maintenance for Equipment', 'Insurance Claim Processing', 'Voice-Activated Charting', 'Patient Risk Assessment', 'Supply Inventory Management', 'Marketing Personalization'
];
const personalTrainerTools = ['AI-powered chat', 'AI Powered Brief'];
const lifeCoachTools = ['AI-powered chat', 'AI Powered Brief'];


export function AiToolsClient() {
    const sectionRefs = {
        'web-consultancy': useRef<HTMLDivElement>(null),
        'accountancy': useRef<HTMLDivElement>(null),
        'fast-food-shop': useRef<HTMLDivElement>(null),
        'dental-practice': useRef<HTMLDivElement>(null),
        'personal-trainer': useRef<HTMLDivElement>(null),
        'life-coach': useRef<HTMLDivElement>(null),
    };

    const scrollToSection = (id: keyof typeof sectionRefs) => {
        sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <header className="mb-12">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-4">AI Tools</h1>
                <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl text-center">
                    Explore our suite of AI-powered tools, tailored for various industries to enhance efficiency, engagement, and growth. Each tool is designed to integrate seamlessly into your workflow.
                </p>
            </header>

            <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-2 max-w-[calc(100%-100px)]">
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('web-consultancy')}>Web Consultancy</Button>
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('fast-food-shop')}>Fast Food Shop</Button>
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('dental-practice')}>Dental Practice</Button>
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('accountancy')}>Accountancy</Button>
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('personal-trainer')}>Personal Trainer</Button>
                    <Button variant="outline" className="px-3" onClick={() => scrollToSection('life-coach')}>Life Coach</Button>
                </div>
            </div>

            <div id="web-consultancy" ref={sectionRefs['web-consultancy']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Building className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Web Consultancy</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={webConsultancyTools[0]}>
                            <TabsList className="flex-wrap h-auto justify-start mb-[10px]">
                                {webConsultancyTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                             {webConsultancyTools.map(tool => <TabsContent key={tool} value={tool}><PlaceholderTool toolName={tool} /></TabsContent>)}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            
            <div id="accountancy" ref={sectionRefs['accountancy']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Building className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Accountancy</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="Expense Categorization">
                            <TabsList className="flex-wrap h-auto justify-start mb-[10px] max-w-full">
                                {accountancyTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                             {accountancyTools.map(tool => 
                                <TabsContent key={tool} value={tool}>
                                    {tool === 'Expense Categorization' ? <ExpenseCategorizer /> : <PlaceholderTool toolName={tool} />}
                                </TabsContent>
                             )}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            
            <div id="fast-food-shop" ref={sectionRefs['fast-food-shop']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <UtensilsCrossed className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Fast Food Shop</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={fastFoodTools[0]}>
                            <TabsList className="flex-wrap h-auto justify-start mb-[20px] max-w-[calc(100%-10px)]">
                                {fastFoodTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                            {fastFoodTools.map(tool => <TabsContent key={tool} value={tool}><PlaceholderTool toolName={tool} /></TabsContent>)}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div id="dental-practice" ref={sectionRefs['dental-practice']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <HeartPulse className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Dental Practice</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={dentalTools[0]}>
                            <TabsList className="flex-wrap h-auto justify-start mb-[10px]">
                                {dentalTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                            {dentalTools.map(tool => <TabsContent key={tool} value={tool}><PlaceholderTool toolName={tool} /></TabsContent>)}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div id="personal-trainer" ref={sectionRefs['personal-trainer']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Dumbbell className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Personal Trainer</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={personalTrainerTools[0]}>
                            <TabsList className="flex-wrap h-auto justify-start mb-[10px] max-w-[calc(100%-100px)]">
                                {personalTrainerTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                            {personalTrainerTools.map(tool => <TabsContent key={tool} value={tool}><PlaceholderTool toolName={tool} /></TabsContent>)}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div id="life-coach" ref={sectionRefs['life-coach']} className="mb-20 scroll-mt-20">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <UserCheck className="w-8 h-8 text-primary" />
                            <CardTitle className="text-3xl font-headline">Life Coach</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={lifeCoachTools[0]}>
                            <TabsList className="flex-wrap h-auto justify-start mb-[20px] max-w-[calc(100%-100px)]">
                                {lifeCoachTools.map(tool => <TabsTrigger key={tool} value={tool}>{tool}</TabsTrigger>)}
                            </TabsList>
                            {lifeCoachTools.map(tool => <TabsContent key={tool} value={tool}><PlaceholderTool toolName={tool} /></TabsContent>)}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
