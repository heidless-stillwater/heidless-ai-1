'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chat } from '@/ai/flows/chatFlow';
import { User, Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending) return;

    const newUserMessage: Message = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');

    startTransition(async () => {
      const response = await chat(inputValue);
      const newAssistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, newAssistantMessage]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isPending]);

  return (
    <div className="flex flex-col h-[60vh] border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4 h-full">
          {messages.length === 0 && !isPending && (
             <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                <Bot className="h-12 w-12 mb-4 text-primary/50" />
                <p className="text-lg font-semibold">Heidless AI Assistant</p>
                <p>Ask me anything about web design, development, or our services!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-transparent"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-md break-words',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'user' && (
                 <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-transparent"><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-transparent"><Bot className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 w-48 bg-muted space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-5/6 h-4" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about web development..."
            disabled={isPending}
            autoComplete="off"
          />
          <Button type="submit" disabled={!inputValue.trim() || isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
