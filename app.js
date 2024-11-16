import Express from 'express';
import router from './routes/index.js';
import CustomError from './utils/CustomError.js';
import GlobalErrorControllerHandler from './controllers/error.controller.js'

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

    // defining error object
    // const error = new Error(`Can't find ${req.originalUrl} on the server`);
    // error.status = 'fail';
    // error.statusCode = 404;

    // using our custom erro class instead of error object that is defined above
    const error = new CustomError(404, `Can't find ${req.originalUrl} on the server`); // it will call the constructor of this error class


    next(error); // when we pass an argument to next function no matter what that argument is express will automatically know there was error, in that case express will skip all other middleware functions which is currently present in middleware stack and it will directly call the global middleware error handling function 
});

// # Whenever we want to call this middleware from any part of the application code first we need to create an error object, which is defined in app.all function but later error object was commented because we are using CustomError class now
app.use(GlobalErrorControllerHandler);
export { app };