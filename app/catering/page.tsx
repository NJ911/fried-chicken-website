"use client";

import { Check, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CateringPage() {
    return (
        <div className="min-h-screen py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-bold text-primary">Catering</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Make your next event unforgettable with our famous fried chicken.
                        Perfect for office parties, birthdays, weddings, and game nights.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                            <Link href="/contact">Request a Quote</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/menu">View Menu</Link>
                        </Button>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Any Size Crowd</h3>
                        <p className="text-muted-foreground">From 10 to 1000 guests, we have packages to feed everyone.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <CalendarDays className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Easy Scheduling</h3>
                        <p className="text-muted-foreground">Book online or call us. We need just 24 hours notice for large orders.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Check className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Perfect Packaging</h3>
                        <p className="text-muted-foreground">Our catering trays keep the chicken crispy and hot until serving time.</p>
                    </div>
                </div>

                {/* Packages */}
                <h2 className="text-3xl font-bold text-center mb-12">Popular Packages</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            name: "The Game Day",
                            serves: "10-12 People",
                            price: "$149.99",
                            items: ["24pc Mixed Chicken", "24 Tenders", "2 Large Fries", "12 Biscuits", "Assorted Sauces"]
                        },
                        {
                            name: "The Office Lunch",
                            serves: "20-25 People",
                            price: "$299.99",
                            items: ["50pc Mixed Chicken", "2 Large Coleslaws", "2 Large Mashed Potatoes", "25 Biscuits", "Gallon of Tea"]
                        },
                        {
                            name: "The Big Bash",
                            serves: "50+ People",
                            price: "Custom",
                            items: ["Custom Chicken Count", "Choice of 4 Sides", "Dessert Platter", "Drinks Included", "Full Service Setup"]
                        }
                    ].map((pkg, i) => (
                        <Card key={i} className="flex flex-col border-2 hover:border-primary/50 transition-colors">
                            <CardHeader className="text-center pb-8 border-b bg-muted/20">
                                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                <p className="text-muted-foreground font-medium">{pkg.serves}</p>
                                <p className="text-3xl font-bold text-primary mt-2">{pkg.price}</p>
                            </CardHeader>
                            <CardContent className="flex-1 pt-8 space-y-4">
                                <ul className="space-y-3">
                                    {pkg.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-600 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
