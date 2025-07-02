"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { answerClientQuestionInputSchema, type AnswerClientQuestionInput, type AnswerClientQuestionOutput } from "@/lib/schemas";
import { answerClientQuestion } from "@/ai/flows/client-q-and-a-flow";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function ClientQA() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<AnswerClientQuestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<AnswerClientQuestionInput>({
    resolver: zodResolver(answerClientQuestionInputSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = (values: AnswerClientQuestionInput) => {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await answerClientQuestion(values);
        setResult(response);
      } catch (error) {
        console.error("Failed to get answer:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client's Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'What are the deadlines for filing quarterly taxes?'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Generating Answer..." : "Get AI Answer"}
          </Button>
        </form>
      </Form>

      {isPending && (
         <div className="flex items-center justify-center">
            <Bot className="h-8 w-8 animate-spin" />
            <p className="ml-2">The AI is thinking...</p>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{result.answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
