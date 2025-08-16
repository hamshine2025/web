module.exports = {
  apps: [
    {
      name: 'hamshine-app',
      script: 'dist/index.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Restart policy
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      
      // Watch for file changes (development only)
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'dist'],
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Health check
      health_check_grace_period: 3000,
      
      // Environment variables (will be loaded from .env file)
      env_file: '.env'
    }
  ],

  deploy: {
    production: {
      user: 'ec2-user',
      host: '51.21.248.240',
      ref: 'origin/main',
      repo: 'https://github.com/your-username/your-repo.git',
      path: '/var/www/app',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; 