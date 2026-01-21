# Linux Commands: Find All SUID Binaries (for Privilege Escalation)

SUID binaries are gold mines. Use this to enumerate them:

```
find / -perm -4000 -type f 2>/dev/null
```

Why care? Attackers often look for misconfigured SUIDs to escalate privileges. You'd be surprised what gets left behind.

## 2. Search for World-Writable Files

Spot weak file permissions in one shot:

```
find / -type f -perm -2 -ls 2>/dev/null
```

This one-liner sweeps the entire filesystem for files anyone can write to — a classic source of privilege escalation in real-world Linux boxes.

## 3. List All Open Network Ports

Need a quick map of open sockets?

```
netstat -tulnp 2>/dev/null
```

Or, if netstat isn't available:

```
ss -tulnp
```

You'll find these useful for initial enumeration after an RCE or shell access.

## 8. Grab the Crontab for All Users

Automated tasks often hold secrets (or can be abused):

```
for user in $(cut -f1 -d: /etc/passwd); do crontab -u $user -l 2>/dev/null; done
```

Try this after gaining root or sudo access.

## 9. Find All Files Containing a Specific Keyword

Hunting for credentials or API keys? Use grep recursively:

```
grep -Ri 'password' /etc 2>/dev/null
```

Replace 'password' with your target string. I once found AWS keys this way in a bug bounty environment — no joke.

## 11. Extract All IPs from a File

Perfect for recon or log analysis:

```
grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}' filename.txt | sort -u
```

Replace  `filename.txt`  with your target. Handy for parsing large logs on bug bounty targets.

## 12. List All Listening Services and Their Executables

Triangulate which service is running on which port:

```
lsof -i -P -n | grep LISTEN
```

Spot the oddball service in seconds.

## 14. Identify Files Newer than X Minutes

Spot files dropped by malware or recent attackers:

```
find /tmp -type f -mmin -10 2>/dev/null
```

Shows files modified in the last 10 minutes. Adjust  `/tmp`  and  `-10`  as needed.

## 17. Find All Hidden Files and Directories

Admins love hiding stuff with a dot. Find them all:

```
find / -name ".*" 2>/dev/null
```

Often used in CTFs to stash flags or creds.

## 18. Check for Recent Logins

Good for spotting active users (or your own tracks):

```
last -a | head -10
```

Adjust the number as you like.

## 21. Get Internal IP Address

When you're in a shell and unsure where you landed:

```
hostname -I
```

Or, with  `ip:`

```
ip addr show | grep 'inet ' | awk '{print $2}'
```

## 22. Enumerate Current User Privileges

See what you can sudo (with or without a password):

```
sudo -l
```

## 23. Search for SSH Keys

Attackers love snagging private keys:

```
find /home -name "id_rsa*" 2>/dev/null
```

Sometimes they're left in  `/root`  or  `/etc/ssh/`. Worth checking.

## 24. Find World-Readable Password Files

Targets files that anyone can read:

```
find / -type f -name "*pass*" -perm -o=r 2>/dev/null
```

You'll be shocked what surfaces.

## 27. List Files by Size

Identify suspiciously large files (maybe exfil dumps):

```
find / -type f -exec du -h {} + | sort -rh | head -20
```

Usually, legit files don't blow up in size out of nowhere.

## 29. List All USB Devices (Great for Forensics)

Sneaky exfil via USB? Spot them here:

```
lsusb
```

# Ghost Hunting and Other Fixes

## 1. Ghost Hunting: lsof +L1

Scenario: df -h says disk usage is 100%, but you just deleted gigabytes of log files. Reason: If a process (like Apache or Postgres) is still writing to a file you deleted, the OS doesn't free the space (inode). It becomes a "zombie" file.

The Fix:

```
lsof +L1
# Look for files marked as (deleted) but still held by a PID.
# You must reload/restart that specific PID to free the space.
```

## 2. Time Travel: reptyr

Scenario: You started a long script, it's been running for 4 hours, but you forgot to start a screen or tmux session. You need to disconnect, but closing the terminal will kill the script.

The Fix:

```
Use reptyr to "steal" the process and reparent it to a new screen.
# 1. Background the process: Ctrl+Z, then type 'bg'
# 2. Disown it from current shell: 'disown <PID>'
# 3. Open a new screen/tmux and pull it in:
reptyr <PID>
```

## 3. The X-Ray Machine: strace

Scenario: A process is hanging. No logs. No CPU usage. Is it waiting for network? Is it permission denied?

The Fix:

```
Don't guess. Watch the system calls in real-time.
strace -p <PID>
# You will see exactly what the kernel is doing: 
# open(), connect(), read()... 
# This is the ultimate debugging weapon.
```

## 4. Config Espionage: /proc Filesystem

Scenario: A developer claims, "It works on my machine," but the production service fails. You suspect it picked up the wrong DB password or API key from the environment.

The Fix:

```
Read the memory of the running process directly.
cat /proc/<PID>/environ | tr '\0' '\n'
# This dumps every environment variable the process was started with.
# No more guessing.
```

## 5. The Panic Button: tune2fs

Scenario: Production is down. Disk is 100% full. You can't even tab-complete commands because there is zero space for temp files.

The Fix:

```
Linux reserves 5% of blocks for the root user by default. In an emergency, you can set this to 0% to instantly gain GBs of space.
tune2fs -m 0 /dev/sdX
# Warning: Set it back to 5% once you clean up!
```

## 6. SSH Turbo Mode: ControlMaster

Scenario: Running Ansible or opening multiple tabs to the same server is slow because of the SSH handshake.

The Fix:

```
Enable connection multiplexing. The first connection authenticates; subsequent connections slide through the existing tunnel instantly.
# In your ~/.ssh/config:
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

## 7. The Quick Fix: ^old^new

Scenario: You typed a long command with a typo. systemctl restart nginxx

The Fix:

```
Don't hit the up arrow and scroll back.
^nginxx^nginx
# Bash automatically runs: systemctl restart nginx
```

## 8. Modern Network Analysis: ss

Scenario: You are still using netstat.

The Fix:

```
netstat is deprecated, slow, and truncates output. 
ss (Socket Statistics) talks directly to the kernel and is blazing fast.
ss -tulpn
# -t: TCP, -u: UDP, -l: Listening, -p: Process, -n: Numeric
# See everything listening on your server in milliseconds.
```

## 9. Muscle Memory: sudo !! and !$

Scenario: You typed a command but forgot sudo. Action: Type sudo !! (runs the last command as root). !$: You created a directory and now want to go into it.

The Fix:

```
mkdir -p /var/www/html/project/v2 
cd !$  
# '!$' expands to the last argument of the previous command
```