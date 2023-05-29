const express = require('express');
const {downloadImage, events} = require('./utilities');

const app = express();

//To handle formdata or url-encoded-data
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
//----------------------------------------Ends here---------------------------------------//

app.get('/health-check', function(req, res){
    res.send('I am good');
    //res.json('I am good');
});

/*app.get('/fetch-get', function(req, res){
    fetchGet()
    .then(function(data){
        res.send(data);
    })
    .catch(function(error){
        res.send(error);
    });
});



async function fetchGet(){
    try {
        let res = await fetch('http://localhost:5000/health-check');
        let data = await res.text();
        return data;
    } catch(Exception) {
        return Exception;
    }
}*/
//-------------------------GET END--------------------//
/*app.post('/fetch-post', function(req, res){
    let payload = req.body;
    fetchPost(payload)
    .then(function(response){
        res.json(response);
    })
    .catch(function(error){
        res.json(error);
    })
});*/

/*async function fetchPost(payload){
    try {
        let res = await fetch('http://localhost:5000/post', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch(Exception) {
        return Exception
    }
}*/

/*app.post('/post', function(req, res){
    let payload = req.body;
    acceptData(payload)
    .then(function(response){
        res.json(response);
    })
    .catch(function(error){
        res.json(error);
    });
});

async function acceptData(payload) {
    try {
        let res = {
            status: 200,
            body: payload,
            message: "Payload accepted, post request successful"
        }
        return res;
    } catch(Exception) {
        return Exception;
    }
}*/

app.post('/download-image', function(req, res){ 
    let imageUrlArray = req.body.url;
    imageUrlArray.forEach(function(element){
        downloadImage(element)
        .then(function(response){
            events.emit('log', response);
        })
        .catch(function(error){
            events.emit('log', error);
        });
    });
    res.json('Image download request accepted');
});

module.exports = app;