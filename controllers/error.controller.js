// Global Error Handling middleware
// when we specify these 4 parameters in a middleware express will automatically recognize it as error handling middleware, therefor express will only call this middleware when there is an error

// old code without Development and Production Error
// export default (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500; // if this error has status code send that statu code if not send 500 status code
//     err.status = err.status || 'error';

//     res.status(err.statusCode).json({
//         status: err.statusCode,
//         message: err.message,
//     })
// };




import CustomError from "../utils/CustomError.js";



const castErrorHandler = (err) => {
    const msg = `Invalid movie id "${err.value}"`;
    return new CustomError(400, msg);
};


const duplicateKeyErrorHandler = (err) =>{
    const name = err.writeErrors[0].err.op.name;
    const msg = `Movie name "${name}" is already present. Please try another name`;
    return new CustomError(400, msg);
};


const mongooseValidationErrorHandler = (err) =>{
    const errors = Object.values(err.errors).map((value) => value.message);
    const errorMessage = errors.join(". ");
    
    return new CustomError(400, errorMessage);
}



// Handling Development and Production Error
const devError = (res, err) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
        stackTrace: err.stack,
        error: err,
    });
};

const prodError = (res, err) => {
    // sending only operational errors to client to avoid showing any programming errors to user example errors: mongoose validation error, etc... these errors will not have isOperational property set to true
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong! Please try again later",
        });
    };
};

export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === "development") {
        devError(res, error);
        if(error.name === "ValidationError") error =  mongooseValidationErrorHandler(error);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") {
            error = castErrorHandler(error); // updating error object with the returned error from castErrorHandler function
        };
        if(error.code === 11000) error = duplicateKeyErrorHandler(error); // mongoose duplicate key error
        // mongoose validation error
        if(error.name === "ValidationError") error =  mongooseValidationErrorHandler(error);
        prodError(res, error);
    }
};
