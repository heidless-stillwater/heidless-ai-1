"use client";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientQAInputSchema, type ClientQAInput, type ClientQAOutput } from "@/lib/schemas";
import { answerClientQuestion } from "@/ai/flows/client-q-and-a-flow";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ClientQA() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ClientQAOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<ClientQAInput>({
    resolver: zodResolver(clientQAInputSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit: SubmitHandler<ClientQAInput> = (values) => {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const response = await answerClientQuestion(values);
        setResult(response);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Client's Question</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., 'What are the deadlines for submitting my VAT return?'"
                            className="min-h-[100px]"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Answer
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <p>AI is thinking...</p>
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{result.answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
