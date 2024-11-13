// inheriting built-in error class of javascript
class CustomError extends Error {
    constructor(statusCode, message){
        // calling the constructor of this error class
        super(message) // when we pass this message to the constructor of the error class, when instintiate the CustomError class their the message will be automatically set to passed 'message'

        this.statusCode = statusCode;

        // we want status to 'fail' if the statusCode starts from 400 to 599 these are client errors, if the statusCode starts with 500 to 599 these are server errors. These are the two types of error that can happen in our application
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

        // creating another property isOperational because we are going to use this class to handle only operational errors
        this.isOperational = true;

        
        // capturing stackTrace, the stackTrace will tell you where the error has actually happened in the code.
        // the base error class "Error" it already capture the stackTrace for any error that occure in the application 
        
        // passing current object .i.e 'this' and passing CustomError class
        Error.captureStackTrace(this, this.constructor);
    }
};

export default CustomError;


// example: - const eror = new CustomError(404, "some error message")