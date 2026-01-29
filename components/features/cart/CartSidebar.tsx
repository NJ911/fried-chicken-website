"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/context/cart-context";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSidebar() {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:w-[400px] flex flex-col p-6">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Your Order
                    </SheetTitle>
                    <SheetDescription>
                        Review your delicious picks before checkout.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 -mx-6 px-6 py-4 min-h-0">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                            <span className="text-6xl">🍗</span>
                            <p className="text-lg font-medium">Your cart is empty.</p>
                            <p className="text-muted-foreground">Looks like you haven't added any crispy goodness yet.</p>
                            <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                                Browse Menu
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                                        <p className="text-sm font-medium text-primary">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        {item.options && item.options.length > 0 && (
                                            <p className="text-xs text-muted-foreground">{item.options.join(", ")}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-r-none"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-l-none"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive/90"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <div className="pt-4 space-y-4">
                        <Separator />
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax (Estimated)</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white" asChild>
                                <Link href="/checkout">Checkout</Link>
                            </Button>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
