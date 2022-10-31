const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);

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

const companies = [
  {
  symbol: "TSLA",
  name: "Tesla",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 102.5,
  }, 
  
  {
    symbol: "T",
    name: "AT&T Inc.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    adj_closing: 55.5,
    }, 
  {
  symbol: "APLE",
  name: "Apple",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 153.99,
  }, 
  {
    symbol: "GE",
    name: "General Electric Company",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    adj_closing: 199.8,
    }, 
  {
  symbol: "GOOGL",
  name: "Alphabet Inc",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 200,
  }, 
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    adj_closing: 237.45,
    }, 
  {
  symbol: "AMZN",
  name: "Amazon.com Inc.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 108.34,
  }, 
  {
    symbol: "BAC",
    name: "Bank of America",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    adj_closing: 99.9,
    }, 
  {
  symbol: "JNJ",
  name: "Johnson & Johnson",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 65.34,
  }, 
  {
    symbol: "V",
    name: "Visa Inc.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    adj_closing: 111.10,
  }, 
    {
  symbol: "WMT",
  name: "Walmart Inc.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 80.5,
  }, 
  {
  symbol: "META",
  name: "Meta Platforms, Inc.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 177.32,
  }, 
  {
  symbol: "CVX",
  name: "Chevron Corporation",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 142.1,
  }, 
  {
  symbol: "NVDA",
  name: "NVIDIA Corporation",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 181.90,
  }, 
  {
  symbol: "MA",
  name: "Mastercard Incorporated",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 121.2,
  }, 
  {
  symbol: "HD",
  name: "Home Depot",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 95.3,
  }, 
  {
  symbol: "JPM",
  name: "JP Morgan Chase & Co.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  adj_closing: 153.7,
  }, 

]


var soc; //check for null before using this

io.of("/socket_url").on("connection", async (socket) => { //sends list of buses from "database" on first fetch
 
    //console.log("New User has Connected!");
    soc = socket;

    //console.log(JSON.stringify(companies))
    socket.emit("firstFetch", JSON.stringify(companies));
});

function updateCompanies(){

  companies.forEach(function(company) {
    company.adj_closing = company.adj_closing - (Math.random() * 0.0011);
});
  
  if(soc != undefined){
    // soc.emit("updateBus", data); //send incoming data from buses to users that are listning to the "updateBus" event
    //soc.broadcast.emit('updateBus',data) 
    soc.broadcast.emit('companyUpdate', JSON.stringify(companies))
    soc.emit('companyUpdate', JSON.stringify(companies))
    //console.log("Companies updated"); 
 }  
}

setInterval(updateCompanies, 100)


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



http.listen(port, () => {
    console.log("Server Is Running Port: " + port);
});