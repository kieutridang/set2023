import { createClient } from "redis";
import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());
const url = "mongodb+srv://alien:ED2bzNhvnlOG3N5x@alien.77u7gvp.mongodb.net/";
const mongoClient = new MongoClient(url);

try {
    await mongoClient.connect();
    console.log("connect db success");
} catch (error) {
    console.log("Connect db failed");
}

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/test-get", async function (req, res) {
    const data = await getData();
    console.log(data);
    res.send(data);
});

app.post("/test-hset", async function (req, res) {
    const data = await hSet("user1", {
        name: "Minh Thanh",
        company: "Redis",
        age: 29,
    });
    console.log(data);
    res.json(data);
});

app.post("/test-setData", jsonParser, async function (req, res) {
    const body = req.body;
    await set(body.key, body.value);
    res.send("success");
});

app.post("/cache-db", jsonParser, async function (req, res) {
    const database = mongoClient.db(req.body.database);
    const collection = database.collection(req.body.collection);
    let data = await client.json.get(req.body.collection);
    if (!data) {
        try {
            // data = await collection.findOne({ _id: id });
            data = await collection.find().toArray();
            await client.json.set(req.body.collection, "$", data);
            // await client.expire(req.body.collection, 60);
            
        } catch (error) {
            console.log(error);
        }
    }
    res.send(data);
});

app.post("/cache-db-id", jsonParser, async function (req, res) {
    const database = mongoClient.db(req.body.database);
    const collection = database.collection(req.body.collection);
    let data = await client.json.get(req.body.collection);
    if (!data) {
        try {
            // data = await collection.findOne({ _id: id });
            data = await collection.find().toArray();
            await client.json.set(req.body.collection, "$", data);
            await client.expire(req.body.collection, 60);
        } catch (error) {
            console.log(error);
        }
    }
    res.send(data);
});

app.post("/db", jsonParser, async function (req, res) {
    const database = mongoClient.db(req.body.database);
    const collection = database.collection(req.body.collection);
    let result;
    try {
        result = await collection.find({}).toArray();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    res.send(result);
});

const client = createClient({
    password: "dySKjg4E1Hgyl2rakdpSkrBzTTQY1YXB",
    socket: {
        host: "redis-18596.c322.us-east-1-2.ec2.cloud.redislabs.com",
        port: 18596,
    },
});

client.on("error", (err) => {
    console.log("Redis Cluster Error", err);
});
client.on("connect", () => {
    console.log("connect redis success");
});

app.listen(3001, () => {
    console.log("Listen on port 3001");
});
await client.connect();
async function hSet(key, value) {
    await client.hSet(key, value);
    const data = await client.hGetAll(key);
    console.log(data);
    return data;
}

async function set(key, value) {
    await client.set(key, value);
    const data = await client.get(key);
    console.log(data);
    return data;
}
// set();

async function getData() {
    const value = await client.get("test1950");
    console.log(value);
    return value;
}

// getData();
