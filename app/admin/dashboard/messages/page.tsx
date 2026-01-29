"use client";

import { useContact } from "@/lib/context/contact-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, MailOpen, Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminMessagesPage() {
    const { messages, markAsRead, deleteMessage } = useContact();
    const router = useRouter();

    if (messages.length === 0) {
        return (
            <div className="space-y-6 pt-20 px-4 container mx-auto max-w-7xl">
                <Button variant="ghost" onClick={() => router.push("/admin/dashboard")} className="mb-4 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Contact Messages</h1>
                </div>
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No messages received yet.
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-20 px-4 container mx-auto max-w-7xl">
            <Button variant="ghost" onClick={() => router.push("/admin/dashboard")} className="mb-4 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Contact Messages</h1>
                <span className="text-muted-foreground">
                    {messages.length} Total Messages
                </span>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[150px]">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reason</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Message</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {messages.map((msg) => (
                                    <tr key={msg.id} className={`border-b transition-colors hover:bg-muted/50 ${msg.read ? "bg-muted/20 opacity-60" : "font-medium"}`}>
                                        <td className="p-4 align-middle">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => markAsRead(msg.id)}
                                                title={msg.read ? "Read" : "Mark as read"}
                                                className="h-8 w-8"
                                            >
                                                {msg.read ? (
                                                    <MailOpen className="w-4 h-4 text-muted-foreground" />
                                                ) : (
                                                    <Mail className="w-4 h-4 text-blue-500 fill-current" />
                                                )}
                                            </Button>
                                        </td>
                                        <td className="p-4 align-middle whitespace-nowrap text-muted-foreground">
                                            {new Date(msg.date).toLocaleDateString()} <br />
                                            <span className="text-xs">{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="p-4 align-middle">{msg.name}</td>
                                        <td className="p-4 align-middle">{msg.email}</td>
                                        <td className="p-4 align-middle">
                                            <span className="capitalize px-2 py-1 rounded bg-muted text-xs border">
                                                {msg.reason}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle max-w-xs truncate" title={msg.message}>
                                            {msg.message}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => deleteMessage(msg.id)}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
