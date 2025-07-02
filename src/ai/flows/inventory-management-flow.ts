'use server';
/**
 * @fileOverview An AI flow for managing restaurant inventory.
 *
 * - manageInventory - A function that analyzes inventory data and provides recommendations.
 * - InventoryManagementInput - The input type for the manageInventory function.
 * - InventoryManagementOutput - The return type for the manageInventory function.
 */

import {ai} from '@/ai/genkit';
import { inventoryManagementInputSchema, inventoryManagementOutputSchema, type InventoryManagementInput, type InventoryManagementOutput } from '@/lib/schemas';

export async function manageInventory(input: InventoryManagementInput): Promise<InventoryManagementOutput> {
  return inventoryManagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryManagementPrompt',
  input: {schema: inventoryManagementInputSchema},
  output: {schema: inventoryManagementOutputSchema},
  prompt: `You are an expert restaurant supply chain and inventory manager. Your task is to analyze a list of inventory items and their current quantities for a fast-food shop.

  Based on the provided data, identify items that are running low and need to be reordered, and also identify items that are overstocked and at risk of spoilage or waste.

  For low stock items, provide a suggested reorder quantity.
  For overstocked items, provide a suggestion on how to use them (e.g., "Feature in a daily special").

  Here is the current inventory data (in CSV format: item,quantity):
  {{{inventoryData}}}

  Analyze this data and provide your recommendations. Set a low stock threshold at 20 units and an overstock threshold at 100 units unless the item is a clear non-perishable like "Soda Syrup". Use common sense for typical fast-food items.`,
});

const inventoryManagementFlow = ai.defineFlow(
  {
    name: 'inventoryManagementFlow',
    inputSchema: inventoryManagementInputSchema,
    outputSchema: inventoryManagementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
