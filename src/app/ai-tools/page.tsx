import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AiToolSection } from './ai-tool-section';

const toolSections = [
    {
        id: "web-consultancy",
        title: "Web Consultancy",
        gap: "mb-[10px]",
        tabs: [
            'AI-powered chat', 'AI Powered Brief', 'AI Expertise', 'AI Content Generator',
            'AI Color Palette Generator', 'AI SEO Optimizer', 'AI Layout Suggestions',
            'AI Competitor Analysis', 'AI Performance Optimizer', 'AI Image Optimizer',
            'AI Accessibility Checker', 'AI Code Generator'
        ]
    },
    {
        id: "accountancy",
        title: "Accountancy",
        gap: "mb-[10px]",
        defaultTab: "Expense Categorization",
        tabs: [
            'ChatBot', 'Expense Categorization', 'Financial Reports', 'Client Q&A',
            'Tax Compliance', 'Invoice Processing', 'Cash Flow Forecast',
            'Anomaly Detection', 'Predictive Analysis'
        ]
    },
    {
        id: "fast-food-shop",
        title: "Fast Food Shop",
        gap: "mb-[20px]",
        tabs: ['AI-powered chat', 'AI Recipe Variant Generator']
    },
    {
        id: "dental-practice",
        title: "Dental Practice",
        gap: "mb-[10px]",
        tabs: ['AI-powered chat', 'AI Powered Brief']
    },
    {
        id: "personal-trainer",
        title: "Personal Trainer",
        gap: "mb-[10px]",
        tabs: ['AI-powered chat', 'AI Powered Brief']
    },
    {
        id: "life-coach",
        title: "Life Coach",
        gap: "mb-[20px]",
        tabs: ['AI-powered chat', 'AI Powered Brief']
    }
];

const topNavButtons = [
    { href: "#web-consultancy", label: "Web Consultancy" },
    { href: "#fast-food-shop", label: "Fast Food Shop" },
    { href: "#dental-practice", label: "Dental Practice" },
    { href: "#accountancy", label: "Accountancy" },
    { href: "#personal-trainer", label: "Personal Trainer" },
    { href: "#life-coach", label: "Life Coach" }
];


export default function AiToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Tools for Your Business
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Explore our suite of AI-powered tools designed to streamline your workflow and enhance your services.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {topNavButtons.map(button => (
            <Button key={button.href} asChild variant="outline" className="px-[5px]">
                <Link href={button.href}>{button.label}</Link>
            </Button>
        ))}
      </div>

      <div className="space-y-20">
        {toolSections.map((section) => (
          <AiToolSection key={section.id} {...section} />
        ))}
      </div>
    </div>
  );
}
