'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateImageOptimizationSuggestions, type ImageOptimizerOutput } from '@/ai/flows/image-optimizer';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Wand2, Image as ImageIcon, FileCheck, ThumbsUp, Percent } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const ImageOptimizerFormSchema = z.object({
    image: z.custom<FileList>().refine(files => files?.length === 1, 'An image is required.'),
});
type ImageOptimizerFormInput = z.infer<typeof ImageOptimizerFormSchema>;

export function ImageOptimizerForm() {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<ImageOptimizerOutput | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ImageOptimizerFormInput>({
    resolver: zodResolver(ImageOptimizerFormSchema),
  });

  const fileRef = form.register("image");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        form.resetField("image");
        setPreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  
  const onSubmit = (values: ImageOptimizerFormInput) => {
    const file = values.image[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        const imageDataUri = reader.result as string;
        setResult(null);
        startTransition(async () => {
            try {
                const response = await generateImageOptimizationSuggestions({ 
                    imageDataUri,
                    filename: file.name
                });
                setResult(response);
            } catch (error) {
                 toast({
                    variant: "destructive",
                    title: "Optimization Failed",
                    description: "Something went wrong while analyzing the image. Please try another one.",
                 });
            }
        });
    }
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Image Optimizer</CardTitle>
          <CardDescription>Upload an image to get AI-powered optimization tips for web performance and accessibility.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Image File</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept="image/png, image/jpeg, image/webp" 
                            {...fileRef}
                            onChange={handleFileChange}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {preview && (
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Image Preview</p>
                    <Image src={preview} alt="Image preview" width={550} height={310} className="rounded-lg object-contain border bg-muted w-full aspect-video" />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending || !preview}>
                <Wand2 className="mr-2" />
                {isPending ? 'Optimizing...' : 'Optimize Image'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Optimization Report</h3>
        {isPending && <OptimizerSkeleton />}
        {result && <GeneratedReport result={result} />}
        {!isPending && !result && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <ImageIcon className="mx-auto h-12 w-12 mb-4" />
                    <p>Your image optimization report will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function OptimizerSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                     <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

function GeneratedReport({ result }: { result: ImageOptimizerOutput }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Optimization Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center"><ThumbsUp className="h-5 w-5 mr-2 text-primary" /> Suggested Alt Text</h4>
                    <p className="text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-muted italic">"{result.suggestedAltText}"</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-3 flex items-center"><FileCheck className="h-5 w-5 mr-2" /> Current Analysis</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex justify-between"><span>Format:</span> <Badge variant="secondary">{result.analysis.currentFormat}</Badge></div>
                        <div className="flex justify-between"><span>Dimensions:</span> <Badge variant="secondary">{result.analysis.currentDimensions}px</Badge></div>
                        <div className="flex justify-between"><span>File Size:</span> <Badge variant="secondary">{result.analysis.currentFileSize}</Badge></div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3 flex items-center"><Percent className="h-5 w-5 mr-2 text-primary" /> Recommendations</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex justify-between"><span>Suggested Format:</span> <Badge>{result.recommendations.suggestedFormat}</Badge></div>
                        <div className="flex justify-between"><span>Suggested Quality:</span> <Badge>{result.recommendations.suggestedQuality}</Badge></div>
                        <div className="flex justify-between"><span>Potential Savings:</span> <Badge variant="destructive">~{result.recommendations.potentialSavings}</Badge></div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 flex items-center">Technical Feedback</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{result.technicalFeedback}</p>
                </div>
            </CardContent>
        </Card>
    )
}
