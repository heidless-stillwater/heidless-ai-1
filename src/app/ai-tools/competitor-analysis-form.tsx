'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateCompetitorAnalysis, type CompetitorAnalysisOutput } from '@/ai/flows/competitor-analysis-generator';
import { CompetitorAnalysisInputSchema, type CompetitorAnalysisInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Wand2, ShieldCheck, ShieldX, Sparkles, Megaphone, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function CompetitorAnalysisForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<CompetitorAnalysisOutput | null>(null);

  const form = useForm<CompetitorAnalysisInput>({
    resolver: zodResolver(CompetitorAnalysisInputSchema),
    defaultValues: {
      competitorName: '',
      industry: '',
    },
  });

  const onSubmit = (values: CompetitorAnalysisInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateCompetitorAnalysis(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Competitor Analysis</CardTitle>
          <CardDescription>Enter a competitor's name and industry to get an AI-powered analysis of their strengths, weaknesses, and potential opportunities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="competitorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Mailchimp'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Email Marketing SaaS'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Analyzing...' : 'Analyze Competitor'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Analysis Report</h3>
        {isPending && <AnalysisSkeleton />}
        {result && <GeneratedAnalysis result={result} />}
        {!isPending && !result && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <Target className="mx-auto h-12 w-12 mb-4" />
                    <p>Your competitor analysis report will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function AnalysisSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/6" />
                </div>
            </CardContent>
        </Card>
    );
}


function GeneratedAnalysis({ result }: { result: CompetitorAnalysisOutput }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <AnalysisSection title="Strengths" items={result.strengths} icon={ShieldCheck} iconClass="text-primary" />
                <AnalysisSection title="Weaknesses" items={result.weaknesses} icon={ShieldX} iconClass="text-destructive" />
                <AnalysisSection title="Opportunities" items={result.opportunities} icon={Sparkles} iconClass="text-primary" />
                <AnalysisSection title="Key Marketing Channels" items={result.keyMarketingChannels} icon={Megaphone} iconClass="text-primary" />
            </CardContent>
        </Card>
    )
}

function AnalysisSection({ title, items, icon: Icon, iconClass }: { title: string, items: string[], icon: React.ElementType, iconClass: string }) {
    if (!items || items.length === 0) return null;

    return (
        <div>
            <h4 className="font-semibold mb-3 flex items-center">
                <Icon className={`h-5 w-5 mr-2 ${iconClass}`} />
                {title}
            </h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
}
