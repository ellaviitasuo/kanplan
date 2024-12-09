# KanPlan – combination of kanban board and todo list
Course  CT70A9800 Full Stack Development project assignment.
Application is built with React, Netlify Functions as backend, Netlify Identity for authentication and MongoDB as the database.

## Features
* Create a board: Add board with status fields for your task.
* Add tasks: Add tasks to your board.
* Move tasks with drag-and-drop: Change task status via drag and drop functionality.
* Edit task: Edit task description or title.
* Delete task: Remove task from the board.
* Delete board: Delete board.
* Export board to CSV: Export board data to downloadable file.

## Local development

### Prerequisites
1.	Node.js (v16 or later) installed on your machine.
2.	MongoDB instance (local or cloud, e.g., MongoDB Atlas).
3.	Netlify Account for deploying and managing serverless functions and user authentication.

### Setup
* Change to kanplan-app directory
* Run `npm install`
* Install netlify cli for local development: `npm install -g netlify-cli`
* Create .env file that contains:
  ``
  MONGODB_URI=<Your MongoDB Connection String>
  MONGODB_DATABASE=<Your MongoDB Database Name>
  MONGODB_COLLECTION=<Your MongoDB Collection Name>
  ``
* Connect to Netlify account with `netlify init`
* Enable Netlify Indentity for the page and add user to the netlify site
* Run the application with `netlify dev`

