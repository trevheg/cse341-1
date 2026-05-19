// imports the express library
const express = require('express');
// Create an Express application. "app" now holds the web server. app is the object for routes, middleware, etc. 
// app is the central hub of the entire application 
const app = express();

// this sets EJS (embedded JavaScript) as your viewing engine.
// that's the one that lets you make .ejs files which are HTML files with embedded JS
// You want to make sure you have "EJS Language Support installed in VSCode"
app.set('view engine', 'ejs');

// sends a render link to the home page or /
app.get('/', (req, res) => {
    // render is a method of the res (response) object. 
    // the first parameter is the page you are rendering (in this case index.ejs)
    // The second parameter is an object you are passing to the page with various informations
    // the data you are passing 
    res.render('index', { text: 'World' }); 
})

// import the router for the users section of pages
// require is how you import in node. in this case we are importing the exports of /users as userRouter 
// so rather than having to make a route for every url in /users here in server.js, we can do that in users.js and just import them all here. It helps to keep things more organized. 
const userRouter = require('./routes/users');
// app.use() sets app so that when anything on the /users path is requested, the routes in userRouter are used. 
app.use('/users', userRouter);

// starts the server and has it listen for incoming requests on port 3000, which is a common choice for development
app.listen(3000, async () => {
    // this just gives me a link in the terminal I can click to open the page
  console.log('Server is running at http://localhost:3000');
});