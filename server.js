// import the express library
const express = require('express');
// Create an Express application. The "app" object now holds the web server. app is the object for routes, middleware, etc. 
// app is the central hub of the entire application 
// above, "express" is the Express library itself, while "app" here is an instance of the Express Application class. express is a function while app is an object.
// app is NOT an instance of the Express library, but of the Application class  
const app = express();

// app.use registers middleware in the Express application. 
  // middleware functions execute in the order they're defined.
  // app.use runs on every request 
// if you have static pages, ie pages that don't need to be rendered server side, you can keep them in the "public" folder. 
// this way if a client requests the url of a static page, the server will give those files directly instead of looking for a route like app.get('/static.html')
// this bit of code makes Express look check the public folder for the file before using routes 
// app methods are "app management methods" that register middleware or route handlers on the app object. express methods are "middleware factory functions" - they create middleware, but do not register them anywhere. app.use() is necessary to use the middleware, ie tells app to use a particular middleware. 
// according to ai, these methods are separated based on "where the logic lives" - creation vs registration.
app.use(express.static("public"));

// this parses data from html forms and puts it in req.body so we can use that data  
  // req.body is an object that contains data sent in the body of a request. 
// extended: true as opposed to extended: false allows the form parser to handle more complex data types like nested objects and arrays. Form data is normally sent in an array of objects, so this is necessary. 
  // Web Dev Simplified calls this "boilerplate code", which according to wikipedia is sections of code that are repeated in multiple places with little to no variation. You just need it to make it work. 
  // extended: false is only really used in legacy code or in cases where you want to save a tiny bit of memory. You will probably never use it. 
app.use(express.urlencoded({ extended: true }));
// this parses JSON data from API data and puts it in req.body
app.use(express.json());

// this sets EJS (embedded JavaScript) as your viewing engine.
// that's the one that lets you make .ejs files which are HTML files with embedded JS
// You want to make sure you have "EJS Language Support installed in VSCode"
app.set('view engine', 'ejs');

// this is going to run the logger function that is written below whenever there is a request. 
// if you have a middleware you want to run at each request, run it at the top of your page because the code moves from top to bottom. 
app.use(logger);

// sends a render link to the home page or /
// the first parameter of app.get is the path 
// app.get only runs on GET requests to that path 
// the rest of the parameters is the handlers, which are middleware/handler functions that get executed when the path matches 
// req is the request object and contains request data (parameters, body, headers, etc.)
// res is the response object, and is needed to send a response 
// next is included in middleware. Without "next", it is called a "final handler" and is the final link in the middleware chain. 
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
// you could have a separate route for everything in /users, but it is more efficient and better organization to put the user stuff in a separate file. 
app.use('/users', userRouter);

// middleware 
// all middleware uses req, res, and next. "next" tells the server to move to the next function instead of ending there. 
// this middleware function is going to log the requested url to the console when a request is made to the server. 
// to run this function, use app.use(logger) somewhere in server.js. You can put it at the top of the page to run every time, or you can pass it as a parameter to another app.use function so it only gets run when a particular path is requested. Though if you want to run it in /users, you should put it in users.js 
function logger(req, res, next) {
  // req.originalUrl is a property of the req object that contains the full original URL the client requested including the query string
  console.log(req.originalUrl);
  next();
}

// starts the server and has it listen for incoming requests on port 3000, which is a common choice for development
app.listen(3000, async () => {
    // this just gives me a link in the terminal I can click to open the page
  console.log('Server is running at http://localhost:3000');
});