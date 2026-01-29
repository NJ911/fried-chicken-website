import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/context/cart-context";
import { OrderProvider } from "@/lib/context/order-context";
import { ContactProvider } from "@/lib/context/contact-context";
import { CartSidebar } from "@/components/features/cart/CartSidebar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kingsway Fried Chicken | Best Fried Chicken in Town",
  description: "Order fresh, hot, and crispy fried chicken online for pickup or delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <OrderProvider>
            <ContactProvider>
              <Navbar />
              <main className="min-h-screen pt-16">
                {children}
              </main>
              <Footer />
              <CartSidebar />
              <Toaster richColors position="top-center" />
            </ContactProvider>
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
