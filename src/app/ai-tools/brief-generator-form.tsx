'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateBrief, type BriefInput, type BriefOutput, BriefInputSchema } from '@/ai/flows/brief-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function BriefGeneratorForm() {
  const [isPending, startTransition] = React.useTransition();
  const [brief, setBrief] = React.useState<BriefOutput | null>(null);

  const form = useForm<BriefInput>({
    resolver: zodResolver(BriefInputSchema),
    defaultValues: {
      projectName: '',
      projectGoals: '',
      targetAudience: '',
      keyFeatures: '',
      competitors: '',
    },
  });

  const onSubmit = (values: BriefInput) => {
    setBrief(null);
    startTransition(async () => {
      const result = await generateBrief(values);
      setBrief(result);
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a Project Brief</CardTitle>
          <CardDescription>Fill out the details below and let AI generate a professional project brief for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'E-commerce Redesign'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What are the main objectives? e.g., 'Increase sales by 20%, improve user engagement.'" {...field} />
                    </FormControl>
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
                      <Textarea placeholder="Describe your ideal customers. e.g., 'Tech-savvy millennials aged 25-35.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List the must-have features. e.g., 'User accounts, product search, secure checkout.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="competitors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitors (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Amazon, Etsy'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Generating...' : 'Generate Brief'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Generated Brief</h3>
        {isPending && <BriefSkeleton />}
        {brief && <GeneratedBrief brief={brief} />}
        {!isPending && !brief && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <p>Your generated project brief will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function BriefSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
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
                    <Skeleton className="h-4 w-3/6" />
                </div>
            </CardContent>
        </Card>
    );
}


function GeneratedBrief({ brief }: { brief: BriefOutput }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{brief.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Project Overview</h4>
                    <p className="text-muted-foreground">{brief.overview}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Project Goals</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {brief.goals.map((goal, index) => <li key={index}>{goal}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Target Audience</h4>
                    <p className="text-muted-foreground">{brief.targetAudience}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {brief.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Suggested Timeline</h4>
                    <p className="text-muted-foreground">{brief.timeline}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                     <ul className="space-y-2 text-muted-foreground">
                        {brief.nextSteps.map((step, index) => (
                           <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
