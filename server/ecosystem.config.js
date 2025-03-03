module.exports = {
    apps: [{
      name: "trinity-financing-server",
      script: "index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 5000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80
      },
      watch: false,
      max_memory_restart: "300M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "logs/error.log",
      out_file: "logs/access.log",
      merge_logs: true
    }]
  };