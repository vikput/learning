


const app = require('./app.js');

const PORT = 5000;


//Create server
let server = app.listen(PORT, function(){
    console.log('Server running on host ' + server.address().port);
});