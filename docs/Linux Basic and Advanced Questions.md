## Section 1: Linux Basics

1.  What is Linux? Linux is an open-source, Unix-like operating system kernel used in servers, desktops, cloud platforms, and embedded systems.
    
2.  Is Linux an operating system? Linux is technically a kernel. Combined with tools and libraries, it forms a Linux distribution.
    
3.  What are popular Linux distributions? Ubuntu, CentOS, RHEL, Debian, Fedora, SUSE, Arch Linux.
    
4.  What is the Linux kernel? The kernel is the core component that manages CPU, memory, devices, and system calls.
    
5.  What is a shell? A shell is a command-line interface that allows users to interact with the OS.
    
6.  Name popular Linux shells. bash, sh, zsh, ksh, fish.
    
7.  What is bash? Bash (Bourne Again Shell) is the default shell for most Linux systems.
    
8.  What is CLI? CLI (Command Line Interface) allows users to execute commands using text input.
    
9.  What is GUI? GUI (Graphical User Interface) allows interaction using windows, icons, and menus.
    
10.  What does open-source mean? Source code is freely available to view, modify, and distribute.
    
11.  What is root user? Root is the superuser with full administrative privileges.
    
12.  What is sudo? sudo allows a normal user to execute commands with root privileges.
    
13.  What is the home directory? Default directory for a user, usually /home/username.
    
14.  What is /root? Home directory of the root user.
    
15.  What is /etc directory? Contains system configuration files.
    
16.  What is /var? Stores variable data like logs, cache, and mail.
    
17.  What is /bin? Contains essential user binaries (commands).
    
18.  What is /sbin? Contains system binaries for administration.
    
19.  What is /tmp? Temporary files directory.
    
20.  What is /proc? Virtual filesystem with system and process information.
    
21.  What is /dev? Contains device files.
    
22.  What is /boot? Contains bootloader and kernel files.
    
23.  What is inode? A data structure storing metadata about a file.
    
24.  What is swap? Swap is disk space used as virtual memory.
    
25.  What is LTS? LTS (Long-Term Support) provides extended updates and stability.
    

## Section 2: File & Directory Management

1.  Command to list files? ls
    
2.  List hidden files? ls -a
    
3.  Create a file? touch file.txt
    
4.  Create a directory? mkdir dir_name
    
5.  Delete a file? rm file.txt
    
6.  Delete a directory? rm -r dir_name
    
7.  Copy files? cp source destination
    
8.  Move or rename files? mv old new
    
9.  View file content? cat, less, more
    
10.  Display first 10 lines? head file.txt
    
11.  Display last 10 lines? tail file.txt
    
12.  Follow log file? tail -f logfile
    
13.  File permissions command? chmod
    
14.  Change ownership? chown user:group file
    
15.  Permission types? Read (r), Write (w), Execute (x)
    
16.  Numeric permission 755 means? Owner: rwx, Group: r-x, Others: r-x
    
17.  What is umask? Default permission mask.
    
18.  Symbolic link? ln -s source link
    
19.  Hard link? Points to the same inode.
    
20.  Difference between soft & hard link? Soft link breaks if file deleted; hard link does not.
    
21.  Find files? find /path -name filename
    
22.  Search text? grep keyword file
    
23.  Recursive search? grep -r keyword dir
    
24.  Disk usage? du -sh
    
25.  Disk free space? df -h
    
26.  File type? file filename
    
27.  Count lines? wc -l file
    
28.  Sort file? sort file
    
29.  Compare files? diff file1 file2
    
30.  Compress file? tar -czf file.tar.gz dir
    

## Section 3: Process & System Management

1.  What is a process? A running instance of a program.
    
2.  View running processes? ps, top
    
3.  Real-time monitoring? top, htop
    
4.  Kill process? kill PID
    
5.  Force kill? kill -9 PID
    
6.  Background process? Append &
    
7.  Foreground process? fg
    
8.  What is PID? Process ID.
    
9.  What is PPID? Parent Process ID.
    
10.  What is load average? Average system load over time.
    
11.  What is uptime? Shows system running time.
    
12.  Reboot system? reboot
    
13.  Shutdown system? shutdown now
    
14.  Schedule shutdown? shutdown +10
    
15.  Check memory usage? free -h
    
16.  CPU info? lscpu
    
17.  Memory info? free, /proc/meminfo
    
18.  What is nice value? Process priority indicator.
    
19.  Change priority? nice, renice
    
20.  What is zombie process? Completed but not removed process.
    
21.  What is orphan process? Parent terminated but child still running.
    
22.  List open files? lsof
    
23.  What is cron? Job scheduler.
    
24.  Crontab syntax? • * * * * command
    
25.  List cron jobs? crontab -l
    
26.  Edit cron? crontab -e
    
27.  What is systemd? Init system and service manager.
    
28.  Start service? systemctl start service
    
29.  Stop service? systemctl stop service
    
30.  Enable service? systemctl enable service
    
31.  Service status? systemctl status service
    
32.  Boot target? systemctl get-default
    
33.  Change runlevel? systemctl isolate
    
34.  Kernel version? uname -r
    
35.  OS version? cat /etc/os-release
    

## Section 4: Networking

1.  Check IP address? ip a
    
2.  Old IP command? ifconfig
    
3.  Test connectivity? ping
    
4.  DNS lookup? nslookup, dig
    
5.  Check open ports? netstat, ss
    
6.  What is SSH? Secure remote login protocol.
    
7.  SSH default port? 22
    
8.  SCP command? scp file user@host:/path
    
9.  Rsync usage? Fast file synchronization.
    
10.  Check routing table? ip route
    
11.  Firewall tool? iptables, firewalld
    
12.  Open port? firewall-cmd --add-port
    
13.  Disable firewall? systemctl stop firewalld
    
14.  What is hostname? System name on network.
    
15.  Set hostname? hostnamectl set-hostname
    
16.  What is localhost? Loopback IP (127.0.0.1)
    
17.  What is TCP? Reliable connection-based protocol.
    
18.  What is UDP? Connectionless protocol.
    
19.  HTTP port? 80
    
20.  HTTPS port? 443
    
21.  FTP port? 21
    
22.  SFTP port? 22
    
23.  What is NFS? Network File System.
    
24.  Mount NFS? mount -t nfs
    
25.  What is SMB? Windows file-sharing protocol.
    
26.  What is curl? Command-line HTTP client.
    
27.  What is wget? File downloader.
    
28.  Check bandwidth? iftop
    
29.  Trace route? traceroute
    
30.  Network config file? /etc/sysconfig/network-scripts
    

## Section 5: Users, Groups & Security

1.  Add user? useradd
    
2.  Delete user? userdel
    
3.  Change password? passwd
    
4.  Add group? groupadd
    
5.  Add user to group? usermod -aG