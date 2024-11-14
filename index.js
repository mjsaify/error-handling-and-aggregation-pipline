import { app } from "./app.js";
import connectDB from './config/db.js';
import { PORT } from "./constants.js";

; (async function () {
    try {
        // connect to the database
        await connectDB();

        // Start the server only if DB connection succeeds
        const server = app.listen(PORT, () => {
            console.log("Server is up and running on port", PORT);
        });

        // Handling unhandled promise rejections globally
        process.on('unhandledRejection', (err) => {
            console.error("Unhandled Rejection Occured! Shutting down...");
            console.error(err.message);

            server.close(() => {
                process.exit(1); // Shut down the process
            });
        });

        // handle server runtime error after server has started, an error can occured after server has started like the port is already taken
        server.on("error", (error) => {
            console.log("Server encountered an error after starting:", error);
            process.exit(1);
        })
    } catch (error) {
        console.log("Server startup failed due to:", error);
        process.exit(1);
    }
})();

