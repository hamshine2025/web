# Hamshine Industries - E-commerce Platform

## Overview

This is a modern React-based e-commerce platform for Hamshine Industries, a lighting and solar solutions manufacturer. The application features a product catalog, inquiry system, and company information pages. Built with TypeScript, React, Express.js, and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.
Brand Color: #007a37 (green) - Updated color scheme from blue to green across the entire website.
UI Design: Day-to-night transition effect - Background gradually transitions from sunrise/morning colors at the top to deep night colors at the bottom as user scrolls through the website.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Pattern**: RESTful API with `/api` prefix
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling middleware

### Data Storage
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM for type-safe database interactions
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **In-Memory Fallback**: MemStorage class for development/testing without database

## Key Components

### Database Schema
- **Products Table**: Core product information including specifications, features, images, and categorization
- **Inquiries Table**: Customer inquiry form submissions
- **Shared Types**: TypeScript interfaces generated from Drizzle schema

### API Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/featured` - Fetch featured products only
- `GET /api/products/:id` - Fetch single product by ID
- `GET /api/products/category/:category` - Fetch products by category
- `POST /api/inquiries` - Submit customer inquiry

### Frontend Pages
- **Home**: Hero section, featured products, company stats
- **Products**: Product catalog with search and category filtering
- **Product Detail**: Individual product information with specifications
- **About**: Company information, mission, vision, values
- **Contact**: Contact form and company contact details
- **404**: Not found page

### UI System
- **Design System**: shadcn/ui components built on Radix UI
- **Theme**: Custom color palette with CSS variables, dynamic day-to-night gradient background
- **Typography**: Tailwind CSS typography utilities
- **Icons**: Lucide React icons + FontAwesome class references
- **Scroll Effects**: Custom hook for day-to-night transition with celestial elements (sun, moon, stars)
- **Responsive**: Mobile-first responsive design

## Data Flow

1. **Product Data**: Static seed data in MemStorage class serves as data source
2. **API Layer**: Express routes handle HTTP requests and interact with storage layer
3. **Frontend Queries**: React Query manages API calls, caching, and state synchronization
4. **Component Rendering**: React components consume query data and render UI
5. **Form Handling**: React Hook Form with Zod validation for contact forms

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for styling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script

### Environment Setup
- **Development**: `npm run dev` - runs server with hot reload
- **Production**: `npm run build && npm start` - builds and serves production assets
- **Database URL**: Required via `DATABASE_URL` environment variable

### File Structure
- `/client` - React frontend application
- `/server` - Express.js backend application  
- `/shared` - Shared TypeScript types and schemas
- `/dist` - Built application files for production

The application is structured as a monorepo with clear separation between frontend, backend, and shared code, making it maintainable and scalable for future enhancements.