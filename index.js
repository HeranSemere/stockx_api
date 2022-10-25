const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
var PORT = process.env.PORT || 3000
app.use(express.json())


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
}
);

app.get("/user/companies", async(req,res)=>{
  
  try{
    const post= await pool.query("SELECT * FROM company");
  
    //res.json({companies:post.rows});
    res.json(post.rows);

        }catch(err){
    console.error(err.message)
        }
});

app.get("/user/watchlist", async(req,res)=>{
  
    try{
      const post= await pool.query("SELECT * FROM company WHERE in_watchlist = true");
    
      //res.json({companies:post.rows});
      res.json(post.rows);
  
          }catch(err){
      console.error(err.message)
          }
  });


  app.put("/user/watchlist/:id", async(req,res)=>{
    const {id}= req.params

    
    try{

       let updateWatchlist = 'UPDATE company SET in_watchlist = $1 WHERE company_id = $2'
      
      pool.query(updateWatchlist, [req.body.in_watchlist, req.params.id], (err, data) => {
        if (err) console.log(err);
        res.json({message:"Watchlist was updated"})
      })
  
          }catch(err){
      console.error(err.message)
          }
  });

  var soc;

  io.of("/socket_url").on("connection", (socket) => { //sends list of companies from "database" on first fetch
 
    console.log("New User has Connected!");
    soc = socket;
    socket.emit("firstFetch", "Companies");

});



  server.listen(PORT, ()=>{
    console.log("Server is listning on port "+PORT);
  });

