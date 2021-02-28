const { Pool } = require('pg');

const pool1 = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const pool2 = new Pool({
    connectionString: process.env.DATABASE_URL_admin,
});

module.exports ={ pool1,pool2 } ;