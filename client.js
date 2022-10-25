const io = require("socket.io-client");
let socket = io("https://stockx-eth.herokuapp.com/socket_url");

socket.on("firstFetch", (data) => {
    console.log(data);
    
});

socket.on("companyUpdate", (data) => {
    console.log("New data: ", data);
    
});