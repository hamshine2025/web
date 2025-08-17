#!/bin/bash

# Domain Setup Script for hamshineindustries.com
# Run this on your server at 51.21.245.8

set -e

echo "🌐 Setting up domain hamshineindustries.com..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."


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

# Copy our custom configuration
echo "📝 Installing custom Nginx configuration..."
cp nginx.conf /etc/nginx/sites-available/hamshineindustries.com

# Create symbolic link to enable the site
echo "🔗 Enabling the site..."
ln -sf /etc/nginx/sites-available/hamshineindustries.com /etc/nginx/sites-enabled/

# Remove default site if it exists
if [ -L /etc/nginx/sites-enabled/default ]; then
    echo "🗑️ Removing default Nginx site..."
    rm /etc/nginx/sites-enabled/default
fi

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    # Reload Nginx
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    
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
    
else
    echo "❌ Nginx configuration test failed"
    echo "Please check the configuration and try again"
    exit 1
fi 