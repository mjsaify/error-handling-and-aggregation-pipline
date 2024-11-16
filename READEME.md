# Error Handling

. Two types of Errors

    1. Operational Errors
        . Operational errors are the problems that we can predict that will happen at some point in future. We need to handle them advanced
            
            a. User trying to access an invalid roue
            b. inputting invalid data
            c. application failed to connect to server
            d. request timeout, etc. 

    2. Programming Errors
        . Programmding errors are simply bugs that we programmers, by mistake, introduces them in code
            a. trying to read property of an undefined variable
            b. using await without async
            c. passing a number where an object is expected, etc.


. Uncaught Exceptions
    . All the errors that occure in our synchronous code but are not handled anywhere are called as uncaught exception. Just like the Rejected promises in the same way we can also handle uncaught exception

    # In the unhandledRejection crashing the application is optional but when we have a uncaughtException in that case it is necessary to exit the application .i.e because after there was uncaughtException the entire node process is in so called uncleaned state and to fix that the process needs to terminate and restart and in production we should have a tool in place which will restart the application after it has crashed 


# Node Js Debugger (Debugging nodejs with vscode)
    . Create a launch.json file
    . The launch.json file is a configuration file in your node js project which basically tells vs code how to configure debugger for your node js project