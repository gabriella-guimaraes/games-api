import express from "express";
import config from "config";

const app = express();

//JSON middleware
app.use(express.json());    

//app port
const port = config.get<Number>("port");

app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
});