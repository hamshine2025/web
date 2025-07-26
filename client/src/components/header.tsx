import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="relative bg-gradient-to-br from-primary/95 to-primary-light/95 backdrop-blur-sm text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span>15+ Years Excellence</span>
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
              <span className="block">Illuminating</span>
              <span className="block text-yellow-300">Tomorrow</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Leading manufacturer of professional lighting systems, solar solutions, and power management equipment for modern infrastructure needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/products">
              <Button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 text-lg">
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-lg">
                Get Consultation
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300">99%</div>
              <div className="text-white/80 mt-2">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300">25+</div>
              <div className="text-white/80 mt-2">Years Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300">24/7</div>
              <div className="text-white/80 mt-2">Energy Efficiency</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}