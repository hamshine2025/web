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
        name: "LED Street Lighting System",
        category: "street-lighting",
        description: "High-efficiency LED street lights with smart controls and automatic operation for urban and highway applications. Features weatherproof design, energy-saving technology, and long-lasting performance.",
        shortDescription: "High-efficiency LED street lights with smart controls and automatic operation for urban and highway applications.",
        features: ["LED Technology", "Smart Controls", "Automatic Operation", "Weatherproof Design", "Energy Efficient"],
        specifications: {
          "Power Rating": "50W - 200W",
          "Luminous Efficacy": "130 lm/W",
          "Color Temperature": "4000K - 6500K",
          "IP Rating": "IP65",
          "Lifespan": "50,000 hours",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-road",
        tags: ["LED Technology", "Energy Efficient", "Smart Control"],
        isFeatured: 1
      },
      {
        name: "Solar Water Heater System",
        category: "solar-heating",
        description: "Eco-friendly solar water heating solutions for residential and commercial use with maximum energy savings. Features high-efficiency collectors, insulated storage tanks, and automatic temperature control.",
        shortDescription: "Eco-friendly solar water heating solutions for residential and commercial use with maximum energy savings.",
        features: ["Solar Powered", "Energy Efficient", "Automatic Control", "Insulated Tank", "All Weather Operation"],
        specifications: {
          "Capacity": "100L - 500L",
          "Collector Area": "2-8 sq.m",
          "Efficiency": "85%+",
          "Material": "Stainless Steel",
          "Insulation": "PUF Foam",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        iconClass: "fas fa-sun",
        tags: ["Eco-Friendly", "Cost Effective", "Solar Powered"],
        isFeatured: 1
      },
      {
        name: "Home Lighting System",
        category: "home-lighting",
        description: "Smart home lighting solutions with dimming controls, energy efficiency, and modern design aesthetics. Compatible with home automation systems and mobile app control.",
        shortDescription: "Smart home lighting solutions with dimming controls, energy efficiency, and modern design aesthetics.",
        features: ["Smart Control", "Dimming Function", "App Control", "Energy Saving", "Modern Design"],
        specifications: {
          "Power Range": "5W - 50W",
          "Control": "WiFi/Bluetooth",
          "Dimming": "0-100%",
          "Color Options": "Warm/Cool White, RGB",
          "Lifespan": "25,000 hours",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        iconClass: "fas fa-home",
        tags: ["Smart Control", "Energy Saving", "Modern Design"],
        isFeatured: 1
      },
      {
        name: "Garden Lighting System",
        category: "garden-lighting",
        description: "Decorative and functional garden lighting solutions with weather-resistant design and low-voltage operation for safe outdoor illumination.",
        shortDescription: "Decorative and functional garden lighting solutions with weather-resistant design.",
        features: ["Weather Resistant", "Low Voltage", "Decorative Design", "Easy Installation", "Timer Control"],
        specifications: {
          "Voltage": "12V/24V DC",
          "Power": "3W - 15W",
          "IP Rating": "IP67",
          "Material": "Aluminum/Stainless Steel",
          "Installation": "Ground/Wall Mount",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-seedling",
        tags: ["Weather Resistant", "Decorative", "Low Voltage"],
        isFeatured: 0
      },
      {
        name: "Petrol Pump Power Pack",
        category: "power-systems",
        description: "Reliable power pack systems for petrol pump operations with backup power solutions and automatic switching capabilities.",
        shortDescription: "Reliable power pack systems for petrol pump operations with backup power solutions.",
        features: ["Backup Power", "Automatic Switching", "High Reliability", "Easy Maintenance", "Safety Features"],
        specifications: {
          "Power Output": "5kW - 25kW",
          "Backup Time": "4-8 hours",
          "Switch Time": "<5 seconds",
          "Fuel Type": "Diesel/Solar Hybrid",
          "Efficiency": "92%+",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-gas-pump",
        tags: ["Backup Power", "High Reliability", "Automatic"],
        isFeatured: 0
      },
      {
        name: "Power Pack Solutions",
        category: "power-systems",
        description: "Comprehensive energy storage and power management solutions for industrial and commercial applications with advanced monitoring.",
        shortDescription: "Comprehensive energy storage and power management solutions for industrial applications.",
        features: ["Energy Storage", "Power Management", "Remote Monitoring", "Scalable Design", "Grid Integration"],
        specifications: {
          "Capacity": "10kWh - 100kWh",
          "Output": "5kW - 50kW",
          "Battery Type": "Lithium/Lead-Acid",
          "Monitoring": "IoT Enabled",
          "Efficiency": "95%+",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-battery-three-quarters",
        tags: ["Energy Storage", "IoT Enabled", "Scalable"],
        isFeatured: 0
      },
      {
        name: "Solar Lantern",
        category: "solar-portable",
        description: "Portable solar-powered lanterns for outdoor activities, emergency lighting, and areas without grid power access.",
        shortDescription: "Portable solar-powered lanterns for outdoor activities and emergency lighting.",
        features: ["Portable Design", "Solar Charging", "LED Light", "USB Charging Port", "Weather Resistant"],
        specifications: {
          "Solar Panel": "5W Monocrystalline",
          "Battery": "3.7V 2200mAh",
          "Light Output": "200-400 lumens",
          "Charging Time": "6-8 hours",
          "Runtime": "8-12 hours",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        iconClass: "fas fa-sun",
        tags: ["Portable Solar", "Emergency Light", "USB Charging"],
        isFeatured: 0
      },
      {
        name: "Fuel Cell Educational Kit",
        category: "educational",
        description: "Educational fuel cell demonstration kits for schools and colleges to learn about renewable energy technology and hydrogen power.",
        shortDescription: "Educational fuel cell demonstration kits for schools and colleges.",
        features: ["Educational Tool", "Hydrogen Power", "Safe Design", "Demonstration Ready", "Comprehensive Manual"],
        specifications: {
          "Power Output": "1W - 5W",
          "Fuel Type": "Hydrogen",
          "Components": "Fuel Cell, Electrolyzer, Storage",
          "Age Group": "12+ years",
          "Safety": "Child Safe Materials",
          "Warranty": "1 year"
        },
        imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-flask",
        tags: ["Educational", "Hydrogen Power", "Safe Design"],
        isFeatured: 0
      },
      {
        name: "Hostel Lighting System",
        category: "institutional",
        description: "Energy-efficient lighting solutions designed specifically for hostels, dormitories, and institutional buildings with centralized control.",
        shortDescription: "Energy-efficient lighting solutions designed specifically for hostels and institutional buildings.",
        features: ["Centralized Control", "Energy Efficient", "Durable Design", "Easy Maintenance", "Cost Effective"],
        specifications: {
          "Power": "15W - 40W per unit",
          "Control": "Central/Individual",
          "Mounting": "Ceiling/Wall",
          "Material": "Polycarbonate",
          "Lifespan": "30,000 hours",
          "Warranty": "3 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-bed",
        tags: ["Institutional", "Energy Efficient", "Centralized"],
        isFeatured: 0
      },
      {
        name: "Solar PWM Charger",
        category: "solar-controllers",
        description: "Pulse Width Modulation charge controllers for solar panel systems with battery protection and monitoring features.",
        shortDescription: "PWM charge controllers for solar panel systems with battery protection.",
        features: ["PWM Technology", "Battery Protection", "LCD Display", "Multiple Protection", "Easy Installation"],
        specifications: {
          "Current Rating": "10A - 60A",
          "Voltage": "12V/24V Auto",
          "Display": "LCD with backlight",
          "Protection": "Overcharge/Discharge/Short Circuit",
          "Efficiency": "98%+",
          "Warranty": "2 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
        iconClass: "fas fa-charging-station",
        tags: ["PWM Technology", "Battery Protection", "Solar Controller"],
        isFeatured: 0
      },
      {
        name: "Automatic Street Lighting System",
        category: "street-lighting",
        description: "Advanced automatic street lighting systems with light sensors, timer controls, and remote monitoring capabilities for smart city applications.",
        shortDescription: "Advanced automatic street lighting systems with sensors and remote monitoring.",
        features: ["Light Sensors", "Timer Control", "Remote Monitoring", "Energy Saving", "Smart City Ready"],
        specifications: {
          "Control": "Automatic/Manual/Remote",
          "Sensors": "Light/Motion/PIR",
          "Communication": "GSM/WiFi/LoRa",
          "Power": "30W - 150W",
          "Monitoring": "Real-time Data",
          "Warranty": "5 years"
        },
        imageUrl: "https://images.unsplash.com/photo-1514317625640-6b1bf7c5b0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        iconClass: "fas fa-road",
        tags: ["Automatic Control", "Smart Sensors", "Remote Monitoring"],
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
