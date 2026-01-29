"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    reason: string;
    message: string;
    date: string;
    read: boolean;
};

interface ContactContextType {
    messages: ContactMessage[];
    addMessage: (message: Omit<ContactMessage, "id" | "date" | "read">) => void;
    markAsRead: (id: string) => void;
    deleteMessage: (id: string) => void;
    unreadCount: number;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load messages from localStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem("contact_messages");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to parse contact messages", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("contact_messages", JSON.stringify(messages));
        }
    }, [messages, isLoaded]);

    const addMessage = (data: Omit<ContactMessage, "id" | "date" | "read">) => {
        const newMessage: ContactMessage = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            read: false,
        };
        setMessages((prev) => [newMessage, ...prev]);
    };

    const markAsRead = (id: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, read: true } : msg
            )
        );
    };

    const deleteMessage = (id: string) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        toast.success("Message deleted");
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <ContactContext.Provider
            value={{
                messages,
                addMessage,
                markAsRead,
                deleteMessage,
                unreadCount,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
}

export function useContact() {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error("useContact must be used within a ContactProvider");
    }
    return context;
}
