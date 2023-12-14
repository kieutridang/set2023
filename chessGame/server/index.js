import express from "express";
import router from "./routers/index.js";
import bodyParser from "body-parser";
import connectDatabase from "./config/database/index.js";

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(router);
connectDatabase();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
