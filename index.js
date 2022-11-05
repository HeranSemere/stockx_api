var { app, port, http, io, companies} = require("./exports/exports");
require('./routes/routes','')(app);

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

http.listen(port, () => {
    console.log("Server Is Running Port: " + port);
});