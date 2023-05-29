const fs = require('fs');
const eventEmitter = require('events');
const fetch = require('node-fetch');
const os = require('os');

const events = new eventEmitter();

events.on('log', function(log_data){
    console.log('log event emited');
    writeLogInfile(log_data);
})


async function downloadImage(image_url){
    try {
        console.log('Download image');
        let response = await fetch(image_url);
        let buffer = await response.buffer();
        let extension = image_url.split('.');
        let date = new Date();
        let mins = date.getMinutes();
        let seconds = date.getSeconds();
        let milisec = date.getMilliseconds()
        let time_stamp = mins+'-'+seconds+'-'+milisec;
        let file_name = 'downloaded-image-'+time_stamp+'.'+extension.pop();
        let file_path = './downloaded-images'+'/'+file_name;
        let fsresponse = new Promise(function(reject, resolve){
            fs.writeFile(file_path, buffer, function(err){
                if (err) {
                    return reject('Error while downling image '+ file_name + ' Error: ' + err + os.EOL);
                }
                return resolve('Image '+ file_name +' download successfully'+ os.EOL);
            }); 
        });
        return fsresponse;
    } catch(Exception) {
        return Exception;
    }
}

function writeLogInfile(log_data){
    console.log('log-data: ' + log_data);
    let date = new Date();
    let _date = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let time_stamp = year +'-'+ month +'-'+ _date;
    let file_name = time_stamp+'-log.txt';
    let file_path = './logs'+'/'+file_name;

    fs.appendFile(file_path, JSON.stringify(log_data), function (err) {
        if (err) throw err;
    });
}

module.exports = {downloadImage, events};