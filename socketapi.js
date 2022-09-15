const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var connections = [];
var connectionid =[];
var connectionname = [];


io.on( "connection", function( socket ) {
    console.log( `A user connected` );
    socket.on('message', function(data){
        // console.log(data); 
        io.emit('msg',data);
    })

    socket.on("disconnect", function(){
        console.log( `A user disconnected`);
        var idx = connectionid.indexOf(socket.id);

        connectionid.splice(idx,1);
        connections.splice(idx,1);

        console.log(connections);
        console.log(connectionid);

        io.emit("users", connections);
    })

    socket.on("username", function(data){
        connections.push(data +"-"+ Math.random());
        connectionname.push(data);
        connectionid.push(socket.id);

        console.log(connections);
        console.log(connectionid);

        io.emit("users", connections);
    })
});



module.exports = socketapi;