
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted pt-16 pb-8 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
                            Kingsway Fried Chicken
                        </h3>
                        <p className="text-muted-foreground">
                            Serving the crispiest, juiciest fried chicken in town since 2024. Made with love and our secret spice blend.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                            <li><Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link></li>
                            <li><Link href="/locations" className="text-muted-foreground hover:text-primary">Locations</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/admin/login" className="text-muted-foreground hover:text-primary">Staff Login</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>123 Chicken Blvd,<br />Los Angeles, CA 90001</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>hello@crispychicken.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-muted-foreground text-sm">
                    <p>&copy; {new Date().getFullYear()} Kingsway Fried Chicken Restaurant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
