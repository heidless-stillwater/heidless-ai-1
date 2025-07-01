'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateColorPalette, type ColorPaletteOutput } from '@/ai/flows/color-palette-generator';
import { ColorPaletteInputSchema, type ColorPaletteInput } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Palette, Check, Copy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function ColorPaletteGeneratorForm() {
  const [isPending, startTransition] = React.useTransition();
  const [palette, setPalette] = React.useState<ColorPaletteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ColorPaletteInput>({
    resolver: zodResolver(ColorPaletteInputSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = (values: ColorPaletteInput) => {
    setPalette(null);
    startTransition(async () => {
      const result = await generateColorPalette(values);
      setPalette(result);
    });
  };

  const applyTheme = (theme: ColorPaletteOutput) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      // Convert camelCase key to kebab-case for CSS custom properties
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
    toast({
        title: "Theme Applied!",
        description: "The new color palette has been applied to the page.",
    })
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Color Palette Generator</CardTitle>
          <CardDescription>Describe the mood or brand you want to convey, and AI will generate a beautiful, accessible color palette.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'A modern, minimalist theme for a tech startup, using cool tones.'" {...field} className="min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                <Wand2 className="mr-2" />
                {isPending ? 'Generating...' : 'Generate Palette'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Generated Palette</h3>
        {isPending && <PaletteSkeleton />}
        {palette && <GeneratedPalette palette={palette} onApplyTheme={applyTheme} />}
        {!isPending && !palette && (
            <Card className="flex items-center justify-center h-full border-dashed min-h-[400px]">
                <div className="text-center text-muted-foreground p-8">
                    <Palette className="mx-auto h-12 w-12 mb-4" />
                    <p>Your generated color palette will appear here.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}

function PaletteSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function GeneratedPalette({ palette, onApplyTheme }: { palette: ColorPaletteOutput, onApplyTheme: (theme: ColorPaletteOutput) => void }) {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-2xl">Your Palette</CardTitle>
                <Button onClick={() => onApplyTheme(palette)}>Apply Theme</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {Object.entries(palette).map(([name, value]) => (
                    <ColorSwatch key={name} name={name} value={value} />
                ))}
            </CardContent>
        </Card>
    )
}

function ColorSwatch({ name, value }: { name: string, value: string }) {
    const [copied, setCopied] = React.useState(false);
    const { toast } = useToast();
    const hslValue = `hsl(${value})`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        toast({ title: `Copied "${name}" value!` });
        setTimeout(() => setCopied(false), 2000);
    }
    
    // Capitalize first letter and add space before capital letters
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');

    return (
        <div className="space-y-2">
            <div className="h-20 w-full rounded-lg border" style={{ backgroundColor: hslValue }}></div>
            <div className="flex justify-between items-center">
                <div>
                     <p className="font-semibold text-sm">{formattedName}</p>
                     <p className="text-xs text-muted-foreground font-mono">{value}</p>
                </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}
