import { Link } from "wouter";
import { Lightbulb, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-2xl font-bold">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              <span>Hamshine Industries</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading manufacturer of professional lighting systems, solar solutions, and power management equipment for modern infrastructure needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/products"><a className="hover:text-white transition-colors">Street Lighting</a></Link></li>
              <li><Link href="/products"><a className="hover:text-white transition-colors">Home Lighting</a></Link></li>
              <li><Link href="/products"><a className="hover:text-white transition-colors">Garden Lighting</a></Link></li>
              <li><Link href="/products"><a className="hover:text-white transition-colors">Solar Systems</a></Link></li>
              <li><Link href="/products"><a className="hover:text-white transition-colors">Power Solutions</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Installation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consultation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News & Updates</a></li>
              <li><Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Hamshine Industries. All rights reserved. | 
            <a href="#" className="hover:text-white transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
