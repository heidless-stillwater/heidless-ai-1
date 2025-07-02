"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { generateBotResponse } from "@/ai/flows/client-comm-bots-flow";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function ClientCommunicationBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! How can I help you with your web consultancy needs today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      try {
        const response = await generateBotResponse(currentInput);
        const botMessage: Message = { role: "bot", content: response };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error generating bot response:", error);
        const errorMessage: Message = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  return (
    <Card className="flex-1 flex flex-col h-[600px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-md">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Client Communication Bot</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] break-words ${
                    message.role === "bot"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
               <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted w-48 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about our services..."
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
