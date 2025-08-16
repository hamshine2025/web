#!/bin/bash

# EC2 Setup Script for Full-Stack Application
# Run this script on your EC2 instance after connecting via SSH

set -e  # Exit on any error

echo "🚀 Starting EC2 setup for your full-stack application..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js 18+
echo "📦 Installing Node.js 18..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify Node.js installation
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install PM2 globally
echo "📦 Installing PM2 process manager..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install Git
echo "📦 Installing Git..."
sudo yum install -y git

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/app
sudo chown ec2-user:ec2-user /var/www/app

# Install Certbot for SSL (optional)
echo "📦 Installing Certbot for SSL certificates..."
sudo yum install -y certbot python3-certbot-nginx

echo "✅ EC2 setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <your-repo-url> /var/www/app"
echo "2. Navigate to app directory: cd /var/www/app"
echo "3. Install dependencies: npm install"
echo "4. Create .env file with your environment variables"
echo "5. Build the application: npm run build"
echo "6. Start with PM2: pm2 start dist/index.js --name 'your-app'"
echo "7. Configure Nginx (see deployment guide)"
echo ""
echo "For detailed instructions, see: deployment/ec2-deployment-guide.md" 