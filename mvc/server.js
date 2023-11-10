
const express = require('express'); // commonjs
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 8080;

//Template engines
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

// Route init
route(app); 

// app.use('/api/', router)
app.listen(port, () => {
    console.log('Example is listening on port  + ${port}');
})
