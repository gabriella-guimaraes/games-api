// ENV variables
require("dotenv").config();

import express from "express";
import config from "config";

const app = express();

//JSON middleware
app.use(express.json());  

// DB
import db from "../config/db";

// Routes
import router from "./router";

//Logger
import Logger from "../config/logger";

app.use("/api/", router);

//app port
const port = config.get<Number>("port");

app.listen(port, async () => {
    await db(); // A aplicação só é inicializada quando o db for conectado!
    Logger.info(`App listening on port ${port}`);
    process.exit(1); // para a aplicação em caso de erro para conectar no db
});