module.exports = {
    apps: [{
        name: 'ftp-monitor',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            PORT: 80,
            NODE_ENV: 'production',
            FTP_HOST: process.env.FTP_HOST,
            FTP_USER: process.env.FTP_USER,
            FTP_PASSWORD: process.env.FTP_PASSWORD
        }
    }]
}; 