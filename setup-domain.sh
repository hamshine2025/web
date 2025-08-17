#!/bin/bash

# Domain Setup Script for hamshineindustries.com
# Run this on your server at 51.21.245.8 (Amazon Linux)

set -e

echo "🌐 Setting up domain hamshineindustries.com..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
yum update -y

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "📥 Installing Nginx..."
    yum install -y nginx
else
    echo "✅ Nginx is already installed"
fi

# Backup existing Nginx config
echo "💾 Backing up existing Nginx configuration..."
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S)

# For Amazon Linux, we'll modify the main nginx.conf directly
echo "📝 Installing custom Nginx configuration..."

# Create a backup of the original nginx.conf
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.original

# Replace the entire nginx.conf with our custom configuration
cp nginx-http.conf /etc/nginx/nginx.conf

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    # Start Nginx if not running
    if ! systemctl is-active --quiet nginx; then
        echo "🚀 Starting Nginx..."
        systemctl start nginx
    else
        echo "🔄 Reloading Nginx..."
        systemctl reload nginx
    fi
    
    # Enable Nginx to start on boot
    echo "🚀 Enabling Nginx to start on boot..."
    systemctl enable nginx
    
    echo "✅ Domain setup completed successfully!"
    echo ""
    echo "🌐 Your application should now be accessible at:"
    echo "   http://hamshineindustries.com"
    echo "   http://www.hamshineindustries.com"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Point your domain DNS to 51.21.245.8"
    echo "   2. Set up SSL certificates (recommended)"
    echo "   3. Test your application"
    echo ""
    echo "🔧 Useful commands:"
    echo "   - View Nginx status: systemctl status nginx"
    echo "   - View Nginx logs: tail -f /var/log/nginx/error.log"
    echo "   - Test Nginx config: nginx -t"
    echo "   - Reload Nginx: systemctl reload nginx"
    echo "   - Restore original config: cp /etc/nginx/nginx.conf.original /etc/nginx/nginx.conf"
    
else
    echo "❌ Nginx configuration test failed"
    echo "Restoring original configuration..."
    cp /etc/nginx/nginx.conf.original /etc/nginx/nginx.conf
    echo "Please check the configuration and try again"
    exit 1
fi 