#!/bin/bash

# Simple Docker Deployment Script
# Deploy to: 51.21.245.8

set -e

echo "🚀 Starting deployment to 51.21.245.8..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t hamshine-web:latest .

# Stop and remove existing container if it exists
echo "🔄 Stopping existing container..."
docker stop hamshine-web || true
docker rm hamshine-web || true

# Run the new container
echo "🚀 Starting new container..."
docker run -d \
  --name hamshine-web \
  --restart unless-stopped \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  hamshine-web:latest

# Wait a moment for the container to start
echo "⏳ Waiting for container to start..."
sleep 5

# Check container status
echo "📊 Container status:"
docker ps | grep hamshine-web

# Check logs
echo "📋 Recent logs:"
docker logs --tail 20 hamshine-web

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should be available at: http://51.21.245.8:5000"
echo "📝 To view logs: docker logs -f hamshine-web"
echo "🛑 To stop: docker stop hamshine-web" 