// This file contains static data that might be used across components
// Currently, all data is handled through the API, but this file can be used
// for static content like company information, contact details, etc.

export const companyInfo = {
  name: "Hamshine Industries",
  tagline: "Illuminating Tomorrow with Smart Energy Solutions",
  description: "Leading manufacturer of professional lighting systems, solar solutions, and power management equipment for residential, commercial, and industrial applications.",
  
  contact: {
    address: "NO 7A1 B. KATIHALLI INDUSTRIAL AREA, Hassan - Karnataka State (573201, India)",
    phone: "7019666827",
    email: "hamshine@gmail.com",
    emailSecondary: "hamshine@hotmail.com",
    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM"
  },
  
  stats: {
    projectsCompleted: "500+",
    yearsExperience: "15+",
    teamMembers: "50+",
    clientSatisfaction: "99%"
  },
  
  socialMedia: {
    facebook: "#",
    twitter: "#", 
    linkedin: "#",
    instagram: "#"
  }
};

export const productCategories = [
  {
    id: "street-lighting",
    name: "Street Lighting",
    description: "Professional LED street lighting systems"
  },
  {
    id: "home-lighting", 
    name: "Home Lighting",
    description: "Smart home lighting solutions"
  },
  {
    id: "garden-lighting",
    name: "Garden Lighting", 
    description: "Decorative outdoor lighting"
  },
  {
    id: "solar-heating",
    name: "Solar Systems",
    description: "Solar water heating and energy systems"
  },
  {
    id: "power-systems",
    name: "Power Solutions",
    description: "Power packs and energy storage"
  },
  {
    id: "solar-portable",
    name: "Solar Portable",
    description: "Portable solar devices"
  },
  {
    id: "educational",
    name: "Educational",
    description: "Educational kits and tools"
  },
  {
    id: "institutional", 
    name: "Institutional",
    description: "Lighting for institutions"
  },
  {
    id: "solar-controllers",
    name: "Solar Controllers",
    description: "Solar charge controllers"
  }
];
