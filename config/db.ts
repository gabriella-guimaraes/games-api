import mongoose from "mongoose";
import config from "config";

async function connect() {

    const dbUrl = config.get<string>("dbUrl");

    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to database");

    } catch (e) {
        console.log("Error to connect to the database!");
        console.log(`Error: ${e}`);
    }
}

export default connect;