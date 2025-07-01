import { ContactForm } from "./contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { GoogleMap } from "@/components/google-map";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Get In Touch
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-2xl font-headline font-bold">Our Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:hello@heidlesshub.dev" className="text-muted-foreground hover:text-primary">
                  hello@heidlesshub.dev
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">0123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-muted-foreground">703a Seven Sisters Road</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <GoogleMap address="703a Seven Sisters Road" />
        </div>
        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
