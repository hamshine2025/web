# EC2 Deployment Guide

This guide will help you deploy your full-stack React + Express.js application to AWS EC2.

## Prerequisites

1. AWS Account with EC2 access
2. Domain name: hamshineindustries.com
3. EC2 IP: 51.21.248.240
4. PostgreSQL database (can be RDS or external service like Neon)

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. Choose **Amazon Linux 2023** (recommended)
3. Select **t3.micro** (free tier) or larger based on your needs
4. Configure Security Group:
   - **SSH (22)**: Your IP only
   - **HTTP (80)**: 0.0.0.0/0
   - **HTTPS (443)**: 0.0.0.0/0
   - **Custom TCP (5000)**: 0.0.0.0/0 (for your app port)

### 1.2 Connect to Instance
```bash
ssh -i your-key.pem ec2-user@51.21.248.240
```

## Step 2: Install Dependencies

### 2.1 Update System
```bash
sudo yum update -y
```

### 2.2 Install Node.js 18+
```bash
# Install NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -

# Install Node.js
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

### 2.3 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 2.4 Install Nginx (Reverse Proxy)
```bash
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 3: Deploy Application

### 3.1 Clone Repository
```bash
# Install git if not available
sudo yum install -y git

# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Set Environment Variables
```bash
# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_connection_string
SESSION_SECRET=your_session_secret_here
EOF
```

### 3.4 Build Application
```bash
npm run build
```

### 3.5 Start Application with PM2
```bash
# Start the application
pm2 start dist/index.js --name "hamshine-app"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Step 4: Configure Nginx

### 4.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/conf.d/hamshine-app.conf
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name hamshineindustries.com www.hamshineindustries.com 51.21.248.240;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Test and Reload Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Step 5: Setup SSL (Optional but Recommended)

### 5.1 Install Certbot
```bash
sudo yum install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d hamshineindustries.com -d www.hamshineindustries.com
```

## Step 6: Database Setup

### 6.1 Using AWS RDS (Recommended)
1. Create RDS PostgreSQL instance
2. Configure security group to allow connections from EC2
3. Update DATABASE_URL in your .env file

### 6.2 Using External Database (Neon, Supabase, etc.)
1. Create database in your preferred service
2. Update DATABASE_URL in your .env file

### 6.3 Run Database Migrations
```bash
npm run db:push
```

## Step 7: Monitoring and Maintenance

### 7.1 PM2 Commands
```bash
# View logs
pm2 logs hamshine-app

# Monitor processes
pm2 monit

# Restart application
pm2 restart hamshine-app

# Stop application
pm2 stop hamshine-app
```

### 7.2 Nginx Commands
```bash
# Check status
sudo systemctl status nginx

# Restart
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Step 8: Continuous Deployment (Optional)

### 8.1 Setup GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to EC2
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: 51.21.248.240
        username: ec2-user
        key: ${{ secrets.KEY }}
        script: |
          cd /path/to/your/app
          git pull origin main
          npm install
          npm run build
          pm2 restart hamshine-app
```

## Troubleshooting

### Common Issues:

1. **Port 5000 not accessible**
   - Check security group settings
   - Verify application is running: `pm2 status`

2. **Database connection issues**
   - Verify DATABASE_URL in .env
   - Check database security group/firewall settings

3. **Static files not loading**
   - Check build output in `dist/public`
   - Verify Nginx configuration

4. **SSL certificate issues**
   - Ensure domain points to EC2 IP
   - Check Certbot logs: `sudo certbot certificates`

### Useful Commands:
```bash
# Check application status
pm2 status

# View application logs
pm2 logs hamshine-app

# Check Nginx configuration
sudo nginx -t

# Check system resources
htop

# Check disk space
df -h
```

## Security Considerations

1. **Keep system updated**: `sudo yum update -y`
2. **Use strong passwords and SSH keys**
3. **Configure firewall properly**
4. **Regular backups of database and application**
5. **Monitor logs for suspicious activity**
6. **Use HTTPS in production**

## Cost Optimization

1. **Use t3.micro for development/testing**
2. **Stop instances when not in use**
3. **Use reserved instances for production**
4. **Monitor CloudWatch metrics**
5. **Use S3 for static assets if needed**

## Next Steps

1. Set up monitoring with CloudWatch
2. Configure automated backups
3. Set up load balancing for high availability
4. Implement CI/CD pipeline
5. Set up staging environment 