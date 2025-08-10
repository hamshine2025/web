import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useScrollTransition } from "@/hooks/use-scroll-transition";
import type { InsertInquiry } from "@shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    productCategory: "",
    projectDetails: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { scrollProgress, backgroundGradient, textColor, overlayOpacity, celestialElements } = useScrollTransition();

  const createInquiryMutation = useMutation({
    mutationFn: async (inquiry: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", inquiry);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent Successfully!",
        description: "Thank you for your inquiry. We will contact you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        productCategory: "",
        projectDetails: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.productCategory || !formData.projectDetails) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    createInquiryMutation.mutate(formData);
  };

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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Ready to illuminate your project? Contact our experts for personalized solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-800">Send us a Message</CardTitle>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productCategory" className="text-gray-700 font-medium">Product Category *</Label>
                      <Select value={formData.productCategory} onValueChange={(value) => handleInputChange("productCategory", value)}>
                        <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary">
                          <SelectValue placeholder="Select a product category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="street-lighting">Street Lighting</SelectItem>
                          <SelectItem value="garden-lighting">Garden Lighting</SelectItem>
                          <SelectItem value="solar-heating">Solar Systems</SelectItem>
                          <SelectItem value="power-systems">Power Solutions</SelectItem>
                          <SelectItem value="solar-portable">Solar Portable</SelectItem>
                          <SelectItem value="educational">Educational Kits</SelectItem>
                          <SelectItem value="institutional">Institutional Lighting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDetails" className="text-gray-700 font-medium">Project Details *</Label>
                      <Textarea
                        id="projectDetails"
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary min-h-32"
                        placeholder="Tell us about your project requirements, specifications, and any specific needs..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white hover:bg-primary-dark py-3 text-lg font-semibold"
                      disabled={createInquiryMutation.isPending}
                    >
                      {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Ready to start your lighting or energy project? Our team of experts is here to help you find the perfect solution for your needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
                          <p className="text-gray-600">
                            Hamshine Electronics and Energy Systems<br />
                            NO 7A1 B. KATIHALLI INDUSTRIAL AREA,<br />
                            Hassan - Karnataka State (573201, India)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
                          <p className="text-gray-600">
                            Customer Service Number: 7019666827
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                          <p className="text-gray-600">
                            hamshine@gmail.com<br />
                            hamshine@hotmail.com
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h3>
                          <p className="text-gray-600">
                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 9:00 AM - 2:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Media */}
                <div className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-primary hover:text-white">
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-primary hover:text-white">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-primary hover:text-white">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-primary hover:text-white">
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
