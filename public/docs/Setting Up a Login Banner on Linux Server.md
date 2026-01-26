# Setting a Login Banner on Linux Servers 

## 🛠 Step 1: Set the Message

Edit  `/etc/issue`  for pre-login banners:

```
vi /etc/issue
```

Example:

```
WARNING: This system is for authorized use only. 
All activities are monitored and logged. 
Unauthorized access will be prosecuted.
```

For remote SSH logins, edit  `/etc/issue.net`:

```
vi /etc/issue.net
```

## 🛠 Step 2: Configure SSH to Display It

Edit:

```
vi /etc/ssh/sshd_config
```

Set:

```
Banner /etc/issue.net
```

Restart SSH:

```
systemctl restart sshd
```

## 🛠 Step 3: Add Post-Login Notices

For after successful login, edit  `/etc/motd`  (Message of the Day):

```
vi /etc/motd
```

Example:

```
Welcome to [ServerName]
All activity is logged. Contact admin@example.com for support.
```