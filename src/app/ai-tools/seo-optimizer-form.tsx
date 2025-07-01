'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSeoSuggestions, type SeoOptimizerOutput } from '@/ai/flows/seo-optimizer';
import { SeoOptimizerInputSchema, type SeoOptimizerInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Search, Lightbulb, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export function SeoOptimizerForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<SeoOptimizerOutput | null>(null);

  const form = useForm<SeoOptimizerInput>({
    resolver: zodResolver(SeoOptimizerInputSchema),
    defaultValues: {
      pageContent: '',
    },
  });

  const onSubmit = (values: SeoOptimizerInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateSeoSuggestions(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI SEO Optimizer</CardTitle>
          <CardDescription>Paste your page's HTML content below to get SEO recommendations.</CardDescription>
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
                <Search className="mr-2" />
                {isPending ? 'Analyzing...' : 'Analyze SEO'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">SEO Report</h3>
        {isPending && <SeoReportSkeleton />}
        {result && <GeneratedSeoReport result={result} />}
        {!isPending && !result && (
          <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
            <div className="text-center text-muted-foreground p-8">
              <p>Your SEO report will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function SeoReportSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-28" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </CardContent>
        </Card>
    );
}

function GeneratedSeoReport({ result }: { result: SeoOptimizerOutput }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Analysis Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2 text-primary" /> Suggested Title</h4>
                    <p className="text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-muted">{result.suggestedTitle}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2 text-primary" /> Suggested Meta Description</h4>
                    <p className="text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-muted">{result.suggestedMetaDescription}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2 text-primary" /> Suggested Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.suggestedKeywords.map((keyword, index) => <Badge key={index} variant="secondary">{keyword}</Badge>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Content Analysis</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{result.contentAnalysis}</p>
                </div>
            </CardContent>
        </Card>
    )
}
