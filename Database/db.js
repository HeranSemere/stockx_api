const Pool=require("pg").Pool;

const pool=new Pool({
    user: "gpeflaxveneltk",
    password: "7a667820282a2f2a0683dd581921203b97bc62dde0f5c2a4dd39876219b24d93",
    database: "dc4ib5vtqbqp2i",
    port: 5432,
    host: "ec2-44-199-22-207.compute-1.amazonaws.com",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  module.exports = pool