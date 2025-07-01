'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateAccessibilityReport, type AccessibilityReportOutput } from '@/ai/flows/accessibility-checker';
import { AccessibilityCheckerInputSchema, type AccessibilityCheckerInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Accessibility, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function AccessibilityCheckerForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<AccessibilityReportOutput | null>(null);

  const form = useForm<AccessibilityCheckerInput>({
    resolver: zodResolver(AccessibilityCheckerInputSchema),
    defaultValues: {
      pageContent: '',
    },
  });

  const onSubmit = (values: AccessibilityCheckerInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateAccessibilityReport(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Accessibility Checker</CardTitle>
          <CardDescription>Paste your page's HTML to get an AI-powered accessibility report based on WCAG 2.1 guidelines.</CardDescription>
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
                <Accessibility className="mr-2" />
                {isPending ? 'Analyzing...' : 'Check Accessibility'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Accessibility Report</h3>
        {isPending && <AccessibilityReportSkeleton />}
        {result && <GeneratedAccessibilityReport result={result} />}
        {!isPending && !result && (
          <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
            <div className="text-center text-muted-foreground p-8">
              <Accessibility className="mx-auto h-12 w-12 mb-4" />
              <p>Your accessibility report will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function AccessibilityReportSkeleton() {
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

const SeverityDetails = {
    High: { icon: AlertTriangle, color: "text-destructive" },
    Medium: { icon: Info, color: "text-primary" },
    Low: { icon: CheckCircle, color: "text-muted-foreground" }
} as const;


function GeneratedAccessibilityReport({ result }: { result: AccessibilityReportOutput }) {
    const getScoreColor = (score: number) => {
        if (score < 50) return 'bg-destructive';
        if (score < 90) return 'bg-secondary';
        return 'bg-primary';
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Accessibility Score</span>
                    <Badge className={cn("text-lg", getScoreColor(result.overallScore))}>{result.overallScore} / 100</Badge>
                </CardTitle>
                 <div className="space-y-2 pt-2">
                    <Progress value={result.overallScore} className={cn("[&>div]:transition-all", getScoreColor(result.overallScore))} />
                    <p className="text-sm text-muted-foreground">{result.summary}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <h4 className="font-semibold text-lg">Identified Issues</h4>
                {result.issues.length === 0 && <p className="text-muted-foreground">Congratulations! No accessibility issues were found.</p>}
                <Accordion type="single" collapsible className="w-full">
                    {result.issues.map((item, index) => {
                        const details = SeverityDetails[item.severity];
                        const Icon = details.icon;
                        return (
                           <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-start gap-3 text-left">
                                        <Icon className={cn("h-5 w-5 mt-1 flex-shrink-0", details.color)} />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.issue}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={item.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs">{item.severity} Severity</Badge>
                                                <Badge variant="outline" className="text-xs">{item.wcagGuideline}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-12">
                                     <p className="text-muted-foreground">{item.recommendation}</p>
                                </AccordionContent>
                           </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
    )
}
