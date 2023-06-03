const fs = require('fs');
const eventEmitter = require('events');
const fetch = require('node-fetch');
const os = require('os');

const events = new eventEmitter();

events.on('log', function(log_data){
    writeLogInfile(log_data);
})


async function downloadImage(image_url){
    try {
        let response = await fetch(image_url);
        let buffer = await response.buffer();
        let extension = image_url.split('.');
        let current_date = getDateObj();
        let time_stamp = current_date.minutes+'-'+current_date.seconds+'-'+current_date.miliseconds;
        let file_name = 'downloaded-image-'+time_stamp+'.'+extension.pop();
        let directory_path = './downloaded-images';
        let is_exists = createDirectoryIfNotExist(directory_path);
        let log_message_date = current_date.year+'-'+current_date.month+'-'+current_date.date+' '+current_date.hours+':'+current_date.minutes+':'+current_date.seconds;
        if (is_exists) {
            let file_path = directory_path+'/'+file_name;
            let fsresponse = new Promise(function(reject, resolve){
                fs.writeFile(file_path, buffer, function(err){
                    if (err) {
                        return reject('Error while downling image '+ file_name + ' Error: ' + err + os.EOL);
                    }
                    return resolve('['+log_message_date+']' +' Image '+ file_name +' download successfully'+ os.EOL);
                }); 
            });
            return fsresponse;
        }
    } catch(Exception) {
        return Exception;
    }
}

function writeLogInfile(log_data){
    let current_date = getDateObj();
    let time_stamp = current_date.year +'-'+ current_date.month +'-'+ current_date.date;
    let file_name = time_stamp+'-log.txt';
    let directory_path = './logs';
    let is_exists = createDirectoryIfNotExist(directory_path);
    let file_path = './logs'+'/'+file_name;
    if(is_exists) {
        fs.appendFile(file_path, log_data, function (err) {
            if (err) throw err;
        });
    }
}

function createDirectoryIfNotExist(directory_path){
    if(!fs.existsSync(directory_path)){
        fs.mkdirSync(directory_path, {recursive: true, mode: 0o775});
    }
    return true;
}

function getDateObj(){
    let date_obj = new Date();
    let date = date_obj.getDate();
    let month = date_obj.getMonth() + 1;
    let year = date_obj.getFullYear();
    let hours = date_obj.getHours();
    let mins = date_obj.getMinutes();
    let seconds = date_obj.getSeconds();
    let milisec = date_obj.getMilliseconds();

    let current_date = {
        year: year,
        month: month,
        date: date,
        hours: hours,
        minutes: mins,
        seconds: seconds,
        miliseconds: milisec

    };
    return current_date;
}

module.exports = {downloadImage, events};