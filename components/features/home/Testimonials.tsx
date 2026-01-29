"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah J.",
        role: "Regular Customer",
        content: "The spicy chicken sandwich is life-changing. I order it at least twice a week!",
        rating: 5
    },
    {
        id: 2,
        name: "Mike T.",
        role: "Food Blogger",
        content: "Best fried chicken in the city. The crust stays crispy even after delivery.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily R.",
        role: "Catering Client",
        content: "Ordered 50 pieces for our office party. Everyone loved it. Great service!",
        rating: 5
    },
    {
        id: 4,
        name: "David Chen",
        role: "Fried Chicken Enthusiast",
        content: "The secret spice blend is mysteries but delicious. 10/10 recommend.",
        rating: 4
    }
];

export function Testimonials() {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">What Our Fans Say</h2>
                    <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 fill-current" />
                        ))}
                    </div>
                    <p className="text-muted-foreground">4.9/5 Average Rating</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="border-none shadow-md bg-muted/40 h-full">
                                            <CardContent className="flex flex-col justify-between p-6 h-64">
                                                <div>
                                                    <div className="flex mb-4 text-yellow-500">
                                                        {[...Array(testimonial.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-current" />
                                                        ))}
                                                    </div>
                                                    <p className="text-foreground/80 italic">"{testimonial.content}"</p>
                                                </div>
                                                <div className="mt-6 pt-4 border-t border-border/50">
                                                    <p className="font-bold">{testimonial.name}</p>
                                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
