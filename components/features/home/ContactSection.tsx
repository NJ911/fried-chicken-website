"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContact } from "@/lib/context/contact-context";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    reason: z.string().min(1, {
        message: "Please select a reason.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

export function ContactSection() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const { addMessage } = useContact();

    function onSubmit(values: z.infer<typeof formSchema>) {
        addMessage({
            name: values.name,
            email: values.email,
            reason: values.reason,
            message: values.message,
        });
        toast.success("Thanks for contacting us! We'll get back to you shortly.");
        form.reset();
    }

    return (
        <section className="py-20 bg-primary/5 text-foreground" id="contact">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Have a question about our menu? Want to book us for an event?
                        Or just want to tell us how much you love the chicken? We're all ears!
                    </p>

                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">Visit Us</span>
                            <span className="text-muted-foreground">123 Chicken Blvd, Los Angeles, CA</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">Call Us</span>
                            <span className="text-muted-foreground">(555) 123-4567</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">Email Us</span>
                            <span className="text-muted-foreground">hello@crispychicken.com</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                <SelectItem value="catering">Catering Request</SelectItem>
                                                <SelectItem value="feedback">Feedback</SelectItem>
                                                <SelectItem value="careers">Careers</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us what's on your mind..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">Send Message</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
