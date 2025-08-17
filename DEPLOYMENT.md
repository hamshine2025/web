# Simple Docker Deployment Guide

This guide explains how to deploy your Hamshine web application using Docker to your server at `51.21.245.8`.

## Prerequisites

- Docker installed on your server
- Node.js 20 (handled by Docker image)
- Port 5000 available on your server

## Quick Deployment

1. **Build and deploy in one command:**
   ```bash
   ./deploy.sh
   ```

2. **Or manually step by step:**
   ```bash
   # Build the image
   docker build -t hamshine-web:latest .
   
   # Stop existing container (if any)
   docker stop hamshine-web || true
   docker rm hamshine-web || true
   
   # Run new container
   docker run -d \
     --name hamshine-web \
     --restart unless-stopped \
     -p 5000:5000 \
     -e NODE_ENV=production \
     -e PORT=5000 \
     hamshine-web:latest
   ```

## Container Management

- **View logs:** `docker logs -f hamshine-web`
- **Stop container:** `docker stop hamshine-web`
- **Start container:** `docker start hamshine-web`
- **Restart container:** `docker restart hamshine-web`
- **Remove container:** `docker rm hamshine-web`

## Access Your Application

After deployment, your application will be available at:
- **Local:** http://localhost:5000
- **Public:** http://51.21.245.8:5000

## Environment Variables

The container runs with these default settings:
- `NODE_ENV=production`
- `PORT=5000`

## Health Check

The container includes a health check that runs every 30 seconds. You can monitor it with:
```bash
docker inspect hamshine-web | grep -A 10 Health
```

## Troubleshooting

1. **Check container status:**
   ```bash
   docker ps -a | grep hamshine-web
   ```

2. **View recent logs:**
   ```bash
   docker logs --tail 50 hamshine-web
   ```

3. **Access container shell:**
   ```bash
   docker exec -it hamshine-web sh
   ```

4. **Rebuild and redeploy:**
   ```bash
   ./deploy.sh
   ```

## Security Notes

- The container runs as a non-root user (nodejs:1001)
- Only port 5000 is exposed
- Container automatically restarts unless manually stopped 