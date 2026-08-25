const express = require('express');
// create a mini router - an object that handles routes for one section of the app (in this case, user-related routes)
// this is not a full application, it is a modular piece that plugs into the main app
// because we are working on one set of routes, we use router as the object name instead of app by convention
const router = express.Router(); 


// get, post, put, and delete are examples of route handlers
// all of the routes for /users is attached to the router object so we can later export it 
// the url for this section is /users, so we can refer to /users as /
router.get('/', (req, res) => {
    
    res.send('User List');
});

// post requests are when a web page is submitting information. In this case, it will be when the browser is submitting information about a new user. 
router.post('/', (req, res) => {
    const isValid = true;
    if (isValid) {
        // adds the new user to the users list
        // req.body.firstName is provided by the form on users/new 
        // by default Express doesn't let you access the body, so you need to use middleware to do do that. This is done by the line 'app.use(express.urlencoded({ extended: true }))' in server.js
        users.push({ firstName: req.body.firstName })
        // redirects to the page for the user we just created. users.length - 1 gets the last user id. 
        return res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error");
        return res.render('users/new', { firstName: req.body.firstName})
    }

});

router.get('/new', (req, res) => {
    res.render('users/new', { firstName: 'Test' });
});

// get is for retrieving information from a database 
// '/:id' is a way of saying the url starts with / and then has whatever the id value is. this is so we can dynamically create a web page for each user. 
// because code goes from top to bottom, because :id is a "wild card," you want to put this router at the end, or after any get requests that have something following /. For example, if you put a router for /new after this, then server requests looking for /users/new will look for a user with the id of 'new'.
// router.get('/:id', (req, res) => {
//     // req is the request object which contains information on what the browser is requesting. So in this case it is sending 'id' as part of the request
//     // this line only works because we define req.user in router.param below
//     console.log(req.user);
//     // res is the reponse object. In this case we are sending a parameter as a response. 
//     res.send(`Get user with ID of ${req.params.id}`);
// });

// // put request is about inserting information 
// router.put('/:id', (req, res) => {
//     res.send(`Update user with ID of ${req.params.id}`);
// });

// // delete requests are about deleting information 
// router.delete('/:id', (req, res) => {
//     res.send(`Delete user with ID of ${req.params.id}`);
// });

// you can also chain all the routes together into one route if they go to the same url. It does the same thing but cleans up the code a bit 
router
    .route('/:id')
    .get((req, res) => {
        console.log(req.user)
        res.send(`Get user with ID of ${req.params.id}`);
    }).put((req, res) => {
        res.send(`Update user with ID of ${req.params.id}`);
    }).delete((req, res) => {
        res.send(`Delete user with ID of ${req.params.id}`);
    });


const users = [{name: 'Kyle' }, { name: 'Sally' }];

// this router method says that when you go to a route that has an id parameter, then run this code
// it attaches the user data (users) to req.user. now console.log(req.user) logs the user object instead of undefined
// param is a kind of middleware, which is code that runs between the request and the response 
router.param('id', (req, res, next, id) => {
    req.user = users[id];
    // this middleware will run indefinitely and you will be in an infinite loop unless you run the function next 
    next();
});

// export the router object 
// in node you do this by assigning the router to module.exports, which is the exports object for this module. 
// then in server.js it gets 'required' which is how you import in node 
module.exports = router;