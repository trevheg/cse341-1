const express = require('express');
// create a mini router - an object that handles routes for one section of the app (in this case, user-related routes)
// this is not a full application, it is a modular piece that plugs into the main app
const router = express.Router(); 

// because we are working on one set of routes, we use router instead of app by convention
// all of the routes for /users is attached to the router object so we can later export it 
// the url for this section is /users, so we can refer to /users as /
router.get('/', (req, res) => {
    res.send('User List');
});

// post requests are when a web page is submitting information. In this case, it will be when the browser is submitting information about a new user. 
router.post('/', (req, res) => {
    res.send('Create User'); // this is just a placeholder. 
});

router.get('/new', (req, res) => {
    res.send("User New Form");
});

// get is for retrieving information from a database 
// '/:id' is a way of saying the url starts with / and then has whatever the id value is. this is so we can dynamically create a web page for each user. 
// because code goes from top to bottom, because :id is a "wild card," you want to put this at the end, or after any get requests that have something following /. For example, if you put /new after this, then server requests looking for /users/new will look for a user with the id of 'new'.
router.get('/:id', (req, res) => {
    // req is the request object which contains information on what the browser is requesting. So in this case it is sending 'id' as part of the request
    // res is the reponse object. In this case we are sending a parameter as a response. 
    res.send(`Get user with ID of ${req.params.id}`);
});

// put request is about inserting information 
router.put('/:id', (req, res) => {
    res.send(`Update user with ID of ${req.params.id}`);
});

// delete requests are about deleting information 
router.delete('/:id', (req, res) => {
    res.send(`Delete user with ID of ${req.params.id}`);
})

// export the router object 
// in node you do this by assigning the router to module.exports, which is the exports object for this module. 
// then in server.js it gets 'required' which is how you import in node 
module.exports = router;