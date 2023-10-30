require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routers/authenticate");
const taskRoute = require("./routers/task");

const app = express();


const port = 3000;

async function connectDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@setdb.ckpiltl.mongodb.net`);
        
        console.log("MongoDB are connected");
        
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

app.use(cors());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", taskRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

connectDatabase();



// const server= http.createServer((req, res) => {
//     res.end("hello wolrd");
// });

// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });