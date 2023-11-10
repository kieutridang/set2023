const express = require('express'); 
const path = require('path');
const ejs = require('ejs');
const app = express(); // app express
const port = 8080
 // server


//Template engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/homepage', (req, res) => {
  res.render('homepage.ejs');
});

app.get('/tasks', (req, res) => {
  res.render('tasks.ejs');
});

app.get('/users', (req, res) => {
  res.render('users.ejs');
})

app.get('/projects', (req, res) => {
  res.render('projects.ejs');
});

// // app.use('/api/', router)
app.listen(port, () =>
  console.log(`listening on @{port}`)
);

