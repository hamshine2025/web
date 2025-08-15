import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ModernProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ModernProductGrid({ products, isLoading = false }: ModernProductGridProps) {
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      title: "Coming Soon",
      description: "Product details page is under development.",
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white border-0 shadow-lg animate-pulse">
            <CardContent className="p-6">
              <div className="h-64 bg-blue-200"></div>
              <div className="space-y-4 mt-6">
                <div className="h-6 bg-blue-200 rounded w-3/4"></div>
                <div className="h-4 bg-blue-200 rounded w-full"></div>
                <div className="h-4 bg-blue-200 rounded w-2/3"></div>
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
        <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white h-full flex flex-col">
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
                <h3 className="text-xl font-bold text-neutral-dark group-hover:text-primary transition-colors">
                  <span className="block truncate">{product.name}</span>
                </h3>
                <i className={`${product.iconClass} text-primary text-2xl flex-shrink-0`}></i>
              </div>
              <p className="text-neutral-medium flex-1 overflow-hidden">
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
              <Button 
                onClick={handleViewDetails}
                className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}