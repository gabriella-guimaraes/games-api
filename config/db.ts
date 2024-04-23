import mongoose from "mongoose";
import config from "config";

//Logger
import Logger from "./logger";

async function connect() {

    const dbUrl = config.get<string>("dbUrl");

    try {
        await mongoose.connect(dbUrl);
        Logger.info("Connected to database");

    } catch (e) {
        Logger.error("Error to connect to the database!");
        Logger.error(`Error: ${e}`);
    }
}

export default connect;