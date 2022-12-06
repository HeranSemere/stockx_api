const Pool=require("pg").Pool;



  const pool=new Pool({
    user: "postgres",
    password: "",
    database: "",
    port: 5432,
    host: "",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  module.exports = pool