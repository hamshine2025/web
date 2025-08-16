# Quick Start: Deploy to EC2

This is a simplified guide to get your application running on EC2 quickly.

## Prerequisites
- AWS Account
- EC2 instance running Amazon Linux 2023
- SSH access to your EC2 instance (51.21.248.240)
- Domain: hamshineindustries.com

## Step 1: Launch EC2 Instance

1. **Create EC2 Instance:**
   - AMI: Amazon Linux 2023
   - Instance Type: t3.micro (free tier)
   - Security Group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (App)

2. **Connect to Instance:**
   ```bash
   ssh -i your-key.pem ec2-user@51.21.248.240
   ```

## Step 2: Run Setup Script

1. **Copy setup script to EC2:**
   ```bash
   scp -i your-key.pem deployment/setup-ec2.sh ec2-user@51.21.248.240:~/
   ```

2. **Run setup script:**
   ```bash
   ssh -i your-key.pem ec2-user@51.21.248.240
   chmod +x setup-ec2.sh
   ./setup-ec2.sh
   ```

## Step 3: Deploy Application

1. **Clone your repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git /var/www/app
   cd /var/www/app
   ```

2. **Create environment file:**
   ```bash
   cp deployment/env.example .env
   nano .env  # Edit with your actual values
   ```

3. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

4. **Start application:**
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

## Step 4: Configure Nginx

1. **Copy Nginx configuration:**
   ```bash
   sudo cp deployment/nginx.conf /etc/nginx/conf.d/hamshine-app.conf
   sudo nano /etc/nginx/conf.d/hamshine-app.conf  # Verify domain name
   ```

2. **Test and reload Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Step 5: Test Deployment

Your application should now be accessible at:
- `http://51.21.248.240`
- `http://hamshineindustries.com`

## Quick Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs hamshine-app

# Restart application
pm2 restart hamshine-app

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
```

## Troubleshooting

1. **Application not starting:**
   ```bash
   pm2 logs hamshine-app
   ```

2. **Nginx not working:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Port issues:**
   - Check security group settings in AWS Console
   - Verify application is running: `pm2 status`

## Next Steps

1. Set up SSL certificate with Certbot
2. Configure domain name
3. Set up monitoring
4. Implement CI/CD pipeline

For detailed instructions, see: `ec2-deployment-guide.md` 