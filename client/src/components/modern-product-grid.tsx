import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ModernProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ModernProductGrid({ products, isLoading }: ModernProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse h-full flex flex-col">
            <div className="h-64 bg-gray-200"></div>
            <CardContent className="p-6 flex flex-col flex-1">
              <div className="space-y-4 flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products?.slice(0, 3).map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm h-full flex flex-col">
          <div className="relative overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4">
              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="space-y-4 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 flex-1 overflow-hidden">
                <span className="block" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.shortDescription}
                </span>
              </p>
              
              {/* Feature Icons */}
              <div className="flex space-x-4 text-primary">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs">Energy Efficient</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Leaf className="w-4 h-4" />
                  <span className="text-xs">Eco-Friendly</span>
                </div>
              </div>
              
              <Link href={`/products/${product.id}`} className="mt-auto">
                <Button className="w-full flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}