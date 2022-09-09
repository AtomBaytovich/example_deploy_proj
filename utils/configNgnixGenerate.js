/// xn--l1abdi.com на свой домен
/// конфигурация с редиректом на https и с www
/// TG канал: @atom_baytovich

const generateConfig = ({ domain = 'xn--l1abdi.com' }) => {
    return `
    server {
        listen                  443 ssl http2;
        listen                  [::]:443 ssl http2;
        server_name             ${domain};
        # SSL
        ssl_certificate         /etc/letsencrypt/live/${domain}/fullchain.pem;
        ssl_certificate_key     /etc/letsencrypt/live/${domain}/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/${domain}/chain.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
        # reverse proxy
        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    
    }
    
    # subdomains redirect
    server {
        listen                  443 ssl http2;
        listen                  [::]:443 ssl http2;
        server_name             *.${domain};
        # SSL
        ssl_certificate         /etc/letsencrypt/live/${domain}/fullchain.pem;
        ssl_certificate_key     /etc/letsencrypt/live/${domain}/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/${domain}/chain.pem;
        return                  301 https://${domain}$request_uri;
    }
    
    # HTTP redirect
    server {
        listen      80;
        listen      [::]:80;
        server_name .${domain};
    
        location / {
            return 301 https://${domain}$request_uri;
        }
    }
    `
}

module.exports = {
    generateConfig
}