"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const locations = [
    {
        id: 1,
        name: "Downtown Los Angeles",
        address: "123 Chicken Blvd, Los Angeles, CA 90001",
        phone: "(555) 123-4567",
        hours: "10:00 AM - 10:00 PM",
        image: "/hero_chicken.png"
    },
    {
        id: 2,
        name: "Santa Monica Pier",
        address: "456 Ocean Front Walk, Santa Monica, CA 90401",
        phone: "(555) 987-6543",
        hours: "11:00 AM - 11:00 PM",
        image: "/kitchen.png"
    },
    {
        id: 3,
        name: "West Hollywood",
        address: "789 Sunset Blvd, West Hollywood, CA 90046",
        phone: "(555) 456-7890",
        hours: "10:00 AM - 2:00 AM",
        image: "/exterior.png"
    }
];

export default function LocationsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold">Find a Kingsway Fried Chicken Near You</h1>
                <p className="text-muted-foreground text-lg">We are expanding rapidly! Visit us at one of our prime locations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((loc) => (
                    <Card key={loc.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-muted flex items-center justify-center relative">
                            {/* Map placeholder */}
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                <MapPin className="w-12 h-12 text-primary/50" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{loc.name}</CardTitle>
                            <CardDescription>{loc.address}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{loc.hours}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>{loc.phone}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white" asChild>
                                <Link href="/menu">Order from here</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
