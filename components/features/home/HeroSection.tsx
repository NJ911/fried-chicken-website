"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Background/Ambient Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                            Best Fried Chicken in Town 🍗
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-extrabold pb-2 leading-tight tracking-tight">
                        Crispy outside. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                            Juicy inside.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                        Experience the crunch that everyone is talking about. Freshly prepared, secret spice blend, and served piping hot.
                    </p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Button size="lg" className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25 transition-transform hover:scale-105" asChild>
                            <Link href="/menu?type=pickup">Order Pickup</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg h-14 px-8 rounded-full border-2 hover:bg-secondary/10 transition-transform hover:scale-105" asChild>
                            <Link href="/menu?type=delivery">Order Delivery</Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-[500px] mx-auto lg:ml-auto"
                >
                    <div className="relative aspect-square w-full">
                        {/* Decorative circle */}
                        <div className="absolute inset-4 border-2 border-primary/20 rounded-full animate-[spin_30s_linear_infinite]" />

                        {/* Main Image */}
                        {/* Using a relative path that will be available after I copy the artifact */}
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-primary/30 border-4 border-background">
                            <Image
                                src="/hero_chicken.png"
                                alt="Delicious Basket of Fried Chicken"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-xl border border-border"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-3xl">🔥</span>
                                <div>
                                    <p className="font-bold text-sm">Spicy Mode</p>
                                    <p className="text-xs text-muted-foreground">Available Now</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
