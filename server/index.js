import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import UploadRoute from "./routes/UploadRoute.js";

const app = express();

// to serve images inside public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_HOSTNAME;
const database = process.env.DB_DATABASE;

Connection(username, password, cluster, database);

app.listen(PORT, () => console.log(`Listening successfully on port ${PORT}`));

//Usages o Routs
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
