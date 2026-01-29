"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrders, OrderStatus } from "@/lib/context/order-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, Package, Truck, LogOut, Mail } from "lucide-react";

const statusColors: Record<OrderStatus, string> = {
    pending: "bg-yellow-500",
    preparing: "bg-blue-500",
    ready: "bg-green-500",
    completed: "bg-gray-500",
};

export default function KitchenDashboard() {
    const { orders, updateOrderStatus, isAdmin, logout } = useOrders();
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            router.push("/admin/login");
        }
    }, [isAdmin, router]);

    if (!isAdmin) return null;

    const activeOrders = orders.filter(o => o.status !== "completed");
    const completedOrders = orders.filter(o => o.status === "completed").slice(0, 5); // Show last 5

    const handleStatusUpdate = (id: string, currentStatus: OrderStatus) => {
        let nextStatus: OrderStatus = "preparing";
        if (currentStatus === "pending") nextStatus = "preparing";
        else if (currentStatus === "preparing") nextStatus = "ready";
        else if (currentStatus === "ready") nextStatus = "completed";

        updateOrderStatus(id, nextStatus);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-muted/20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>
                        <p className="text-muted-foreground">Live Order Feed • {activeOrders.length} Active Orders</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push("/admin/dashboard/messages")}>
                            <Mail className="w-4 h-4 mr-2" />
                            Messages
                        </Button>
                        <Button variant="outline" onClick={() => { logout(); router.push("/"); }}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Kanban Boardish Layout */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* New / Pending */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <Clock className="w-5 h-5 text-yellow-500" /> Pending
                        </h2>
                        {activeOrders.filter(o => o.status === "pending").map(order => (
                            <OrderCard key={order.id} order={order} onUpdate={handleStatusUpdate} />
                        ))}
                        {activeOrders.filter(o => o.status === "pending").length === 0 && (
                            <p className="text-muted-foreground text-sm italic">No pending orders.</p>
                        )}
                    </div>

                    {/* Preparing */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-500" /> Preparing
                        </h2>
                        {activeOrders.filter(o => o.status === "preparing").map(order => (
                            <OrderCard key={order.id} order={order} onUpdate={handleStatusUpdate} />
                        ))}
                        {activeOrders.filter(o => o.status === "preparing").length === 0 && (
                            <p className="text-muted-foreground text-sm italic">Kitchen is clear.</p>
                        )}
                    </div>

                    {/* Ready */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Ready for Pickup
                        </h2>
                        {activeOrders.filter(o => o.status === "ready").map(order => (
                            <OrderCard key={order.id} order={order} onUpdate={handleStatusUpdate} />
                        ))}
                        {activeOrders.filter(o => o.status === "ready").length === 0 && (
                            <p className="text-muted-foreground text-sm italic">Nothing to serve.</p>
                        )}
                    </div>

                </div>

                {/* Recently Completed */}
                <div className="mt-12">
                    <h2 className="font-bold text-lg mb-4 text-muted-foreground">Recently Completed</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {completedOrders.map(order => (
                            <Card key={order.id} className="min-w-[250px] opacity-75">
                                <CardHeader className="p-4">
                                    <CardTitle className="text-sm">#{order.id}</CardTitle>
                                    <CardDescription>{order.customerName}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrderCard({ order, onUpdate }: { order: any, onUpdate: any }) {
    return (
        <Card className="border-l-4 shadow-sm" style={{ borderLeftColor: order.status === 'pending' ? '#eab308' : order.status === 'preparing' ? '#3b82f6' : '#22c55e' }}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>#{order.id}</CardTitle>
                        <CardDescription>{order.customerName}</CardDescription>
                    </div>
                    <Badge variant={order.type === 'delivery' ? 'secondary' : 'outline'}>
                        {order.type === 'delivery' ? <Truck className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                        {order.type}
                    </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleTimeString()}
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 space-y-2">
                {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                        <span className="font-medium">{item.quantity}x {item.name}</span>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="pt-0">
                <Button className="w-full" onClick={() => onUpdate(order.id, order.status)}>
                    {order.status === 'pending' && 'Start Cooking'}
                    {order.status === 'preparing' && 'Mark Ready'}
                    {order.status === 'ready' && 'Complete Order'}
                </Button>
            </CardFooter>
        </Card>
    );
}
