# Hamshine Industries - EC2 Deployment Summary

## Application Details
- **Domain**: hamshineindustries.com
- **EC2 IP**: 51.21.248.240
- **Application Port**: 5000
- **App Name**: hamshine-app

## Quick Deployment Steps

### 1. Connect to EC2
```bash
ssh -i your-key.pem ec2-user@51.21.248.240
```

### 2. Run Setup Script
```bash
# Copy setup script to EC2
scp -i your-key.pem deployment/setup-ec2.sh ec2-user@51.21.248.240:~/

# Run on EC2
chmod +x setup-ec2.sh
./setup-ec2.sh
```

### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/your-username/your-repo.git /var/www/app
cd /var/www/app

# Setup environment
cp deployment/env.example .env
nano .env  # Edit with your database URL and session secret

# Install and build
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### 4. Configure Nginx
```bash
sudo cp deployment/nginx.conf /etc/nginx/conf.d/hamshine-app.conf
sudo nginx -t
sudo systemctl reload nginx
```

## Access URLs
- **IP Access**: http://51.21.248.240
- **Domain Access**: http://hamshineindustries.com

## Important Commands

### PM2 Management
```bash
pm2 status                    # Check app status
pm2 logs hamshine-app         # View logs
pm2 restart hamshine-app      # Restart app
pm2 stop hamshine-app         # Stop app
pm2 monit                     # Monitor processes
```

### Nginx Management
```bash
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo nginx -t                 # Test configuration
sudo tail -f /var/log/nginx/access.log  # View access logs
```

### System Monitoring
```bash
htop                         # Monitor system resources
df -h                        # Check disk space
sudo yum update -y           # Update system
```

## Security Group Configuration
Make sure your EC2 security group allows:
- **SSH (22)**: Your IP only
- **HTTP (80)**: 0.0.0.0/0
- **HTTPS (443)**: 0.0.0.0/0
- **Custom TCP (5000)**: 0.0.0.0/0

## Environment Variables Required
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
```

## SSL Setup (Optional)
```bash
sudo certbot --nginx -d hamshineindustries.com -d www.hamshineindustries.com
```

## Troubleshooting

### Application Not Starting
```bash
pm2 logs hamshine-app
# Check for database connection issues or missing environment variables
```

### Nginx Issues
```bash
sudo nginx -t
sudo systemctl status nginx
# Check if port 5000 is accessible
```

### Port Issues
- Verify security group allows port 5000
- Check if application is running: `pm2 status`
- Test local access: `curl http://localhost:5000`

## Files Created
- `deployment/ec2-deployment-guide.md` - Complete deployment guide
- `deployment/quick-start.md` - Quick deployment steps
- `deployment/setup-ec2.sh` - EC2 setup script
- `deployment/nginx.conf` - Nginx configuration
- `deployment/pm2-ecosystem.config.js` - PM2 configuration
- `deployment/deploy.sh` - Deployment script
- `deployment/env.example` - Environment variables template
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## Next Steps
1. Set up SSL certificate
2. Configure domain DNS
3. Set up monitoring
4. Implement CI/CD pipeline
5. Set up database backups 