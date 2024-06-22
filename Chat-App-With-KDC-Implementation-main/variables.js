const path = require('path');
const main_dir = path.dirname(require.main.filename)
const database_path = path.join(main_dir, "database")

module.exports = {
    main_dir : main_dir, 
    database_path : database_path, 
    hostname : "localhost",
    port : 3000
}