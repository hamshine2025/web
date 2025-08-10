import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, Grid, Power, Shield, Sun } from "lucide-react";
import { useScrollTransition } from "@/hooks/use-scroll-transition";
import type { Product } from "@shared/schema";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { scrollProgress, backgroundGradient, textColor, overlayOpacity, celestialElements } = useScrollTransition();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    { id: "all", name: "All Products", count: products?.length || 0 },
    { id: "solar-systems", name: "Solar Systems", count: products?.filter(p => p.category === "solar-systems").length || 0 },
    { id: "street-lighting", name: "Street Lighting", count: products?.filter(p => p.category === "street-lighting").length || 0 },
    { id: "home-lighting", name: "Home Lighting", count: products?.filter(p => p.category === "home-lighting").length || 0 },
    { id: "garden-lighting", name: "Garden Lighting", count: products?.filter(p => p.category === "garden-lighting").length || 0 },
    { id: "solar-heating", name: "Solar Heating", count: products?.filter(p => p.category === "solar-heating").length || 0 },
    { id: "power-systems", name: "Power Solutions", count: products?.filter(p => p.category === "power-systems").length || 0 },
    { id: "solar-portable", name: "Solar Portable", count: products?.filter(p => p.category === "solar-portable").length || 0 },
    { id: "educational", name: "Educational", count: products?.filter(p => p.category === "educational").length || 0 },
    { id: "institutional", name: "Institutional", count: products?.filter(p => p.category === "institutional").length || 0 },
    { id: "solar-controllers", name: "Solar Controllers", count: products?.filter(p => p.category === "solar-controllers").length || 0 },
  ];

  // Get solar system products from API data
  const solarSystemProducts = products?.filter(product => product.category === "solar-systems") || [];

  const filteredProducts = products?.filter((product) => {
    const matchesCategory = selectedCategory === null || selectedCategory === "all" || product.category === selectedCategory;
    return matchesCategory;
  });

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
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover our comprehensive range of lighting and solar energy solutions designed for every application
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white/70 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                  className={`${selectedCategory === category.id ? "bg-primary text-white" : "border-white/30 text-neutral-dark hover:bg-white/20 bg-white/60 backdrop-blur-sm"}`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-white/80 text-gray-600">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Results Summary */}
            <div className="mt-4 text-sm text-neutral-medium text-center">
              {filteredProducts ? (
                <p>Showing {filteredProducts.length} of {products?.length || 0} products</p>
              ) : (
                <p>Loading products...</p>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-8">
                  No products available in the selected category
                </p>
                <Button 
                  onClick={() => setSelectedCategory(null)}
                  className="bg-primary text-white hover:bg-primary-dark"
                >
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
