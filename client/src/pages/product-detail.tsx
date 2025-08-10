import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Zap, Award, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollTransition } from "@/hooks/use-scroll-transition";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  const { scrollProgress, backgroundGradient, textColor, overlayOpacity, celestialElements } = useScrollTransition();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  // Sample images for the carousel (you can replace these with actual product images)
  const productImages = [
    product?.imageUrl || "",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1544191696-102dbdaeeaa5?w=800&h=600&fit=crop&auto=format"
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen transition-all duration-1000 ease-in-out"
        style={{ 
          background: backgroundGradient,
          minHeight: '100vh'
        }}
      >
        <div 
          className="fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />
        
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-8 w-32 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-gray-300 h-96 rounded-2xl"></div>
                <div className="space-y-6">
                  <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
                  <div className="bg-gray-300 h-4 w-full rounded"></div>
                  <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div 
        className="min-h-screen transition-all duration-1000 ease-in-out"
        style={{ 
          background: backgroundGradient,
          minHeight: '100vh'
        }}
      >
        <div 
          className="fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />
        
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
              <Link href="/products">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

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
        
        {/* Breadcrumb */}
        <div className="bg-white/70 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/products">
              <Button variant="ghost" className="text-primary hover:text-primary/80 bg-white/60 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12">
              {/* Product Name */}
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{product?.name}</h1>
              </div>

              {/* Product Image */}
              <div className="flex justify-center">
                <div className="w-full max-w-4xl h-96 rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-sm relative">
                  {/* Current Image */}
                  <img 
                    src={productImages[currentImageIndex]} 
                    alt={`${product?.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-xl text-gray-600 leading-relaxed">{product?.description}</p>
              </div>

              {/* Product Information */}
              <div className="space-y-8 max-w-4xl mx-auto">
                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product?.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product?.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-white/60 backdrop-blur-sm border-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section - Full Width */}
        <section className="py-20 pt-0 px-60 bg-white/60 backdrop-blur-sm">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Specifications</h3>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg w-full">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {product && Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700 flex-shrink-0 mr-4">{key}</span>
                        <span className="text-right flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assured</h3>
                  <p className="text-gray-600">All products meet international quality standards and come with comprehensive warranties.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Energy Efficient</h3>
                  <p className="text-gray-600">Designed for maximum energy efficiency and reduced environmental impact.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Certified</h3>
                  <p className="text-gray-600">Certified by leading industry standards and regulatory bodies.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
