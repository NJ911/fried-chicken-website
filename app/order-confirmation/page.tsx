"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-muted/20">
            <div className="text-center space-y-6 p-8 max-w-md">
                <div className="flex justify-center">
                    <CheckCircle className="w-24 h-24 text-green-500 animate-in zoom-in duration-500" />
                </div>
                <h1 className="text-3xl font-bold">Order Received!</h1>
                <p className="text-muted-foreground">
                    Thank you for ordering with Kingsway Fried Chicken. Your food is being prepared with love and will be ready shortly.
                </p>
                <div className="bg-card p-4 rounded-lg border shadow-sm text-sm">
                    <p className="font-semibold">Order #12345</p>
                    <p>Estimated time: 25-30 mins</p>
                </div>
                <div className="pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
