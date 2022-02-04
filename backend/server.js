const Pool = require("pg").Pool;
require('dotenv').config();
const pool = new Pool({
    database : process.env.db_name,
    password: process.env.db_password,
    user: process.env.db_user,
    host: process.env.db_host,
    port: process.env.db_port
});
module.exports = pool;

