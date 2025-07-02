"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from 'react';

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

const pageNavLinks = [
  { name: "Web Consultancy", href: "#web-consultancy" },
  { name: "Fast Food Shop", href: "#fast-food-shop" },
  { name: "Dental Practice", href: "#dental-practice" },
  { name: "Accountancy", href: "#accountancy" },
  { name: "Personal Trainer", href: "#personal-trainer" },
  { name: "Life Coach", href: "#life-coach" },
];

const toolSections = [
    {
        id: "web-consultancy",
        title: "Web Consultancy",
        tools: [
            "AI-powered chat", "AI Powered Brief", "AI Expertise", "AI Content Generator",
            "AI Color Palette Generator", "AI SEO Optimizer", "AI Layout Suggestions",
            "AI Competitor Analysis", "AI Performance Optimizer", "AI Image Optimizer",
            "AI Accessibility Checker", "AI Code Generator"
        ]
    },
    {
        id: "fast-food-shop",
        title: "Fast Food Shop",
        tools: ["AI-powered chat", "AI Recipe Variant Generator"]
    },
    {
        id: "dental-practice",
        title: "Dental Practice",
        tools: ["AI-powered chat", "AI Powered Brief"]
    },
    {
        id: "accountancy",
        title: "Accountancy",
        tools: ["ChatBot", "Expense Categorization"],
        defaultTool: "Expense Categorization"
    },
    {
        id: "personal-trainer",
        title: "Personal Trainer",
        tools: ["AI-powered chat", "AI Powered Brief"]
    },
    {
        id: "life-coach",
        title: "Life Coach",
        tools: ["AI-powered chat", "AI Powered Brief"]
    }
];

interface ToolSectionProps {
  id: string;
  title: string;
  tools: string[];
  defaultTool?: string;
}

const ToolSection: React.FC<ToolSectionProps> = ({ id, title, tools, defaultTool }) => {
    const defaultValue = defaultTool ? slugify(defaultTool) : slugify(tools[0]);

    return (
        <section id={id} className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-headline font-bold mb-6">{title}</h2>
            <Tabs defaultValue={defaultValue} className="w-full">
                <TabsList className="mb-5 h-auto flex-wrap justify-start p-1">
                    {tools.map((tool) => (
                        <TabsTrigger key={slugify(tool)} value={slugify(tool)} className="w-auto flex-grow sm:flex-grow-0">
                            {tool}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tools.map((tool) => (
                    <TabsContent key={slugify(tool)} value={slugify(tool)}>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">{tool}</h3>
                                <p>Content for {tool} will be built here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};

export default function AIToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools designed to enhance various professional services.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {pageNavLinks.slice(0, 3).map(link => (
            <Button asChild variant="outline" key={link.name}>
                <Link href={link.href}>{link.name}</Link>
            </Button>
        ))}
      </div>

      <div className="space-y-16">
        {toolSections.map(section => (
            <ToolSection 
                key={section.id}
                id={section.id}
                title={section.title}
                tools={section.tools}
                defaultTool={section.defaultTool}
            />
        ))}
      </div>
    </div>
  );
}
