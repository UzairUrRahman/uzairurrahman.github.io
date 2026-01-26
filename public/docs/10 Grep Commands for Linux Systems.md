# 10 Grep Commands That'll Make You Feel Like a Linux Wizard


## 1. The Basic Search

```
grep "error" logfile.txt
```

This is your bread and butter. It searches for the word "error" in  `logfile.txt`  and prints every line containing it. Simple, but effective when you need to find something fast.

## 2. Case-Insensitive Search (Because Who Remembers Capitalization?)

```
grep -i "error" logfile.txt
```

The  `-i`  flag ignores case sensitivity. Now it'll match "Error", "ERROR", "eRRoR", you get the idea. This is probably the flag I use most often because, let's be honest, consistent capitalization is a myth.

## 3. Search Recursively Through Directories

```
grep -r "TODO" /home/user/projects/
```

Want to find all those TODO comments you left scattered across your project? The  `-r`  flag searches through all files in a directory and its subdirectories. It's like having X-ray vision for your file system.

## 4. Show Line Numbers (For When You Need to Actually Fix Things)

```
grep -n "function" script.py
```

The  `-n`  flag displays line numbers alongside matches. Super helpful when you need to jump to a specific location in a file. No more scrolling aimlessly through 500 lines of code.

## 5. Invert Your Search (Find What's NOT There)

```
grep -v "debug" logfile.txt
```

The  `-v`  flag inverts the match; it shows you everything except lines containing "debug". Perfect for filtering out noise when you're analyzing logs.

## 6. Count Your Matches

```
grep -c "warning" logfile.txt
```

Instead of seeing every match,  `-c`  just tells you how many lines matched. Great for quick statistics like "How many warnings did this build generate?"

## 7. Match Whole Words Only

```
grep -w "cat" animals.txt
```

Without  `-w`, searching for "cat" would also match "caterpillar", "concatenate", and "scatter". The  `-w`  flag ensures you only get exact word matches. It's the difference between precision and chaos.

## 8. Context Matters: Show Surrounding Lines

```
grep -C 3 "exception" logfile.txt
```

The  `-C`  flag (context) shows you lines before and after your match. You can also use  `-A`  (after) or  `-B`  (before) separately. This is clutch when debugging; the error is only half the story; you need to see what led up to it.

## 9. Search Multiple Files with Patterns

```
grep "import" *.py
```

Use wildcards to search across multiple files at once. This command searches for "import" in all Python files in the current directory. Your IDE does this too, but knowing the command-line way makes you dangerous.

## 10. Extended Regular Expressions (Level Up)

```
grep -E "error|warning|critical" logfile.txt
```

The  `-E`  flag enables extended regex, letting you use special characters without escaping them. Here we're searching for any line containing "error" OR "warning" OR "critical". You can build incredibly complex patterns:

```
grep -E "[0-9]{3}-[0-9]{2}-[0-9]{4}" documents.txt
```

This searches for patterns matching a Social Security Number format. Regular expressions are their own rabbit hole, but they're worth learning.

## Bonus: Combining Flags Like a Pro

```
grep -rni "password" /var/log/
```

Here's where it gets fun. Combine flags to create powerful searches:

-   `-r`  for recursive
-   `-n`  for line numbers
-   `-i`  for case-insensitive

This command recursively searches all log files for any mention of "password", ignoring case, and shows you exactly where it found them.

## Real-World Example: Finding a Bug

Imagine you're troubleshooting why your web app crashed at 2 AM. Here's how grep saves the day:

```
grep -rni "exception" /var/log/apache2/ | grep "2025-11-07"
```

This searches recursively through Apache logs for exceptions, shows line numbers and ignores case, then pipes the results through another grep to filter only today's date. You just narrowed down thousands of log entries to exactly what you need.

## The Pattern Matching Cheat Sheet

For those ready to dive deeper, here are the key pattern matching symbols:

-   `.`  Matches any single character
-   `*`  Matches zero or more of the preceding character
-   `^`  Beginning of line
-   `$`  End of line
-   `[abc]`  Matches any character in brackets
-   `[^abc]`  Matches any character NOT in brackets
-   `|`  OR operator (with  `-E`  flag)