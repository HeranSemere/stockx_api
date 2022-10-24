const express=require("express");
var PORT = process.env.PORT || 3000;
const app= express();
//const pool=require("./Database/db");
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

  app.get("/user/watchlist/:id", async(req,res)=>{
    const {id}= req.params
  
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
      
      pool.query(updateWatchlist, ['true', req.params.id], (err, data) => {
        if (err) console.log(err);
        res.json({message:"Watchlist was updated"})
      })
  
          }catch(err){
      console.error(err.message)
          }
  });


  app.listen(PORT, ()=>{
    console.log("Server is listning on port "+PORT);
  });