import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle, Grid, Power, Shield, Sun, Zap, Lightbulb, Droplets, Thermometer, Battery } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    { id: "all", name: "All Products", count: products?.length || 0 },
    { id: "solar-power-system", name: "Solar Power System", count: products?.filter(p => p.category === "solar-power-system").length || 0 },
    { id: "solar-charging-system", name: "Solar Charging System", count: products?.filter(p => p.category === "solar-charging-system").length || 0 },
    { id: "solar-lighting-system", name: "Solar Lighting System", count: products?.filter(p => p.category === "solar-lighting-system").length || 0 },
    { id: "solar-pump-system", name: "Solar Pump System", count: products?.filter(p => p.category === "solar-pump-system").length || 0 },
    { id: "solar-heating-system", name: "Solar Heating System", count: products?.filter(p => p.category === "solar-heating-system").length || 0 },
  ];

  const filteredProducts = products?.filter((product) => {
    const matchesCategory = selectedCategory === null || selectedCategory === "all" || product.category === selectedCategory;
    return matchesCategory;
  });

  // Debug logging
  console.log("Selected Category:", selectedCategory);
  console.log("All Products:", products?.length);
  console.log("Filtered Products:", filteredProducts?.length);
  console.log("Product Categories:", products?.map(p => p.category));

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
    setSelectedCategory(categoryId === "all" ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="relative z-20">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover our comprehensive range of solar energy solutions designed for every application - from residential lighting to industrial power systems
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-dark mb-2">Browse by Category</h3>
              <p className="text-neutral-medium">Filter our products by category to find exactly what you need</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id || (selectedCategory === null && category.id === "all")
                      ? "bg-primary text-white"
                      : "bg-blue-50 text-neutral-dark hover:bg-blue-100 border border-blue-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-dark mb-4">
                {selectedCategory === null || selectedCategory === "all" 
                  ? "All Products" 
                  : `${categories.find(c => c.id === selectedCategory)?.name || "Products"}`
                }
              </h2>
              <p className="text-neutral-medium max-w-3xl mx-auto">
                {selectedCategory === null || selectedCategory === "all"
                  ? "Browse our complete catalog of solar energy and lighting solutions"
                  : `Showing ${filteredProducts?.length || 0} products in this category`
                }
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-neutral-medium">Loading products...</p>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">No Products Found</h3>
                <p className="text-neutral-medium mb-8">
                  No products match your current filter. Try selecting a different category.
                </p>
                <Button onClick={() => setSelectedCategory(null)} className="bg-primary text-white hover:bg-primary/90">
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
