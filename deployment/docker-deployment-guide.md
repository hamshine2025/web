# Docker Deployment Guide for Hamshine Industries

This guide will help you deploy your application using Docker on EC2.

## Prerequisites

- EC2 instance with Docker and Docker Compose installed
- Domain: hamshineindustries.com
- EC2 IP: 51.21.245.8

## Step 1: Install Docker on EC2

### 1.1 Connect to your EC2 instance
```bash
ssh -i your-key.pem ec2-user@51.21.245.8
```

### 1.2 Install Docker
```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to docker group
sudo usermod -a -G docker ec2-user

# Log out and log back in, or run:
newgrp docker
```

### 1.3 Install Docker Compose
```bash
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

## Step 2: Deploy Application

### 2.1 Clone your repository
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git /var/www/app
cd /var/www/app
```

### 2.2 Create environment file
```bash
# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_connection_string
SESSION_SECRET=your_session_secret_here
EOF

# Verify the file
cat .env
```

### 2.3 Build and start with Docker Compose
```bash
# Build and start services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

## Step 3: Verify Deployment

### 3.1 Check container status
```bash
# Check running containers
docker ps

# Check container logs
docker logs hamshine-app
docker logs hamshine-nginx
```

### 3.2 Test the application
```bash
# Test app directly
curl http://localhost:5000

# Test through nginx
curl http://localhost

# Test external access
curl http://51.21.245.8
curl http://hamshineindustries.com
```

## Step 4: Production Deployment

### 4.1 Use production compose file
```bash
# Stop development services
docker-compose down

# Start production services
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### 4.2 Monitor resources
```bash
# Check resource usage
docker stats

# Check disk usage
docker system df
```

## Step 5: SSL Setup (Optional)

### 5.1 Create SSL directory
```bash
# Create SSL directory
mkdir -p ssl

# Copy your SSL certificates here
# ssl/cert.pem
# ssl/key.pem
```

### 5.2 Update nginx.conf
Uncomment the HTTPS server block in `nginx.conf` and configure your SSL certificates.

### 5.3 Restart services
```bash
docker-compose restart nginx
```

## Step 6: Scaling (Optional)

### 6.1 Scale the app service
```bash
# Scale to 3 instances
docker-compose up -d --scale app=3

# Check status
docker-compose ps
```

### 6.2 Update nginx upstream
Add more servers to the upstream block in `nginx.conf`:
```nginx
upstream app_servers {
    server app:5000;
    server app:5001;
    server app:5002;
}
```

## Step 7: Monitoring and Maintenance

### 7.1 View logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
docker-compose logs -f nginx

# View container logs directly
docker logs hamshine-app
```

### 7.2 Update application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### 7.3 Backup and restore
```bash
# Backup volumes
docker run --rm -v hamshine_app_data:/data -v $(pwd):/backup alpine tar czf /backup/app_backup.tar.gz -C /data .

# Restore volumes
docker run --rm -v hamshine_app_data:/data -v $(pwd):/backup alpine tar xzf /backup/app_backup.tar.gz -C /data
```

## Step 8: Security Considerations

### 8.1 Update security group
Make sure your EC2 security group allows:
- SSH (22): Your IP only
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0

### 8.2 Regular updates
```bash
# Update Docker images
docker-compose pull
docker-compose up -d

# Clean up unused images
docker image prune -f
```

## Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View service status
docker-compose ps

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec app sh

# View resource usage
docker stats

# Clean up
docker system prune -f
```

## Troubleshooting

### Application not starting
```bash
# Check container logs
docker logs hamshine-app

# Check container status
docker ps -a

# Check environment variables
docker-compose exec app env
```

### Nginx issues
```bash
# Check nginx logs
docker logs hamshine-nginx

# Test nginx configuration
docker-compose exec nginx nginx -t

# Restart nginx
docker-compose restart nginx
```

### Port conflicts
```bash
# Check what's using the ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5000

# Stop conflicting services
sudo systemctl stop nginx  # if running nginx outside docker
```

## Next Steps

1. Set up SSL certificates
2. Configure domain DNS
3. Set up monitoring (Prometheus, Grafana)
4. Implement CI/CD pipeline
5. Set up automated backups
6. Configure load balancing for high availability 