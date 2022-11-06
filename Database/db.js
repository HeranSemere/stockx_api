const Pool=require("pg").Pool;

const pool=new Pool({
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: 5432,
    host: process.env.POSTGRESQL_HOST,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  

  module.exports = pool