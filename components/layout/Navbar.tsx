"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/context/cart-context";

const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/locations", label: "Locations" },
    { href: "/catering", label: "Catering" },
    { href: "/about", label: "About Us" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm border-b"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
                        Kingsway Fried Chicken
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs text-white bg-primary hover:bg-primary pointer-events-none">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>

                    <Button className="hidden md:flex bg-primary text-white hover:bg-primary/90" asChild>
                        <Link href="/menu">Order Now</Link>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <SheetDescription className="sr-only">Navigation links</SheetDescription>
                            <div className="flex flex-col gap-6 mt-10">
                                <Link href="/" className="text-xl font-bold text-primary">
                                    Kingsway Fried Chicken
                                </Link>
                                <div className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-lg font-medium hover:text-primary transition-colors block py-2 border-b border-border/50"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full bg-primary text-white" size="lg" asChild>
                                        <Link href="/menu">Order Now</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
