// 1. Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});

// What It Does:
// This code listens for uncaughtException events, which occur when the application throws an error that isn't caught anywhere in the code.

// Response:
// It logs the error details and then shuts down the application using process.exit(1). This ensures the app doesn't continue running in an unstable state.

// 2. Handling Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.error("Unhandled Rejection Occurred! Shutting down...");
    console.error(err.message);

    // shutdown server
    server.close(() => {
        process.exit(1);
    });
});

// What It Does: 
// This code handles unhandled promise rejections, such as when a promise is rejected and there is no .catch() to handle it.

// Response: 
// It logs the error, gracefully shuts down the server using server.close(), and then exits the process with process.exit(1). The server.close() method ensures ongoing requests are completed before shutting down.


// 3. Handling Server Runtime Errors
server.on('error', (err) => {
    console.log("Server encountered an error after starting:", error);
    process.exit(1);
});

// What It Does:
// This code handles errors that occur on the server after it has started running. These could be errors like port conflicts or network issues

// Response:
// It logs the error and exits the process, as the server is not in a stable state to continue running.

// 4. Handling Invalid Routes in app.js
app.all('*', (req, res, next) => {
    const error = new ApiError(404, `Can't find ${req.originalUrl}`);
    next(error);
});


// What It Does:
// This middleware catches any requests to routes that don't exist and creates an ApiError object with a 404 status code.

// Response:
// It passes the error to the global error-handling middleware using next(error).

// 5. Global Error Handling Middleware in controllers/error.controller.js
export default (error, req, res, next) => {
    error.status = error.status || 'error';
    error.statusCode = error.statusCode || 500;

    if (NODE_ENV === "development") {
        DevError(res, error);
    } else if (NODE_ENV === "production") {
        ProdError(res, error);
    }
}

// Purpose:
// This is a global error-handling middleware that handles all errors passed to it, providing different responses for development and production environments.

// Development Mode (DevError function):
// Sends detailed error information, including the error stack, to the client for easier debugging.

// Production Mode (ProdError function):
// If the error is operational (i.e., expected and handled using ApiError), it sends the error message.
// If the error is unexpected, it sends a generic message to avoid exposing sensitive details.


// 6. ApiError Class in utils/ApiError.js
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// What It Does:
// This custom error class extends the built-in Error class. It adds a statusCode and marks the error as isOperational, indicating it is an expected error.

// Why It’s Useful:
// By distinguishing operational errors from programming errors, you can provide meaningful responses to the client while hiding internal details when necessary.



// 7. Async Error Handling Middleware - /utils/asyncHandler.js
export const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
};

// Purpose:
// In Express applications, route handlers often perform asynchronous operations, such as database queries or API calls. When using async functions, if an error occurs (e.g., a rejected Promise), it will not be automatically caught by Express's built-in error handling. This utility function ensures that any errors thrown in asynchronous route handlers are properly passed to Express's error-handling middleware.

// How It Works:
    // asyncErrorHandler is a higher-order function, which means it takes a function (func) as an argument and returns a new function.
    // The returned function is a middleware function that follows the signature (req, res, next), which is typical for Express route handlers.

    // Executing the Original Function:
        // Inside the returned function, func(req, res, next) is called. func is expected to be an asynchronous function (typically an async function) that handles an HTTP request.

        // Since func is an asynchronous function, it returns a Promise.
    
    // Catching Errors:
        // .catch(err => next(err)): This catches any errors that occur inside func. If func throws an error or returns a rejected Promise, the .catch block will handle it.
        
        // next(err): By calling next(err), the error is passed to Express's error-handling middleware. This allows the application to handle errors gracefully and consistently, rather than crashing or leaving errors unhandled.