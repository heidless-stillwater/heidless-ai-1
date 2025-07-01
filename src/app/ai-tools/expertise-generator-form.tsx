'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateExpertise, type ExpertiseOutput } from '@/ai/flows/expertise-generator';
import { ExpertiseInputSchema, type ExpertiseInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, BookOpen, Link as LinkIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export function ExpertiseGeneratorForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ExpertiseOutput | null>(null);

  const form = useForm<ExpertiseInput>({
    resolver: zodResolver(ExpertiseInputSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = (values: ExpertiseInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateExpertise(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Ask the AI Expert</CardTitle>
          <CardDescription>Have a question about web design, development, SEO, or anything in between? Get an expert explanation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you want to learn about?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'What are the pros and cons of server-side rendering?'" {...field} className="min-h-[150px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <BrainCircuit className="mr-2" />
                {isPending ? 'Consulting the expert...' : 'Get Explanation'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Expert Response</h3>
        {isPending && <ExpertiseSkeleton />}
        {result && <GeneratedExpertise result={result} />}
        {!isPending && !result && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <p>Your expert explanation will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function ExpertiseSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
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


function GeneratedExpertise({ result }: { result: ExpertiseOutput }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{result.explanation}</p>
                </div>
                {result.keyPoints && result.keyPoints.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2">Key Points</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {result.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                        </ul>
                    </div>
                )}
                {result.furtherReading && result.furtherReading.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><BookOpen className="mr-2 h-5 w-5" /> Further Reading</h4>
                         <ul className="space-y-2 text-muted-foreground">
                            {result.furtherReading.map((item, index) => (
                               <li key={index} className="flex items-start">
                                    <LinkIcon className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                                    <Link href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
