"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";

export async function submitContactForm(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, message: "Invalid data provided." };
  }

  try {
    // In a real application, you would send an email here using a service like Resend, SendGrid, or Nodemailer.
    console.log("New contact form submission received:");
    console.log(`Name: ${result.data.name}`);
    console.log(`Email: ${result.data.email}`);
    console.log(`Subject: ${result.data.subject}`);
    console.log(`Message: ${result.data.message}`);

    return { success: true, message: "Thank you for your message! We will get back to you soon." };
  } catch (error) {
    console.error("Failed to process contact form:", error);
    return { success: false, message: "An unexpected error occurred on the server. Please try again." };
  }
}
