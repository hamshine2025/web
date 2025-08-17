# Docker Quick Start Guide

Get your Hamshine Industries application running with Docker in minutes!

## Prerequisites
- EC2 instance with Docker access
- Domain: hamshineindustries.com
- EC2 IP: 51.21.245.8

## Quick Deployment

### 1. Connect to EC2
```bash
ssh -i your-key.pem ec2-user@51.21.245.8
```

### 2. Install Docker (if not installed)
```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/your-username/your-repo.git /var/www/app
cd /var/www/app

# Create environment file
cat > .env << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_connection_string
SESSION_SECRET=your_session_secret_here
EOF

# Start with Docker Compose
docker-compose up -d --build
```

### 4. Verify Deployment
```bash
# Check status
docker-compose ps

# Test application
curl http://localhost:5000
curl http://51.21.245.8
curl http://hamshineindustries.com
```

## Quick Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Check status
docker-compose ps
```

## Production Deployment

```bash
# Use production configuration
docker-compose -f docker-compose.prod.yml up -d --build

# Scale application
docker-compose up -d --scale app=3
```

## Troubleshooting

### Application not starting
```bash
docker logs hamshine-app
docker-compose logs app
```

### Nginx issues
```bash
docker logs hamshine-nginx
docker-compose restart nginx
```

### Port conflicts
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5000
```

## Next Steps
1. Set up SSL certificates
2. Configure domain DNS
3. Set up monitoring
4. Implement CI/CD

For detailed instructions, see: `docker-deployment-guide.md` 