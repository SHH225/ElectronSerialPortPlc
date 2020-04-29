var SerialPort = require("serialport");
var serialPort;
var serialData;
function serialOpen(device,baud,bits,check,stopBit) {
    console.log(device);
    serialPort = new SerialPort(device, {  
        baudRate: baud,
        dataBits: bits,
        parity: check,
        stopBits: stopBit
    });
    serialPort.on("open", function () {
        console.log('open');
        serialPort.on('data', function (data) {
            const buf1=data.toString('hex');
            console.log('data received: ' + buf1);
            serialData += buf1;
            console.log("shh");
        });
    });
}
function serialClose() {
    serialPort.close();
}
function serialWrite(data) {
    console.log(data);
    const buf1=new Buffer.from(data,"hex")
    serialPort.write(buf1, function (err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
}
function serialRead() {
    var dataBuffer = serialData;
    serialData = '';//清空
    return dataBuffer;
}


function getTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}




exports.open = serialOpen;
exports.close = serialClose;
exports.write = serialWrite;
exports.read = serialRead;