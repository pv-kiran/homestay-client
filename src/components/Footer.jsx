import React from 'react';
import { Home, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">StayHome</h3>
                        <p className="text-gray-400">
                            Discover unique homes and experiences around the world.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Contact</h4>
                        <div className="space-y-2 text-gray-400">
                            <div className="flex items-center gap-2">
                                <Home size={16} />
                                <span>123 Travel Street, World</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>hello@stayhome.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+1 234 567 890</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Host with Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Support</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-indigo-400 transition">
                                <Instagram />
                            </a>
                            <a href="#" className="hover:text-indigo-400 transition">
                                <Twitter />
                            </a>
                            <a href="#" className="hover:text-indigo-400 transition">
                                <Facebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>© 2024 StayHome. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}