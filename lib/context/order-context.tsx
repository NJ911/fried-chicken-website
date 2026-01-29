"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type OrderStatus = "pending" | "preparing" | "ready" | "completed";

export type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    options?: string[];
    price: number;
};

export type Order = {
    id: string;
    customerName: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
    type: "pickup" | "delivery";
};

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "status" | "createdAt">) => void;
    updateOrderStatus: (id: string, status: OrderStatus) => void;
    isAdmin: boolean;
    login: (password: string) => boolean;
    logout: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Load orders from localStorage
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }

        // Load admin session
        const adminSession = localStorage.getItem("isAdmin");
        if (adminSession === "true") {
            setIsAdmin(true);
        }

        // Listen for storage changes (cross-tab sync)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "orders" && e.newValue) {
                setOrders(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("orders", JSON.stringify(orders));
        }
    }, [orders, isMounted]);

    const addOrder = (orderData: Omit<Order, "id" | "status" | "createdAt">) => {
        const newOrder: Order = {
            ...orderData,
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        setOrders((prev) => [newOrder, ...prev]);

        // Simulate notifying the kitchen (optional, for demo)
        if (isAdmin) {
            toast.info("New Order Received!");
        }
    };

    const updateOrderStatus = (id: string, status: OrderStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
    };

    const login = (password: string) => {
        if (password === "admin123") {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                updateOrderStatus,
                isAdmin,
                login,
                logout,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrders must be used within a OrderProvider");
    }
    return context;
}
