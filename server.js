const express = require('express');
const open = require('open'); // not sure if I still need this
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index'); 
})

app.listen(3000, async () => {
  console.log('Server is running at http://localhost:3000');
  const open = await import('open');
  open.default('http://localhost:3000');
});