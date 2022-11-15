var { bcrypt, pool, jwt, jwt_key, jwt_expire } = require("../exports/exports");

module.exports = function(app){

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


  app.post("/user/stocks", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const stocks_query = pool.query('SELECT company_symbol, shares, email FROM stocks WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const watchlist_query = pool.query('SELECT * FROM watchlist WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
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



  app.post("/user/stopbuy/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, stop_price, expire } = req.body;
      if (!(email && company_symbol && shares && stop_price && expire)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_stop_buy_query = pool.query('INSERT INTO stop_buy_order(company_symbol, shares, stop_price, expire, email) VALUES($1, $2, $3, $4, $5)', [company_symbol, shares, stop_price, expire, email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Stop buy order placed" });
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



  app.post("/user/marketbuy/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, total_price} = req.body;
      if (!(email && company_symbol && shares && total_price)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_market_buy_query = pool.query('INSERT INTO market_buy_order(company_symbol, shares, email, total_price) VALUES($1, $2, $3, $4)', [company_symbol, shares, email.toLowerCase(), total_price], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Market buy order placed" });
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


  app.post("/user/limitbuy/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, limit_price, expire } = req.body;
      if (!(email && company_symbol && shares && limit_price && expire)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_limit_buy_query = pool.query('INSERT INTO limit_buy_order(company_symbol, shares, limit_price, expire, email) VALUES($1, $2, $3, $4, $5)', [company_symbol, shares, limit_price, expire, email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Limit buy order placed" });
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


  app.post("/user/stopsell/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, stop_price, expire } = req.body;
      if (!(email && company_symbol && shares && stop_price && expire)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_stop_sell_query = pool.query('INSERT INTO stop_sell_order(company_symbol, shares, stop_price, expire, email) VALUES($1, $2, $3, $4, $5)', [company_symbol, shares, stop_price, expire, email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Stop sell order placed" });
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



  app.post("/user/marketsell/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, total_price} = req.body;
      if (!(email && company_symbol && shares && total_price)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_market_sell_query = pool.query('INSERT INTO market_sell_order(company_symbol, shares, email, total_price) VALUES($1, $2, $3, $4)', [company_symbol, shares, email.toLowerCase(), total_price], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Market sell order placed" });
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



  app.post("/user/limitsell/new", async(req,res)=>{
    try{
      const { email, company_symbol, shares, limit_price, expire } = req.body;
      if (!(email && company_symbol && shares && limit_price && expire)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const new_limit_sell_query = pool.query('INSERT INTO limit_sell_order(company_symbol, shares, limit_price, expire, email) VALUES($1, $2, $3, $4, $5)', [company_symbol, shares, limit_price, expire, email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json({ message: "Limit sell order placed" });
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


  app.post("/user/limitbuy", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const limitbuy_query = pool.query('SELECT * FROM limit_buy_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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

  app.post("/user/orders", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              
              const limitbuy_query = pool.query('SELECT * FROM limit_buy_order WHERE email = $1', [email.toLowerCase()], (err, limitbuy_data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                const limitsell_query = pool.query('SELECT * FROM limit_sell_order WHERE email = $1', [email.toLowerCase()], (err, limitsell_data) => {
                  if(err) {return res.status(500).json({error: "Service currently not available"});}
                  const marketbuy_query = pool.query('SELECT * FROM market_buy_order WHERE email = $1', [email.toLowerCase()], (err, marketbuy_data) => {
                    if(err) {return res.status(500).json({error: "Service currently not available"});}
                    const marketsell_query = pool.query('SELECT * FROM market_sell_order WHERE email = $1', [email.toLowerCase()], (err, marketsell_data) => {
                      if(err) {return res.status(500).json({error: "Service currently not available"});}
                      const stopbuy_query = pool.query('SELECT * FROM stop_buy_order WHERE email = $1', [email.toLowerCase()], (err, stopbuy_data) => {
                        if(err) {return res.status(500).json({error: "Service currently not available"});}
                        const stopsell_query = pool.query('SELECT * FROM stop_sell_order WHERE email = $1', [email.toLowerCase()], (err, stopsell_data) => {
                          if(err) {return res.status(500).json({error: "Service currently not available"});}
                            return res.status(200).json({limitbuy:limitbuy_data.rows, limitsell:limitsell_data.rows, marketbuy:marketbuy_data.rows, marketsell:marketsell_data.rows, stopbuy:stopbuy_data.rows, stopsell:stopsell_data.rows});
                        })
                      })
                    })
                  })
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

  app.post("/user/limitsell", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const limitsell_query = pool.query('SELECT * FROM limit_sell_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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


  app.post("/user/marketbuy", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const marketbuy_query = pool.query('SELECT * FROM market_buy_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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

  app.post("/user/marketsell", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const marketsell_query = pool.query('SELECT * FROM market_sell_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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



  app.post("/user/stopbuy", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const stopbuy_query = pool.query('SELECT * FROM stop_buy_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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


  app.post("/user/stopsell", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const stopsell_query = pool.query('SELECT * FROM stop_sell_order WHERE email = $1', [email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                return res.status(200).json(data.rows);
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


  app.delete("/user/stopbuy", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM stop_buy_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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


  app.delete("/user/stopsell", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM stop_sell_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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


  app.delete("/user/marketsell", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM market_sell_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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

  app.delete("/user/marketbuy", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM market_buy_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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


  app.delete("/user/limitsell", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM limit_sell_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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


  app.delete("/user/limitbuy", async(req,res)=>{
    try{
      const { email, order_id} = req.body;
      if (!(email && order_id)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM investor WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].account_disabled) {return res.status(401).json({error: "Account is disabled"});}
              const delete_item_query = pool.query('DELETE FROM limit_buy_order WHERE order_id = $1 AND email = $2', [order_id ,email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) { return res.status(200).json({ message: "Item not in list" });}
                return res.status(200).json({ message: "Ordered canceled" });
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



  /*app.post("/user/signupa", (req,res)=>{
    try{
      const { first_name, fathers_name, grandfathers_name, phone, email, password} = req.body;
      
        bcrypt.genSalt(10, (err, salt) => {
          if(err) {return res.status(500).json({error: "Service currently not available"});}
          bcrypt.hash(password, salt, function(err, hash) {
            if(err) {return res.status(500).json({error: "Service currently not available"});}
            const token = jwt.sign(
              { email},
              jwt_key,
              { expiresIn: jwt_expire}
            );
            const user_query = pool.query("INSERT INTO administrator(first_name, fathers_name, grandfathers_name, phone, email, password, token) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING first_name, fathers_name, grandfathers_name, phone, email", [first_name, fathers_name, grandfathers_name, phone, email.toLowerCase(), hash, token], (err, data) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(data.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
              return res.status(200).json({ auth: true, user: data.rows[0], token: token });
             });
           });
         })
       
    }catch(err){
      return res.status(500).json({error: "Service currently not available"});
    }
  });*/

  app.post("/admin/signin", async(req,res)=>{
    try{
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      const user_query = pool.query('SELECT * FROM administrator WHERE email = $1', [email.toLowerCase()], (err, data) => {
        if(err) {return res.status(500).json({error: "Service currently not available"});}
        if(data.rowCount == 0) {return res.status(403).json({error: "Login incorrect or non-existent"});}
        bcrypt.compare(password, data.rows[0].password, function(err, passwordMatches) {
          if(err) {return res.status(500).json({error: "Service currently not available"});}
          if (passwordMatches && email.toLowerCase() == data.rows[0].email) {
            const token = jwt.sign(
              { email},
              jwt_key,
              { expiresIn: jwt_expire}
            );
            const update_token = pool.query('UPDATE administrator SET token = $1 WHERE email = $2 RETURNING token', [token, email.toLowerCase()], (err, dataUpdate) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(dataUpdate.rowCount == 0) {return res.status(500).json({error: "Service currently not available"});}
              delete data.rows[0].password;
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

  app.post("/admin/investors", async(req,res)=>{
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
            const token_query = pool.query('SELECT * FROM administrator WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              const investors_query = pool.query('SELECT * FROM investor', (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                delete data.rows[0].password;
                delete data.rows[0].token;
                delete data.rows[0].user_id;
                return res.status(200).json(data.rows);
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


  app.put("/admin/investor", async(req,res)=>{
    try{
      const {email, investor_email, account_disabled} = req.body;
      if (!(email && investor_email && account_disabled)) {
        return res.status(400).json({error: "All inputs are required"});
      }
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token =  req.headers.authorization.split(' ')[1];
        var verified = jwt.verify(token, jwt_key);
        if(verified){
          try{
            const token_query = pool.query('SELECT * FROM administrator WHERE email = $1', [email.toLowerCase()], (err, storedToken) => {
              if(err) {return res.status(500).json({error: "Service currently not available"});}
              if(storedToken.rowCount == 0) {return res.status(401).json({error: "Unauthorized"});}
              if(storedToken.rows[0].token != token) {return res.status(401).json({error: "Unauthorized"});}
              const update_investor = pool.query('UPDATE investor SET account_disabled = $1 WHERE email = $2', [account_disabled, investor_email.toLowerCase()], (err, data) => {
                if(err) {return res.status(500).json({error: "Service currently not available"});}
                if(data.rowCount == 0) {return res.status(500).json({error: "User not modfied. User might not exist."});}
                return res.status(200).json({ message: "User modfied" });
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

}