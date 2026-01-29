"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrders } from "@/lib/context/order-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const { login } = useOrders();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            toast.success("Welcome back, Chef!");
            router.push("/admin/dashboard");
        } else {
            toast.error("Incorrect password.");
        }
    };

    return (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-muted/20">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Kitchen Access</CardTitle>
                    <CardDescription className="text-center">
                        Enter your staff PIN to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Enter PIN"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                            Access Dashboard
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
