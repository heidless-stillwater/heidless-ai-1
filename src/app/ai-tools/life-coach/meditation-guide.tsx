"use client";

import React, { useState, useTransition } from "react";
import { generateMeditationGuide, type MeditationGuideOutput } from "@/ai/flows/meditation-guide-flow";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MeditationGuide() {
  const [topic, setTopic] = useState("stress relief");
  const [duration, setDuration] = useState([10]);
  const [guide, setGuide] = useState<MeditationGuideOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGuide(null);

    startTransition(async () => {
      try {
        const result = await generateMeditationGuide({
          topic,
          duration: duration[0],
        });
        setGuide(result);
      } catch (error) {
        console.error("Error generating meditation guide:", error);
        toast({
          title: "Error",
          description: "Failed to generate meditation guide. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-md">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Mindfulness & Meditation Guides</CardTitle>
        </div>
        <CardDescription>
          Generate a personalized guided meditation script to help you find your center.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="topic">Meditation Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., focus, deep sleep, gratitude"
                disabled={isPending}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration: {duration[0]} minutes</Label>
              <Slider
                id="duration"
                min={1}
                max={30}
                step={1}
                value={duration}
                onValueChange={setDuration}
                disabled={isPending}
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                "Generating..."
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Guide
                </>
              )}
            </Button>
          </form>

          <div className="border rounded-lg p-4 bg-muted/50 min-h-[300px]">
             <ScrollArea className="h-[350px] pr-4">
              {isPending && (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              )}
              {guide && !isPending && (
                <div className="space-y-4">
                  <h3 className="font-headline text-xl font-semibold">{guide.title}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {guide.script.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              {!guide && !isPending && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-center">Your generated meditation guide will appear here.</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
