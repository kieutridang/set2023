
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Router = require('./routes/')


mongoose.connect('mongodb+srv://npthuy:Ahihi40@npthuy.merawhz.mongodb.net/')
    .then(() => console.log('Connected!'))

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB database!');
});

app.use(Router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})