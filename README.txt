This is a repo I made to follow along the Node and Express Tutorial in the week 01 work of CSE341 (even though week two is almost over.)

I'm going to follow along with Web Dev Simplified Learn Express JS in 35 minutes video https://www.youtube.com/watch?v=SccSCuHhOw0

other videos:
MongoDB crash course: https://www.youtube.com/watch?v=ofme2o29ngU
build a REST API https://www.youtube.com/watch?v=fgTGADljAeg 

Project Setup:
Console: npm init -y 
- this will set up a basic package.json
- package.json has a project's metadata, dependencies, and scripts. 
    - metadata: name, version, description, author, license 
    - dependencies: all the external packages the project needs to run 
        - devDependencies: packages needed during development 
    - scripts: custom commands like start (for running app), test (for testing), devStart (starting in development mode)

console: npm i express 
- this will install the express library and create the node_modules directory
- express is a framework for Node.js that simplifies handling http requests, routing and serving responses 

console: npm i --save-dev nodemon
- adds option to server to start it using nodemon instead of node which will restart the server whenever you make a change. 

in package.json, add to "scripts": "devStart": "nodemon server.js"
- starts server using nodemon instead of node so your server restarts every time you save a change
- in the scripts section, the key is what you type after "npm run" when you start your server, and the value is the script that is run. 
- "test" and "start" don't need "run" eg "npm start". Writing "run" won't cause an error, but it's redundant. 

create "server.js" file
- add code to import express library, create an Express applicaiton, and start the server (app.listen(3000)) (see server.js file to see what all this means)

console: npm i ejs
- installs ejs (embedded JavaScript)

in server.js after imports and constants: app.set('view engine', 'ejs');
- sets ejs as your view engine 

ensure "EJS Language Support" is installed in VSCode 

create routes, views, and the other folders. 

add middleware to server.js