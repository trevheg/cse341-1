// imports the express library
const express = require('express');
// Create an Express application. "app" now holds the web server. app is the object for routes, middleware, etc. 
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
    res.render('index', { text: 'World' }); 
})

// starts the server and has it listen for incoming requests on port 3000, which is a common choice for development
app.listen(3000); //