const express = require("express");
const routers = require("./routers");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { createClient, createCluster } = require("redis");

// const { connectToDatabase } = require("./config/database");
const app = express();

// app.use(bodyParser.json());
// app.use("/api", routers);
// connectToDatabase();
// app.listen(3002, () => {
//     console.log("Listening on http://localhost:3002");
// });

const cluster = createCluster({
    password: "Uv8cCW345toomnkQYOMVRfSKOngXgq28",
    socket: {
        host: "redis-16473.c257.us-east-1-3.ec2.cloud.redislabs.com",
        port: 16473,
    },
});

cluster.on("error", (err) => console.log("Redis Cluster Error", err));

async function connectCluster() {
    await cluster.connect();

    await cluster.set("foo", "bar");
    const value = await cluster.get("foo");
    console.log(value); // returns 'bar'

    await cluster.quit();
}
connectCluster();
