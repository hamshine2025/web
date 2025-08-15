import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import ModernProductGrid from "@/components/modern-product-grid";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, Award, Leaf, Settings, MapPin, Phone, Mail, Clock, Lightbulb, Battery, Sun, Zap, Grid, Power, Shield } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts, isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: allProducts, isLoading: allLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get solar system products from API data
  const solarSystemProducts = allProducts?.filter(product => product.category === "solar-systems" || product.category === "solar-lighting-system") || [];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="relative z-20">
        <Navigation />
        <Header />

       
        {/* Featured Products Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
                Discover our premium lighting and energy solutions designed for modern infrastructure needs
              </p>
            </div>

            <ModernProductGrid products={featuredProducts || []} isLoading={featuredLoading} />
            
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-neutral-dark">Why Choose Hamshine Industries</h2>
              <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
                Our products are engineered with cutting-edge technology to deliver superior performance, energy efficiency, and long-term reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Certified Quality</h3>
                  <p className="text-neutral-medium">All products meet international quality standards including ISO, CE, and RoHS certifications.</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Eco-Friendly Design</h3>
                  <p className="text-neutral-medium">Sustainable materials and energy-efficient operations reduce environmental impact by up to 70%.</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Smart Technology</h3>
                  <p className="text-neutral-medium">IoT-enabled systems with remote monitoring, automatic controls, and predictive maintenance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solar Energy Solutions Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-dark mb-6">Solar Energy Solutions</h2>
              <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
                Comprehensive solar solutions for residential, commercial, and industrial applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {solarSystemProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <i className={`${product.iconClass} text-primary text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-dark">{product.name}</h3>
                        <p className="text-sm text-neutral-medium">{product.category.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <p className="text-neutral-medium mb-4 line-clamp-3">{product.shortDescription}</p>
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Contact Section */}
        <section className="py-16 bg-blue-50">
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
