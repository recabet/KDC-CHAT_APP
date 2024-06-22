// Defining the ANSI colors for the console
const Colors = {
    RED : "\u001b[31m",
    GREEN : "\u001b[32m",
    BLUE : "\u001b[34m",
    WHITE : "\u001b[37m"
};

// Function for logging every request to the console
module.exports.LOG_Request = function(req,res,next) 
{
    if(req.url != '/favicon.ico')
    {
        console.log(Colors.WHITE + `${req.method.toUpperCase()} request to ${req.url}`);
        next();
    }   
};

// Function for logging not found error messages
module.exports.LOG_Error = function(req, res, next)  
{
    if(req.error_message)
    {
        console.log(Colors.RED + `SOME ERRORS IN ${req.url}`);
    }
    else 
    {
        console.log(Colors.RED + `NOT FOUND ${req.url}`);
    }
    next();
};
