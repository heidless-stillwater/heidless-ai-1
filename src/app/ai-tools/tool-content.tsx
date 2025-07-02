import { Card, CardContent } from "@/components/ui/card";
import { ExpenseCategorization } from "./accountancy/expense-categorization";
import { FinancialReports } from "./accountancy/financial-reports";
import { ClientQA } from "./accountancy/client-qa";

// This component will dynamically render the correct tool.
// As you build more tools, you'll import them here and add them to the switch statement.
export function ToolContent({ toolName }: { toolName: string }) {
  let content: React.ReactNode;

  switch (toolName) {
    case 'Expense Categorization':
      content = <ExpenseCategorization />;
      break;
    case 'Financial Reports':
      content = <FinancialReports />;
      break;
    case 'Client Q&A':
      content = <ClientQA />;
      break;
    default:
      content = (
        <>
          <h3 className="text-xl font-semibold mb-2">{toolName}</h3>
          <p className="text-muted-foreground">
            Interactive component for the {toolName} tool will be available here soon.
          </p>
        </>
      );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {content}
      </CardContent>
    </Card>
  );
}
