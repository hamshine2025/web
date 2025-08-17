# 🌐 Domain Setup Guide for hamshineindustries.com

This guide will help you connect your deployed application to your domain `hamshineindustries.com`.

## 📋 Prerequisites

- ✅ Your application is deployed and running on port 5000
- ✅ You have access to your server at `51.21.245.8`
- ✅ You have control over your domain DNS settings

## 🚀 Quick Setup (HTTP Only)

### 1. Upload Configuration Files

First, upload these files to your server:
- `nginx-http.conf` - Simple HTTP Nginx configuration
- `setup-domain.sh` - Automated setup script

### 2. Run the Setup Script

SSH into your server and run:
```bash
# Make script executable
chmod +x setup-domain.sh

# Run as root
sudo ./setup-domain.sh
```

### 3. Configure DNS

In your domain registrar's DNS settings, add these records:

**A Records:**
```
hamshineindustries.com     →  51.21.245.8
www.hamshineindustries.com →  51.21.245.8
```

**CNAME Record (optional):**
```
www.hamshineindustries.com →  hamshineindustries.com
```

## 🔒 SSL Setup (Recommended)

### Option 1: Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d hamshineindustries.com -d www.hamshineindustries.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Option 2: Custom SSL Certificate

1. Purchase SSL certificate from your provider
2. Upload certificate files to `/etc/nginx/ssl/`
3. Update `nginx.conf` with SSL paths
4. Reload Nginx

## 📁 File Structure on Server

After setup, your server should have:
```
/etc/nginx/
├── sites-available/
│   └── hamshineindustries.com
├── sites-enabled/
│   └── hamshineindustries.com -> ../sites-available/hamshineindustries.com
└── nginx.conf
```

## 🧪 Testing Your Setup

### 1. Test Nginx Configuration
```bash
sudo nginx -t
```

### 2. Check Nginx Status
```bash
sudo systemctl status nginx
```

### 3. Test Domain Access
```bash
# Test locally
curl -H "Host: hamshineindustries.com" http://localhost

# Test from external
curl http://hamshineindustries.com
```

### 4. Check Logs
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Application logs
docker logs -f hamshine-web
```

## 🔧 Troubleshooting

### Common Issues

1. **Nginx won't start:**
   ```bash
   sudo nginx -t  # Check configuration
   sudo systemctl status nginx  # Check status
   ```

2. **Domain not accessible:**
   - Check DNS propagation (can take up to 48 hours)
   - Verify firewall settings
   - Check Nginx is running

3. **502 Bad Gateway:**
   - Ensure Docker container is running
   - Check container logs: `docker logs hamshine-web`
   - Verify port 5000 is accessible

4. **Permission denied:**
   - Ensure Nginx has read access to configuration
   - Check file ownership and permissions

### Useful Commands

```bash
# Restart Nginx
sudo systemctl restart nginx

# Reload Nginx configuration
sudo systemctl reload nginx

# Check Nginx configuration
sudo nginx -t

# View Nginx processes
ps aux | grep nginx

# Check open ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

## 📊 Monitoring

### Health Checks
- **Application:** `http://hamshineindustries.com/health`
- **Nginx:** `sudo systemctl status nginx`

### Performance Monitoring
```bash
# Monitor Nginx access
sudo tail -f /var/log/nginx/access.log | grep hamshineindustries.com

# Monitor application performance
docker stats hamshine-web
```

## 🔄 Maintenance

### Regular Tasks
1. **Update system packages:** `sudo apt update && sudo apt upgrade`
2. **Check SSL certificate expiration:** `sudo certbot certificates`
3. **Monitor disk space:** `df -h`
4. **Check application logs:** `docker logs --tail 100 hamshine-web`

### Backup
```bash
# Backup Nginx configuration
sudo cp -r /etc/nginx /backup/nginx-$(date +%Y%m%d)

# Backup application data
docker commit hamshine-web hamshine-web-backup-$(date +%Y%m%d)
```

## 🌟 Next Steps

1. ✅ **Test your domain** - Visit `http://hamshineindustries.com`
2. 🔒 **Set up SSL** - Enable HTTPS for security
3. 📱 **Test mobile responsiveness** - Ensure it works on all devices
4. 🚀 **Performance optimization** - Consider CDN, caching, etc.
5. 📊 **Analytics** - Set up monitoring and analytics

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all prerequisites are met
3. Test each component individually
4. Check firewall and DNS settings

Your application should now be accessible at `http://hamshineindustries.com`! 🎉 