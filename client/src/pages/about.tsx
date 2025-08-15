import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Eye, Handshake } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="relative z-20">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Hamshine Industries</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Since our inception in 1984, Hamshine has been dedicated to delivering innovative, high-quality solutions with a customer-first mindset. Our belief that "the customer is king" drives every aspect of our operations. With a strong global presence and an unwavering focus on excellence, we continue to provide technologically advanced products backed by reliable after-sales service. We take great pride in building lasting relationships through trust, quality, and performance.
              </p>
            </div>
          </div>
        </section>

        {/* Message from Founder */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-dark mb-4">Message from the Founder</h2>
            </div>
            
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-blue-100">
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary shadow-lg">
                    <img 
                      src="/founder.png" 
                      alt="Hamsaraj H J - Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <blockquote className="text-lg lg:text-xl text-neutral-dark leading-relaxed italic">
                  "When I returned to India in 1982 after spending a decade working abroad in the field of non-conventional energy and power distribution, I came back with a vision — a vision to contribute meaningfully to our country's growing energy needs. In 1984, that vision took shape with the founding of Hamshine Electronics and Energy Systems in Hassan. From the very beginning, our mission has been clear: to identify the energy needs of India and address them with innovation, integrity, and reliability. We have always believed that progress begins by putting the customer first, and that belief continues to drive everything we do. At Hamshine, we don't just deliver products — we deliver purpose-driven energy solutions that power lives and transform industries. Our journey is one of commitment, quality, and a passion for renewable energy. I invite you to be part of that journey with us."
                </blockquote>
                
                <div className="text-center pt-6 border-t border-blue-100">
                  <h3 className="text-xl font-bold text-neutral-dark">Hamsaraj H J</h3>
                  <p className="text-primary font-medium">Founder & Visionary, Hamshine Electronics and Energy Systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-dark mb-4">Our Foundation</h2>
              <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
                Built on strong principles and driven by innovation, we continue to lead the industry in sustainable energy solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Our Mission</h3>
                  <p className="text-neutral-medium">
                    To provide innovative, sustainable energy solutions that empower communities and drive progress through cutting-edge technology and unwavering commitment to quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Our Vision</h3>
                  <p className="text-neutral-medium">
                    To be the leading force in renewable energy solutions, creating a sustainable future where clean energy is accessible to all, fostering economic growth and environmental stewardship.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">Our Values</h3>
                  <p className="text-neutral-medium">
                    Integrity, innovation, customer focus, and sustainability form the cornerstone of our operations, guiding every decision and action we take.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-dark mb-4">Our Impact</h2>
              <p className="text-xl text-neutral-medium">Numbers that reflect our commitment to excellence</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-neutral-medium">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">40+</div>
                <div className="text-neutral-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99%</div>
                <div className="text-neutral-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-dark">Our Journey</h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                {/* 1984 - Left */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="text-3xl font-bold text-primary mb-2">1984</div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">The Beginning</h3>
                      <p className="text-neutral-medium leading-relaxed">
                        Founded by Hamsaraj H J in Hassan, Karnataka, Hamshine Electronics and Energy Systems began with a vision to address India's growing energy needs through innovative solutions.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* 1990s - Right */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="text-3xl font-bold text-primary mb-2">1990s</div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">Expansion & Innovation</h3>
                      <p className="text-neutral-medium leading-relaxed">
                        Expanded operations across Karnataka and neighboring states, introducing solar lighting solutions and establishing strong partnerships with government and private sectors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2000s - Left */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="text-3xl font-bold text-primary mb-2">2000s</div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">Technology Leadership</h3>
                      <p className="text-neutral-medium leading-relaxed">
                        Emerged as a technology leader in renewable energy, launching comprehensive solar solutions for residential, commercial, and industrial applications.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* 2010s - Right */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="text-3xl font-bold text-primary mb-2">2010s</div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">National Presence</h3>
                      <p className="text-neutral-medium leading-relaxed">
                        Expanded nationwide presence, establishing regional offices and service centers, while maintaining the highest standards of quality and customer service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2020s - Left */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                      <div className="text-3xl font-bold text-primary mb-2">2020s</div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-3">Future Forward</h3>
                      <p className="text-neutral-medium leading-relaxed">
                        Embracing cutting-edge technologies, IoT integration, and smart energy solutions while continuing to serve as a trusted partner in India's renewable energy revolution.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-dark mb-4">Leadership Team</h2>
              <p className="text-xl text-neutral-medium">
                Meet the visionary leaders driving innovation and growth at Hamshine Industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white"><img src="/pr.jpeg" alt="Paudan Raj" className="w-full h-full object-cover rounded-full" /></span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-2">Paudan Raj</h3>
                  <p className="text-sm text-neutral-medium">
                    Chief Executive Officer
                  </p>
                  <p className="text-sm text-neutral-medium mt-2">
                    Leading strategic initiatives and driving company growth with over 20 years of industry experience.
                  </p>
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
