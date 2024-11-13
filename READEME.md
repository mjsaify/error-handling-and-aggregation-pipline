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