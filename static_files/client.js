const io = require("socket.io-client");
let socket = io("http://localhost:3000/socket_url");

var companies; //check for null before using this

socket.on("firstFetch", (data) => {
      console.log("List of companies on first fetch: ", data);
      companies = data;
});


socket.on("companyUpdate", (data) => {
   console.log("Update from companies: ", data);

   if(companies != undefined){
      
   }

});


