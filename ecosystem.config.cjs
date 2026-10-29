// PM2 process file for the server.
//
//   npm ci && npm run build      # build first; .env is read at build time
//   pm2 start ecosystem.config.cjs
//   pm2 save && pm2 startup      # keep it running after a reboot
//
// After pulling new code: `npm run deploy` (builds, then reloads PM2).
//
// Next reads .env from this folder itself, so STRAPI_URL, STRAPI_API_TOKEN,
// NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_SITE_ENV stay there and not here.
module.exports = {
  apps: [
    {
      name: "africa-energy-news",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 1340",
      // One process: the site's page cache lives in memory and on disk per
      // process, so several instances would each keep their own copy.
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      // Give in-flight requests time to finish on reload or stop.
      kill_timeout: 10000,
      env: {
        NODE_ENV: "production",
      },
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
