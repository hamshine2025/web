import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Eye, Handshake } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Hamshine Industries</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Pioneer in energy-efficient lighting and solar solutions with over 15 years of industry expertise
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-dark mb-4">Our Foundation</h2>
            <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
              Built on strong principles and driven by innovation, we continue to lead the industry in sustainable energy solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Lightbulb className="w-12 h-12 text-yellow-300" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-blue-100">
                    To provide innovative, sustainable lighting and energy solutions that enhance quality of life while reducing environmental impact through cutting-edge technology and exceptional service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent-green to-green-600 text-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Eye className="w-12 h-12 text-green-200" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-green-100">
                    To become the leading provider of smart energy solutions globally, driving the transition to sustainable lighting and renewable energy systems for a brighter tomorrow.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 text-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Handshake className="w-12 h-12 text-slate-300" />
                  <h3 className="text-2xl font-bold">Our Values</h3>
                  <ul className="text-slate-200 space-y-2">
                    <li>• Quality & Reliability</li>
                    <li>• Innovation & Technology</li>
                    <li>• Environmental Responsibility</li>
                    <li>• Customer Satisfaction</li>
                    <li>• Continuous Improvement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Our Impact</h2>
            <p className="text-xl text-neutral-medium">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-neutral-medium">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-green mb-2">15+</div>
              <div className="text-neutral-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-neutral-medium">Expert Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-green mb-2">99%</div>
              <div className="text-neutral-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-neutral-dark">Our Journey</h2>
              <div className="space-y-6">
                <p className="text-lg text-neutral-medium leading-relaxed">
                  Founded over 15 years ago with a vision to revolutionize the lighting and energy industry, Hamshine Industries has grown from a small startup to a leading manufacturer of professional lighting systems and solar solutions.
                </p>
                <p className="text-lg text-neutral-medium leading-relaxed">
                  Our commitment to innovation, quality, and customer satisfaction has enabled us to serve over 500 projects across residential, commercial, and industrial sectors. We continuously invest in research and development to bring cutting-edge solutions to market.
                </p>
                <p className="text-lg text-neutral-medium leading-relaxed">
                  Today, we stand as a trusted partner for businesses and individuals seeking reliable, energy-efficient lighting and power solutions. Our comprehensive product portfolio includes everything from street lighting systems to educational fuel cell kits.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Manufacturing facility" 
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                  alt="Solar installation" 
                  className="rounded-xl shadow-lg w-full h-32 object-cover"
                />
                <img 
                  src="https://pixabay.com/get/g3685d4b13d3b4887de59f9715158fdc9544901bf0c8585b68ad69a3e85c668a062f42010606bb09c847bfadbc4d46252b240c4f641c2d2acebfc5694546cdbfe_1280.jpg" 
                  alt="LED street lighting" 
                  className="rounded-xl shadow-lg w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-dark mb-4">Leadership Team</h2>
            <p className="text-xl text-neutral-medium">
              Experienced professionals driving innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">RS</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Rajesh Sharma</h3>
                <p className="text-primary font-medium mb-2">Chief Executive Officer</p>
                <p className="text-sm text-neutral-medium">
                  15+ years in renewable energy sector, leading strategic vision and company growth.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-accent-green to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">PK</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Priya Kumari</h3>
                <p className="text-primary font-medium mb-2">Chief Technology Officer</p>
                <p className="text-sm text-neutral-medium">
                  Expert in LED technology and smart lighting systems with 12+ years experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AG</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">Anil Gupta</h3>
                <p className="text-primary font-medium mb-2">Head of Operations</p>
                <p className="text-sm text-neutral-medium">
                  Manufacturing excellence and quality assurance specialist with 10+ years experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
