import { app } from "./app.js";
import connectDB from './config/db.js';
import { PORT } from "./constants.js";

; (async function () {
    try {
        // connect to the database
        await connectDB();

        // Start the server only if DB connection succeeds
        app.listen(PORT, () => {
            console.log("Server is up and running on port", PORT);
        });
    } catch (error) {
        console.log("Server startup failed due to:", error);
    }
})();

// handle server runtime error after server has started
app.on("error", (error) => {
    console.log("Server encountered an error after starting:", error);
})