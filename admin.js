/*app.post("/admin/investors", async(req,res)=>{
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
  });*/