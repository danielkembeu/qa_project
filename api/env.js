
require("dotenv").config();

module.exports = {
    DBNAME: process.env.DATABASE_NAME || '',
    DBUSER: process.env.DATABASE_USER || '',
    DBHOST: process.env.DATABASE_HOST || '',
    DBPWD: process.env.DATABASE_PASSWORD || '',

    PORT: process.env.APP_PORT || 5100,
};