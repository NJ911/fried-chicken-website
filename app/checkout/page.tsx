"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCart } from "@/lib/context/cart-context";
import { useOrders } from "@/lib/context/order-context";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number required"),
    orderType: z.enum(["pickup", "delivery"]),
    address: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    paymentMethod: z.enum(["card", "cash"]),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
}).refine((data) => {
    if (data.orderType === "delivery") {
        return !!data.address && !!data.city && !!data.zip;
    }
    return true;
}, {
    message: "Delivery address is required for delivery orders",
    path: ["address"],
}).refine((data) => {
    if (data.paymentMethod === "card") {
        return !!data.cardNumber && !!data.expiry && !!data.cvc;
    }
    return true;
}, {
    message: "Card details are required",
    path: ["cardNumber"],
});

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrders();
    const router = useRouter();

    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            orderType: "pickup",
            address: "",
            city: "",
            zip: "",
            paymentMethod: "card",
            cardNumber: "",
            expiry: "",
            cvc: "",
        },
    });

    const orderType = form.watch("orderType");
    const paymentMethod = form.watch("paymentMethod");

    function onSubmit(values: z.infer<typeof checkoutSchema>) {
        addOrder({
            customerName: `${values.firstName} ${values.lastName}`,
            items: items.map(i => ({
                id: i.id,
                name: i.name,
                quantity: i.quantity,
                price: i.price,
                options: i.options
            })),
            total: cartTotal * 1.08 + (values.orderType === "delivery" ? 5 : 0),
            type: values.orderType,
        });

        toast.success("Order placed successfully!");
        clearCart();
        router.push("/order-confirmation");
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
                    <p className="text-muted-foreground">Go back and add some chicken!</p>
                    <Button onClick={() => router.push("/menu")}>View Menu</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 py-12 md:py-24">
            <div className="container px-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Contact Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
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
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="(555) 123-4567" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Order Type */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Delivery Method</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="orderType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="pickup" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">Pickup (In Store)</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="delivery" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">Delivery</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {orderType === "delivery" && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                                <FormField
                                                    control={form.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Street Address</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="123 Chicken St" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="city"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>City</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Los Angeles" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="zip"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Zip Code</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="90001" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Payment Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="mb-2 block">Method</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-row space-x-4"
                                                        >
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-md cursor-pointer has-[:checked]:border-primary hover:bg-muted">
                                                                <FormControl>
                                                                    <RadioGroupItem value="card" />
                                                                </FormControl>
                                                                <FormLabel className="cursor-pointer">Credit Card</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0 border p-4 rounded-md cursor-pointer has-[:checked]:border-primary hover:bg-muted">
                                                                <FormControl>
                                                                    <RadioGroupItem value="cash" />
                                                                </FormControl>
                                                                <FormLabel className="cursor-pointer">Pay at Counter</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {paymentMethod === "card" && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                                <FormField
                                                    control={form.control}
                                                    name="cardNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Card Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="0000 0000 0000 0000" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="expiry"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Expiry</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="MM/YY" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="cvc"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>CVC</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="123" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Button type="submit" size="lg" className="w-full text-lg">
                                    Place Order
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (8%)</span>
                                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span>{orderType === "delivery" ? "$5.00" : "$0.00"}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${(cartTotal * 1.08 + (orderType === "delivery" ? 5 : 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
