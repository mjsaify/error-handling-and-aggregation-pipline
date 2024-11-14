import connectDB from './config/db.js';
import { PORT } from "./constants.js";

// Handling Uncaught Exception error. write this code before any other code that could potentially throw an uncaught exception, ideally at the very beginning of your main file (e.g., before starting the server or establishing a database connection). This ensures that any uncaught exceptions occurring early in the application's lifecycle are properly handled.
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);

    // The server variable is not required here because these uncaughtException are not going to happen asynchronously and these error has nothing to do with the server // All the uncaughtException errors will happen in the synchronous code there for we do not require the server variable here
    // server.close(() => {
    //     process.exit(1);
    // });
});

import { app } from "./app.js";

; (async function () {
    try {
        // connect to the database
        await connectDB();

        // Start the server only if DB connection succeeds
        const server = app.listen(PORT, () => {
            console.log("Server is up and running on port", PORT);
        });

        // Handling unhandled promise rejections
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

