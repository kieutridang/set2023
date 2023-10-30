const express = require('express');
const cors = require('cors');
const logger = require('winston');
const router = require('./routes/index');

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nguyenhung123:q0Gbv0vFypD0YpYF@atlascluster.rx1cs0y.mongodb.net/todoDatabase?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use(router);

app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
});

module.exports = app;