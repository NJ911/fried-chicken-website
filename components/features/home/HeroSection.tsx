"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";
import { ChickenCanvas } from "./ChickenCanvas";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to animation progress
    // We want the animation to complete before the section finishes scrolling completely
    const animationProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                {/* Background/Ambient Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container px-4 z-10 grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Text Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                                Best Fried Chicken in Vancouver 🍗
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
                    </div>

                    {/* Animation Canvas Area */}
                    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full h-full"
                        >
                            <ChickenCanvas scrollYProgress={animationProgress} />

                            {/* Vignette Overlay for blending edges into background */}
                            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,hsl(var(--background))_70%)]" />
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute bottom-10 -left-6 bg-background p-4 rounded-xl shadow-xl border border-border"
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
                </div>
            </div>
        </section>
    );
}
