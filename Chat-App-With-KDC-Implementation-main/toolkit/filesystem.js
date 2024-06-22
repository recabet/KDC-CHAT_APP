const fs = require("fs");

function readFromFile(filePath, CALLBACK)
{
    fs.readFile(filePath, "utf8", function(err, data) 
    {   
        if (err) console.log(err);
        else CALLBACK(JSON.parse(data));
    });
};

function writeToFile(filePath, data, CALLBACK)
{
    fs.writeFile(filePath, JSON.stringify(data), 'utf-8', function(err) 
    {   
        if (err) console.log(err);
        else CALLBACK();
    });
}

module.exports = {
    readFromFile: readFromFile, 
    writeToFile: writeToFile
};