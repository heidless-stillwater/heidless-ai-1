'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateContent, type ContentGeneratorOutput } from '@/ai/flows/content-generator';
import { ContentGeneratorInputSchema, type ContentGeneratorInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function ContentGeneratorForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ContentGeneratorOutput | null>(null);

  const form = useForm<ContentGeneratorInput>({
    resolver: zodResolver(ContentGeneratorInputSchema),
    defaultValues: {
      topic: '',
      contentType: 'Blog Post',
      tone: 'Professional',
      targetAudience: '',
    },
  });

  const onSubmit = (values: ContentGeneratorInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateContent(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Content Generator</CardTitle>
          <CardDescription>Generate high-quality marketing copy, blog posts, and more with a single click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'The Future of AI in Web Design'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a content type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Blog Post">Blog Post</SelectItem>
                            <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                            <SelectItem value="Marketing Email">Marketing Email</SelectItem>
                            <SelectItem value="Product Description">Product Description</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone of Voice</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Casual">Casual</SelectItem>
                            <SelectItem value="Witty">Witty</SelectItem>
                            <SelectItem value="Persuasive">Persuasive</SelectItem>
                             <SelectItem value="Informative">Informative</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Small business owners'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Generating...' : 'Generate Content'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Generated Content</h3>
        {isPending && <ContentSkeleton />}
        {result && <GeneratedContent result={result} />}
        {!isPending && !result && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <p>Your generated content will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function ContentSkeleton() {
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
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/6" />
                </div>
            </CardContent>
        </Card>
    );
}

function GeneratedContent({ result }: { result: ContentGeneratorOutput }) {
    return (
        <Card>
            {result.title && (
                <CardHeader>
                    <CardTitle>{result.title}</CardTitle>
                </CardHeader>
            )}
            <CardContent className={!result.title ? 'pt-6' : ''}>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.content}</p>
            </CardContent>
        </Card>
    )
}
