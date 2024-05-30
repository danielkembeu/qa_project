const env = require('./env');
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
    env.DBNAME,
    env.DBUSER,
    env.DBPWD,
    {
        host: env.DBHOST,
        dialect: "mysql",
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false
        //     }
        // }
    }
);

module.exports = sequelize;
