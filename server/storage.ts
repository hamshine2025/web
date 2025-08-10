import { products, inquiries, type Product, type InsertProduct, type Inquiry, type InsertInquiry } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private inquiries: Map<number, Inquiry>;
  private currentProductId: number;
  private currentInquiryId: number;

  constructor() {
    this.products = new Map();
    this.inquiries = new Map();
    this.currentProductId = 1;
    this.currentInquiryId = 1;
    this.seedProducts();
  }

  private seedProducts() {
    const seedProducts: Omit<Product, 'id'>[] = [
      {
        name: "Solar On-Grid System",
        category: "solar-systems",
        description: "A grid-tied solar system that lets you power your home with the sun while staying connected to the local grid. You can draw electricity from the grid when solar isn't enough, and send any extra you produce back for credits through net metering. This system offers lower upfront costs, consistent power supply, and the ability to earn through net metering credits. Perfect for areas with reliable grid supply and those looking to reduce electricity bills while contributing to a greener environment.",
        shortDescription: "Grid-tied solar system with net metering, lower installation costs, and consistent power supply. No batteries needed - grid acts as virtual storage.",
        features: ["No Batteries Needed", "Net Metering Credits", "Consistent Supply", "Lower Installation Cost", "Eco-Friendly", "Grid Backup Available"],
        specifications: {
          "System Type": "Grid-Tied Solar",
          "Battery Requirement": "Not Required",
          "Net Metering": "Available (varies by state)",
          "Grid Backup": "Yes - draws from grid when needed",
          "Installation Cost": "Most affordable option",
          "Best For": "Areas with reliable grid supply",
          "Warranty": "25 years on panels, 10 years on inverter"
        },
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-plug",
        tags: ["Grid-Tied", "Net Metering", "Cost-Effective", "Eco-Friendly"],
        isFeatured: 1
      },
      {
        name: "Solar Off-Grid System",
        category: "solar-systems",
        description: "Complete energy independence with battery storage. This system operates completely independently from the utility grid, using solar panels to generate electricity and batteries to store it for later use. Ideal for remote areas or places with unreliable grid access, it provides zero electricity bills and reliable power during outages. The system includes solar panels, charge controllers, battery banks, and inverters to deliver AC power for household use. Perfect for those seeking total freedom from the grid and 100% renewable energy.",
        shortDescription: "Complete off-grid solar system with battery storage for total energy independence. No monthly bills and reliable power during outages.",
        features: ["Independent Power", "Remote Area Compatible", "No Monthly Bills", "Reliable During Outages", "100% Renewable", "Battery Storage"],
        specifications: {
          "System Type": "Off-Grid Solar",
          "Battery Requirement": "Required for storage",
          "Grid Connection": "None - completely independent",
          "Power Supply": "24/7 from battery storage",
          "Best For": "Remote areas, unreliable grid",
          "Installation Cost": "Higher (batteries included)",
          "Warranty": "25 years on panels, 5-10 years on batteries"
        },
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-battery-full",
        tags: ["Off-Grid", "Battery Storage", "Energy Independent", "Remote Areas"],
        isFeatured: 1
      },
      {
        name: "Hybrid Solar System",
        category: "solar-systems",
        description: "Best of both worlds - grid access when needed and battery storage for backup power. This hybrid system blends the strengths of on-grid and off-grid setups, giving you flexibility, backup power, and savings in one package. It generates electricity from solar panels, stores extra energy in batteries, and stays connected to the local grid for additional support. With this setup, you can keep the lights on during outages, use stored power when needed, and even earn credits by sending surplus electricity to the grid through net metering.",
        shortDescription: "Hybrid solar system combining grid connection with battery backup for maximum flexibility, reliability, and energy savings.",
        features: ["Grid + Battery Backup", "Energy Independence", "Reliable Backup", "Net Metering", "Flexible Power", "Best of Both Worlds"],
        specifications: {
          "System Type": "Hybrid Solar",
          "Battery Requirement": "Required for backup",
          "Grid Connection": "Yes - for additional support",
          "Backup Power": "Battery + grid as backup",
          "Best For": "Reliability and flexibility",
          "Installation Cost": "Moderate to high",
          "Warranty": "25 years on panels, 5-10 years on batteries"
        },
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-solar-panel",
        tags: ["Hybrid", "Grid + Battery", "Flexible", "Reliable Backup"],
        isFeatured: 1
      },
      {
        name: "Solar LED Street Light",
        category: "street-lighting",
        description: "Hamshine's Solar LED Street Light is an eco-friendly, energy-efficient outdoor lighting solution designed to operate independently using solar power. Ideal for streets, highways, campuses, rural roads, and parking lots, this system offers reliable illumination without relying on the grid. Built with durable materials and advanced solar technology, it ensures long-lasting performance with minimal maintenance. Whether you're lighting up a remote village or a modern city street, Hamshine's solar-powered lights are engineered for high efficiency, sustainability, and cost savings.",
        shortDescription: "Eco-friendly, energy-efficient outdoor lighting solution designed to operate independently using solar power for streets, highways, and parking lots.",
        features: ["Fully Solar-Powered Operation", "High-Efficiency LED Technology", "Intelligent Dusk-to-Dawn Sensor", "Long-Life Lithium Battery", "Weather-Resistant and IP65 Rated", "Robust Build with Anti-Corrosion Materials", "Low Maintenance"],
        specifications: {
          "Power Source": "Solar Panel + Lithium Battery",
          "LED Technology": "High-Efficiency",
          "Control": "Dusk-to-Dawn Automatic",
          "Protection": "IP65 Weather Resistant",
          "Material": "Anti-Corrosion",
          "Maintenance": "Low Maintenance Design",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-road",
        tags: ["Solar Powered", "LED Technology", "Automatic Control", "Weather Resistant"],
        isFeatured: 0
      },
      {
        name: "Solar Home Lighting System",
        category: "home-lighting",
        description: "Solar Home Lighting System is a complete, renewable energy-based solution designed to provide uninterrupted lighting for residential spaces, especially in areas with limited or no access to the power grid. Compact, easy to install, and maintenance-free, this system is perfect for rural homes, emergency backup, cabins, and off-grid applications. It harnesses solar energy during the day and powers energy-efficient LED lights at night, making it a reliable and eco-conscious choice for households. Whether used as a primary lighting source or as a backup during power outages, our system ensures clean, green, and cost-effective energy access for every home.",
        shortDescription: "Complete renewable energy-based solution for uninterrupted lighting in residential spaces, perfect for rural homes and off-grid applications.",
        features: ["All-in-One Solar Lighting Kit", "Energy Efficient LED Lamps", "Inbuilt Battery Backup", "Multiple Light Points Support", "Low Maintenance & Durable", "Ideal for Rural, Remote & Backup Use"],
        specifications: {
          "System Type": "All-in-One Kit",
          "Components": "Solar Panel, Battery, Controller, LED Lights",
          "Light Points": "2-8 LED bulbs (configurable)",
          "Battery": "Built-in Backup",
          "Installation": "Easy Installation",
          "Maintenance": "Low Maintenance",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-home",
        tags: ["All-in-One Kit", "Energy Efficient", "Battery Backup", "Rural Use"],
        isFeatured: 1
      },
      {
        name: "Solar Garden Lighting System",
        category: "garden-lighting",
        description: "Solar Garden Lighting System is a reliable and cost-effective lighting solution for garden, landscape architects, municipalities, resort developers, and commercial property owners. It's also ideal for public parks, resorts, gardens, and pedestrian pathways. This versatile lighting solution is suited for various residential outdoor settings and can be scaled to cover larger areas efficiently.",
        shortDescription: "Reliable and cost-effective lighting solution for gardens, parks, resorts, and outdoor pathways with smart light control.",
        features: ["Ideal for Pathways, Balconies, Backyards & Lawns", "Scalable Lighting Options", "Smart Light Control with dusk-to-dawn sensors", "Enhances Landscape Design and Public Safety"],
        specifications: {
          "Application": "Garden, Landscape, Public Parks",
          "Control": "Dusk-to-Dawn Automatic",
          "Design": "Landscape Enhancement",
          "Safety": "Public Safety Improvement",
          "Scalability": "Multiple Configurations",
          "Installation": "Easy Setup",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-seedling",
        tags: ["Garden Lighting", "Landscape Design", "Smart Control", "Public Safety"],
        isFeatured: 0
      },
      {
        name: "Solar Petrol Pump Power Pack",
        category: "power-systems",
        description: "In 1996, Hamshine pioneered the 'Solar Power Pack for Petrol Pumps' as a tribute to sustainable innovation and national service. This system is designed to provide uninterrupted power supply to petrol pumps, especially during frequent power outages in rural and semi-urban areas. Mounted atop the petrol pump office building, solar panels harness sunlight and convert it into electrical energy, which is then stored in high-efficiency tubular or lithium batteries. During power failures, the stored solar energy powers the fuel dispensing system seamlessly—eliminating the need to start diesel generators, which not only consume additional fuel but also cut into profits and increase operational hassle.",
        shortDescription: "Pioneering solar power pack system for petrol pumps providing uninterrupted power supply during outages, eliminating diesel generator dependency.",
        features: ["Minimal Interruption & Fuel Dispensing During Power Cuts", "Customized Designs", "Hybrid Options Available", "Battery Backup"],
        specifications: {
          "Application": "Petrol Pump Power Backup",
          "Installation": "Mounted on Building Roof",
          "Battery Type": "Tubular or Lithium",
          "Operation": "Seamless Power Switching",
          "Design": "Customized Solutions",
          "Backup": "Hybrid Options Available",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-gas-pump",
        tags: ["Petrol Pump", "Power Backup", "Customized Design", "Hybrid System"],
        isFeatured: 1
      },
      {
        name: "Solar Water Heater System",
        category: "solar-heating",
        description: "Solar Water Heater System designed to deliver consistent hot water using clean solar energy. Ideal for residential, commercial, and institutional use, the system reduces dependence on electricity or gas, offering a cost-effective and eco-friendly alternative. With durable materials, smart design, and minimal maintenance needs, it ensures long-term performance in all weather conditions.",
        shortDescription: "Eco-friendly solar water heating system for residential, commercial, and institutional use, reducing electricity bills by 30-40%.",
        features: ["Efficient Solar Collectors", "Corrosion-Resistant Tank and Tubing", "Multiple Capacity Options", "Low Maintenance Design", "Reduces Electricity Bills"],
        specifications: {
          "Application": "Residential, Commercial, Institutional",
          "Energy Savings": "30-40% on electricity bills",
          "Material": "Corrosion-Resistant",
          "Capacity": "Multiple Options Available",
          "Maintenance": "Low Maintenance Design",
          "Performance": "All Weather Conditions",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-sun",
        tags: ["Solar Heating", "Energy Savings", "Corrosion Resistant", "Low Maintenance"],
        isFeatured: 1
      },
      {
        name: "Solar Lantern",
        category: "solar-portable",
        description: "Solar Lantern — a compact, portable, and eco-friendly lighting solution powered by the sun. Perfect for rural households, camping, emergency use, or outdoor activities, this lantern offers a sustainable alternative to traditional lighting. With an integrated solar panel, long-lasting battery, and energy-efficient LED lights, the Solar Lantern provides bright illumination without the need for electricity or fuel. Designed for ease of use and durability, it ensures dependable lighting anytime, anywhere.",
        shortDescription: "Compact, portable solar-powered lantern for rural households, camping, emergency use, and outdoor activities with bright LED illumination.",
        features: ["Solar Powered Charging", "Portable and Lightweight Design", "Bright LED Illumination", "Cost Effective", "Ideal for Emergency Use"],
        specifications: {
          "Power Source": "Solar Panel + Battery",
          "Design": "Portable and Lightweight",
          "Lighting": "Bright LED Illumination",
          "Charging": "Direct Sunlight",
          "Use Case": "Emergency, Camping, Rural",
          "Cost": "Eliminates Fuel Expenses",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-sun",
        tags: ["Portable Solar", "Emergency Light", "LED Illumination", "Cost Effective"],
        isFeatured: 0
      },
      {
        name: "Fuel Cell Educational Kit",
        category: "educational",
        description: "The Fuel Cell Educational Kit by Hamshine Solar and Energy Systems is an innovative learning tool designed to introduce students and enthusiasts to the science of hydrogen fuel cell technology. This hands-on kit provides a safe and engaging way to explore renewable energy concepts, demonstrating how hydrogen can be used to generate clean electricity. Ideal for schools, colleges, and science projects, the kit enhances interactive learning, making complex energy concepts simple and fun.",
        shortDescription: "Innovative learning tool for hydrogen fuel cell technology, perfect for schools, colleges, and science projects with hands-on experience.",
        features: ["Complete Educational Package", "Easy Assembly and Operation", "Reusable Components", "Eco-Friendly Demonstration", "Portable and Compact Design", "Ideal for Science Exhibitions"],
        specifications: {
          "Type": "Educational Learning Kit",
          "Technology": "Hydrogen Fuel Cell",
          "Assembly": "Easy Assembly",
          "Components": "Reusable and Durable",
          "Demonstration": "Zero Emissions",
          "Portability": "Compact and Lightweight",
          "Warranty": "1 year"
        },
        imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-flask",
        tags: ["Educational", "Hydrogen Power", "Science Kit", "Zero Emissions"],
        isFeatured: 0
      },
      {
        name: "Solar Hostel Lighting System",
        category: "institutional",
        description: "The Solar Hostel Lighting System by Hamshine Solar and Energy Systems is a sustainable, efficient, and cost-effective lighting solution tailored specifically for hostel buildings in rural and urban areas. Designed to operate independently from the power grid, this system harnesses solar energy to provide reliable lighting for study rooms, corridors, dormitories, and common areas. With robust components and backup storage, it ensures uninterrupted illumination—promoting safety, productivity, and energy savings for educational institutions.",
        shortDescription: "Sustainable lighting solution for hostel buildings with solar energy, ensuring uninterrupted illumination for study rooms and common areas.",
        features: ["Complete Solar-Based Lighting Solution", "Reliable Battery Backup", "Energy-Efficient LED Fixtures", "Independent Off-Grid Operation", "Supports Institutional Sustainability Goals", "Cost Saving Over Time"],
        specifications: {
          "Application": "Hostel Buildings",
          "Operation": "Off-Grid Independent",
          "Lighting": "Energy-Efficient LED",
          "Backup": "Reliable Battery Storage",
          "Sustainability": "Green Initiative Support",
          "Cost": "Significant Electricity Savings",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-bed",
        tags: ["Institutional", "Off-Grid", "Energy Efficient", "Cost Saving"],
        isFeatured: 0
      },
      {
        name: "Indoor Stadium Lights",
        category: "institutional",
        description: "Hamshine Solar and Energy Systems presents high-performance Indoor Stadium Lights designed to deliver superior illumination across large indoor sports facilities. Engineered for optimal brightness, uniform light distribution, and energy efficiency, these lights enhance visibility, safety, and performance during games and events. Whether for school gyms, indoor arenas, or multi-sport complexes, Hamshine's lighting systems offer a durable, low-maintenance solution with high lumen output and reduced operational costs.",
        shortDescription: "High-performance lighting for indoor sports facilities with superior illumination, uniform light distribution, and energy efficiency.",
        features: ["High Lumen Output", "Energy-Efficient LED Technology", "Glare-Free Illumination", "Long Lifespan", "Wide Beam Angle Options"],
        specifications: {
          "Application": "Indoor Sports Facilities",
          "Technology": "Energy-Efficient LED",
          "Illumination": "Glare-Free Uniform Light",
          "Lifespan": "50,000+ hours",
          "Beam Angle": "Wide Coverage Options",
          "Maintenance": "Low Maintenance",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1514317625640-6b1bf7c5b0b0?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-lightbulb",
        tags: ["Stadium Lighting", "High Lumen", "LED Technology", "Sports Facilities"],
        isFeatured: 0
      },
      {
        name: "Solar MPPT Charger Controller",
        category: "solar-controllers",
        description: "The Solar MPPT (Maximum Power Point Tracking) Charger Controller is a high-efficiency solar charge controller designed to optimize the power output from solar panels to charge batteries more effectively. Using advanced MPPT technology, it continuously tracks the maximum power point of the solar array to ensure maximum energy harvesting. Suitable for residential, commercial, and industrial solar systems, this controller enhances battery life, system performance, and energy savings—making it an essential component for any high-performing solar installation.",
        shortDescription: "High-efficiency MPPT charge controller optimizing solar panel power output for maximum energy harvesting and battery life enhancement.",
        features: ["Advanced MPPT Technology", "Wide Input Voltage Range", "High Conversion Efficiency", "Smart Charging Profiles", "Overload & Short-Circuit Protection", "Temperature Compensation", "Supports Remote Monitoring"],
        specifications: {
          "Technology": "MPPT (Maximum Power Point Tracking)",
          "Efficiency": "Up to 30% increase in charging",
          "Voltage Range": "Wide Input Compatibility",
          "Battery Types": "AGM, Gel, Lithium",
          "Protection": "Overload & Short-Circuit",
          "Monitoring": "Remote Monitoring Support",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-charging-station",
        tags: ["MPPT Technology", "High Efficiency", "Smart Charging", "Remote Monitoring"],
        isFeatured: 0
      },
      {
        name: "Automatic Street Lighting Solar Switch",
        category: "solar-controllers",
        description: "The Automatic Street Lighting Solar Switch is a smart, energy-efficient control device designed to automate the operation of solar-powered street lights. This intelligent switch detects ambient light levels to automatically turn street lights on at dusk and off at dawn, eliminating the need for manual control. Built for reliability and durability, it enhances the efficiency of solar lighting systems in streets, campuses, farms, industrial areas, and public spaces.",
        shortDescription: "Smart control device for solar street lights with automatic dusk-to-dawn operation, enhancing efficiency in streets and public spaces.",
        features: ["High-Sensitivity Photocell Sensor", "High Load Capacity", "Wide Voltage Compatibility", "Smart Dimming Integration", "Supports Automation & Smart Grids"],
        specifications: {
          "Control": "Automatic Dusk-to-Dawn",
          "Sensor": "High-Sensitivity Photocell",
          "Load Capacity": "High Load Support",
          "Voltage": "Wide DC/AC Compatibility",
          "Integration": "Smart Dimming Support",
          "Automation": "Smart Grid Integration",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1514317625640-6b1bf7c5b0b0?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-road",
        tags: ["Automatic Control", "Smart Sensors", "Dusk-to-Dawn", "Smart Grid"],
        isFeatured: 0
      },
      {
        name: "Solar PCU Unit",
        category: "power-systems",
        description: "The Solar PCU (Power Conditioning Unit) is an intelligent, integrated solution that efficiently manages power flow between solar panels, grid supply, and battery backup. Designed for residential, commercial, and institutional use, it ensures uninterrupted power with optimized energy savings. Unlike traditional inverters, the PCU prioritizes solar energy usage, intelligently switches sources, and safeguards your systems from fluctuations—making it ideal for areas with erratic grid availability.",
        shortDescription: "Intelligent power conditioning unit managing solar, grid, and battery power flow for uninterrupted supply with optimized energy savings.",
        features: ["Solar Priority Mode", "Inverter + Charger Combo", "User-Friendly LCD Display", "In-Built Solar Inverter", "Compatible with Most Batteries", "Solar-Only Mode for Off-Grid Operation"],
        specifications: {
          "Type": "Power Conditioning Unit",
          "Mode": "Solar Priority",
          "Components": "Inverter + Charger Combo",
          "Display": "LCD with Real-time Data",
          "Battery Support": "Lead-acid, Tubular, Lithium",
          "Operation": "Grid + Off-Grid Support",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-battery-three-quarters",
        tags: ["PCU Unit", "Solar Priority", "Integrated Solution", "Uninterrupted Power"],
        isFeatured: 0
      },
      {
        name: "Solar On-Grid Micro Inverter",
        category: "solar-controllers",
        description: "The Solar On-Grid Micro Inverter is a compact, powerful device that connects directly to individual solar panels. Unlike traditional inverters that manage the entire solar array together, a micro inverter controls each panel separately—making your solar system more efficient, flexible, and reliable. It converts solar power directly into usable electricity that goes into your home or back to the grid, helping you reduce electricity bills and make the most out of every ray of sunlight.",
        shortDescription: "Compact micro inverter for individual solar panels, enabling independent panel control and direct grid connection for maximum efficiency.",
        features: ["One Inverter Per Panel", "Direct Connection to Grid", "Easier System Expansion", "Safe & Low Voltage DC", "Smart Monitoring (Optional)", "No Battery Required"],
        specifications: {
          "Type": "Micro Inverter",
          "Connection": "One Per Panel",
          "Grid": "Direct Grid Connection",
          "Expansion": "Easy System Scaling",
          "Safety": "Low Voltage DC",
          "Monitoring": "Optional Smart Tracking",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-charging-station",
        tags: ["Micro Inverter", "Grid Connected", "Panel Independent", "Smart Monitoring"],
        isFeatured: 0
      },
      {
        name: "Solar Off-Grid UPS",
        category: "power-systems",
        description: "The Solar Off-Grid UPS is a reliable power backup solution designed for homes, offices, and remote areas without a stable electricity supply. This system uses solar energy to charge batteries and provides continuous power even during long power cuts or in off-grid locations. It combines a solar inverter and battery charger into one intelligent unit, ensuring clean, quiet, and cost-effective electricity wherever you need it.",
        shortDescription: "Reliable off-grid UPS system using solar energy for continuous power backup in homes, offices, and remote areas without stable electricity.",
        features: ["Works Without Electricity from the Grid", "Uses Solar Power to Charge Batteries", "Automatic Backup During Power Cuts", "Powers Lights, Fans, TVs & More", "Compatible with All Battery Types", "All-in-One Compact System"],
        specifications: {
          "Operation": "Off-Grid Independent",
          "Charging": "Solar Power",
          "Backup": "Automatic During Power Cuts",
          "Load Support": "Lights, Fans, TVs, Appliances",
          "Battery Types": "Tubular, Gel, Lithium, Lead-acid",
          "System": "All-in-One Compact Unit",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop&auto=format",
        iconClass: "fas fa-battery-three-quarters",
        tags: ["Off-Grid UPS", "Solar Charging", "Automatic Backup", "All-in-One System"],
        isFeatured: 0
      }
    ];

    seedProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.isFeatured === 1
    );
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date().toISOString()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
