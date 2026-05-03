"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { MENU_ITEMS, CATEGORIES } from "@/lib/data";
import { useCart } from "@/lib/context/cart-context";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { addItem } = useCart();

    // State to track selected option/pricing tier for items that have them
    // Key: item.id, Value: selected tier key (e.g., "2", "4")
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    const filteredItems = MENU_ITEMS.filter((item) => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        // Sort by popular first
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
    });

    const handleOptionChange = (itemId: string, value: string) => {
        setSelectedOptions(prev => ({ ...prev, [itemId]: value }));
    };

    const handleAddToCart = (item: typeof MENU_ITEMS[0]) => {
        let finalPrice = item.price;
        let finalName = item.name;

        // Check if item has pricing tiers and a selection has been made
        if (item.pricingTiers) {
            // Default to the first tier if nothing selected (usually the smallest quantity)
            const tierKeys = Object.keys(item.pricingTiers);
            const selectedKey = selectedOptions[item.id] || tierKeys[0];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const priceForTier = (item.pricingTiers as any)[Number(selectedKey)];

            if (priceForTier) {
                finalPrice = priceForTier;
                finalName = `${item.name} (${selectedKey} pcs)`;
            }
        }

        addItem({
            id: item.id,
            name: finalName,
            price: finalPrice,
            image: item.image,
        });
        toast.success(`Added ${finalName} to cart!`);
    };

    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            <div className="bg-primary/5 py-12 md:py-20 mb-8">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Our Menu</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore our crispy, juicy, and delicious offerings. From buckets to sandwiches, we have it all.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-20 z-40 bg-background/95 backdrop-blur py-4 rounded-xl border shadow-sm px-4">
                    <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto overflow-x-auto">
                        <TabsList className="h-auto p-1 bg-muted">
                            {CATEGORIES.map((cat) => (
                                <TabsTrigger key={cat} value={cat} className="px-4 py-2 rounded-md">
                                    {cat}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for perfection..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {filteredItems.map((item) => {
                            // Calculate current price based on selection
                            let currentPrice = item.price;
                            let currentUnit = "";
                            if (item.pricingTiers) {
                                const tierKeys = Object.keys(item.pricingTiers);
                                const selectedKey = selectedOptions[item.id] || tierKeys[0];
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                currentPrice = (item.pricingTiers as any)[Number(selectedKey)] || item.price;
                                currentUnit = " / " + selectedKey + " pcs";
                            }

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    key={item.id}
                                    className="group bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden bg-muted shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                        {item.popular && (
                                            <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-sm">
                                                Popular
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-4 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="font-bold text-xl leading-tight">{item.name}</h3>
                                            <span className="font-bold text-lg text-primary shrink-0">
                                                ${currentPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm line-clamp-2 min-h-[40px]">
                                            {item.description}
                                        </p>

                                        <div className="mt-auto space-y-3">
                                            {item.pricingTiers && (
                                                <div className="bg-muted/50 p-2 rounded-lg">
                                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Select Quantity:</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {Object.keys(item.pricingTiers).map((tierKey) => {
                                                            const isSelected = (selectedOptions[item.id] || Object.keys(item.pricingTiers!)[0]) === tierKey;
                                                            return (
                                                                <button
                                                                    key={tierKey}
                                                                    onClick={() => handleOptionChange(item.id, tierKey)}
                                                                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${isSelected
                                                                        ? "bg-primary text-primary-foreground border-primary"
                                                                        : "bg-background hover:bg-muted border-input"
                                                                        }`}
                                                                >
                                                                    {tierKey} pcs
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <Button
                                                className="w-full gap-2 bg-primary hover:bg-primary/90 text-white group-hover:translate-y-0 translate-y-0 opacity-90 group-hover:opacity-100 transition-all font-semibold"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <Plus className="w-4 h-4" /> Add to Order
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No menu items found for your search.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
}
