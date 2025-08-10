import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <Card className={`${featured ? "bg-slate-50" : "bg-white"} rounded-2xl hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col`}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-6">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-800 flex-1 pr-2 overflow-hidden group-hover:!text-primary transition-colors">
              <span className="block truncate">{product.name}</span>
            </h3>
            <i className={`${product.iconClass} text-primary text-2xl flex-shrink-0`}></i>
          </div>
          <p className="text-gray-600 flex-1 overflow-hidden">
            <span className="block line-clamp-3" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.shortDescription}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/products/${product.id}`} className="mt-auto">
            <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
