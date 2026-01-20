# How to Write Markdown .md Files in Your Code and Push It to GitHub Pages (Deployment)

First of all, write up all your tutorial/document.

Second of all, format your text with this AI Editor Tool:  [https://textformatter.ai/app](https://textformatter.ai/app). 

Then paste that code in this AI Tool:  [https://stackedit.io/app](https://stackedit.io/app).

## Create a New .md File in public/docs/*.md

Paste that StackEdit document in here. Remember the first line would serve as the tutorial name on the sidebar on the left. If there are any images, place them under  **public/images/image.png**. If the image is a live link, just paste that in StackEdit. It will convert it.

# How to Serve Localhost and Deploy

Use  

`npm run dev`  

to serve on  [http://localhost:5175/](http://localhost:5175/)  

and if all seems good, then we are ready to deploy. 

Use  

`npm run deploy`  

to publish the changes to the GitHub repo (main branch) and it will automatically push the new build to the gh-pages branch (where you can check the deployment status).