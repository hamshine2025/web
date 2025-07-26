import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import ModernProductGrid from "@/components/modern-product-grid";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, Award, Leaf, Settings, MapPin, Phone, Mail, Clock, Lightbulb, Battery, Sun, Zap } from "lucide-react";
import { useScrollTransition } from "@/hooks/use-scroll-transition";
import type { Product } from "@shared/schema";

export default function Home() {
  const { scrollProgress, backgroundGradient, textColor, overlayOpacity, celestialElements } = useScrollTransition();
  
  const { data: featuredProducts, isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: allProducts, isLoading: allLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const productCategories = [
    { name: "Street Lighting", icon: "fas fa-road", category: "street-lighting" },
    { name: "Garden Lighting", icon: "fas fa-seedling", category: "garden-lighting" },
    { name: "Petrol Pump Power", icon: "fas fa-gas-pump", category: "power-systems" },
    { name: "Power Packs", icon: "fas fa-battery-three-quarters", category: "power-systems" },
    { name: "Solar Lanterns", icon: "fas fa-sun", category: "solar-portable" },
    { name: "Fuel Cell Kits", icon: "fas fa-flask", category: "educational" },
    { name: "Hostel Lighting", icon: "fas fa-bed", category: "institutional" },
    { name: "Solar PWM Charger", icon: "fas fa-charging-station", category: "solar-controllers" },
  ];

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{ 
        background: backgroundGradient,
        minHeight: '100vh'
      }}
    >
      {/* Overlay for content readability during dark sections */}
      <div 
        className="fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-10"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Celestial Elements */}
      {celestialElements.map((element, index) => (
        <div
          key={`${element.type}-${index}`}
          className="fixed pointer-events-none z-5 transition-opacity duration-1000"
          style={{
            ...element.position,
            opacity: element.opacity
          }}
        >
          {element.type === 'sun' && (
            <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
            </div>
          )}
          {element.type === 'moon' && (
            <div className="w-12 h-12 bg-gray-100 rounded-full shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 rounded-full"></div>
            </div>
          )}
          {element.type === 'star' && (
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-sm"></div>
          )}
        </div>
      ))}
      
      <div className="relative z-20">
        <Navigation />
        <Header />

        {/* Featured Products Section */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our premium lighting and energy solutions designed for modern infrastructure needs
              </p>
            </div>

            <ModernProductGrid products={featuredProducts || []} isLoading={featuredLoading} />
            
            <div className="text-center mt-12">
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="py-20 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Product Categories</h2>
              <p className="text-xl text-gray-600">Explore our comprehensive range of lighting and energy solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Street Lighting</h3>
                  <p className="text-gray-600 mb-6">Professional LED street lighting systems for urban infrastructure</p>
                  <Link href="/products">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Sun className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Solar Solutions</h3>
                  <p className="text-gray-600 mb-6">Eco-friendly solar water heaters and energy systems</p>
                  <Link href="/products">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Battery className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Power Systems</h3>
                  <p className="text-gray-600 mb-6">Reliable power packs and energy storage solutions</p>
                  <Link href="/products">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Controls</h3>
                  <p className="text-gray-600 mb-6">Advanced automation and control systems</p>
                  <Link href="/products">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Hamshine Industries</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our products are engineered with cutting-edge technology to deliver superior performance, energy efficiency, and long-term reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Certified Quality</h3>
                  <p className="text-gray-600 leading-relaxed">All products meet international quality standards including ISO, CE, and RoHS certifications for guaranteed performance.</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Eco-Friendly</h3>
                  <p className="text-gray-600 leading-relaxed">Sustainable materials and energy-efficient operations reduce environmental impact by up to 70% compared to traditional systems.</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Settings className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Technology</h3>
                  <p className="text-gray-600 leading-relaxed">IoT-enabled systems with remote monitoring, automatic controls, and predictive maintenance capabilities.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/90 to-primary-light/90 backdrop-blur-sm text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Illuminate Your Future?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Contact our experts for personalized lighting and energy solutions tailored to your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 text-lg">
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
