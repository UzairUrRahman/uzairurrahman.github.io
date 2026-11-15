# Fix GitHub Authentication for `gh-pages` Deployment on macOS 
# Example for Uzair Github Pages Site, But will work for all. 

## Problem

When deploying a GitHub Pages site with the `gh-pages` npm package, you may see an error similar to:

```text
ProcessError: remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/UzairUrRahman/uzairurrahman.github.io.git/'
```

This happens because GitHub does not accept account passwords for Git operations over HTTPS. Your local Git configuration may be using an expired, invalid, or incorrectly stored credential.

## Recommended solution: Use SSH authentication

SSH lets your Mac authenticate with GitHub using an SSH key, so you do not need to enter a GitHub password or personal access token for each deployment.

### 1. Check for an existing SSH key

Open Terminal and run:

```bash
ls -al ~/.ssh
```

Look for these files:

- `id_ed25519` — your private key
- `id_ed25519.pub` — your public key

If you already have a key pair, you can usually reuse it. **Never share your private key** (`id_ed25519`).

### 2. Generate an SSH key (if needed)

If you do not already have an SSH key, run:

```bash
ssh-keygen -t ed25519 -C "your-github-email@example.com"
```

Replace the email with the email associated with your GitHub account. Press Enter to accept the default file location. You can optionally set a passphrase for additional security.

### 3. Start the SSH agent and add the key to macOS Keychain

Run:

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

If your macOS version or SSH setup does not support `--apple-use-keychain`, consult Apple's or GitHub's current SSH setup instructions for the appropriate command.

### 4. Add the public key to GitHub

Copy the public key:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

Then:

1. Open [GitHub SSH key settings](https://github.com/settings/ssh/new).
2. Select **New SSH key**.
3. Enter a descriptive title, such as `MacBook`.
4. Keep the key type as **Authentication Key**.
5. Paste the copied public key into the Key field.
6. Select **Add SSH key**.

Only add the `.pub` public key. Do not upload or share the private key.

### 5. Test the SSH connection

Run:

```bash
ssh -T git@github.com
```

The first time, SSH may ask you to confirm GitHub's host fingerprint. Verify it against GitHub's published SSH host keys before accepting.

A successful connection should display a message similar to:

```text
Hi UzairUrRahman! You've successfully authenticated, but GitHub does not provide shell access.
```

The exact wording may vary.

### 6. Change the repository remote from HTTPS to SSH

Navigate to your project directory:

```bash
cd ~/Desktop/uzairurrahman.github.io
```

Check the current remote:

```bash
git remote -v
```

Change the `origin` remote to SSH:

```bash
git remote set-url origin git@github.com:UzairUrRahman/uzairurrahman.github.io.git
```

Verify the change:

```bash
git remote -v
```

The output should look like:

```text
origin  git@github.com:UzairUrRahman/uzairurrahman.github.io.git (fetch)
origin  git@github.com:UzairUrRahman/uzairurrahman.github.io.git (push)
```

### 7. Deploy the website again

From the project directory, run your usual deployment command:

```bash
npm run deploy
```

If your `package.json` does not define a `deploy` script but you have configured `gh-pages`, use the command appropriate to your project. For example:

```bash
npx gh-pages -d <build-folder>
```

Replace `<build-folder>` with the actual folder containing your generated website files, such as `dist` or `build`. Do not use `-d .` unless you intentionally want to publish the current directory's contents.

## Alternative: Use a GitHub Personal Access Token over HTTPS

If you prefer HTTPS instead of SSH, use a GitHub Personal Access Token (PAT) in place of your account password.

1. Open [GitHub Personal Access Tokens](https://github.com/settings/personal-access-tokens).
2. Create a token. A fine-grained token is preferable where possible.
3. Select the repository `uzairurrahman.github.io`.
4. Grant the minimum permissions required for your deployment. For a typical Git push, this includes **Contents: Read and write**.
5. Save the token securely. GitHub may not show it again.
6. When Git prompts for credentials over HTTPS, enter your GitHub username and use the token as the password.

Do not put the token directly in a remote URL, source code, shell script, or committed `.env` file. If an old invalid credential is stored in macOS Keychain, remove or update the relevant GitHub credential through **Keychain Access** and authenticate again.

## Troubleshooting

### Check which remote URL is configured

```bash
git remote -v
```

- HTTPS remote: `https://github.com/OWNER/REPOSITORY.git`
- SSH remote: `git@github.com:OWNER/REPOSITORY.git`

### Check SSH authentication

```bash
ssh -T git@github.com
```

If authentication fails, confirm that the public key is added to the correct GitHub account and that the matching private key is available to your SSH agent.

### Check which keys are loaded

```bash
ssh-add -l
```

If no identities are listed, add your key:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

### Confirm that Git can access the repository

From inside the project directory, run:

```bash
git ls-remote origin
```

If this succeeds, Git can authenticate and read the remote repository.

## Quick command checklist

Use this checklist after creating and adding your SSH key to GitHub:

```bash
# Start the SSH agent
eval "$(ssh-agent -s)"

# Add the SSH key
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# Test GitHub SSH authentication
ssh -T git@github.com

# Go to the project
cd ~/Desktop/uzairurrahman.github.io

# Set the SSH remote
git remote set-url origin git@github.com:UzairUrRahman/uzairurrahman.github.io.git

# Verify the remote
git remote -v

# Test repository access
git ls-remote origin

# Deploy
npm run deploy
```

## Expected result

Once SSH authentication is configured and the repository remote uses the SSH URL, `gh-pages` should be able to push to GitHub without the HTTPS username/token authentication error.

If deployment still fails, check the exact `deploy` script in `package.json`, the configured `gh-pages` destination branch, and the build output directory.
