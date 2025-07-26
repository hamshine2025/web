import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, Award, Leaf, Settings, MapPin, Phone, Mail, Clock } from "lucide-react";
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
        <HeroSection />

      {/* Product Categories Section */}
      <section id="products" className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-dark mb-4">Our Product Portfolio</h2>
            <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
              Comprehensive lighting and energy solutions designed for modern infrastructure needs
            </p>
          </div>

          {/* Featured Products Grid */}
          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 rounded-xl w-full h-48 mb-6"></div>
                  <div className="space-y-4">
                    <div className="bg-gray-300 h-6 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-full"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          )}

          {/* Complete Product List */}
          <div className="bg-gradient-to-r from-slate-100/60 to-slate-50/60 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-dark mb-8 text-center">Complete Product Range</h3>
            {allLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="bg-gray-300 h-4 rounded w-24"></div>
                        <div className="bg-gray-300 h-3 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts?.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <i className={`${product.iconClass} text-primary`}></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-dark">{product.name}</h4>
                          <p className="text-sm text-neutral-medium">{product.category.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technical Excellence Section */}
      <section className="py-20 bg-slate-100/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-neutral-dark">Technical Excellence & Innovation</h2>
              <p className="text-xl text-neutral-medium leading-relaxed">
                Our products are engineered with cutting-edge technology to deliver superior performance, energy efficiency, and long-term reliability.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark mb-2">Certified Quality</h3>
                    <p className="text-neutral-medium">All products meet international quality standards including ISO, CE, and RoHS certifications.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark mb-2">Eco-Friendly Design</h3>
                    <p className="text-neutral-medium">Sustainable materials and energy-efficient operations reduce environmental impact by up to 70%.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark mb-2">Smart Technology</h3>
                    <p className="text-neutral-medium">IoT-enabled systems with remote monitoring, automatic controls, and predictive maintenance.</p>
                  </div>
                </div>
              </div>

              <Button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90">
                Download Technical Specifications
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                  alt="Industrial lighting equipment" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src="https://pixabay.com/get/g5faa4da10c050836f2e83dbd5f3b116efcd27ca7412407531a6178655470b71101717e5ffdda2e5d969cac2b4c8a580372001a4364979f0e4f687ef8a2fe173c_1280.jpg" 
                  alt="Solar panel installation" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover mt-8"
                />
                <img 
                  src="https://pixabay.com/get/g3685d4b13d3b4887de59f9715158fdc9544901bf0c8585b68ad69a3e85c668a062f42010606bb09c847bfadbc4d46252b240c4f641c2d2acebfc5694546cdbfe_1280.jpg" 
                  alt="Professional LED street lighting" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                  alt="Modern solar energy system" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">25+</div>
                  <div className="text-sm text-neutral-medium">Years Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-neutral-medium">
              Contact our experts for personalized lighting and energy solutions.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link href="/products">
              <Button className="bg-primary text-white px-8 py-3 hover:bg-primary/90">
                Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-primary text-primary px-8 py-3 hover:bg-primary hover:text-white">
                Contact Us
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
