module.exports = {
  apps: [{
    name: 'voice-ai-platform',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/pm2/error.log',
    out_file: 'logs/pm2/out.log',
    log_file: 'logs/pm2/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
