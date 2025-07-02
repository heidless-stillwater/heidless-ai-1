import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ExpenseCategorizationTool() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categorization</CardTitle>
        <CardDescription>
          Paste a list of your recent transactions, and our AI will categorize them for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="transactions">Transactions</Label>
          <Textarea
            id="transactions"
            placeholder="e.g., Starbucks Coffee - 5.45, Amazon Prime - 14.99, Shell Gas - 55.20"
            className="min-h-[150px]"
          />
        </div>
        <Button disabled>Categorize Expenses</Button>
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Categorized Expenses:</h3>
            <p className="text-muted-foreground">Results will appear here...</p>
        </div>
      </CardContent>
    </Card>
  );
}
