// ENV variables
require("dotenv").config();

import express from "express";
import config from "config";
const cors = require('cors');

const app = express();
app.use(cors());

//JSON middleware
app.use(express.json());  

// DB
import db from "../config/db";

// Routes
import router from "./router";

//Logger
import Logger from "../config/logger";

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware";

app.use(morganMiddleware); //imprime as requisições no terminal (dev)
app.use("/api/", router);

//app port
const port = config.get<Number>("port");

// swagger documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Gamer Wiki',
        version: '1.0.0',
        description: 'Express RESTful API with TS Documentation',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
          },
        contact: {
            name: 'Gabriella Guimarães',
            url: 'https://github.com/gabriella-guimaraes'
        } ,
    },
    servers: [
        {
            url: 'http://localhost:3001/api',
            description: 'Development server'
        }
    ]
};

const options = {
    swaggerDefinition,
    // Caminho para os arquivos que contém as definições do OpenAPI
    apis: ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, async () => {
    await db(); // A aplicação só é inicializada quando o db for conectado!
    Logger.info(`App listening on port: ${port}`);
    //process.exit(1); // para a aplicação em caso de erro para conectar no db
});