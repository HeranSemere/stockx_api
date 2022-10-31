const io = require("socket.io-client");
let socket = io("http://localhost:3000/socket_url");

var buses; //check for null before using this

socket.on("firstFetch", (data) => {
      console.log("List of buses on first fetch: ", data);
      buses = data;
});


socket.on("companyUpdate", (data) => {
   console.log("Update from companies: ", data);

   if(buses != undefined){
      //buses[buses.findIndex(item => item.ID === data.ID)] = data; //replacing this bus data from list with new bus data
      //console.log("List of buses after update: ", buses);
   }

});

/* 
*/


