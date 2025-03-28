const { Pool } = require("pg");

const pool = new Pool({
  user: "ilham",
  host: "localhost", 
  database: "db_medeva", 
  password: "@ZeroTwo02", 
  port: 5432, 
});

module.exports = pool;
