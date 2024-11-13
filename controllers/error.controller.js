// Global Error Handling middleware
// when we specify these 4 parameters in a middleware express will automatically recognize it as error handling middleware, therefor express will only call this middleware when there is an error

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // if this error has status code send that statu code if not send 500 status code
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    })
}