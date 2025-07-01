'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePerformanceSuggestions, type PerformanceOptimizerOutput } from '@/ai/flows/performance-optimizer';
import { PerformanceOptimizerInputSchema, type PerformanceOptimizerInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Zap, GaugeCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function PerformanceOptimizerForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<PerformanceOptimizerOutput | null>(null);

  const form = useForm<PerformanceOptimizerInput>({
    resolver: zodResolver(PerformanceOptimizerInputSchema),
    defaultValues: {
      pageContent: '',
    },
  });

  const onSubmit = (values: PerformanceOptimizerInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generatePerformanceSuggestions(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Optimizer</CardTitle>
          <CardDescription>Paste your page's HTML to get AI-powered performance recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pageContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page HTML Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="<html>...</html>" {...field} className="min-h-[300px] font-mono text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Zap className="mr-2" />
                {isPending ? 'Analyzing...' : 'Analyze Performance'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Performance Report</h3>
        {isPending && <PerformanceReportSkeleton />}
        {result && <GeneratedPerformanceReport result={result} />}
        {!isPending && !result && (
          <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
            <div className="text-center text-muted-foreground p-8">
              <GaugeCircle className="mx-auto h-12 w-12 mb-4" />
              <p>Your performance report will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function PerformanceReportSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

const ImpactDetails = {
    High: { icon: AlertTriangle, color: "text-destructive", badge: "destructive" },
    Medium: { icon: Info, color: "text-primary", badge: "secondary" },
    Low: { icon: CheckCircle, color: "text-muted-foreground", badge: "outline" }
} as const;


function GeneratedPerformanceReport({ result }: { result: PerformanceOptimizerOutput }) {
    const getScoreColor = (score: number) => {
        if (score < 50) return 'bg-destructive';
        if (score < 90) return 'bg-secondary';
        return 'bg-primary';
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Performance Score</span>
                    <Badge className={cn("text-lg", getScoreColor(result.overallScore))}>{result.overallScore} / 100</Badge>
                </CardTitle>
                 <div className="space-y-2 pt-2">
                    <Progress value={result.overallScore} className={cn("[&>div]:transition-all", getScoreColor(result.overallScore))} />
                    <p className="text-sm text-muted-foreground">An estimated score based on the provided HTML.</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <h4 className="font-semibold text-lg">Suggestions</h4>
                {result.suggestions.length === 0 && <p className="text-muted-foreground">No specific suggestions. Looks good!</p>}
                <div className="space-y-4">
                    {result.suggestions.map((item, index) => {
                        const details = ImpactDetails[item.impact];
                        const Icon = details.icon;
                        return (
                            <Card key={index} className="bg-secondary/50">
                                <CardHeader className="p-4 flex flex-row items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Icon className={cn("h-5 w-5 mt-1 flex-shrink-0", details.color)} />
                                        <div>
                                            <CardTitle className="text-base">{item.suggestion}</CardTitle>
                                            <CardDescription className="text-xs">{item.category}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant={details.badge as any}>{item.impact} Impact</Badge>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 pl-12">
                                     <p className="text-muted-foreground text-sm">{item.explanation}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
