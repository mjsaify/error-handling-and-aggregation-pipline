import Express from 'express';
import router from './routes/index.js';

const app = Express();

app.use(Express.json({ limit: "16kb" }));
app.use(Express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.use("/api", router);

// Default Route Error
app.all('*', (req, res, next) => {
    // return res.status(404).json({
    //     status: 'failed',
    //     message: `Can't find ${req.originalUrl} on the server`
    // });

    // error object
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 'fail';
    error.statusCode = 404;

    next(error); // when we pass an argument to next function no matter what that argument is express will automatically know there was error, in that case express will skip all other middleware functions which is currently present in middleware stack and it will directly call the global middleware error handling function 
});


// Global Error Handling middleware
// when we specify these 4 parameters in a middleware express will automatically recognize it as error handling middleware, therefor express will only call this middleware when there is an error

// # Whenever we want to call this middleware from any part of the application code first we need to create an error object
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // if this error has status code send that statu code if not send 500 status code
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    })
});

export { app };