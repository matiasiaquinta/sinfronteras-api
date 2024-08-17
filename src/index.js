import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
    try {
        await connectDB();
        app.listen(PORT);
        console.log(`Listening on port http://localhost:${PORT}`);
        //console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error(error);
    }
}

main();

//import app from "./app.js";
//import { connectDB } from "./db.js";
//
//connectDB();
//app.listen(4000);
//console.log("Server on port", 4000);
