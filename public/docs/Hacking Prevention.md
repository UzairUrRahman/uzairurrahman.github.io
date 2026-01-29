# Server Security Response Guide

If someone tried to access private routes on your server, treat it as a real intrusion attempt and lock things down immediately. Below is a practical, step-by-step response, assuming a typical Linux server (Ubuntu/Debian/CentOS). I’ll keep it actionable.

1.  ## Identify the Attacker (First 5 minutes)
    
    Check logs to see IP, endpoint, frequency.
    
    Web server logs:
    
    ### Nginx
    
    ```
    sudo tail -n 100 /var/log/nginx/access.log
    sudo tail -n 100 /var/log/nginx/error.log
    ```
    
    ### Apache
    
    ```
    sudo tail -n 100 /var/log/apache2/access.log
    ```
    
    Look for:
    
    -   Repeated requests
    -   /admin, /api/private, /wp-admin, /env, /config
    -   401 / 403 / 404 floods
2.  ## IMMEDIATELY Block the IP (Fastest Protection)
    
    Using UFW (recommended):
    
    ```
    sudo ufw deny from ATTACKER_IP
    sudo ufw reload
    ```
    
    Check:
    
    ```
    sudo ufw status numbered
    ```
    
    Using iptables (instant):
    
    ```
    sudo iptables -A INPUT -s ATTACKER_IP -j DROP
    ```
    
    Persist iptables (important):
    
    ```
    sudo apt install iptables-persistent
    ```
    
3.  ## Rate-Limit Requests (Stops brute force & scanning)
    
    Nginx example (VERY important):
    
    Add inside your server {} block:
    
    ```
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
    }
    ```
    
    Reload:
    
    ```
    sudo nginx -t && sudo systemctl reload nginx
    ```
    
4.  ## Lock Down Private Routes (CRITICAL)
    
    ❌ Never rely only on frontend protection. Make sure private routes require auth at server level.
    
    Example (JWT / Token middleware):
    
    -   Verify token
    -   Validate expiration
    -   Reject missing/invalid tokens
    
    Example: Nginx Basic Auth (Quick Shield):
    
    ```
    sudo apt install apache2-utils
    htpasswd -c /etc/nginx/.htpasswd admin
    ```
    
    Then:
    
    ```
    location /admin {
        auth_basic "Restricted";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
    ```
    
5.  ## Block Known Bad Scanners Automatically (Fail2Ban)
    
    Install & enable:
    
    ```
    sudo apt install fail2ban -y
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    ```
    
    Check bans:
    
    ```
    sudo fail2ban-client status
    ```
    
    This will auto-ban:
    
    -   Repeated 401/403
    -   SSH brute force
    -   Bot scanning
6.  ## Protect SSH (If Not Done Yet)
    
    ```
    sudo nano /etc/ssh/sshd_config
    ```
    
    Change:
    
    ```
    PermitRootLogin no
    PasswordAuthentication no
    ```
    
    Restart:
    
    ```
    sudo systemctl restart ssh
    ```
    
    ⚠️ Make sure SSH keys are working first.
    
7.  ## Hide Server Fingerprints (Small but Useful)
    
    Disable server version leaks:
    
    ```
    server_tokens off;
    ```
    
8.  ## Check if They Got In (Important)
    
    ```
    last
    who
    w
    ```
    
    Check unexpected processes:
    
    ```
    ps aux | grep -v root
    ```
    
    Check cron jobs:
    
    ```
    crontab -l
    ls /etc/cron*
    ```
    
9.  ## Long-Term Protection (Strongly Recommended)
    
    -   ✅ Cloudflare (WAF + IP reputation)
    -   ✅ Private API behind VPN
    -   ✅ Only allow known IPs to admin routes
    -   ✅ Environment variables NOT publicly accessible
    -   ✅ .env blocked at web server level
    
    Example:
    
    ```
    location ~ /\.env {
        deny all;
    }
    ```
    

🚨 If You See These → ACT FAST:

-   Requests to /env, /config, /backup.zip
-   High CPU without traffic
-   New users created
-   Unknown cron jobs

That means attempted exploitation, not just scanning.