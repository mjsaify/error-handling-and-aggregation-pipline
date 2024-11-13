// Higher Order Function to handle async function errors
export const asyncErrorHandler = (func) => {

    // passing the func inside anonymous function to avoid calling the function when application refreshes. When express will call this function it is also going to pass (req, res, next) which the "func" can have access to it.
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    }
};
