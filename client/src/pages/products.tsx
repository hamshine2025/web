import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    { id: "all", name: "All Products", count: products?.length || 0 },
    { id: "street-lighting", name: "Street Lighting", count: products?.filter(p => p.category === "street-lighting").length || 0 },
    { id: "home-lighting", name: "Home Lighting", count: products?.filter(p => p.category === "home-lighting").length || 0 },
    { id: "garden-lighting", name: "Garden Lighting", count: products?.filter(p => p.category === "garden-lighting").length || 0 },
    { id: "solar-heating", name: "Solar Systems", count: products?.filter(p => p.category === "solar-heating").length || 0 },
    { id: "power-systems", name: "Power Solutions", count: products?.filter(p => p.category === "power-systems").length || 0 },
    { id: "solar-portable", name: "Solar Portable", count: products?.filter(p => p.category === "solar-portable").length || 0 },
    { id: "educational", name: "Educational", count: products?.filter(p => p.category === "educational").length || 0 },
    { id: "institutional", name: "Institutional", count: products?.filter(p => p.category === "institutional").length || 0 },
    { id: "solar-controllers", name: "Solar Controllers", count: products?.filter(p => p.category === "solar-controllers").length || 0 },
  ];

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
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

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
                  className={`${selectedCategory === category.id ? "bg-primary text-white" : "border-gray-300 text-neutral-dark hover:bg-gray-50"}`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-600">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-neutral-medium">
            {filteredProducts ? (
              <p>Showing {filteredProducts.length} of {products?.length || 0} products</p>
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 rounded-xl w-full h-48 mb-6"></div>
                  <div className="space-y-4">
                    <div className="bg-gray-300 h-6 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-full"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                    <div className="bg-gray-300 h-10 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl text-gray-300 mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">No products found</h3>
              <p className="text-neutral-medium">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
