const { ipcRenderer } = require('electron');
const serial = ipcRenderer.sendSync('getDMI', 'serialNumber');

console.log(serial.split('\n')[1]);