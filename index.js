const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const companies = require("./util/socket_data");
const pool = require("./Database/db");
const jwt_key = process.env.JWT_SECRET 
const jwt_expire = process.env.JWT_EXPIRES
app.use(express.json())


  var soc; 
  io.of("/socket_url").on("connection", async (socket) => { 
    soc = socket;
    socket.emit("firstFetch", JSON.stringify(companies));
  });

  function updateCompanies(){
    companies.forEach(function(company) {
      company.current_price = company.current_price - (Math.random() * 0.0011);
    });
    if(soc != undefined){
      soc.broadcast.emit('companyUpdate', JSON.stringify(companies))
      soc.emit('companyUpdate', JSON.stringify(companies))
    }  
  }

  setInterval(updateCompanies, 100)

  app.get("/companies", async(req,res)=>{
    try{
      const companies_query = pool.query('SELECT * FROM company', (err, data) => {
        if(err) {return res.status(500).json({error: "Service currently not available"});}
        return res.status(200).json(data.rows);
      })
    }catch(e){
      return res.status(500).json({error: "Service currently not available"});
    }
  });

  app.post("/user/watchlist", async(req,res)=>{
    try{
      const {email} = req.body;
      if (!(email)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT token FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              const watchlist_query = pool.query('SELECT * FROM watchlist WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ watchlist: data.rows[0] });
              })
            })
          }catch(err){
            return res.status(500).json({error: "Service currently not available"});
          }
        }else{
          return res.status(401).json({error: "Unauthorized"});
        }
      }else{
        return res.status(401).json({error: "Unauthorized"});
      }
    }catch(e){
      return res.status(401).json({error: "Unauthorized"});
    }
  });


  app.post("/user/watchlist/new", async(req,res)=>{
    try{
      const { email, company_symbol} = req.body;
      if (!(email && company_symbol)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT token FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              const check_item_query = pool.query('SELECT * FROM watchlist WHERE email = $1 and company_symbol = $2', [email.toLowerCase(), company_symbol], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount != 0) {return res.status(200).json({ message: "Watchlist item exists" });}
                const new_watchlist_item_query = pool.query('INSERT INTO watchlist(company_symbol, email) VALUES($1, $2) RETURNING *', [company_symbol ,email.toLowerCase()], (err, data) => {
                  if(err) {return res.status(500).json({error: "Service currently not available"});}
                  if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                  return res.status(200).json({ message: "Watchlist item added" });
                })
              })
            })
          }catch(err){
            return res.status(500).json({error: "Service currently not available"});
          }
        }else{
          return res.status(401).json({error: "Unauthorized"});
        }
      }else{
        return res.status(401).json({error: "Unauthorized"});
      }
    }catch(e){
      return res.status(401).json({error: "Unauthorized"});
    }
  });


  app.delete("/user/watchlist", async(req,res)=>{
    try{
      const { email, company_symbol} = req.body;
      if (!(email && company_symbol)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT token FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              const delete_item_query = pool.query('DELETE FROM watchlist WHERE company_symbol = $1 AND email = $2', [company_symbol ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Watchlist item not in list" });}
                return res.status(200).json({ message: "Watchlist item removed" });
              })
            })
          }catch(err){
            return res.status(500).json({error: "Service currently not available"});
          }
        }else{
          return res.status(401).json({error: "Unauthorized"});
        }
      }else{
        return res.status(401).json({error: "Unauthorized"});
      }
    }catch(e){
      return res.status(401).json({error: "Unauthorized"});
    }
  });


  
  app.post("/user/signin", async(req,res)=>{
    try{
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      const user_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, data) => {
        if(err) {return res.status(500).json({error: "Service currently not available"});}
        if(data.rowCount == 0) {return res.status(403).json({error: "Login incorrect or non-existent"});}
        bcrypt.compare(password, data.rows[0].password, function(err, passwordMatches) {
          if(err) {return res.status(500).json({error: "Service currently not available"});}
          if (passwordMatches && email.toLowerCase() == data.rows[0].email) {
            if(data.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
            var tinnumber = data.rows[0].tinnumber
            const token = jwt.sign(
              { email, tinnumber},
              jwt_key,
              { expiresIn: jwt_expire}
            );
            const update_token = pool.query('UPDATE investor SET token = $1 WHERE email = $2 RETURNING token', [token, email.toLowerCase()], (err, dataUpdate) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(dataUpdate.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
              delete data.rows[0].goverment_id;
              delete data.rows[0].password;
              delete data.rows[0].account_disabled;
              delete data.rows[0].token;
              delete data.rows[0].user_id;
              return res.status(200).json({ auth: true, user: data.rows[0], token: token });
            })
          }else{
            return res.status(403).json({error: "Login incorrect or non-existent"});
          }
        });
      });
    }catch(err){
      return res.status(500).json({error: "Service currently not available"});
    }
  });

  app.post("/user/signup", (req,res)=>{
    try{
      const { first_name, fathers_name, grandfathers_name, phone, email, password, country_of_citizenship, tinnumber } = req.body;
      if (!(first_name && fathers_name && grandfathers_name && phone && email && password && country_of_citizenship && tinnumber)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if(password.length < 8){
        return res.status(400).json({error: "Weak password. Make sure password is at least 8 characters long."});
      }
      const user_query = pool.query('SELECT * FROM investor WHERE email = $1 or tinnumber = $2', [email.toLowerCase(), tinnumber], (err, data) => {
        if(err) {return res.status(500).json({error: "Service currently not available"});}
        if(data.rowCount != 0) {return res.status(409).json({error: "User already exists"});}
        bcrypt.genSalt(10, (err, salt) => {
          if(err) {return res.status(500).json({error: "Service currently not available"});}
          bcrypt.hash(password, salt, function(err, hash) {
            if(err) {return res.status(500).json({error: "Service currently not available"});}
            const token = jwt.sign(
              { email, tinnumber },
              jwt_key,
              { expiresIn: jwt_expire}
            );
            const user_query = pool.query("INSERT INTO investor(first_name, fathers_name, grandfathers_name, phone, email, password, country_of_citizenship, tinnumber, token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING first_name, fathers_name, grandfathers_name, phone, email, country_of_citizenship, tinnumber, profile_pic", [first_name, fathers_name, grandfathers_name, phone, email.toLowerCase(), hash, country_of_citizenship, tinnumber, token], (err, data) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
              return res.status(200).json({ auth: true, user: data.rows[0], token: token });
             });
           });
         })
      })  
    }catch(err){
      return res.status(500).json({error: "Service currently not available"});
    }
  });



http.listen(port, () => {
    console.log("Server Is Running Port: " + port);
});