'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateCode, type CodeGeneratorOutput } from '@/ai/flows/code-generator';
import { CodeGeneratorInputSchema, type CodeGeneratorInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Code, Copy, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CodeGeneratorForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<CodeGeneratorOutput | null>(null);

  const form = useForm<CodeGeneratorInput>({
    resolver: zodResolver(CodeGeneratorInputSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = (values: CodeGeneratorInput) => {
    setResult(null);
    startTransition(async () => {
      const response = await generateCode(values);
      setResult(response);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Code Generator</CardTitle>
          <CardDescription>Describe the component you want to build, and AI will generate the React code for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A login form with email and password fields, a submit button, and a link to the sign-up page. Use shadcn/ui components.'"
                        {...field}
                        className="min-h-[200px] font-mono text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Generating...' : 'Generate Code'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Generated Code</h3>
        {isPending && <CodeSkeleton />}
        {result && <GeneratedCode result={result} />}
        {!isPending && !result && (
          <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
            <div className="text-center text-muted-foreground p-8">
              <Code className="mx-auto h-12 w-12 mb-4" />
              <p>Your generated React component will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function CodeSkeleton() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-8" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
    );
}

function GeneratedCode({ result }: { result: CodeGeneratorOutput }) {
    const { toast } = useToast();
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result.code);
        setCopied(true);
        toast({ title: `Code copied to clipboard!` });
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                 <CardTitle className="text-lg">Component.tsx</CardTitle>
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
            </CardHeader>
            <CardContent>
                 <ScrollArea className="h-[400px] w-full rounded-md bg-muted">
                    <pre className="text-xs p-4">
                        <code>{result.code}</code>
                    </pre>
                 </ScrollArea>
            </CardContent>
        </Card>
    )
}
