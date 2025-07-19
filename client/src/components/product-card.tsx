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
    <Card className={`${featured ? "bg-slate-50" : "bg-white"} rounded-2xl hover:shadow-xl transition-shadow duration-300 group`}>
      <CardContent className="p-6">
        <div className="mb-6">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-dark">{product.name}</h3>
            <i className={`${product.iconClass} text-primary text-2xl`}></i>
          </div>
          <p className="text-neutral-medium">{product.shortDescription}</p>
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
          <Link href={`/products/${product.id}`}>
            <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
