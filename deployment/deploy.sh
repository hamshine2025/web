#!/bin/bash

# Deployment Script for Full-Stack Application
# Run this script from your local machine to deploy to EC2

set -e  # Exit on any error

# Configuration
EC2_HOST="51.21.248.240"
EC2_USER="ec2-user"
APP_NAME="hamshine-app"
REMOTE_PATH="/var/www/app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to EC2...${NC}"

# Check if SSH key is available
if [ ! -f ~/.ssh/id_rsa ]; then
    echo -e "${RED}❌ SSH key not found. Please ensure you have SSH access to your EC2 instance.${NC}"
    exit 1
fi

# Build the application locally
echo -e "${YELLOW}📦 Building application...${NC}"
npm run build

# Create logs directory on remote server
echo -e "${YELLOW}📁 Creating logs directory on remote server...${NC}"
ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "mkdir -p ${REMOTE_PATH}/logs"

# Copy built files to EC2
echo -e "${YELLOW}📤 Copying files to EC2...${NC}"
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env' \
    --exclude 'logs' \
    ./ ${EC2_USER}@${EC2_HOST}:${REMOTE_PATH}/

# Install dependencies on remote server
echo -e "${YELLOW}📦 Installing dependencies on remote server...${NC}"
ssh ${EC2_USER}@${EC2_HOST} "cd ${REMOTE_PATH} && npm install --production"

# Restart application with PM2
echo -e "${YELLOW}🔄 Restarting application...${NC}"
ssh ${EC2_USER}@${EC2_HOST} "cd ${REMOTE_PATH} && pm2 restart ${APP_NAME} || pm2 start ecosystem.config.js --env production"

# Save PM2 configuration
echo -e "${YELLOW}💾 Saving PM2 configuration...${NC}"
ssh ${EC2_USER}@${EC2_HOST} "pm2 save"

# Check application status
echo -e "${YELLOW}📊 Checking application status...${NC}"
ssh ${EC2_USER}@${EC2_HOST} "pm2 status"

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application should be available at: http://${EC2_HOST}${NC}"
echo -e "${GREEN}🌐 Or at: http://hamshineindustries.com${NC}"

# Optional: Check application health
echo -e "${YELLOW}🏥 Checking application health...${NC}"
sleep 5
if curl -f http://${EC2_HOST}/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is healthy!${NC}"
else
    echo -e "${RED}❌ Application health check failed. Check logs with: ssh ${EC2_USER}@${EC2_HOST} 'pm2 logs ${APP_NAME}'${NC}"
fi 