'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateLayoutSuggestions, type LayoutSuggestionOutput } from '@/ai/flows/layout-suggestion-generator';
import { LayoutSuggestionInputSchema, type LayoutSuggestionInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LayoutTemplate, Columns } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function LayoutSuggestionForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<LayoutSuggestionOutput | null>(null);

  const form = useForm<LayoutSuggestionInput>({
    resolver: zodResolver(LayoutSuggestionInputSchema),
    defaultValues: {
      pageDescription: '',
      pageType: 'Landing Page',
    },
  });

  const onSubmit = (values: LayoutSuggestionInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateLayoutSuggestions(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Layout Suggestions</CardTitle>
          <CardDescription>Describe your page's purpose and content to get professional layout ideas from AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a page type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Landing Page">Landing Page</SelectItem>
                            <SelectItem value="Blog Post">Blog Post</SelectItem>
                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                            <SelectItem value="Contact Page">Contact Page</SelectItem>
                            <SelectItem value="About Us">About Us</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Content Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'A page to showcase my web development projects. I want it to look modern and professional, with a section for my bio and skills.'" {...field} className="min-h-[150px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Generating Ideas...' : 'Get Layout Suggestions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Suggested Layouts</h3>
        {isPending && <LayoutSkeleton />}
        {result && <GeneratedLayouts result={result} />}
        {!isPending && !result && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <LayoutTemplate className="mx-auto h-12 w-12 mb-4" />
                    <p>Your generated layout suggestions will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function LayoutSkeleton() {
    return (
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-6 w-1/4 mt-2" />
                <Skeleton className="h-4 w-full" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-6 w-1/4 mt-2" />
                <Skeleton className="h-4 w-full" />
            </CardContent>
        </Card>
      </div>
    );
}

function GeneratedLayouts({ result }: { result: LayoutSuggestionOutput }) {
    return (
        <div className="space-y-4">
          {result.suggestions.map((suggestion, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle>{suggestion.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{suggestion.description}</p>
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center">
                        <Columns className="mr-2 h-4 w-4" />
                        Key Components
                      </h5>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {suggestion.components.map((component, i) => (
                          <li key={i}>{component}</li>
                        ))}
                      </ul>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
    )
}
