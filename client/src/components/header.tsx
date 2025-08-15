import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="relative bg-gradient-to-br from-primary to-primary-light text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 text-sm text-white/90">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span>40+ Years Excellence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-yellow-300" />
              <span>500+ Projects</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-white"><span className="font-serif">I</span>lluminating</span>
              <span className="block text-yellow-300">Tomorrow</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Leading manufacturer of professional lighting systems, solar solutions, and power management equipment for modern infrastructure needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/products">
              <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Request Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}