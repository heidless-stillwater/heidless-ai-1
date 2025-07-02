"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseCategorization } from "./accountancy/expense-categorization";
import { FinancialReports } from "./accountancy/financial-reports";
import { ClientQA } from "./accountancy/client-qa";
import { RecommendationsAI } from "./fast-food/recommendations-ai";

// A simple component to render a placeholder for tools that are not yet built.
function PlaceholderTool({ toolName }: { toolName: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{toolName}</CardTitle>
                <CardDescription>This tool is coming soon!</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Check back later for an interactive demo of the {toolName}.</p>
            </CardContent>
        </Card>
    );
}


// This component acts as a router to display the correct tool based on the name.
export function ToolContent({ toolName }: { toolName: string }) {
    switch (toolName) {
        case 'Expense Categorization':
            return <ExpenseCategorization />;
        case 'AI Financial Reports':
            return <FinancialReports />;
        case 'Client Q&A':
            return <ClientQA />;
        case 'Recommendatons AI':
            return <RecommendationsAI />;
        default:
            return <PlaceholderTool toolName={toolName} />;
    }
}
