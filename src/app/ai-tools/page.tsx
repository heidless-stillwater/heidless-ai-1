import { AiToolsClient } from "./ai-tools-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Tools for Your Industry | Heidless Hub",
    description: "Explore the AI-powered tools and functions we can build to optimize your business operations.",
};

export default function AiToolsPage() {
    return <AiToolsClient />;
}
