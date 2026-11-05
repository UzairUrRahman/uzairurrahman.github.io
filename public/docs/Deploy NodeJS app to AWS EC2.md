# Create the AWS Instance

## Steps to Create the Instance

- Create an AWS account. If you don’t have one, then navigate to the EC2 instances page and click the Launch Instances button.

- Create the new key pair. Give any name to the key pair, for example, node-app. Download the key pair and save it on your machine.

- The last step is to launch the instance.

## SSH into Instance and Download Packages

- SSH into the instance by running the command:

    `ssh -i keypair\_name.pem ubuntu@ip-address`
    
- Update the packages by running the command:

  `sudo apt-get update` 

- Install NodeJS by running the command:

  `curl -sL https://deb.nodesource.com/setup\_20.x | sudo -E bash -` 

  `sudo apt-get install -y nodejs` 

- Install Git by running the command:

  `sudo apt-get install git`

- Clone the GitHub repo:

  `git clone \[repo-link\]` 

- Navigate to the directory:

 For example: cd node-app or cd test

- Install dependencies:

  `npm install` 

- Run the app:

  `npm start index.js` 

- The app is running now. Install pm2 for running the app forever in the background by running the command:

  `sudo npm install pm2 -g` 

- Run the app:

  `sudo pm2 start index.js` 

