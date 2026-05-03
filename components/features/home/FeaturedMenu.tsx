"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star } from "lucide-react";

const featuredItems = [
    {
        id: 1,
        name: "Golden Crispy Chicken",
        description: "8 pieces of our signature crispy fried chicken.",
        price: "$24.99",
        image: "/hero_chicken.png",
        rating: 4.9,
        tag: "Best Seller"
    },
    {
        id: 2,
        name: "Spicy Chicken Sandwich",
        description: "Brioche bun, spicy mayo, pickles, and heat.",
        price: "$12.99",
        image: "/sandwich.png",
        rating: 4.8,
        tag: "New"
    },
    {
        id: 3,
        name: "Golden Tenders",
        description: "5 hand-breaded tenders with choice of sauce.",
        price: "$14.99",
        image: "/tenders.png",
        rating: 4.9,
        tag: "Kids Love"
    }
];

export function FeaturedMenu() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold">Fan Favorites</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Try our most loved items. Warning: may cause addiction to crispy goodness.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group bg-card">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <Badge className="absolute top-4 right-4 bg-primary text-white border-none">
                                        {item.tag}
                                    </Badge>
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{item.name}</CardTitle>
                                        <span className="font-bold text-lg text-primary">{item.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>{item.rating}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" asChild>
                                        <Link href={`/menu?item=${item.id}`}>Add to Order</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                        <Link href="/menu">View Full Menu</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
