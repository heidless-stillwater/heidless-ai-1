"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatFormSchema, chatMessageSchema, type ChatFormValues } from "@/lib/schemas";
import { accountancyChat } from "@/ai/flows/accountancy-chat-flow";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, Send, User } from "lucide-react";

type ChatMessage = z.infer<typeof chatMessageSchema>;

export function AccountancyChatbot() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! How can I help you with your accountancy questions today?" },
  ]);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: { message: "" },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const onSubmit = (values: ChatFormValues) => {
    const userMessage: ChatMessage = { role: "user", content: values.message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();

    startTransition(async () => {
      try {
        const result = await accountancyChat({ 
            messages: newMessages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                content: m.content
            }))
        });
        setMessages(prev => [...prev, { role: "assistant", content: result.response }]);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        // Revert user message on error
        setMessages(messages); 
      }
    });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Bot />
            AI Accountant
        </CardTitle>
        <CardDescription>
            Ask me anything about accountancy, tax, expenses, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[75%] rounded-lg p-3 text-sm break-words",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                )}>
                  <p>{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User size={20}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-4 justify-start">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-lg p-3 text-sm flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="mt-auto pt-4 border-t">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormControl>
                        <Input placeholder="Ask a question..." {...field} disabled={isPending} autoComplete="off"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" size="icon" disabled={isPending}>
                    <Send className="h-4 w-4"/>
                    <span className="sr-only">Send</span>
                </Button>
            </form>
            </Form>
        </div>
      </CardContent>
    </Card>
  );
}
