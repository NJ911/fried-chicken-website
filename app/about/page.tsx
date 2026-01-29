"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container px-4 max-w-4xl mx-auto space-y-16">

                {/* Intro */}
                <section className="text-center space-y-6">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Story</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        It started with a <br />
                        <span className="text-primary">Family Recipe.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Founded in 2024, Kingsway Fried Chicken was born from a simple desire: to make the crunchiest, juiciest, most flavorful fried chicken in the world. No shortcuts, just fresh ingredients and passion.
                    </p>
                </section>

                {/* Quality Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-muted aspect-square rounded-2xl overflow-hidden relative">
                        {/* Placeholder for About Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-primary/5">
                            [Kitchen Image Placeholder]
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Quality First</h2>
                        <div className="space-y-4">
                            <p>
                                We believe that great fried chicken starts with great birds. That's why we only source <strong>hormone-free, free-range chicken</strong> from local farms.
                            </p>
                            <p>
                                Our chicken is marinated for 24 hours in our secret blend of herbs and spices, then hand-breaded and fried to order in 100% refined peanut oil.
                            </p>
                            <p>
                                The result? A crust that shatters and meat that melts in your mouth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Promise</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-xl mb-2">Always Fresh</h3>
                            <p className="text-muted-foreground">Never frozen. Delivered daily to our kitchens.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">Hand-Crafted</h3>
                            <p className="text-muted-foreground">Every piece is inspected and breaded by hand.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">Community Focused</h3>
                            <p className="text-muted-foreground">We give back to local schools and shelters.</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
